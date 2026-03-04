# @prism-design-global/component-library

A design system component library with **seamless Figma to Storybook integration**, enabling AI agents to automatically detect and use components from your design files.

## 📦 Installation

```bash
npm install @prism-design-global/component-library
```

## 🔨 Usage

```tsx
import { Button } from '@prism-design-global/component-library';

function App() {
  return (
    <Button
      variant="primary"
      size="md"
      theme="oyo"
      label="Click me"
    />
  );
}
```

### Available exports

```ts
import { Button } from '@prism-design-global/component-library';
import type { ThemeName, ButtonVariant, ButtonSize } from '@prism-design-global/component-library';
```

### Peer dependencies

This package requires React 18+ in your project:

```bash
npm install react react-dom
```

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

### Local Development

```tsx
import { Button } from '@prism-design-global/component-library';

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

Add metadata to your Figma component descriptions (choose one format):

**JSON format (recommended for AI tools):**
```json
{
  "mcp": {
    "source": "storybook",
    "importPath": "./stories/Button",
    "exportName": "Button",
    "chromaticComponentUrl": "https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--neutral"
  }
}

variant=primary, size=md, onBackground=false
```

**Tag format (human-readable):**
```
[Storybook] Button
[Import] ./stories/Button
[Category] Core/Buttons
[Published] https://www.chromatic.com/component?appId=69a68a5228ff3a182e0b99bf&csfId=components-button--neutral

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
  console.log("View in Storybook:", componentInfo.storybook.publishedUrl);
}
```

See **[FIGMA_STORYBOOK_MAPPING.md](./FIGMA_STORYBOOK_MAPPING.md)** for complete mapping reference.

## 📂 Project Structure

```
component-library/
├── src/
│   ├── index.ts                  # Package entry point
│   ├── components/               # Library components
│   │   └── Button.tsx
│   └── stories/                  # Storybook stories
│       └── Button.stories.tsx
├── tokens/                       # Design tokens (also included in npm package)
│   ├── colours/
│   ├── density/
│   ├── dimension/
│   └── theme/
├── dist/                         # Built library output (auto-generated)
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
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run build:lib        # Build the npm library (ESM + CJS + types)
npm run preview          # Preview production build
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build Storybook for deployment
```

### Publishing a new version

1. Bump `version` in `package.json`
2. Commit and push to `main`
3. Tag and push:
```bash
git tag v0.2.0
git push origin v0.2.0
```
GitHub Actions will automatically build and publish to npm.

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

MIT

