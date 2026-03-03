# Figma Component Description Guide

## 🎯 Purpose

This guide shows you how to format component descriptions in your Figma library so that AI agents with MCP tools can automatically detect and use your Storybook components.

## 📋 Quick Setup Checklist

- [ ] Add `[Storybook] ComponentName` tag
- [ ] Add `[Import] ./path/to/component` tag
- [ ] Add `[Category] Category/Name` tag (optional)
- [ ] List component properties matching Storybook prop names
- [ ] Publish your component library

## ✍️ Description Format

```
[Storybook] ComponentName
[Import] ./path/to/component
[Category] Category/Subcategory

Brief description of what the component does.

Properties:
propName1=value1, propName2=value2, propName3=value3

Additional notes:
- Any design notes
- Usage guidelines
- Accessibility info
```

## 📝 Real Examples

### Button Component

```
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons

A versatile button component supporting multiple variants, sizes, and interactive states. 
Fully accessible and themeable across all brand variants.

Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false, trailingIcon=false, split=false, label=Button, isHovered=false, isPressed=false, isDisabled=false

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
[Storybook] Card
[Import] ./stories/Card
[Category] Layout/Containers

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

### Input Field Component (Example)

```
[Storybook] Input
[Import] ./stories/Input
[Category] Forms/Controls

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

## 🔧 How to Apply to Your Figma Library

### Step 1: Open Component Master
1. Open your Figma file with component library
2. Find the **master component** (has purple outline, usually on a dedicated page)
3. **Do NOT select an instance** - instances inherit from the master

### Step 2: Edit Description
1. Select the master component
2. Right-click → **Edit description** (or use description panel)
3. Paste the formatted description using the template above
4. Save changes

### Step 3: Publish
1. Click **Publish** in the assets panel
2. Add a description of what changed (e.g., "Added Storybook metadata")
3. All instances across all files will now inherit this description

### Step 4: Verify
1. Create an instance of the component in any file
2. Check that the description is showing
3. Test with the parsing utility (optional)

## 🎨 Figma Best Practices

### Property Names Must Match Exactly

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

### Use Boolean Values Consistently

✅ **Good:**
```
isDisabled=true
isDisabled=false
```

❌ **Avoid:**
```
isDisabled=yes
isDisabled=1
```

### List All Possible Values

✅ **Good:**
```
variant=primary, size=md, onBackground=false

Variants: primary, secondary, tertiary, neutral, hyperlink, underlined
Sizes: xs, sm, md, lg
```

This helps AI agents understand all available options.

## 🤖 What AI Agents See

When an AI agent uses the `mcp_figma_get_design_context` tool, they receive your component description and can:

### Detect Availability
```typescript
const componentInfo = parseComponentInfo(designContext);

if (componentInfo.storybook.isAvailable) {
  // Component exists in Storybook!
  console.log("✅ Can use:", componentInfo.storybook.componentName);
  console.log("Import from:", componentInfo.storybook.importPath);
}
```

### Generate Code Automatically
```typescript
// AI generates this automatically:
import { Button } from './stories/Button';

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

### Q: Do I need to add metadata to every instance?
**A:** No! Only add it to the **master component**. All instances automatically inherit the description.

### Q: What if I have component variants in Figma?
**A:** Add the metadata to the main component set. Instances can override properties in their description if needed.

### Q: Can I change the metadata format?
**A:** The parser is flexible, but stick to the `[Tag] Value` format for consistency. The tags `[Storybook]`, `[Import]`, and `[Category]` are recognized by the parser.

### Q: What if my component isn't in Storybook yet?
**A:** Don't add the `[Storybook]` tag. When it's ready, update the description and publish the library.

### Q: Do node IDs matter anymore?
**A:** No! The metadata-based approach doesn't rely on node IDs, which makes it work reliably for all instances.

### Q: How do I test if the parser works?
**A:** Use the utility in your codebase:
```typescript
import { parseComponentInfo } from './utils/figmaStorybook';

const testDescription = `
[Storybook] Button
[Import] ./stories/Button
variant=primary, size=md
`;

console.log(parseComponentInfo(testDescription));
```

## 🔗 Related Documentation

- [FIGMA_STORYBOOK_MAPPING.md](./FIGMA_STORYBOOK_MAPPING.md) - Complete mapping reference
- [figmaStorybook.ts](./src/utils/figmaStorybook.ts) - Parser utility source code
- [Button.stories.tsx](./src/stories/Button.stories.tsx) - Example Storybook implementation

## 📞 Support

If you have questions about:
- **Figma setup**: Contact the design systems team
- **Storybook props**: Check component documentation in Storybook
- **Parser issues**: Open an issue in the repository
