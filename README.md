# @prism-design-global/component-library

React component library for Prism Design Global, with Storybook docs and token-based multi-brand theming.

## Installation

```bash
npm install @prism-design-global/component-library
```

## Peer Dependencies

This package expects React in the consuming app:

```bash
npm install react react-dom
```

Supported versions:

- `react >= 18`
- `react-dom >= 18`

## Usage

```tsx
import { Button } from '@prism-design-global/component-library';

export function App() {
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

## Exports

```ts
import { Button } from '@prism-design-global/component-library';
import type {
  ThemeName,
  ButtonVariant,
  ButtonSize
} from '@prism-design-global/component-library';
```

## Available Components

- `Button`
  - Variants: `primary`, `secondary`, `tertiary`, `neutral`, `hyperlink`, `underlined`
  - Sizes: `xs`, `sm`, `md`, `lg`
  - Themes: `oyo`, `belvilla`, `checkin`, `dancenter`, `motel-6`, `studio-6`

## Design Tokens

Token files are included in the package under `tokens/`:

- `tokens/colours`
- `tokens/density`
- `tokens/dimension`
- `tokens/theme`

## Development

```bash
npm install
npm run build:lib
npm run storybook
```

## Scripts

```bash
npm run build              # Build library and types
npm run build:lib          # Build library (ESM + CJS + d.ts)
npm run lint               # Run ESLint
npm run storybook         # Start Storybook dev server
npm run build-storybook   # Build Storybook static output
npm run chromatic         # Publish Storybook to Chromatic
```

## Project Structure

```text
component-library/
+-- src/
�   +-- index.ts
�   +-- components/
�   �   +-- Button.tsx
�   +-- stories/
�   �   +-- Button.stories.tsx
�   �   +-- Configure.mdx
�   +-- utils/│       +-- componentRegistry.ts+-- tokens/
+-- .storybook/
+-- dist/
+-- FIGMA_DESCRIPTION_GUIDE.md
+-- FIGMA_STORYBOOK_MAPPING.md
+-- README.md
```

## Figma and Storybook Docs

This repository includes process docs for Figma metadata conventions and Storybook mapping:

- `FIGMA_DESCRIPTION_GUIDE.md`
- `FIGMA_STORYBOOK_MAPPING.md`

Note: these are documentation guides; parser utilities are not currently implemented in `src/utils`.

## Publishing

Publishing is tag-based via GitHub Actions (`.github/workflows/publish.yml`).

Typical flow:

1. Update `version` in `package.json`
2. Commit and push
3. Create and push a version tag

```bash
git tag v0.1.1
git push origin v0.1.1
```

## Contributing

1. Implement components in `src/components/`
2. Add stories/docs in `src/stories/`
3. Export public APIs from `src/index.ts`
4. Keep token usage aligned with files under `tokens/`
5. Update Figma docs when component metadata conventions change

## License

MIT
