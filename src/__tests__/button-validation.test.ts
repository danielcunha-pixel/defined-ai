/**
 * Button Single-Icon Validation Tests
 *
 * Manual validation test suite for button icon configuration.
 * Run with: node src/__tests__/button-validation.test.ts
 *
 * Since the project doesn't have Jest/Vitest configured, this file
 * demonstrates the validation logic through a simple test harness.
 */

import {
  validateIconConfig,
  getFirstValidIcon,
  normalizeIconConfig,
  type IconConfig,
  type ValidationResult,
} from '../components/ui/button.validation';

// Simple test runner
interface TestCase {
  name: string;
  config: IconConfig;
  expected: { isValid: boolean; shouldError?: boolean };
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

function runTests(): void {
  console.log('🧪 Button Icon Validation Tests\n');

  const testCases: TestCase[] = [
    // ✅ Valid cases
    {
      name: 'No icons (all undefined)',
      config: {},
      expected: { isValid: true },
    },
    {
      name: 'Only leadingIcon',
      config: { leadingIcon: <div>Icon</div> },
      expected: { isValid: true },
    },
    {
      name: 'Only trailingIcon',
      config: { trailingIcon: <div>Icon</div> },
      expected: { isValid: true },
    },
    {
      name: 'Only icon prop',
      config: { icon: <div>Icon</div> },
      expected: { isValid: true },
    },
    {
      name: 'iconOnly=true with icon',
      config: { icon: <div>Icon</div>, iconOnly: true },
      expected: { isValid: true },
    },
    {
      name: 'iconOnly=true without icon (valid - shows no icon)',
      config: { iconOnly: true },
      expected: { isValid: true },
    },

    // ❌ Invalid cases
    {
      name: 'Both leadingIcon and trailingIcon',
      config: {
        leadingIcon: <div>Left</div>,
        trailingIcon: <div>Right</div>,
      },
      expected: { isValid: false, shouldError: true },
    },
    {
      name: 'leadingIcon and icon both provided',
      config: {
        leadingIcon: <div>Left</div>,
        icon: <div>Icon</div>,
      },
      expected: { isValid: false, shouldError: true },
    },
    {
      name: 'trailingIcon and icon both provided',
      config: {
        trailingIcon: <div>Right</div>,
        icon: <div>Icon</div>,
      },
      expected: { isValid: false, shouldError: true },
    },
    {
      name: 'All three icon props provided',
      config: {
        leadingIcon: <div>Left</div>,
        trailingIcon: <div>Right</div>,
        icon: <div>Icon</div>,
      },
      expected: { isValid: false, shouldError: true },
    },
  ];

  let passed = 0;
  let failed = 0;

  // Run validation tests
  console.log('Validation Tests:');
  console.log('-'.repeat(60));

  testCases.forEach((test) => {
    const result = validateIconConfig(test.config);

    const isCorrect = result.isValid === test.expected.isValid;

    if (isCorrect) {
      console.log(`✅ ${test.name}`);
      passed++;
    } else {
      console.error(`❌ ${test.name}`);
      console.error(`   Expected isValid=${test.expected.isValid}, got ${result.isValid}`);
      if (result.error) console.error(`   Error: ${result.error}`);
      failed++;
    }
  });

  console.log(`\nValidation: ${passed} passed, ${failed} failed\n`);

  // Test normalization
  console.log('Normalization Tests:');
  console.log('-'.repeat(60));

  const normalizationTests = [
    {
      name: 'Valid config unchanged',
      input: { leadingIcon: <div>Left</div> },
      expectedKeys: ['leadingIcon'],
    },
    {
      name: 'Remove trailingIcon when leadingIcon present',
      input: {
        leadingIcon: <div>Left</div>,
        trailingIcon: <div>Right</div>,
      },
      expectedKeys: ['leadingIcon'],
    },
    {
      name: 'Keep icon, remove leadingIcon and trailingIcon',
      input: {
        icon: <div>Icon</div>,
        leadingIcon: <div>Left</div>,
      },
      expectedKeys: ['icon'],
    },
  ];

  let normPassed = 0;
  let normFailed = 0;

  normalizationTests.forEach((test) => {
    const normalized = normalizeIconConfig(test.input);
    const keys = Object.keys(normalized).filter(
      (k) => normalized[k as keyof IconConfig] !== undefined
    );

    const isCorrect =
      keys.length === test.expectedKeys.length &&
      test.expectedKeys.every((key) => keys.includes(key));

    if (isCorrect) {
      console.log(`✅ ${test.name}`);
      normPassed++;
    } else {
      console.error(`❌ ${test.name}`);
      console.error(`   Expected: [${test.expectedKeys.join(', ')}], got [${keys.join(', ')}]`);
      normFailed++;
    }
  });

  console.log(`\nNormalization: ${normPassed} passed, ${normFailed} failed\n`);

  // Test first valid icon priority
  console.log('First Valid Icon Priority Tests:');
  console.log('-'.repeat(60));

  const priorityTests = [
    {
      name: 'leadingIcon has priority',
      input: {
        leadingIcon: 'LEFT',
        trailingIcon: 'RIGHT',
        icon: 'ICON',
      },
      expected: 'LEFT',
    },
    {
      name: 'trailingIcon second priority',
      input: {
        trailingIcon: 'RIGHT',
        icon: 'ICON',
      },
      expected: 'RIGHT',
    },
    {
      name: 'icon lowest priority',
      input: {
        icon: 'ICON',
      },
      expected: 'ICON',
    },
    {
      name: 'undefined when no icons',
      input: {},
      expected: undefined,
    },
  ];

  let prioPassed = 0;
  let prioFailed = 0;

  priorityTests.forEach((test) => {
    const result = getFirstValidIcon(test.input as any);

    if (result === test.expected) {
      console.log(`✅ ${test.name}`);
      prioPassed++;
    } else {
      console.error(`❌ ${test.name}`);
      console.error(`   Expected: ${test.expected}, got ${result}`);
      prioFailed++;
    }
  });

  console.log(`\nPriority: ${prioPassed} passed, ${prioFailed} failed\n`);

  // Summary
  const totalPassed = passed + normPassed + prioPassed;
  const totalFailed = failed + normFailed + prioFailed;
  const totalTests = testCases.length + normalizationTests.length + priorityTests.length;

  console.log('='.repeat(60));
  console.log(`📊 TOTAL: ${totalPassed}/${totalTests} tests passed`);

  if (totalFailed > 0) {
    console.error(`\n❌ ${totalFailed} test(s) failed`);
    process.exit(1);
  } else {
    console.log('\n✅ All tests passed!');
  }
}

// Run tests
runTests();
