/**
 * Figma to Storybook Component Mapper
 * 
 * Automatically maps Figma component properties to Storybook Button props
 * by parsing the Figma component description from mcp_figma_get_design_context
 * 
 * RECOMMENDED APPROACH:
 * Add metadata directly to Figma component descriptions using this format:
 * 
 * [Storybook] Button
 * [Import] ./stories/Button
 * [Category] Core/Buttons
 * 
 * Then include component props as usual:
 * variant=primary, size=md, onBackground=false
 * 
 * This allows AI agents to automatically detect available Storybook components
 * without relying on node IDs (which change per instance).
 */

// ============================================
// STORYBOOK METADATA PARSING
// ============================================

export interface StorybookMetadata {
  /** Whether component is available in Storybook */
  isAvailable: boolean;
  /** Component name (e.g., "Button") */
  componentName?: string;
  /** Import path (e.g., "./stories/Button") */
  importPath?: string;
  /** Category (e.g., "Core/Buttons") */
  category?: string;
}

/**
 * Extracts Storybook metadata from Figma component description
 * Looks for format:
 * [Storybook] ComponentName
 * [Import] ./path/to/component
 * [Category] Optional/Category
 */
export function parseStorybookMetadata(description: string): StorybookMetadata {
  const metadata: StorybookMetadata = {
    isAvailable: false
  };

  // Check if component is available in Storybook
  const componentMatch = description.match(/\[Storybook\]\s*([A-Za-z0-9_]+)/);
  if (componentMatch) {
    metadata.isAvailable = true;
    metadata.componentName = componentMatch[1];
  }

  // Extract import path
  const importMatch = description.match(/\[Import\]\s*([^\n\r]+)/);
  if (importMatch) {
    metadata.importPath = importMatch[1].trim();
  }

  // Extract category
  const categoryMatch = description.match(/\[Category\]\s*([^\n\r]+)/);
  if (categoryMatch) {
    metadata.category = categoryMatch[1].trim();
  }

  return metadata;
}

/**
 * Generates import statement for Storybook component
 */
export function generateImportStatement(metadata: StorybookMetadata): string | null {
  if (!metadata.isAvailable || !metadata.componentName || !metadata.importPath) {
    return null;
  }

  return `import { ${metadata.componentName} } from '${metadata.importPath}';`;
}

/**
 * Complete component info combining metadata and props
 */
export interface ComponentInfo {
  /** Storybook metadata */
  storybook: StorybookMetadata;
  /** Component props parsed from Figma */
  props: ReturnType<typeof parseComponentDescription>;
  /** Generated import statement (null if not available in Storybook) */
  importStatement: string | null;
  /** Generated component usage code */
  usageCode: string | null;
}

/**
 * Parses complete component information from Figma description
 * Returns metadata, props, and generated code
 */
export function parseComponentInfo(description: string): ComponentInfo {
  const storybook = parseStorybookMetadata(description);
  const props = parseComponentDescription(description);
  const importStatement = generateImportStatement(storybook);
  
  let usageCode: string | null = null;
  if (storybook.isAvailable && storybook.componentName) {
    usageCode = generateComponentUsage(storybook.componentName, props);
  }

  return {
    storybook,
    props,
    importStatement,
    usageCode
  };
}

// ============================================
// COMPONENT PROPS PARSING
// ============================================

/**
 * Extracts button properties from Figma component description
 * Format: "## variant=X, size=Y, on background=Z, isHovered=A, isPressed=B, isDisabled=C"
 */
export function parseComponentDescription(description: string): {
  variant?: string;
  size?: string;
  onBackground?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  isDisabled?: boolean;
} {
  const props: any = {};

  // Extract variant
  const variantMatch = description.match(/variant=([a-z]+)/i);
  if (variantMatch) {
    props.variant = variantMatch[1];
  }

  // Extract size
  const sizeMatch = description.match(/size=([a-z]{2})/i);
  if (sizeMatch) {
    props.size = sizeMatch[1];
  }

  // Extract on background (boolean)
  const onBgMatch = description.match(/on\s+background\s*=\s*(true|false)/i);
  if (onBgMatch) {
    props.onBackground = onBgMatch[1].toLowerCase() === 'true';
  }

  // Extract isHovered (boolean)
  const hoveredMatch = description.match(/isHovered\s*=\s*(true|false)/i);
  if (hoveredMatch) {
    props.isHovered = hoveredMatch[1].toLowerCase() === 'true';
  }

  // Extract isPressed (boolean)
  const pressedMatch = description.match(/isPressed\s*=\s*(true|false)/i);
  if (pressedMatch) {
    props.isPressed = pressedMatch[1].toLowerCase() === 'true';
  }

  // Extract isDisabled (boolean)
  const disabledMatch = description.match(/isDisabled\s*=\s*(true|false)/i);
  if (disabledMatch) {
    props.isDisabled = disabledMatch[1].toLowerCase() === 'true';
  }

  return props;
}

/**
 * Extracts Node IDs from Figma component description
 * Format includes node IDs like "Node ID:** 5639:38292"
 */
export function extractNodeIds(description: string): string[] {
  const nodeIdMatches = description.match(/\*\*Node ID:\*\* (\d+:\d+)/g);
  if (!nodeIdMatches) return [];
  
  return nodeIdMatches.map(match => {
    const idMatch = match.match(/(\d+:\d+)/);
    return idMatch ? idMatch[1] : '';
  }).filter(id => id !== '');
}

/**
 * Maps Figma component properties to Storybook Button props
 * Takes the parsed Figma properties and returns formatted Storybook props
 */
export function mapToStorybook(figmaProps: ReturnType<typeof parseComponentDescription>) {
  const storyProps: any = {};

  // Map variant (e.g., "primary" -> "primary")
  if (figmaProps.variant) {
    storyProps.variant = figmaProps.variant;
  }

  // Map size (e.g., "md" -> "md")
  if (figmaProps.size) {
    storyProps.size = figmaProps.size;
  }

  // Map onBackground (boolean pass-through)
  if (figmaProps.onBackground !== undefined) {
    storyProps.onBackground = figmaProps.onBackground;
  }

  // Map interaction states
  if (figmaProps.isHovered !== undefined) {
    storyProps.isHovered = figmaProps.isHovered;
  }
  if (figmaProps.isPressed !== undefined) {
    storyProps.isPressed = figmaProps.isPressed;
  }
  if (figmaProps.isDisabled !== undefined) {
    storyProps.isDisabled = figmaProps.isDisabled;
  }

  return storyProps;
}

/**
 * Complete mapping from Figma design context output
 * Takes the entire design context string and extracts all relevant info
 */
export function mapFigmaToStorybook(designContext: string) {
  const components = [];

  // Split by component sections (each starts with ##)
  const sections = designContext.split(/(?=## variant)/);

  for (const section of sections) {
    if (!section.trim().length) continue;

    const figmaProps = parseComponentDescription(section);
    const nodeIds = extractNodeIds(section);
    const storyProps = mapToStorybook(figmaProps);

    components.push({
      figmaProps,
      storyProps,
      nodeIds,
      section: section.substring(0, 100), // First 100 chars for reference
    });
  }

  return components;
}

/**
 * Generate TypeScript code snippet for Storybook story
 */
export function generateStoryCode(variant: string, figmaProps: any): string {
  const props = mapToStorybook(figmaProps);
  const propsCode = Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return `${key}={${value}}`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');

  return `<Button ${propsCode} />`;
}

/**
 * Generate component usage code with any component name
 */
export function generateComponentUsage(componentName: string, figmaProps: any): string {
  const props = mapToStorybook(figmaProps);
  const propsCode = Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return `${key}={${value}}`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');

  return `<${componentName} ${propsCode} />`;
}

// ============================================
// EXAMPLE USAGE
// ============================================

/*
// RECOMMENDED: New metadata-based approach (no node IDs required)
const figmaDesignContext = `
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons

variant=primary, size=md, onBackground=false, isHovered=false, isPressed=false, isDisabled=false
`;

// Parse complete component info
const componentInfo = parseComponentInfo(figmaDesignContext);
console.log("Component Info:", componentInfo);
// Output: {
//   storybook: { 
//     isAvailable: true, 
//     componentName: 'Button', 
//     importPath: './stories/Button',
//     category: 'Core/Buttons'
//   },
//   props: { variant: 'primary', size: 'md', onBackground: false, ... },
//   importStatement: "import { Button } from './stories/Button';",
//   usageCode: '<Button variant="primary" size="md" onBackground={false} ... />'
// }

// Check if available in Storybook
if (componentInfo.storybook.isAvailable) {
  console.log("✅ Component is available in Storybook!");
  console.log("Import:", componentInfo.importStatement);
  console.log("Usage:", componentInfo.usageCode);
} else {
  console.log("❌ Component not yet implemented in Storybook");
}

// ============================================

// LEGACY: Old approach (parsing props only)
const legacyContext = `
## variant=primary, size=md, on background=False, isHovered=false, isPressed=false, isDisabled=false
**Node ID:** 444:5478

btn_primary
`;

// Parse the component description
const figmaProps = parseComponentDescription(legacyContext);
console.log("Figma Props:", figmaProps);
// Output: { variant: 'primary', size: 'md', onBackground: false, isHovered: false, isPressed: false, isDisabled: false }

// Map to Storybook
const storyProps = mapToStorybook(figmaProps);
console.log("Storybook Props:", storyProps);
// Output: { variant: 'primary', size: 'md', onBackground: false, isHovered: false, isPressed: false, isDisabled: false }

// Extract node IDs (less reliable for instances)
const nodeIds = extractNodeIds(legacyContext);
console.log("Node IDs:", nodeIds);
// Output: ['444:5478']

// Generate code
const code = generateStoryCode('Primary', figmaProps);
console.log("Generated Code:", code);
// Output: <Button variant="primary" size="md" onBackground={false} isHovered={false} isPressed={false} isDisabled={false} />
*/

export default {
  // New metadata-based functions
  parseStorybookMetadata,
  generateImportStatement,
  parseComponentInfo,
  generateComponentUsage,
  // Legacy functions
  parseComponentDescription,
  extractNodeIds,
  mapToStorybook,
  mapFigmaToStorybook,
  generateStoryCode,
};
