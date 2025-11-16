# Testing Documentation

## Overview

This test suite is designed to ensure **zero regressions** during the migration from Dojo 1.04 to modern versions. Run these tests before and after migration to verify functionality remains intact.

## Test Structure

```
tests/
├── test-suite.html      # QUnit test runner (open in browser)
├── unit-tests.js        # Unit tests for business logic
├── e2e-tests.spec.js    # Playwright E2E tests
└── TEST_DOCUMENTATION.md # This file
```

## Prerequisites

### For Unit Tests
- Modern web browser (Chrome, Firefox, Safari)
- Local web server (optional but recommended)

### For E2E Tests
- Node.js (v18 or higher)
- NPM or Yarn package manager

## Installation

1. **Install dependencies:**
```bash
cd /Users/abhinann/Documents/Workspace/dojo-website
npm install
```

2. **Install Playwright browsers (first time only):**
```bash
npx playwright install
```

## Running Tests

### Quick Test (All)
```bash
npm test
```

### Unit Tests Only

**Option 1: Via NPM script**
```bash
npm run test:unit
```
This will open the test suite in your default browser.

**Option 2: Manual**
1. Start local server: `npm run serve`
2. Open `http://localhost:8000/tests/test-suite.html` in your browser
3. Tests will run automatically

### E2E Tests Only

**Basic run (headless):**
```bash
npm run test:e2e
```

**Run with browser UI visible:**
```bash
npm run test:e2e:headed
```

**Interactive debugging:**
```bash
npm run test:e2e:debug
```

**UI Mode (recommended for development):**
```bash
npm run test:e2e:ui
```

**Update visual snapshots (after intentional UI changes):**
```bash
npm run test:visual
```

**View test report:**
```bash
npm run test:report
```

## Visual Regression Testing (Snapshots)

### Overview
The test suite includes 4 visual regression tests that capture full-page screenshots to detect any UI changes during migration.

### Snapshot Tests:
1. **Dashboard page** - Captures full rendered state
2. **Contents/Items page** - Captures table view
3. **Todo Manager (empty)** - Captures initial state
4. **Todo Manager (with data)** - Captures with 2 todos

### First Time - Create Baseline Snapshots:
```bash
npm run test:visual
```
This creates the initial "golden" screenshots in `tests/e2e-tests.spec.js-snapshots/`

Screenshots are created for each browser (chromium, firefox, webkit, Mobile Chrome, Mobile Safari).

### After Changes - Compare Against Baseline:
```bash
npm run test:e2e
```
If the UI changed, tests will fail and show differences with:
- **Expected screenshot** (baseline)
- **Actual screenshot** (current state)
- **Diff image** (highlights differences)

### View Snapshot Differences:
```bash
npm run test:report
```
Opens HTML report showing:
- Side-by-side comparison of expected vs actual
- Highlighted differences in red
- Option to accept new snapshots

### After Migration - Update Snapshots:
If changes are intentional after Dojo migration:
```bash
npm run test:visual
```
This updates all baseline screenshots to match the new UI.

**Important:** Always review snapshot differences before updating to ensure changes are intentional!

## Test Coverage

### Unit Tests (38 tests)

#### Todo Data Operations (6 tests)
- ✅ Todo array initialization
- ✅ Adding single todo
- ✅ Adding multiple todos
- ✅ Deleting todo by ID
- ✅ Toggling status (Pending ↔ Completed)

#### Input Validation (5 tests)
- ✅ Empty title validation
- ✅ Whitespace-only title validation
- ✅ Valid title acceptance
- ✅ Priority value validation
- ✅ Status value validation

#### Dojo Widget Creation (4 tests)
- ✅ dijit.form.Button creation
- ✅ dijit.form.ValidationTextBox creation
- ✅ dijit.form.Textarea creation
- ✅ dijit.form.FilteringSelect creation

#### Dojo Core Functions (3 tests)
- ✅ dojo.byId() functionality
- ✅ dojo.toJson() conversion
- ✅ dojo.fromJson() parsing

#### Table Rendering Logic (3 tests)
- ✅ Empty state rendering
- ✅ Single todo rendering
- ✅ Multiple todos rendering

#### Priority & Status Badge Classes (5 tests)
- ✅ Low/Medium/High priority classes
- ✅ Pending/Completed status classes

#### Navigation (2 tests)
- ✅ Window location availability
- ✅ Navigation URL correctness

#### Edge Cases (6 tests)
- ✅ Deleting non-existent todo
- ✅ Toggling non-existent todo
- ✅ Empty description defaults
- ✅ Undefined priority defaults

### E2E Tests (25+ tests)

#### Dashboard Page (5 tests)
- ✅ Page loads with correct elements
- ✅ Navigation buttons visible
- ✅ Navigate to contents page
- ✅ Navigate to todo page
- ✅ Styling applied correctly

#### Table of Items Page (5 tests)
- ✅ Page loads correctly
- ✅ Back button visible
- ✅ Navigation back to dashboard
- ✅ Table headers present
- ✅ Sample content displayed

#### Todo Manager - Basic (5 tests)
- ✅ Page loads correctly
- ✅ Empty state message shown
- ✅ All form fields visible
- ✅ Add new todo successfully
- ✅ Form clears after adding

#### Todo Manager - CRUD (5 tests)
- ✅ Toggle todo status
- ✅ Delete todo
- ✅ Add multiple todos
- ✅ Handle different priorities
- ✅ Data persists in table

#### Todo Manager - Validation (2 tests)
- ✅ Alert on empty title submission
- ✅ Allow todo with only title

#### Navigation Flow (1 test)
- ✅ Complete navigation cycle through all pages

#### Visual Regression (4 tests)
- ✅ Dashboard screenshot
- ✅ Contents page screenshot
- ✅ Todo manager screenshot
- ✅ Todo manager with data screenshot

## Test Reports

### Unit Test Results
- Real-time results displayed in browser
- Console logs show summary statistics
- Failed tests highlighted in red

### E2E Test Results
- HTML report: `npm run test:report`
- Results location: `test-results/html/index.html`
- Screenshots of failures: `test-results/`
- Videos of failures: `test-results/`

## Pre-Migration Checklist

Before starting the migration:

1. **Run all tests and verify they pass:**
   ```bash
   npm test
   ```

2. **Save baseline results:**
   ```bash
   npm run test:e2e > baseline-results.txt
   ```

3. **Create visual baseline:**
   ```bash
   npm run test:visual
   ```

4. **Document current behavior:**
   - Note any expected test failures
   - Screenshot current UI
   - Record performance metrics

5. **Commit test baseline:**
   ```bash
   git add tests/ test-results/
   git commit -m "Add baseline tests before Dojo migration"
   ```

## Post-Migration Testing

After migration:

1. **Run unit tests first:**
   ```bash
   npm run test:unit
   ```
   - If any fail, fix before proceeding

2. **Run E2E tests:**
   ```bash
   npm run test:e2e
   ```
   - Compare with baseline results
   - Investigate any failures

3. **Check visual regression:**
   ```bash
   npm run test:e2e
   ```
   - Review any screenshot differences
   - Update snapshots if changes are intentional

4. **Run cross-browser tests:**
   ```bash
   npx playwright test --project=chromium
   npx playwright test --project=firefox
   npx playwright test --project=webkit
   ```

5. **Manual verification:**
   - Test critical user workflows manually
   - Verify security fixes are in place
   - Check responsive design on mobile

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

## Troubleshooting

### Tests Won't Run

**Problem:** `npm test` fails
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port 8000 Already in Use

**Problem:** "Address already in use"
**Solution:**
```bash
# Kill existing server
pkill -f http-server
# Or use different port
npx http-server -p 8001
```

### Playwright Tests Timeout

**Problem:** Tests timeout waiting for server
**Solution:**
```bash
# Start server manually first
npm run serve &
# Then run tests
npm run test:e2e
```

### Unit Tests Show Errors

**Problem:** Dojo widgets not loading
**Solution:**
- Check internet connection (CDN required)
- Clear browser cache
- Try different browser

### Visual Regression Failures

**Problem:** Screenshots don't match
**Solution:**
- Review diff images in `test-results/`
- If changes are intentional: `npm run test:visual`
- If not intentional: fix the styling issue

## Test Maintenance

### Adding New Tests

**Unit Test:**
```javascript
// In tests/unit-tests.js
QUnit.test("My new test", function(assert) {
    // Test code here
    assert.ok(true, "Test passes");
});
```

**E2E Test:**
```javascript
// In tests/e2e-tests.spec.js
test('should do something', async ({ page }) => {
    await page.goto('http://localhost:8000/page.html');
    await expect(page.locator('h1')).toBeVisible();
});
```

### Updating After Migration

1. **Update Dojo imports** in unit-tests.js
2. **Update widget creation** syntax if API changed
3. **Update selectors** if DOM structure changed
4. **Re-baseline visual tests** if UI changed
5. **Document any breaking changes**

## Best Practices

✅ **DO:**
- Run tests before every commit
- Update tests when adding features
- Keep tests fast and focused
- Use meaningful test names
- Review test failures immediately

❌ **DON'T:**
- Skip failing tests
- Comment out tests
- Use arbitrary waits (use proper waits)
- Test implementation details
- Forget to update snapshots after intentional changes

## Performance Benchmarks

Track these metrics before and after migration:

- Page load times
- Time to interactive
- First contentful paint
- Bundle size
- Test execution time

## Security Testing

After migration, verify fixes for:

- ✅ XSS vulnerabilities (input sanitization)
- ✅ JSON injection (use JSON.parse not eval)
- ✅ CSRF protection (token validation)
- ✅ CSP headers (Content Security Policy)
- ✅ Input validation (length limits, character restrictions)

## Support

For issues or questions:
1. Check this documentation
2. Review test output and error messages
3. Check Playwright documentation: https://playwright.dev
4. Check QUnit documentation: https://qunitjs.com

## Migration Testing Timeline

```
Week 1: Pre-Migration
├─ Run baseline tests
├─ Document current state
└─ Commit test suite

Week 2-3: Migration
├─ Migrate components incrementally
├─ Run tests after each change
└─ Fix failures immediately

Week 4: Post-Migration
├─ Full test suite run
├─ Visual regression review
├─ Performance comparison
└─ Security audit

Week 5: Stabilization
├─ Cross-browser testing
├─ Mobile testing
└─ Final sign-off
```

---

**Last Updated:** November 12, 2025
**Test Suite Version:** 1.0.0
**Target:** Dojo 1.04 → Modern Version Migration
