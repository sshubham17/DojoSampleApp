# Dojo 1.04 Website

A simple demonstration website built with Dojo Toolkit version 1.04, featuring a dashboard and table of items with navigation.

## Features

- **Dashboard Page**: Landing page with navigation button and information cards
- **Table of Items**: Displays a styled table with sample content and status badges
- **Navigation**: Seamless navigation between pages with back button functionality
- **Dojo 1.04**: Uses Dojo Toolkit via CDN (version 1.4.0)
- **Dijit Widgets**: Implements Button widgets from the Dijit library
- **Responsive Design**: Mobile-friendly layout with modern styling

## Project Structure

```
dojo-website/
├── index.html          # Entry point (redirects to dashboard)
├── dashboard.html      # Dashboard page with navigation
├── contents.html       # Table of items page
├── todo.html           # Todo manager page
├── styles.css          # Custom styling for all pages
├── todo-styles.css     # Todo page specific styles
└── README.md          # This file
├── styles.css          # Custom styling for all pages
└── README.md          # This file
```

## How to Run

### Option 1: Direct File Access
1. Simply open `index.html` in your web browser
2. The page will automatically redirect to the dashboard
3. Click "View Todo List (API)" to see todos fetched from public API
4. Click "Manage Personal Todos" to access the todo manager
5. Use "← Back to Dashboard" to return

### Option 2: Using a Local Web Server (Recommended for API features)

For better compatibility and to avoid CORS issues (if any):

**Using Python 3:**
```bash
python3 -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

## Technologies Used

- **Dojo Toolkit 1.04** (v1.4.0) - JavaScript framework
- **Dijit Widgets** - UI components from Dojo
- **dojo.xhrGet** - AJAX requests for API integration
- **DummyJSON API** - Public REST API for demo data
- **HTML5** - Page structure
- **CSS3** - Styling with gradients and responsive design
- **Tundra Theme** - Dijit's default theme
- **LocalStorage** - Client-side data persistence

## Pages Overview

### Dashboard (`dashboard.html`)
- Welcome message and site description
- Navigation button to view todo list from API
- Navigation button to manage personal todos
- Information cards with site features
- Gradient header design

### Todo List - API (`contents.html`)
- Fetches and displays todos from DummyJSON API (https://dummyjson.com/todos)
- Shows first 20 todos with dynamic rendering
- Columns: ID, Todo, User, Status
- Status badges with color coding (Completed, Pending)
- Summary bar with statistics (total, completed, pending)
- Loading states and error handling
- Back button to return to dashboard

### Personal Todo Manager (`todo.html`)
- Add new personal todos with title, description, and priority
- CRUD operations (Create, Read, Update, Delete)
- Toggle todo status (Pending/Completed)
- Export/Import functionality
- LocalStorage persistence
- Form validation

## Browser Compatibility

This website works best in modern browsers but is also compatible with older browsers that supported Dojo 1.04:
- Chrome/Edge (all versions)
- Firefox (all versions)
- Safari (all versions)
- Internet Explorer 7+ (legacy support)

## Customization

### Adding More Table Rows
Edit `contents.html` and add more `<tr>` elements in the `<tbody>` section:

```html
<tr>
    <td>8</td>
    <td>Your Topic</td>
    <td>Description here</td>
    <td><span class="status-badge complete">Complete</span></td>
</tr>
```

### Changing Colors
Modify the gradient colors in `styles.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adding More Pages
1. Create a new HTML file
2. Include the Dojo CDN and required modules
3. Add navigation buttons to link from existing pages

## Running Tests

This project includes a comprehensive test suite to ensure functionality remains intact during migration from Dojo 1.04 to modern versions.

### Quick Start

**Install dependencies:**
```bash
npm install
npx playwright install
```

**Run all tests:**
```bash
npm test
```

### Test Types

- **Unit Tests (44 tests)**: Business logic, validation, Dojo widgets, API data handling
- **E2E Tests (27+ tests)**: Full user workflows, navigation, CRUD operations, API integration  
- **Visual Regression (4 tests)**: Screenshot comparison for UI consistency

### Common Commands

```bash
# Unit tests only (opens in browser)
npm run test:unit

# E2E tests only (headless)
npm run test:e2e

# E2E with browser visible
npm run test:e2e:headed

# Interactive UI mode
npm run test:e2e:ui

# View HTML test report
npm run test:report

# Update visual snapshots (after intentional UI changes)
npm run test:visual
```

### Visual Regression Testing

Snapshot tests capture full-page screenshots to detect any UI changes:

1. **Create baseline snapshots** (first time):
   ```bash
   npm run test:visual
   ```

2. **Run tests to compare** against baseline:
   ```bash
   npm run test:e2e
   ```

3. **View differences** if tests fail:
   ```bash
   npm run test:report
   ```

4. **Update snapshots** if changes are intentional:
   ```bash
   npm run test:visual
   ```

For detailed testing documentation, see **[`tests/TEST_DOCUMENTATION.md`](tests/TEST_DOCUMENTATION.md)**.

## CDN Resources Used

- Dojo Core: `https://ajax.googleapis.com/ajax/libs/dojo/1.4.0/dojo/dojo.xd.js`
- Tundra Theme CSS: `https://ajax.googleapis.com/ajax/libs/dojo/1.4.0/dijit/themes/tundra/tundra.css`

## Notes

- Dojo 1.04 is a legacy version; for new projects, consider using modern frameworks
- The website uses CDN-hosted Dojo files, so an internet connection is required
- All navigation uses simple `window.location.href` for page transitions

## License

Free to use and modify for learning purposes.

---

Created on November 12, 2025
