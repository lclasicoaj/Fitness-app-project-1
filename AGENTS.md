# Project Context: My Fitness App

## Project Overview
This is a React-based fitness application bootstrapped with Create React App (CRA). The project is currently in its initial setup phase with the default CRA template structure.

**Project Name:** my-fitness-app  
**Version:** 0.1.0  
**Framework:** React 19.2.0  
**Build Tool:** react-scripts 5.0.1

## Technology Stack

### Frontend
- **React:** 19.2.0 (latest version with modern concurrent features)
- **React DOM:** 19.2.0
- **CSS:** Standard CSS with CSS-in-JS patterns

### Testing
- **Testing Library React:** 16.3.0
- **Testing Library Jest DOM:** 6.9.1
- **Testing Library DOM:** 10.4.1
- **Testing Library User Event:** 13.5.0
- **Test Runner:** Jest (via react-scripts)

### Performance & Analytics
- **Web Vitals:** 2.1.4 (for Core Web Vitals measurement)

## Project Structure

```
my-fitness-app/
├── public/                 # Static public assets
│   ├── favicon.ico        # App favicon
│   ├── index.html         # HTML template
│   ├── logo192.png        # PWA icon (192x192)
│   ├── logo512.png        # PWA icon (512x512)
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # Search engine directives
├── src/                   # Source code
│   ├── App.js             # Main App component (default CRA template)
│   ├── App.css            # App component styles
│   ├── App.test.js        # App component tests
│   ├── index.js           # React entry point with StrictMode
│   ├── index.css          # Global styles
│   ├── logo.svg           # React logo
│   ├── reportWebVitals.js # Performance monitoring utility
│   └── setupTests.js      # Jest configuration
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
└── README.md              # CRA default documentation
```

## Available Scripts

- `npm start` - Runs development server on http://localhost:3000
- `npm test` - Launches Jest test runner in watch mode
- `npm run build` - Creates optimized production build in `/build`
- `npm run eject` - Ejects from CRA (one-way operation, use with caution)

## Development Guidelines

### Code Style & Standards
- **React Version:** Using React 19 with modern patterns
- **Component Style:** Functional components preferred (no class components in codebase)
- **Strict Mode:** Enabled in production for identifying potential issues
- **Testing:** Jest + React Testing Library for component testing
- **Browser Support:** Modern browsers as defined in browserslist config

### File Naming Conventions
- React components: PascalCase (e.g., `App.js`)
- Utilities: camelCase (e.g., `reportWebVitals.js`)
- CSS files: Match component name (e.g., `App.css` for `App.js`)
- Test files: `*.test.js` suffix

### Testing Strategy
- Test files colocated with components (e.g., `App.test.js` next to `App.js`)
- Using `@testing-library/react` for component testing
- Jest DOM matchers available via `setupTests.js`
- Current test: Basic render test for "learn react" link

### CSS Architecture
- Component-scoped CSS files (e.g., `App.css`)
- Global styles in `index.css`
- Current styling: Dark theme with centered layout
- Responsive design considerations in place

## Current State

### What's Implemented
- ✅ Basic React app structure
- ✅ Default CRA template with React logo
- ✅ Testing infrastructure configured
- ✅ Performance monitoring setup (Web Vitals)
- ✅ PWA manifest for installability
- ✅ ESLint configuration (react-app preset)

### What's NOT Implemented (Fitness App Features)
- ❌ Custom UI/UX for fitness tracking
- ❌ Workout logging functionality
- ❌ Exercise database
- ❌ Progress tracking
- ❌ User authentication
- ❌ Data persistence (localStorage/backend)
- ❌ Routing (no react-router)
- ❌ State management (no Redux/Context API setup)
- ❌ API integration
- ❌ Custom components library

## Known Patterns & Conventions

### React Patterns Used
- **Functional Components:** All components are functional (using hooks)
- **React.StrictMode:** Enabled in `index.js` for development safety
- **Component Export:** Default exports for components

### Performance Monitoring
- Web Vitals tracking configured via `reportWebVitals()`
- Measures: CLS, FID, FCP, LCP, TTFB
- Currently set up but not actively logging (pass `console.log` to activate)

### PWA Capabilities
- Manifest configured for Progressive Web App support
- Icons provided (192px and 512px)
- Service worker not registered (CRA default)

## Environment Configuration

### Browser Targets
**Production:**
- >0.2% market share
- Not dead browsers
- Not Opera Mini

**Development:**
- Last version of Chrome, Firefox, Safari

### Build Output
- Production builds go to `/build` directory
- Minified and optimized
- Filenames include hashes for caching

## Dependencies Notes

### Key Dependencies
- All dependencies are at modern, stable versions
- React 19.2.0 brings improved concurrent rendering
- Testing library is fully up to date
- No security vulnerabilities expected with these versions

### Missing Common Fitness App Dependencies
Consider adding for fitness app functionality:
- **Routing:** `react-router-dom` for multi-page navigation
- **State Management:** Redux, Zustand, or Context API patterns
- **Forms:** Formik or React Hook Form for workout entry
- **Date Handling:** date-fns or dayjs for workout scheduling
- **Charts:** Chart.js or Recharts for progress visualization
- **Icons:** react-icons for UI elements
- **UI Components:** Material-UI, Chakra UI, or custom component library

## Next Steps for Development

### Immediate Priorities
1. **Define app structure:** Decide on pages (dashboard, workouts, exercises, progress)
2. **Add routing:** Install and configure react-router-dom
3. **Design component hierarchy:** Create reusable components
4. **Set up state management:** Choose and implement state solution
5. **Create data models:** Define workout, exercise, and user data structures

### Feature Development Order (Suggested)
1. Exercise database and display
2. Workout creation and logging
3. Progress tracking and history
4. Statistics and visualization
5. User settings and preferences

## Important Notes

- **No Backend Currently:** All data would need to be stored client-side (localStorage) or backend needs to be created
- **Executable File:** `acli.exe` present in root - purpose unclear, not standard for React projects
- **GEMINI.md:** Empty file present - may be for AI-related documentation
- **Clean Slate:** This is essentially a fresh CRA template ready for custom development

## Commands Reference

```bash
# Development
npm start                    # Start dev server
npm test                     # Run tests in watch mode
npm test -- --coverage       # Run tests with coverage report

# Production
npm run build               # Create production build
npm run build && serve -s build  # Test production build locally

# Code Quality
npm run lint                # Lint code (if configured)
```

## Browser DevTools Tips

- React DevTools extension recommended for component debugging
- Redux DevTools if Redux is added later
- Network tab for future API integration debugging
- Performance tab for Core Web Vitals monitoring

---

**Last Updated:** Project analysis performed on initial CRA template  
**Status:** 🟡 Initial Setup - Ready for fitness app feature development
