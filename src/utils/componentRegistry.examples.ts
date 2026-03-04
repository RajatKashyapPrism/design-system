/**
 * Component Registry Examples & Tests
 * 
 * This file demonstrates how to use the prop-based component detection utility
 * to automatically identify Storybook components from Figma descriptions.
 */

import {
  detectComponent,
  analyzeProps,
  extractFigmaProps,
  formatComponentMatch,
  buildComponentRegistry,
} from '../utils/componentRegistry';

// Example 1: Simple prop extraction
console.log('=== Example 1: Extract properties from Figma description ===');
const figmaDescription = `
A versatile button component supporting multiple variants and sizes.

Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false, label=Button, isDisabled=false
`;

const props = extractFigmaProps(figmaDescription);
console.log('Extracted props:', props);
// Output: ['variant', 'size', 'onBackground', 'leadingIcon', 'label', 'isDisabled']

// Example 2: Auto-detect component
console.log('\n=== Example 2: Auto-detect component ===');
const match = detectComponent(figmaDescription);
if (match) {
  console.log(formatComponentMatch(match));
  // Output:
  // ✓ Component: Button
  //   Confidence: 37.5%
  //   Matched props: variant, size, onbackground, ...
}

// Example 3: Analyze props for debugging
console.log('\n=== Example 3: Analyze detection results ===');
const analysis = analyzeProps(['variant', 'size', 'isDisabled', 'label']);
console.log('Total props analyzed:', analysis.totalProps);
console.log('Top match:', analysis.topMatch?.name, `(${(analysis.topMatch?.confidence || 0) * 100}%)`);
console.log('All possible matches:');
analysis.allMatches.forEach((match) => {
  console.log(`  - ${match.name}: ${(match.confidence * 100).toFixed(1)}%`);
});

// Example 4: Component registry inspection
console.log('\n=== Example 4: View component registry ===');
const registry = buildComponentRegistry();
for (const [name, metadata] of registry) {
  console.log(`\n${name}:`);
  console.log(`  Props: ${metadata.propNames.size}`);
  console.log(`  Category: ${metadata.category}`);
  console.log(`  Import: ${metadata.importPath}`);
  if (metadata.chromaticUrl) {
    console.log(`  Chromatic: ${metadata.chromaticUrl}`);
  }
}

// Example 5: Test with different confidence levels
console.log('\n=== Example 5: Test detection thresholds ===');
const testProps = ['variant', 'size'];
const testAnalysis = analyzeProps(testProps);
const testMatch = testAnalysis.topMatch;
if (testMatch) {
  console.log(`Props: ${testProps.join(', ')}`);
  console.log(`Detected: ${testMatch.name}`);
  console.log(`Confidence: ${(testMatch.confidence * 100).toFixed(1)}%`);
  console.log(`Matching: ${testMatch.matchedProps.join(', ')}`);
  console.log(`Not matching: ${testMatch.unmatchedProps.join(', ') || 'none'}`);
}

// Example 6: Real Figma component descriptions
console.log('\n=== Example 6: Real component descriptions ===');

const buttonDescription = `
A versatile button component supporting multiple variants, sizes, and interactive states. 
Fully accessible and themeable across all brand variants.

Properties:
variant=primary, size=md, onBackground=false, leadingIcon=false, trailingIcon=false, split=false, label=Button, isHovered=false, isPressed=false, isDisabled=false
`;

const inputDescription = `
A text input field with label, helper text, error states, and validation support.

Properties:
type=text, label=Label, placeholder=Enter text, error=false, disabled=false, required=false, helperText=
`;

[buttonDescription, inputDescription].forEach((desc) => {
  const result = detectComponent(desc);
  if (result) {
    console.log(`\n✓ Detected: ${result.name} (${(result.confidence * 100).toFixed(1)}%)`);
    console.log(`  Matched: ${result.matchedProps.length} props`);
  } else {
    console.log('\n✗ Could not detect component');
  }
});
