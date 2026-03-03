# Figma to Storybook Component Mapping

This document explains how to connect Figma components to their Storybook implementations for seamless design-to-code workflows with AI agents.

## ✨ Recommended Approach: Metadata-Based Mapping

**The most reliable way** to connect Figma and Storybook is by adding metadata directly to your Figma component descriptions. This approach:

- ✅ **Works for all instances** (no node ID dependencies)
- ✅ **AI agent friendly** (MCP tools can auto-detect available components)
- ✅ **Simple to maintain** (update once in component library)
- ✅ **Self-documenting** (clear what's available in Storybook)

### Two Supported Formats

**Format 1: JSON (Best for AI/MCP tools)**
```json
{
  "mcp": {
    "source": "storybook",
    "importPath": "./stories/Button",
    "exportName": "Button",
    "category": "Core/Buttons",
    "chromaticComponentUrl": "https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--neutral"
  }
}
```

**Format 2: Tags (Human-readable)**
```
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons
[Published] https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--neutral
```

Both formats work - choose what fits your workflow!

### How to Add Metadata to Figma

In your **Figma component library**, add metadata to component descriptions using either format above, then add your component properties:

```
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons
[Published] https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--neutral

variant=primary, size=md, onBackground=false
```

**Format Rules:**
- `[Storybook] ComponentName` - Indicates component is available in Storybook
- `[Import] path/to/component` - Import path for the component
- `[Category] Category/Name` - Optional categorization
- `[Published] url` - Published Storybook/Chromatic URL (optional but recommended)
- Then list component props using your existing naming convention

**Example for Button Component:**
```
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons
[Published] https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--neutral

This is a reusable button component supporting multiple variants and sizes.

Properties automatically map to Storybook props:
variant=primary, size=md, onBackground=false, leadingIcon=true, trailingIcon=false
```

### Using the Parser Utility

The [figmaStorybook.ts](src/utils/figmaStorybook.ts) utility automatically parses this metadata:

```typescript
import { parseComponentInfo } from './utils/figmaStorybook';

const designContext = `
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons
[Published] https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--neutral

variant=primary, size=md, onBackground=false
`;

const componentInfo = parseComponentInfo(designContext);

// Returns:
// {
//   storybook: { 
//     isAvailable: true, 
//     componentName: 'Button', 
//     importPath: './stories/Button',
//     category: 'Core/Buttons',
//     publishedUrl: 'https://www.chromatic.com/component?appId=...'
//   },
//   props: { variant: 'primary', size: 'md', onBackground: false },
//   importStatement: "import { Button } from './stories/Button';",
//   usageCode: '<Button variant="primary" size="md" onBackground={false} />'
// }

// Check availability
if (componentInfo.storybook.isAvailable) {
  console.log("✅ Ready to use:", componentInfo.importStatement);
  console.log("Usage:", componentInfo.usageCode);
}
```

### For AI Agents with MCP Tools

When an AI agent uses `mcp_figma_get_design_context`, it will automatically receive the metadata and can:

1. **Detect** if the component exists in Storybook
2. **Generate** correct import statements
3. **Use** the component with proper props
4. **Avoid** implementing components that already exist

**Agent workflow:**
```typescript
// Agent calls MCP tool
const designContext = await mcp_figma_get_design_context(fileId, nodeId);

// Parse the response
const componentInfo = parseComponentInfo(designContext);

if (componentInfo.storybook.isAvailable) {
  // Component exists! Generate code using it
  return `
    ${componentInfo.importStatement}
    
    export default function MyPage() {
      return ${componentInfo.usageCode};
    }
  `;
} else {
  // Component needs to be created
  return "This component is not yet available in Storybook.";
}
```

---

## 🤖 Legacy Approach: Automatic Property Parsing

Since Figma components use the same property structure as Storybook props, we can **automatically parse** Figma design context to extract component properties.

**Utility:** See [figmaStorybook.ts](src/utils/figmaStorybook.ts) for `parseComponentDescription()` function that extracts:
- `variant` - Button style variant
- `size` - Size (xs, sm, md, lg)
- `onBackground` - Inverted colors for background overlay
- `isHovered`, `isPressed`, `isDisabled` - Interactive states

**Example:**
```typescript
import { parseComponentDescription } from './utils/figmaStorybook';

const designContext = `
## variant=primary, size=md, on background=False, isHovered=false, isPressed=false, isDisabled=false
**Node ID:** 444:5478
`;

const props = parseComponentDescription(designContext);
// Returns: { variant: 'primary', size: 'md', onBackground: false, ... }
```

---

## Recently Analyzed Components

Based on the URLs you shared, here are the automatically extracted mappings:

### Node 22125:1845 - Primary MD
```tsx
// Figma: variant=primary, size=md, onBackground=false
<Button variant="primary" size="md" leadingIcon={true} trailingIcon={true} />
```

### Node 22125:1903 - Secondary MD
```tsx
// Figma: variant=secondary, size=md, onBackground=false  
<Button variant="secondary" size="md" leadingIcon={true} trailingIcon={true} />
```

### Node 22125:2012 - Hyperlink MD
```tsx
// Figma: variant=hyperlink, size=md, onBackground=false
<Button variant="hyperlink" size="md" leadingIcon={true} trailingIcon={true} />
```

### Node 444:5430 - Tertiary SM (Border variant)
```tsx
// Figma: variant=tertiary, size=sm, onBackground=false
<Button variant="tertiary" size="sm" leadingIcon={true} trailingIcon={true} />
```

### Node 8929:43638 - Underlined SM (Dotted underline)
```tsx
// Figma: variant=underlined, size=sm, onBackground=false
<Button variant="underlined" size="sm" leadingIcon={false} trailingIcon={false} />
```

---

### Primary Variant - Regular Background

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | `22110:11322` | Primary | `size="xs"` |
| SM | `22110:11321` | Primary | `size="sm"` |
| MD | `22110:11319` / `22125:1845` | Primary | `size="md"` |
| LG | `22110:11320` | Primary | `size="lg"` |

**Import:**
```tsx
import { Button } from './stories/Button';

// Usage
<Button variant="primary" size="md" label="Button" leadingIcon={true} trailingIcon={false} />
```

---

### Primary Variant - On Background (Inverted)

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | `15688:29942` | Primary | `size="xs"` `onBackground={true}` |
| SM | `15688:29950` | Primary | `size="sm"` `onBackground={true}` |
| MD | `15688:29958` | Primary | `size="md"` `onBackground={true}` |
| LG | `15688:29966` | Primary | `size="lg"` `onBackground={true}` |

**Import:**
```tsx
<Button variant="primary" size="md" label="Button" onBackground={true} leadingIcon={true} trailingIcon={false} />
```

---

### Secondary Variant - Regular Background

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | TBD | Secondary | `size="xs"` |
| SM | TBD | Secondary | `size="sm"` |
| MD | `22125:1903` | Secondary | `size="md"` |
| LG | TBD | Secondary | `size="lg"` |

**Import:**
```tsx
<Button variant="secondary" size="md" label="Button" leadingIcon={true} trailingIcon={false} />
```

---

### Secondary Variant - On Background (Inverted)

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | `15688:29983` | Secondary | `size="xs"` `onBackground={true}` |
| SM | `15688:29991` | Secondary | `size="sm"` `onBackground={true}` |
| MD | TBD | Secondary | `size="md"` `onBackground={true}` |
| LG | TBD | Secondary | `size="lg"` `onBackground={true}` |

**Import:**
```tsx
<Button variant="secondary" size="md" label="Button" onBackground={true} leadingIcon={true} trailingIcon={false} />
```

---

### Tertiary Variant

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | TBD | Tertiary | `size="xs"` |
| SM | `444:5430` | Tertiary | `size="sm"` |
| MD | TBD | Tertiary | `size="md"` |
| LG | TBD | Tertiary | `size="lg"` |

**Import:**
```tsx
<Button variant="tertiary" size="md" label="Button" leadingIcon={true} trailingIcon={false} />
```

---

### Neutral Variant - Regular Background

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | TBD | Neutral | `size="xs"` |
| SM | TBD | Neutral | `size="sm"` |
| MD | `22110:11319` | Neutral | `size="md"` |
| LG | TBD | Neutral | `size="lg"` |

**Import:**
```tsx
<Button variant="neutral" size="md" label="Button" leadingIcon={false} trailingIcon={false} />
```

---

### Neutral Variant - On Background

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | `20045:42818` | Neutral | `size="xs"` `onBackground={true}` |
| SM | `20045:41790` | Neutral | `size="sm"` `onBackground={true}` |
| MD | `20045:41806` | Neutral | `size="md"` `onBackground={true}` |
| LG | TBD | Neutral | `size="lg"` `onBackground={true}` |

**Import:**
```tsx
<Button variant="neutral" size="md" label="Button" onBackground={true} leadingIcon={false} trailingIcon={false} />
```

---

### Hyperlink Variant

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | TBD | Hyperlink | `size="xs"` |
| SM | TBD | Hyperlink | `size="sm"` |
| MD | `22125:2012` | Hyperlink | `size="md"` |
| LG | TBD | Hyperlink | `size="lg"` |

**Import:**
```tsx
<Button variant="hyperlink" size="md" label="Button" />
```

---

### Underlined Variant

| Size | Figma Node ID | Storybook Story | Props |
|------|---------------|-----------------|-------|
| XS | TBD | Underlined | `size="xs"` |
| SM | `8929:43638` | Underlined | `size="sm"` |
| MD | TBD | Underlined | `size="md"` |
| LG | TBD | Underlined | `size="lg"` |

**Import:**
```tsx
<Button variant="underlined" size="md" label="Button" />
```

---

## Common Props Reference

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'hyperlink' \| 'underlined' \| 'neutral'` | Button style variant | `'primary'` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | Button size | `'xs'` |
| `label` | `string` | Button text content | `'Button'` |
| `label1` | `boolean` | Show/hide label | `true` |
| `leadingIcon` | `boolean` | Show/hide leading icon | `false` |
| `trailingIcon` | `boolean` | Show/hide trailing icon | `false` |
| `split` | `boolean` | Show/hide split separator | `false` |
| `onBackground` | `boolean` | Use inverted colors for background overlay | `false` |
| `isHovered` | `boolean` | Control hover state | `false` |
| `isPressed` | `boolean` | Control pressed state | `false` |
| `isDisabled` | `boolean` | Disable button | `false` |
| `theme` | `'oyo' \| 'belvilla' \| 'checkin' \| 'dancenter' \| 'motel-6' \| 'studio-6'` | Brand theme | `'oyo'` |

---

## How to Use This Mapping

### Step 1: Find the Figma Component
Locate the button component in Figma and note its node ID (shown in the URL as `node-id=XXXXX:XXXXX`)

### Step 2: Look Up the Node ID
Find the node ID in the tables above to identify:
- The variant name (Primary, Secondary, etc.)
- The size (xs, sm, md, lg)
- Whether it uses `onBackground`

### Step 3: Choose the Story in Storybook
Navigate to the corresponding variant story in the left sidebar (e.g., "Primary", "Secondary")

### Step 4: Configure Controls
Use the Controls panel to adjust:
- **size**: Change between xs, sm, md, lg
- **onBackground**: Toggle inverted colors (if applicable)
- **Other props**: leadingIcon, trailingIcon, split, label, isDisabled, isHovered, isPressed, theme

---

## Example Workflows

### Example 1: Finding Primary Button MD on Background
**Figma:** Node ID `15688:29958`
1. Look up node ID in table → "Primary On Background, MD"
2. Go to Storybook → Select "Primary" story
3. Controls → Set `size="md"`, toggle `onBackground=true`
4. Adjust other properties as needed

### Example 2: Finding Neutral Button with Icons
**Figma:** Node ID `20045:41806` (Neutral On Background MD with icons)
1. Look up node ID → "Neutral On Background, MD"
2. Go to Storybook → Select "Neutral" story
3. Controls → Set `size="md"`, toggle `onBackground=true`
4. Enable `leadingIcon` and/or `trailingIcon` toggles

---

## 📝 Figma Component Description Template

Use this template when creating or updating components in your Figma library:

```
[Storybook] ComponentName
[Import] ./path/to/component
[Category] Category/Subcategory

Brief description of the component and its purpose.

Properties (automatically map to Storybook props):
variant=primary, size=md, onBackground=false, leadingIcon=false, trailingIcon=false

Design notes:
- Use with dark backgrounds when onBackground=true
- Supports all brand themes
- Accessible via keyboard navigation
```

### Template for Button Component

```
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons

A versatile button component supporting multiple variants, sizes, and interactive states.

Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false, trailingIcon=false, split=false, isHovered=false, isPressed=false, isDisabled=false

Variants: primary, secondary, tertiary, neutral, hyperlink, underlined
Sizes: xs, sm, md, lg
Themes: oyo, belvilla, checkin, dancenter, motel-6, studio-6
```

### Updating Your Figma Library

**For Component Owners:**

1. **Open your Figma component library**
2. **Select the master component** (not an instance)
3. **Right-click → Edit description**
4. **Add the metadata template** at the top of the description
5. **Publish the component library** - all instances will inherit this metadata

**Why this works:**
- Component descriptions are inherited by all instances
- No need to update individual instances
- AI agents can detect component availability from any instance
- Node IDs become irrelevant

---

## 🚀 Quick Reference for AI Agents

### Detecting Available Components

```typescript
import { parseComponentInfo } from './utils/figmaStorybook';

// From MCP Figma tool response
const componentInfo = parseComponentInfo(designContext);

if (componentInfo.storybook.isAvailable) {
  // ✅ Component exists in Storybook
  const { componentName, importPath, category } = componentInfo.storybook;
  const { variant, size, onBackground } = componentInfo.props;
  
  // Use it!
  console.log(componentInfo.importStatement); // import { Button } from './stories/Button';
  console.log(componentInfo.usageCode);       // <Button variant="primary" size="md" />
} else {
  // ❌ Component needs implementation
  console.log("Component not available in Storybook yet");
}
```

### Available Utility Functions

| Function | Purpose |
|----------|---------|
| `parseStorybookMetadata(desc)` | Extract Storybook availability metadata |
| `parseComponentDescription(desc)` | Extract component props (variant, size, etc.) |
| `parseComponentInfo(desc)` | Complete parsing (metadata + props + code gen) |
| `generateImportStatement(metadata)` | Generate import code |
| `generateComponentUsage(name, props)` | Generate JSX usage code |

---

## Component Tree

```
Button (src/stories/Button.tsx)
├── Variants
│   ├── Primary (regular + onBackground)
│   ├── Secondary (regular + onBackground)
│   ├── Tertiary
│   ├── Neutral (regular + onBackground)
│   ├── Hyperlink
│   └── Underlined
├── Sizes (all variants)
│   ├── xs (extra small)
│   ├── sm (small)
│   ├── md (medium)
│   └── lg (large)
└── States (all variants & sizes)
    ├── Default
    ├── Hovered
    ├── Pressed
    ├── Disabled
    ├── With Leading Icon
    ├── With Trailing Icon
    ├── With Split
    ├── On Background
    └── Combinations
```

---

## Notes

- **Metadata Format**: Always use `[Storybook]`, `[Import]`, and `[Category]` tags in component descriptions
- **Node IDs**: No longer needed for mapping - metadata works for all instances
- **Prop Naming**: Keep Figma property names identical to Storybook prop names (e.g., `variant`, `size`, `onBackground`)
- **Storybook Controls**: All state variations (hover, pressed, disabled) are controlled through the Controls panel, not separate stories
- **Theme Support**: All variants support all 6 themes (oyo, belvilla, checkin, dancenter, motel-6, studio-6)
- **Interactive States**: The wrapper component handles hover and press states automatically on mouse interaction, or can be forced via controls
- **Token-Based**: All colors, spacing, and typography are driven by design tokens from `tokens/` directory
- **AI Agent Compatibility**: MCP Figma tools automatically provide component descriptions that include the metadata
