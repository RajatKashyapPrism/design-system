# Component Registry Implementation Summary

## What Was Created

A sophisticated **prop-based component detection system** that enables MCP tools to automatically identify Storybook components from Figma descriptions—without requiring manual metadata.

## Files Created/Modified

### 1. **[src/utils/componentRegistry.ts](./src/utils/componentRegistry.ts)** ✨ NEW
   - **Core utility** for prop-based component detection
   - ~400 lines of well-documented TypeScript
   - **Key functions:**
     - `buildComponentRegistry()` - Creates component metadata registry
     - `detectComponent()` - Main detection function
     - `detectComponentsByProps()` - Matches components by prop similarity
     - `analyzeProps()` - Debug/analyze detection results
     - `extractFigmaProps()` - Parse properties from Figma description
     - `formatComponentMatch()` - Format results for display

### 2. **[src/utils/componentRegistry.examples.ts](./src/utils/componentRegistry.examples.ts)** ✨ NEW
   - Example usage demonstrating all detection scenarios
   - 6 complete examples with output
   - Great for learning and testing

### 3. **[src/index.ts](./src/index.ts)** - UPDATED
   - Added exports for all registry functions and types
   - Makes utilities available to package consumers

### 4. **[FIGMA_DESCRIPTION_GUIDE.md](./FIGMA_DESCRIPTION_GUIDE.md)** - UPDATED
   - Complete rewrite emphasizing prop-based detection
   - Moved from manual metadata-first to automatic detection-first approach
   - Added detection flow diagrams and comparison tables
   - Updated FAQs with prop-based detection questions
   - Includes real examples and debugging tips

## How It Works

### Detection Flow

```
1. Figma Component Description
   ↓
2. Extract "Properties:" section → ["variant", "size", "isDisabled", ...]
   ↓
3. Load installed component library registry
   ↓
4. Calculate prop match percentage for each component
   ↓
5. Return ranked matches by confidence score
   ↓
6. ✅ Auto-detect: "This is a Button component (85% confidence)"
```

### Example Usage

```typescript
import { 
  detectComponent, 
  analyzeProps 
} from '@prism-design-global/component-library';

// Simple detection
const figmaDescription = `
A button component.

Properties:
variant=primary, size=md, isDisabled=false, label=Button
`;

const match = detectComponent(figmaDescription);
// Result: Button component with 37.5% confidence

// Debug analysis
const analysis = analyzeProps(['variant', 'size', 'isDisabled', 'label']);
console.log(analysis.allMatches);  // All possible components ranked
console.log(analysis.topMatch);     // Best match
console.log(analysis.suggestedThreshold); // Recommended confidence threshold
```

## Confidence Scoring

The detection algorithm calculates confidence as:

**Confidence = (Matched Props) / (Total Component Props)**

### Example:
- **Figma component has:** `variant, size, isDisabled, label` (4 props)
- **Button component has:** 16 total props including these 4
- **Result:** 4 ÷ 16 = **25% confidence**
- **Default threshold:** 50%+
- **This match:** ❌ Below threshold

The "matched/total" approach ensures specificity - components with fewer total props but high match rate score well.

## Component Registry Structure

Each component in the registry includes:

```typescript
{
  name: "Button",
  exportName: "Button",
  importPath: "@prism-design-global/component-library",
  category: "Core/Buttons",
  description: "...",
  propNames: Set<string>,           // All available props
  propTypes: Record<string, string>, // TypeScript types
  defaultProps: Record<string, any>, // Default values
  requiredProps: Set<string>,        // Required props
  chromaticUrl?: string,             // Preview URL
  storybook: {
    available: boolean,
    path?: string
  }
}
```

## Key Features

✅ **Automatic** - No manual metadata required  
✅ **Self-updating** - Works with new components automatically  
✅ **Smart fallback** - Can use manual metadata tags when needed  
✅ **Debuggable** - `analyzeProps()` shows all possible matches  
✅ **Fast** - Works with installed package, no network calls  
✅ **Extensible** - Easy to add new components to registry  

## Figma Setup

### Minimum (Property-based)
```
A versatile button component.

Properties:
variant=primary, size=md, isDisabled=false, label=Button
```

### Optional metadata hints
```
A versatile button component.

Properties:
variant=primary, size=md, isDisabled=false, label=Button

[Storybook] Button
[Category] Core/Buttons
```

## Detection Thresholds

- **Default threshold:** 50% (configurable)
- **Call `detectComponent(desc, 0.6)`** for 60% threshold
- Use `analyzeProps()` to find optimal threshold for your components

## When to Use Fallback Metadata

Add `[Storybook] ComponentName` tags when:
- Multiple components have identical prop names
- Generic props like `size` or `color` that exist in many components
- You want to force a specific component match
- Auto-detection is ambiguous or returning wrong results

## Testing the Registry

```typescript
import { buildComponentRegistry } from '@prism-design-global/component-library';

const registry = buildComponentRegistry();
console.log(registry.size);  // Number of components

registry.forEach((metadata, name) => {
  console.log(`${name}: ${metadata.propNames.size} props`);
});
```

## Building & Publishing

The utilities are already exported from the main package:

```bash
npm run build:lib    # Builds the library
npm pack             # Create tarball for testing
npm publish          # Publish to NPM
```

After publishing, consumers can use:

```typescript
import { 
  detectComponent,
  analyzeProps 
} from '@prism-design-global/component-library';
```

## Next Steps

1. **Add more components** to the registry in `componentRegistry.ts`
   - Entry for each component in your library
   - Complete prop signatures
   - Default values

2. **Update Figma descriptions** with Properties sections
   - Matches your component's Storybook props exactly
   - Includes default values (optional but recommended)

3. **Test detection** for your components
   ```typescript
   analyzeProps(['your', 'prop', 'names']);
   ```

4. **Add metadata tags** only when needed
   - For disambiguation
   - For special handling
   - Not needed for straightforward components

## Documentation

- **Guide:** [FIGMA_DESCRIPTION_GUIDE.md](./FIGMA_DESCRIPTION_GUIDE.md)
- **Examples:** [componentRegistry.examples.ts](./src/utils/componentRegistry.examples.ts)
- **Source:** [componentRegistry.ts](./src/utils/componentRegistry.ts)
