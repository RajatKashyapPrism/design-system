export { Button } from './components/Button';
export type { ThemeName, ButtonVariant, ButtonSize } from './components/Button';

// Component Registry & Prop-Based Detection
export {
  buildComponentRegistry,
  detectComponentsByProps,
  detectComponent,
  analyzeProps,
  generateFigmaDescription,
  formatComponentMatch,
  extractFigmaProps,
  defaultRegistry,
} from './utils/componentRegistry';

export type {
  ComponentMetadata,
  ComponentMatch,
} from './utils/componentRegistry';
