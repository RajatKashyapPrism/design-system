# Figma Component Description Guide

## 🎯 Purpose

This guide shows you how to format component descriptions in your Figma library so that AI agents with MCP tools can **automatically detect and use your Storybook components**.

> **⭐ New in v0.1.0**: Automatic prop-based component detection—no manual metadata required!

## 📋 Quick Setup Checklist

### Recommended (Automatic Detection) ✨
- [x] List component properties matching Storybook prop names
- [ ] Optional: Add metadata tags for disambiguation

### Optional (Manual Metadata - Only if auto-detection fails)
- [ ] Add `[Storybook] ComponentName` tag
- [ ] Add `[Import] ./path/to/component` tag  
- [ ] Add `[Category] Category/Name` tag (optional)
- [ ] Add `[Published] https://chromatic-or-storybook-url` tag

## ✨ How It Works: Automatic Prop-Based Detection

AI agents now use **intelligent prop matching** to automatically detect your Storybook components—no manual metadata required!

### The Magic: What Happens Behind the Scenes

```
Figma Component
    ↓
Extract properties: "variant, size, isDisabled, ..."
    ↓
Compare against installed @prism-design-global/component-library
    ↓
Match against Button, Card, Input, etc. prop signatures
    ↓
Calculate confidence score
    ↓
✅ Auto-detect: "This is a Button component!"
```

### Example Flow

**Figma Component has:**
```
Properties:
variant=primary, size=md, isDisabled=false, label=Button
```

**Detection Algorithm:**
1. Extracts: `variant, size, isDisabled, label`
2. Checks Button component: has `variant`, `size`, `isDisabled`, `label` ✓
3. Calculates: 4 matched / 16 total Button props = **25% confidence**
4. ✅ Detects: **Button component** (confidence: 25%)

### Why This is Better

| Aspect | Manual Metadata | Prop-Based Detection |
|--------|-----------------|----------------------|
| Setup effort | ⏱️ Manual for each component | ✅ Automatic |
| Maintenance | 🔄 Must update on each change | ✅ Auto-updates |
| Accuracy | Manual errors possible | ✅ Data-driven |
| Fallback | None | Uses metadata if needed |
| Works for new props | ❌ Requires manual update | ✅ Automatic |

### When Auto-Detection Works Best

✅ **Automatic Detection Succeeds When:**
- Component uses standard, unique prop names
- Property names match Storybook exactly (e.g., `variant=primary`)
- Component has enough props for disambiguation

⚠️ **Fallback to Manual Metadata When:**
- Multiple components with identical prop sets
- Generic prop names (e.g., `size`, `color` used by many components)
- Need specific variant/story targeting

## ✍️ Description Format

### Recommended: Optimized for Auto-Detection

**Keep it simple—just list the component's properties:**

```
A versatile button component supporting multiple variants and sizes.

Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false, trailingIcon=false, split=false, label=Button, isHovered=false, isPressed=false, isDisabled=false
```

**That's it!** The MCP tool will:
1. Extract: `variant, size, onBackground, leadingIcon, ...`
2. Match against installed component library
3. Auto-detect: ✅ This is a Button

**Why this format?**
- ✅ Humans can read it easily
- ✅ AI can parse it reliably
- ✅ Works with existing components
- ✅ Self-updating when props change

---

### Optional: Hybrid Approach (Auto-Detection + Metadata Hints)

**If you want to help the detection or provide additional context:**

```
A versatile button component supporting multiple variants and sizes.

Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false, trailingIcon=false, split=false, label=Button, isHovered=false, isPressed=false, isDisabled=false

[Storybook] Button
[Category] Core/Buttons
[Published] https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--primary
```

**Metadata tags serve as hints when:**
- Component has generic prop names
- Multiple similar components exist
- You want to force a specific component match

---

### Legacy Format 1: JSON (Not Recommended)

Only use if you have custom tooling that requires JSON structure.

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

---

### Legacy Format 2: Tags (Not Recommended)

Only use if auto-detection fails for your components.

```
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons
[Published] https://www.chromatic.com/component?appId=xxx&csfId=components-name--variant

Brief description of what the component does.

Properties:
propName1=value1, propName2=value2, propName3=value3
```

### How to Get Your Published URL

**From Chromatic:**
1. Open your component in Chromatic
2. Copy the URL from the browser
   - Format: `https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--neutral`
   - The `appId` stays the same for all components in your library
   - The `csfId` changes per component/variant (e.g., `components-button--primary`, `components-button--secondary`)

**From Storybook (self-hosted):**
1. Open your published Storybook
2. Navigate to the component
3. Copy the URL (e.g., `https://your-storybook.com/?path=/story/components-button--primary`)

**Tip:** You can use a generic URL pointing to the component's main story, or specific URLs for each variant. AI agents will use this URL to show developers/designers where to preview the component.

---

### Import Path Options

**For local development:**
```json
"importPath": "./stories/Button"
```

**For published npm packages:**
```json
"importPath": "@your-org/ui-components/button"
```

**For monorepo packages:**
```json
"importPath": "@workspace/components/button"
```

AI agents will use the exact import path you provide when generating code.

## 📝 Real Examples

### Button Component (Recommended Format)

```
A versatile button component supporting multiple variants, sizes, and interactive states. 
Fully accessible and themeable across all brand variants.

Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false, trailingIcon=false, split=false, label=Button, isHovered=false, isPressed=false, isDisabled=false

Variants: primary, secondary, tertiary, neutral, hyperlink, underlined
Sizes: xs, sm, md, lg
Themes: oyo, belvilla, checkin, dancenter, motel-6, studio-6
```

**Auto-detection result:**
- ✅ Detected as: Button
- ✅ Confidence: ~85% (9 matching props)
- ✅ Matched props: variant, size, onBackground, leadingIcon, trailingIcon, split, label, isHovered, isPressed, isDisabled

---

### Button Component (With Optional Metadata)

```
A versatile button component supporting multiple variants, sizes, and interactive states. 
Fully accessible and themeable across all brand variants.

Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false, trailingIcon=false, split=false, label=Button, isHovered=false, isPressed=false, isDisabled=false

[Storybook] Button
[Category] Core/Buttons
[Published] https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--primary

Variants: primary, secondary, tertiary, neutral, hyperlink, underlined
Sizes: xs, sm, md, lg
Themes: oyo, belvilla, checkin, dancenter, motel-6, studio-6

Usage:
- Use primary for main CTAs
- Use secondary for supporting actions
- Use tertiary for low emphasis actions
- Set onBackground=true when used on dark backgrounds or images
```

### Card Component (Example)

```
A flexible card container for displaying grouped content with optional header, 
body, footer, and image support.

Properties:
variant=elevated, hasHeader=true, hasImage=false, hasDivider=true, padding=md

Variants: elevated, outlined, filled
Padding: sm, md, lg

Usage:
- Use elevated variant for prominent content
- Use outlined variant for secondary content
- Add dividers between sections for clarity
```

**Auto-detection result:**
- ✅ Detected as: Card
- ✅ Confidence: ~60% (5 matching props out of 8)

---

### Input Field Component (Example)

```
A text input field with label, helper text, error states, and validation support.

Properties:
type=text, label=Label, placeholder=Enter text, error=false, disabled=false, required=false, helperText=

Types: text, email, password, number, tel, url
States: default, error, disabled, focused

Accessibility:
- Label is always visible and associated with input
- Error messages announced to screen readers
- Keyboard navigable
```

**Auto-detection result:**
- ✅ Detected as: Input
- ✅ Confidence: ~71% (5 matching props out of 7)

## 🔧 How to Apply to Your Figma Library

### Minimum Setup (Prop-Based Detection)

1. **Open the master component** with the purple outline
2. **Add Properties section** to the description:
   ```
   Your component description here.
   
   Properties:
   prop1=defaultValue1, prop2=defaultValue2, prop3=defaultValue3
   ```
3. **Publish** to distribute to all instances
4. **Done!** AI agents will auto-detect your component

### Full Setup (With Optional Metadata)

1. **Open the master component** with the purple outline
2. **Add full description**:
   ```
   Your component description here.
   
   Properties:
   prop1=defaultValue1, prop2=defaultValue2
   
   [Storybook] ComponentName
   [Category] Category/Subcategory
   [Published] https://your-storybook-url
   ```
3. **Publish** to all instances
4. **Verify** by creating an instance and checking the description

### Step-by-Step in Figma

1. **Right-click** the master component → **Edit description** (or use description panel)
2. **Paste** your formatted description
3. **Ensure properties are listed** on one line: `variant=primary, size=md, disabled=false`
4. **Save** changes
5. **Click Publish** in the assets panel → Add change description → **Publish**

## 🎨 Figma Best Practices for Auto-Detection

### ✅ Property Names Must Match Exactly

**Why?** Auto-detection relies on prop name matching.

❌ **Don't use different names:**
```
Figma property: button-variant
Storybook prop: variant
```

✅ **Use identical names:**
```
Figma property: variant
Storybook prop: variant
```

### ✅ Use Boolean Values Consistently

**Why?** Helps AI understand property types.

✅ **Good:**
```
isDisabled=true, isDisabled=false
```

❌ **Avoid:**
```
isDisabled=yes, isDisabled=1
```

### ✅ List All Possible Values

**Why?** Helps AI understand component capabilities.

✅ **Good:**
```
Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false

Variants: primary, secondary, tertiary, neutral, hyperlink, underlined
Sizes: xs, sm, md, lg
```

This helps AI agents understand all available options and generates better code.

### ✅ Use Consistent Prop Order

**Why?** Makes descriptions more scannable.

**Recommended order:**
1. Variants/state (`variant`, `size`, `type`)
2. Boolean flags (`isDisabled`, `isHovered`, `onBackground`)
3. Content props (`label`, `children`, `icon`)
4. Configuration (`theme`, `layout`, `spacing`)

## 🤖 What AI Agents See & Do

### Detection Flow

When an AI agent encounters a Figma component with a properties list, here's what happens:

```typescript
// 1. AI extracts component from Figma
const figmaComponent = await figmaAPI.getComponent('button-frame');

// 2. AI reads description and extracts properties
const description = figmaComponent.description;
// "A versatile button component.
//  Properties: variant=primary, size=md, onBackground=false, ..."

// 3. MCP tool analyzes props against installed library
import { detectComponent } from '@prism-design-global/component-library';
const match = detectComponent(description);

// 4. Automatic detection result:
// ✅ Component: Button
// ✅ Confidence: 85%
// ✅ Import: @prism-design-global/component-library
// ✅ Matched props: variant, size, onBackground
```

### What Happens Next

**If detection succeeds (confidence > threshold):**
```typescript
// AI generates code automatically:
import { Button } from '@prism-design-global/component-library';

export default function MyPage() {
  return (
    <Button 
      variant="primary" 
      size="md" 
      onBackground={false}
      label="Click me"
    />
  );
}
```

**If detection is uncertain or fails:**
```typescript
// AI may ask for clarification or fall back to manual metadata
const metadata = parseMetadataTags(description);
if (metadata.storybook === 'Button') {
  // Confirmed by [Storybook] tag
}
```

### Analyzing Detection Results

Developers can debug detection using the component registry:

```typescript
import { analyzeProps } from '@prism-design-global/component-library';

const analysis = analyzeProps(['variant', 'size', 'isDisabled', 'label']);
console.log(analysis);
// {
//   totalProps: 4,
//   topMatch: { name: 'Button', confidence: 0.85, ... },
//   allMatches: [{ Button: 0.85 }, { Input: 0.25 }, ...],
//   suggestedThreshold: 0.68
// }
```

## 📊 Component Coverage Checklist

Track which components have Storybook metadata:

- [x] Button
- [ ] Input
- [ ] Card
- [ ] Modal
- [ ] Dropdown
- [ ] Checkbox
- [ ] Radio
- [ ] Toggle
- [ ] Badge
- [ ] Avatar
- [ ] Tooltip
- [ ] Alert
- [ ] Navigation
- [ ] Tab

## ❓ FAQ

### Q: How does prop-based detection work?
**A:** The MCP tool extracts property names from your Figma description, then matches them against the installed `@prism-design-global/component-library`. It calculates a confidence score based on how many props match. Components with higher match percentages are detected with higher confidence.

### Q: What if detection gets it wrong?
**A:** Add metadata tags to the description:
```
Properties:
prop1=value, prop2=value

[Storybook] ComponentName
[Category] Category/Subcategory
```
The metadata tags act as hints/overrides when auto-detection is uncertain.

### Q: How high does the confidence need to be?
**A:** Default threshold is **50%** (50% of component's props must match). For a Button with 10 props, 5 matching props = 50% confidence = ✅ Detected.

You can check confidence levels with:
```typescript
import { analyzeProps } from '@prism-design-global/component-library';
analyzeProps(['variant', 'size', 'isDisabled']);
```

### Q: What if I have multiple components with the same props?
**A:** Use metadata tags to disambiguate:
```
Properties:
variant=primary, size=md

[Storybook] Button
[Category] Core/Buttons
```

### Q: Do I need to add metadata to every instance?
**A:** No! Only add it to the **master component**. All instances automatically inherit the description.

### Q: What if my component isn't in Storybook yet?
**A:** The Properties section will still help developers understand the component. Once added to Storybook, just update the description with `[Storybook] ComponentName` and republish.

### Q: How do I debug detection?
**A:** Use the registry analysis tool:
```typescript
import { analyzeProps } from '@prism-design-global/component-library';

const result = analyzeProps(['variant', 'size', 'isDisabled', 'label']);
console.log(result);
// Shows all possible matches and confidence scores
```

### Q: Can I use custom property names?
**A:** Not recommended. Auto-detection relies on exact prop name matching. If you must use custom names, add metadata tags to help the detection process.

### Q: What about component variants in Figma?
**A:** Add metadata to the main component set. Main component + variants all inherit the same description:
```
Properties:
variant=primary, size=md

[Storybook] Button
```

### Q: Does auto-detection work offline?
**A:** Yes! It reads from the installed `@prism-design-global/component-library` package, which is part of your project dependencies. No network calls needed.

## 🔗 Related Documentation

- [componentRegistry.ts](./src/utils/componentRegistry.ts) - Prop-based detection utility
- [FIGMA_STORYBOOK_MAPPING.md](./FIGMA_STORYBOOK_MAPPING.md) - Complete mapping reference
- [Button.stories.tsx](./src/stories/Button.stories.tsx) - Example Storybook implementation

### Using the Component Registry

```typescript
// Build the component registry
import { buildComponentRegistry, detectComponent, analyzeProps } from '@prism-design-global/component-library';

// Detect component from Figma description
const description = `A button component.
Properties: variant=primary, size=md, isDisabled=false`;

const match = detectComponent(description);
if (match) {
  console.log(`✅ Detected: ${match.name} (${(match.confidence * 100).toFixed(0)}%)`);
}

// Analyze props for debugging
const analysis = analyzeProps(['variant', 'size', 'isDisabled', 'label']);
console.log('All matches:', analysis.allMatches);
console.log('Top match:', analysis.topMatch);
```

## 📞 Support

If you have questions about:
- **Figma setup**: Check the "How to Apply" section above
- **Prop-based detection**: See the Component Registry usage examples
- **Storybook props**: Check component documentation in Storybook
- **Detection not working**: Use `analyzeProps()` to debug confidence scores
- **Detection issues**: Open an issue in the repository

## 🚀 Quick Start Summary

### Minimum Setup (⏱️ 2 minutes)
1. Open your Button component in Figma (master component)
2. Edit description:
   ```
   A versatile button component.
   
   Properties:
   variant=primary, size=md, onBackground=false, isDisabled=false, label=Button
   ```
3. Publish
4. ✅ Done! Auto-detection now works

### Full Setup (⏱️ 5 minutes) 
1. Add Properties section (same as above)
2. Add optional metadata tags for disambiguation
3. List all variants/sizes/themes available
4. Publish
5. ✅ Done! Auto-detection + better documentation
