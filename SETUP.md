# Workout Tracker - Setup Instructions

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd my-fitness-app
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

The app will open automatically at [http://localhost:3000](http://localhost:3000)

- Hot reload is enabled - changes will reflect automatically
- The page will reload when you make edits
- Lint errors will appear in the console

### Production Build

Create an optimized production build:

```bash
npm run build
```

The build folder will contain the optimized production-ready files.

### Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Project Structure

```
my-fitness-app/
├── public/                 # Static files
├── src/
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   └── Card.jsx
│   │   ├── workout/       # Workout-specific components
│   │   │   ├── ExerciseRow.jsx
│   │   │   ├── SetRow.jsx
│   │   │   └── WorkoutHistoryItem.jsx
│   │   └── routine/       # Routine-specific components
│   │       └── RoutineListItem.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js  # Custom localStorage hook
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── RoutinesPage.jsx
│   │   ├── RoutineEditorPage.jsx
│   │   ├── StartWorkoutPage.jsx
│   │   ├── ActiveWorkoutPage.jsx
│   │   ├── WorkoutHistoryPage.jsx
│   │   └── WorkoutDetailPage.jsx
│   ├── utils/
│   │   └── id.js          # ID generation utility
│   ├── App.js             # Main app with routing
│   └── index.js           # Entry point
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies and scripts
```

## Technology Stack

- **React 19.2.0** - UI framework
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful icon set
- **localStorage** - Client-side data persistence

## Features

### Routines
- Create, edit, and delete workout routines
- Add exercises to routines
- Reorder exercises with up/down buttons

### Workouts
- Start blank workout or from a routine
- Add/remove exercises during workout
- Add/remove sets (weight + reps)
- Save completed workouts to history

### History
- View all completed workouts
- Detailed workout statistics
- Delete old workouts

## Browser Support

The app works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Mobile browsers are fully supported with a mobile-first design.

## Troubleshooting

### Port already in use

If port 3000 is already in use, you'll be prompted to use a different port. Press `Y` to continue.

### Clear localStorage data

Open browser console and run:
```javascript
localStorage.clear();
```

Then refresh the page.

### Dependencies issues

If you encounter dependency issues:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Start the app with `npm start`
2. Create your first routine from the home page
3. Start a workout and track your sets
4. View your workout history

Enjoy tracking your fitness journey! 💪
