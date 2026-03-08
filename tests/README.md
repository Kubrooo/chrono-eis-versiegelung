# Tests

This directory contains unit tests for Chrono CLI.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

- `config.test.ts` - Tests for configuration management
- `git.test.ts` - Tests for git operations
- `ai.test.ts` - Tests for AI message generation

## Writing Tests

Tests use Vitest framework. Example:

```typescript
import { describe, it, expect } from 'vitest';

describe('Feature', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

## Coverage

Coverage reports are generated in the `coverage/` directory.
View the HTML report by opening `coverage/index.html` in your browser.
