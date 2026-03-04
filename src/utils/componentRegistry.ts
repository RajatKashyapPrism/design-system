/**
 * Component Registry & Prop-Based Detection
 * 
 * This utility enables MCP tools to automatically detect Storybook components
 * based on prop names extracted from Figma components, without requiring
 * manual metadata in Figma descriptions.
 */

/**
 * Component metadata including export information and prop signatures
 */
export interface ComponentMetadata {
  name: string;
  exportName: string;
  importPath: string;
  category: string;
  description: string;
  propNames: Set<string>;
  propTypes: Record<string, string>;
  defaultProps: Record<string, any>;
  requiredProps: Set<string>;
  chromaticUrl?: string;
  storybook?: {
    available: boolean;
    path?: string;
  };
}

/**
 * Component match result from prop-based detection
 */
export interface ComponentMatch {
  name: string;
  confidence: number; // 0-1, based on prop match percentage
  matchedProps: string[];
  unmatchedProps: string[];
  component: ComponentMetadata;
}

/**
 * Build component registry from available components
 * This reads component metadata and extracts prop signatures
 */
export function buildComponentRegistry(): Map<string, ComponentMetadata> {
  const registry = new Map<string, ComponentMetadata>();

  // Register Button component
  registry.set('Button', {
    name: 'Button',
    exportName: 'Button',
    importPath: '@prism-design-global/component-library',
    category: 'Core/Buttons',
    description: 'Versatile button component supporting multiple variants, sizes, and interactive states',
    propNames: new Set([
      'children',
      'isDisabled',
      'isHovered',
      'isPressed',
      'label',
      'label1',
      'leadingIcon',
      'leadingIcon1',
      'onBackground',
      'size',
      'split',
      'theme',
      'trailingIcon',
      'trailingIcon1',
      'variant',
      'onClick',
    ]),
    propTypes: {
      children: 'React.ReactNode',
      isDisabled: 'boolean',
      isHovered: 'boolean',
      isPressed: 'boolean',
      label: 'string',
      label1: 'boolean',
      leadingIcon: 'boolean',
      leadingIcon1: 'React.ReactNode | null',
      onBackground: 'boolean',
      size: 'ButtonSize',
      split: 'boolean',
      theme: 'ThemeName',
      trailingIcon: 'boolean',
      trailingIcon1: 'React.ReactNode | null',
      variant: 'ButtonVariant',
      onClick: 'function',
    },
    defaultProps: {
      isDisabled: false,
      isHovered: false,
      isPressed: false,
      label: 'Button',
      label1: true,
      leadingIcon: false,
      leadingIcon1: null,
      onBackground: false,
      size: 'md',
      split: false,
      theme: 'oyo',
      trailingIcon: false,
      trailingIcon1: null,
      variant: 'primary',
    },
    requiredProps: new Set([]),
    chromaticUrl: 'https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--primary',
    storybook: {
      available: true,
      path: 'Core/Buttons',
    },
  });

  return registry;
}

/**
 * Extract prop names from a Figma component description
 * Supports multiple formats: "prop1, prop2=value, prop3"
 */
export function extractFigmaProps(description: string): string[] {
  // Look for "Properties:" section
  const propsMatch = description.match(/Properties:\s*(.+?)(?:\n|$)/i);
  if (!propsMatch) {
    return [];
  }

  // Split by comma and extract prop names
  return propsMatch[1]
    .split(',')
    .map((prop) => prop.trim())
    .map((prop) => {
      // Extract just the prop name (before = if present)
      const [name] = prop.split('=');
      return name.trim();
    })
    .filter((name) => name.length > 0);
}

/**
 * Detect components by matching Figma props against component registry
 * 
 * @param figmaProps - Array of prop names from Figma component
 * @param registry - Component registry (or undefined to build default)
 * @returns Array of component matches sorted by confidence (highest first)
 */
export function detectComponentsByProps(
  figmaProps: string[],
  registry?: Map<string, ComponentMetadata>
): ComponentMatch[] {
  if (!registry) {
    registry = buildComponentRegistry();
  }

  if (figmaProps.length === 0) {
    return [];
  }

  const figmaPropSet = new Set(figmaProps.map((p) => p.toLowerCase()));
  const matches: ComponentMatch[] = [];

  for (const [componentName, metadata] of registry) {
    const componentPropSet = new Set(
      Array.from(metadata.propNames).map((p) => p.toLowerCase())
    );

    // Calculate prop overlap
    const matchedProps = Array.from(figmaPropSet).filter((prop) =>
      componentPropSet.has(prop)
    );

    const unmatchedProps = Array.from(figmaPropSet).filter(
      (prop) => !componentPropSet.has(prop)
    );

    if (matchedProps.length === 0) {
      continue; // Skip components with no matching props
    }

    // Confidence = matched props / component's total props
    // This ensures components with fewer total props but high match rate score well
    const confidence = matchedProps.length / metadata.propNames.size;

    matches.push({
      name: componentName,
      confidence,
      matchedProps,
      unmatchedProps,
      component: metadata,
    });
  }

  // Sort by confidence (highest first)
  return matches.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Find the best component match for Figma props
 * Falls back to metadata if available
 * 
 * @param figmaDescription - Full Figma component description
 * @param confidenceThreshold - Minimum confidence score (0-1), default 0.5
 * @returns Best match or null if no sufficient match found
 */
export function detectComponent(
  figmaDescription: string,
  confidenceThreshold: number = 0.5
): ComponentMatch | null {
  // First try to extract props from description
  const figmaProps = extractFigmaProps(figmaDescription);

  if (figmaProps.length > 0) {
    const matches = detectComponentsByProps(figmaProps);

    if (matches.length > 0 && matches[0].confidence >= confidenceThreshold) {
      return matches[0];
    }
  }

  // If prop-based detection fails, could fallback to metadata parsing
  // (e.g., [Storybook] tags) but prop-based is preferred
  return null;
}

/**
 * Analyze Figma props to provide detection insights
 * Useful for debugging and understanding detection results
 */
export function analyzeProps(
  figmaProps: string[],
  registry?: Map<string, ComponentMetadata>
): {
  totalProps: number;
  allMatches: ComponentMatch[];
  topMatch: ComponentMatch | null;
  suggestedThreshold: number;
} {
  if (!registry) {
    registry = buildComponentRegistry();
  }

  const allMatches = detectComponentsByProps(figmaProps, registry);

  // Suggest a threshold that captures high-confidence matches
  const suggestedThreshold =
    allMatches.length > 0
      ? allMatches[0].confidence * 0.8 // 80% of best match
      : 0.5;

  return {
    totalProps: figmaProps.length,
    allMatches,
    topMatch: allMatches[0] || null,
    suggestedThreshold: Math.max(0.3, Math.min(suggestedThreshold, 0.95)),
  };
}

/**
 * Generate Figma component description with prop list for optimal detection
 */
export function generateFigmaDescription(
  componentName: string,
  description: string,
  registry?: Map<string, ComponentMetadata>
): string {
  if (!registry) {
    registry = buildComponentRegistry();
  }

  const metadata = registry.get(componentName);
  if (!metadata) {
    return description;
  }

  const propsList = Array.from(metadata.propNames)
    .map((prop) => {
      const defaultValue = metadata.defaultProps[prop];
      if (defaultValue === undefined || defaultValue === null) {
        return prop;
      }
      return `${prop}=${defaultValue}`;
    })
    .join(', ');

  return `${description}

Properties:
${propsList}`;
}

/**
 * Format component match for display/debugging
 */
export function formatComponentMatch(match: ComponentMatch): string {
  const percentage = (match.confidence * 100).toFixed(1);
  const matched = match.matchedProps.join(', ') || 'none';
  const unmatched = match.unmatchedProps.join(', ') || 'none';

  return `
✓ Component: ${match.name}
  Confidence: ${percentage}%
  Matched props: ${matched}
  Unmatched props: ${unmatched}
  Category: ${match.component.category}
  Import: ${match.component.importPath}
`;
}

// Export singleton registry for convenience
export const defaultRegistry = buildComponentRegistry();

export default {
  buildComponentRegistry,
  detectComponentsByProps,
  detectComponent,
  analyzeProps,
  generateFigmaDescription,
  formatComponentMatch,
  extractFigmaProps,
};
