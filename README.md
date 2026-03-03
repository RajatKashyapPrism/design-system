# Component Library

A design system component library with **seamless Figma to Storybook integration**, enabling AI agents to automatically detect and use components from your design files.

## ✨ Features

- 🎨 **Design-Code Sync**: Component metadata in Figma descriptions maps to Storybook implementations
- 🤖 **AI Agent Ready**: MCP Figma tools can auto-detect available components
- 📦 **Token-Based Theming**: Design tokens for colors, spacing, typography, and themes
- 🧩 **Reusable Components**: Button (more components coming soon)
- 📚 **Storybook Documentation**: Interactive component playground

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Start development server
npm run dev
```

### Using Components

```tsx
import { Button } from './stories/Button';

function App() {
  return (
    <Button 
      variant="primary" 
      size="md" 
      label="Click me"
    />
  );
}
```

## 🎯 Figma Integration

### For Designers

Add this metadata to your Figma component descriptions:

```
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons

variant=primary, size=md, onBackground=false
```

See **[FIGMA_DESCRIPTION_GUIDE.md](./FIGMA_DESCRIPTION_GUIDE.md)** for detailed instructions.

### For Developers & AI Agents

```typescript
import { parseComponentInfo } from './utils/figmaStorybook';

// Parse Figma design context (from MCP tools)
const componentInfo = parseComponentInfo(designContext);

if (componentInfo.storybook.isAvailable) {
  // ✅ Component exists - use it!
  console.log(componentInfo.importStatement);
  console.log(componentInfo.usageCode);
}
```

See **[FIGMA_STORYBOOK_MAPPING.md](./FIGMA_STORYBOOK_MAPPING.md)** for complete mapping reference.

## 📂 Project Structure

```
component-library/
├── src/
│   ├── stories/          # Storybook components
│   │   ├── Button.tsx
│   │   └── Button.stories.tsx
│   └── utils/
│       └── figmaStorybook.ts  # Figma-Storybook parser
├── tokens/              # Design tokens
│   ├── colours/
│   ├── density/
│   ├── dimension/
│   └── theme/
├── FIGMA_STORYBOOK_MAPPING.md    # Component mapping reference
├── FIGMA_DESCRIPTION_GUIDE.md    # Figma setup guide
└── README.md
```

## 🎨 Available Components

- [x] **Button** - Primary, Secondary, Tertiary, Neutral, Hyperlink, Underlined variants
- [ ] Input (planned)
- [ ] Card (planned)
- [ ] Modal (planned)

## 🧪 Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Storybook** - Component documentation
- **Vitest** - Unit testing (configured)

---

## 🔧 Configuration

This project uses:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) for Fast Refresh
- ESLint for code quality
- TypeScript for type checking

### Scripts

```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run storybook    # Start Storybook dev server
npm run build-storybook  # Build Storybook for deployment
```

## 📖 Documentation

- **[README.md](./README.md)** - This file (project overview)
- **[FIGMA_DESCRIPTION_GUIDE.md](./FIGMA_DESCRIPTION_GUIDE.md)** - How to format Figma component descriptions
- **[FIGMA_STORYBOOK_MAPPING.md](./FIGMA_STORYBOOK_MAPPING.md)** - Complete Figma-Storybook mapping reference
- **[Button component](./src/stories/Button.tsx)** - Example component implementation

## 🤝 Contributing

1. Add metadata to Figma component descriptions (see FIGMA_DESCRIPTION_GUIDE.md)
2. Implement components in `src/stories/`
3. Create Storybook stories for documentation
4. Update FIGMA_STORYBOOK_MAPPING.md with new mappings

## 📜 License

This project is part of a design system initiative.

