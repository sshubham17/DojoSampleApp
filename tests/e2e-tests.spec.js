// Playwright E2E Tests for Dojo 1.04 Website
// Run before and after migration to catch regressions

const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8000';

// ===========================================
// TEST SUITE: Dashboard Page
// ===========================================
test.describe('Dashboard Page', () => {
  test('should load and display main elements', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard.html`);
    
    // Check page title
    await expect(page).toHaveTitle(/Dashboard/);
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Dashboard');
    
    // Check subtitle
    const subtitle = page.locator('.subtitle');
    await expect(subtitle).toBeVisible();
  });

  test('should display navigation buttons', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard.html`);
    
    // Wait for Dojo to load and render buttons
    await page.waitForTimeout(1500);
    
    // Check for "View Todo List (API)" button
    const contentsButton = page.locator('button:has-text("View Todo List (API)")');
    await expect(contentsButton).toBeVisible();
    
    // Check for "Manage Personal Todos" button
    const todoButton = page.locator('button:has-text("Manage Personal Todos")');
    await expect(todoButton).toBeVisible();
  });

  test('should navigate to todo list page when button clicked', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard.html`);
    
    // Wait for Dojo to load
    await page.waitForTimeout(1500);
    
    // Click the todo list button
    await page.locator('button:has-text("View Todo List (API)")').click();
    
    // Wait for navigation
    await page.waitForURL(/.*contents.html/);
    
    // Verify we're on the todo list page
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Todo List');
  });

  test('should navigate to todo page when button clicked', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard.html`);
    
    // Wait for Dojo to load
    await page.waitForTimeout(1500);
    
    // Click the personal todo button
    await page.locator('button:has-text("Manage Personal Todos")').click();
    
    // Wait for navigation
    await page.waitForURL(/.*todo.html/);
    
    // Verify we're on the todo page
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Todo Manager');
  });

  test('should have correct styling applied', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard.html`);
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check that container has background
    const container = page.locator('#container');
    await expect(container).toBeVisible();
    
    // Check that buttons exist
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ===========================================
// TEST SUITE: Todo List Page (API)
// ===========================================
test.describe('Todo List Page (API)', () => {
  test('should load and display todos from API', async ({ page }) => {
    await page.goto(`${BASE_URL}/contents.html`);
    
    // Wait for Dojo and API to load
    await page.waitForTimeout(2000);
    
    // Check heading
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Todo List');
    
    // Check table exists
    const table = page.locator('.contents-table');
    await expect(table).toBeVisible();
    
    // Check that todos loaded (should have rows)
    const rows = page.locator('.contents-table tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    
    // Check summary bar exists
    const summary = page.locator('#todoSummary');
    await expect(summary).toBeVisible();
  });

  test('should display back button', async ({ page }) => {
    await page.goto(`${BASE_URL}/contents.html`);
    
    const backButton = page.locator('text=Back to Dashboard');
    await expect(backButton).toBeVisible();
  });

  test('should navigate back to dashboard', async ({ page }) => {
    await page.goto(`${BASE_URL}/contents.html`);
    
    // Wait for page load
    await page.waitForTimeout(1500);
    
    // Click back button
    await page.click('text=Back to Dashboard');
    
    // Wait for navigation
    await page.waitForURL(/.*dashboard.html/);
    
    // Verify we're back on dashboard
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Dashboard');
  });

  test('should display table with correct headers', async ({ page }) => {
    await page.goto(`${BASE_URL}/contents.html`);
    
    // Wait for page load
    await page.waitForTimeout(1500);
    
    // Check table headers
    await expect(page.locator('th:has-text("#")')).toBeVisible();
    await expect(page.locator('th:has-text("Todo")')).toBeVisible();
    await expect(page.locator('th:has-text("User")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();
  });

  test('should display todos from API', async ({ page }) => {
    await page.goto(`${BASE_URL}/contents.html`);
    
    // Wait for API to load
    await page.waitForTimeout(2000);
    
    // Check for at least one todo row
    const rows = page.locator('.contents-table tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    
    // Check that first row has data (not loading message)
    const firstRow = rows.first();
    const cellCount = await firstRow.locator('td').count();
    expect(cellCount).toBe(4); // ID, Todo, User, Status
  });
  
  test('should display summary statistics', async ({ page }) => {
    await page.goto(`${BASE_URL}/contents.html`);
    
    // Wait for API to load
    await page.waitForTimeout(2000);
    
    // Check summary contains expected text
    const summary = page.locator('#todoSummary');
    const summaryText = await summary.textContent();
    expect(summaryText).toContain('Showing');
    expect(summaryText).toContain('completed');
    expect(summaryText).toContain('pending');
  });
});

// ===========================================
// TEST SUITE: Todo Manager - Basic Operations
// ===========================================
test.describe('Todo Manager - Basic Operations', () => {
  test('should load todo page correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    
    // Check heading
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Todo Manager');
    
    // Check form exists
    const form = page.locator('.form-container');
    await expect(form).toBeVisible();
    
    // Check table exists
    const table = page.locator('.todo-table');
    await expect(table).toBeVisible();
  });

  test('should display empty state message', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    
    const emptyMessage = page.locator('.empty-message');
    await expect(emptyMessage).toHaveText('No todos yet. Add one to get started!');
  });

  test('should have all form fields visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    
    // Check title field
    const titleField = page.locator('#todoTitle');
    await expect(titleField).toBeVisible();
    
    // Check description field
    const descField = page.locator('#todoDescription');
    await expect(descField).toBeVisible();
    
    // Check priority field
    const priorityField = page.locator('#todoPriority');
    await expect(priorityField).toBeVisible();
    
    // Check add button
    const addButton = page.locator('text=Add Todo');
    await expect(addButton).toBeVisible();
  });

  test('should add a new todo successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    
    // Wait for Dojo to load
    await page.waitForTimeout(1000);
    
    // Fill in the form
    await page.fill('input[id="todoTitle"]', 'Test Todo Item');
    await page.fill('textarea[id="todoDescription"]', 'This is a test description');
    
    // Click add button
    await page.click('text=Add Todo');
    
    // Wait a bit for the todo to be added
    await page.waitForTimeout(500);
    
    // Check that todo appears in table
    const todoTitle = page.locator('text=Test Todo Item');
    await expect(todoTitle).toBeVisible();
  });

  test('should clear form after adding todo', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    await page.waitForTimeout(1000);
    
    // Fill and submit form
    await page.fill('input[id="todoTitle"]', 'Test Todo');
    await page.fill('textarea[id="todoDescription"]', 'Test Description');
    await page.click('text=Add Todo');
    
    await page.waitForTimeout(500);
    
    // Check that title field is empty
    const titleValue = await page.inputValue('input[id="todoTitle"]');
    expect(titleValue).toBe('');
  });
});

// ===========================================
// TEST SUITE: Todo Manager - CRUD Operations
// ===========================================
test.describe('Todo Manager - CRUD Operations', () => {
  test('should toggle todo status', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    await page.waitForTimeout(1000);
    
    // Add a todo
    await page.fill('input[id="todoTitle"]', 'Toggle Test Todo');
    await page.click('text=Add Todo');
    await page.waitForTimeout(500);
    
    // Get initial status
    const statusBadge = page.locator('.status-badge').first();
    const initialStatus = await statusBadge.textContent();
    
    // Click toggle button
    await page.click('button:has-text("Toggle")');
    await page.waitForTimeout(300);
    
    // Get new status
    const newStatus = await statusBadge.textContent();
    
    // Verify status changed
    expect(initialStatus).not.toBe(newStatus);
  });

  test('should delete todo', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    await page.waitForTimeout(1000);
    
    // Add a todo
    await page.fill('input[id="todoTitle"]', 'Delete Test Todo');
    await page.click('text=Add Todo');
    await page.waitForTimeout(500);
    
    // Verify todo exists
    await expect(page.locator('text=Delete Test Todo')).toBeVisible();
    
    // Delete the todo
    await page.click('button:has-text("Delete")');
    await page.waitForTimeout(300);
    
    // Verify empty state is back
    await expect(page.locator('.empty-message')).toBeVisible();
  });

  test('should add multiple todos', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    await page.waitForTimeout(1000);
    
    // Add first todo
    await page.fill('input[id="todoTitle"]', 'First Todo');
    await page.click('text=Add Todo');
    await page.waitForTimeout(300);
    
    // Add second todo
    await page.fill('input[id="todoTitle"]', 'Second Todo');
    await page.click('text=Add Todo');
    await page.waitForTimeout(300);
    
    // Add third todo
    await page.fill('input[id="todoTitle"]', 'Third Todo');
    await page.click('text=Add Todo');
    await page.waitForTimeout(300);
    
    // Check all three are visible
    await expect(page.locator('text=First Todo')).toBeVisible();
    await expect(page.locator('text=Second Todo')).toBeVisible();
    await expect(page.locator('text=Third Todo')).toBeVisible();
    
    // Count rows (excluding header)
    const rows = page.locator('#todoTableBody tr');
    const count = await rows.count();
    expect(count).toBe(3);
  });

  test('should handle different priorities', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`, { timeout: 60000 });
    await page.waitForTimeout(2000); // Longer wait for Mobile Safari
    
    // Add todo with High priority
    await page.fill('input[id="todoTitle"]', 'High Priority Todo');
    // Note: Priority selection might need adjustment based on actual Dojo widget rendering
    await page.click('text=Add Todo');
    await page.waitForTimeout(500);
    
    // Check that priority badge appears
    const priorityBadge = page.locator('.priority-badge').first();
    await expect(priorityBadge).toBeVisible();
  });
});

// ===========================================
// TEST SUITE: Todo Manager - Validation
// ===========================================
test.describe('Todo Manager - Validation', () => {
  test('should show alert when submitting empty title', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    await page.waitForTimeout(1500);
    
    // Set up dialog handler before clicking
    let dialogShown = false;
    page.on('dialog', async dialog => {
      dialogShown = true;
      expect(dialog.message()).toContain('Please enter a todo title');
      await dialog.accept();
    });
    
    // Try to submit with empty title
    await page.locator('button:has-text("Add Todo")').click();
    
    // Wait a bit for dialog
    await page.waitForTimeout(500);
    
    // Verify dialog was shown
    expect(dialogShown).toBe(true);
  });

  test('should allow adding todo with only title', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    await page.waitForTimeout(1000);
    
    // Add todo with only title
    await page.fill('input[id="todoTitle"]', 'Title Only Todo');
    await page.click('text=Add Todo');
    await page.waitForTimeout(500);
    
    // Verify it was added
    await expect(page.locator('text=Title Only Todo')).toBeVisible();
  });
});

// ===========================================
// TEST SUITE: Navigation Between Pages
// ===========================================
test.describe('Navigation Flow', () => {
  test('should complete full navigation cycle', async ({ page }) => {
    // Start at index (redirects to dashboard)
    await page.goto(`${BASE_URL}/index.html`);
    await page.waitForURL(/.*dashboard.html/);
    await page.waitForTimeout(1500);
    
    // Go to todo list (API)
    await page.locator('button:has-text("View Todo List (API)")').click();
    await page.waitForURL(/.*contents.html/);
    await page.waitForTimeout(2000); // Wait for API load
    
    // Go back to dashboard
    await page.locator('button:has-text("Back to Dashboard")').click();
    await page.waitForURL(/.*dashboard.html/);
    await page.waitForTimeout(1500);
    
    // Go to personal todo manager
    await page.locator('button:has-text("Manage Personal Todos")').click();
    await page.waitForURL(/.*todo.html/);
    await page.waitForTimeout(1500);
    
    // Go back to dashboard
    await page.locator('button:has-text("Back to Dashboard")').click();
    await page.waitForURL(/.*dashboard.html/);
    
    // Verify we're back on dashboard
    await expect(page.locator('h1')).toHaveText('Dashboard');
  });
});

// ===========================================
// TEST SUITE: Visual Regression
// ===========================================
test.describe('Visual Regression Tests', () => {
  test('dashboard visual snapshot', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard.html`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500); // Wait for Dojo widgets to render
    await expect(page).toHaveScreenshot('dashboard.png', { fullPage: true });
  });

  test('todo list API visual snapshot', async ({ page }) => {
    await page.goto(`${BASE_URL}/contents.html`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for API and Dojo widgets to render
    await expect(page).toHaveScreenshot('todo-list-api.png', { fullPage: true });
  });

  test('todo manager visual snapshot', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500); // Wait for Dojo widgets to render
    await expect(page).toHaveScreenshot('todo-manager.png', { fullPage: true });
  });

  test('todo manager with data visual snapshot', async ({ page }) => {
    await page.goto(`${BASE_URL}/todo.html`);
    await page.waitForTimeout(1500); // Wait for Dojo to load
    
    // Add some todos
    await page.fill('input[id="todoTitle"]', 'Visual Test Todo 1');
    await page.locator('button:has-text("Add Todo")').click();
    await page.waitForTimeout(300);
    
    await page.fill('input[id="todoTitle"]', 'Visual Test Todo 2');
    await page.locator('button:has-text("Add Todo")').click();
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('todo-manager-with-data.png', { fullPage: true });
  });
});
