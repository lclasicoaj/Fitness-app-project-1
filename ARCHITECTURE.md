# Workout Tracker - Architecture & Data Flow

## Application Architecture

### Overview

This is a single-page application (SPA) built with React that uses client-side routing and localStorage for data persistence. The app follows a component-based architecture with clear separation of concerns.

### Component Hierarchy

```
App (Router)
├── HomePage
├── RoutinesPage
│   └── RoutineListItem (multiple)
├── RoutineEditorPage
├── StartWorkoutPage
│   └── RoutineListItem (multiple)
├── ActiveWorkoutPage
│   └── ExerciseRow (multiple)
│       └── SetRow (multiple)
├── WorkoutHistoryPage
│   └── WorkoutHistoryItem (multiple)
└── WorkoutDetailPage
    └── ExerciseRow (multiple, read-only)
        └── SetRow (multiple, read-only)
```

## Data Flow

### State Management

The app uses React hooks for state management:
- **Local Component State**: `useState` for component-specific state
- **Persistent State**: Custom `useLocalStorage` hook for data that needs to persist

### Data Storage Structure

All data is stored in localStorage with three main keys:

#### 1. `routines` (Array)

Stores workout routines that can be reused.

```javascript
[
  {
    id: "1234567890-abc123",
    name: "Push Day",
    exercises: [
      {
        id: "1234567891-def456",
        name: "Bench Press"
      },
      {
        id: "1234567892-ghi789",
        name: "Shoulder Press"
      }
    ]
  }
]
```

#### 2. `history` (Array)

Stores completed workouts with all sets and reps.

```javascript
[
  {
    id: "1234567893-jkl012",
    date: "2024-01-15T10:30:00.000Z",
    routineName: "Push Day", // null if blank workout
    exercises: [
      {
        id: "1234567894-mno345",
        name: "Bench Press",
        sets: [
          {
            id: "1234567895-pqr678",
            weight: "135",
            reps: "10"
          },
          {
            id: "1234567896-stu901",
            weight: "155",
            reps: "8"
          }
        ]
      }
    ]
  }
]
```

#### 3. `activeWorkout` (Object or null)

Stores the currently active workout session.

```javascript
{
  id: "1234567897-vwx234",
  date: "2024-01-15T11:00:00.000Z",
  routineName: "Push Day", // null if blank workout
  exercises: [
    {
      id: "1234567898-yza567",
      name: "Bench Press",
      sets: [
        {
          id: "1234567899-bcd890",
          weight: "135",
          reps: "10"
        }
      ]
    }
  ]
}
```

When a workout is finished, it's moved from `activeWorkout` to `history` and `activeWorkout` is set to `null`.

## Data Flow Patterns

### Creating a Routine

1. User navigates to RoutinesPage
2. Clicks "New Routine"
3. RoutineEditorPage renders with empty state
4. User adds exercises and saves
5. New routine is added to `routines` array in localStorage
6. User is navigated back to RoutinesPage

### Starting a Workout from Routine

1. User navigates to StartWorkoutPage
2. Selects a routine
3. Routine exercises are copied to new workout object
4. Sets array is empty (user will add during workout)
5. New workout is saved to `activeWorkout` in localStorage
6. User is navigated to ActiveWorkoutPage

### Active Workout Session

1. ActiveWorkoutPage loads `activeWorkout` from localStorage
2. User adds/removes exercises
3. User adds sets (weight + reps) to each exercise
4. Each change updates `activeWorkout` in localStorage (via useLocalStorage hook)
5. User clicks "Finish Workout"
6. Workout is moved from `activeWorkout` to `history`
7. User is navigated to WorkoutHistoryPage

### Viewing History

1. WorkoutHistoryPage loads `history` array from localStorage
2. Displays list of completed workouts (most recent first)
3. User clicks a workout
4. WorkoutDetailPage renders with read-only exercise/set views
5. Statistics are calculated client-side (total volume, sets, reps)

## Key Hooks

### useLocalStorage(key, defaultValue)

Custom hook that:
1. Initializes state from localStorage (or uses default)
2. Automatically saves to localStorage on every state change
3. Handles JSON serialization/deserialization
4. Returns `[value, setValue]` just like useState

**Location**: `src/hooks/useLocalStorage.js`

**Usage**:
```javascript
const [routines, setRoutines] = useLocalStorage('routines', []);
```

## Component Patterns

### Page Components

All page components follow this pattern:
- Use `PageHeader` for consistent navigation
- Load data from localStorage via `useLocalStorage`
- Handle navigation with `useNavigate` from react-router
- Use `Card` components for content grouping

### UI Components

Reusable UI components are:
- **Presentational**: Receive props, no internal state (when possible)
- **Composable**: Can be combined to build complex UIs
- **Styled with Tailwind**: Utility classes for consistent design

### Workout Components

- **ExerciseRow**: Manages a single exercise with multiple sets
- **SetRow**: Manages a single set (weight + reps)
- **Read-only mode**: Both support a `readOnly` prop for history view

## Routing Strategy

React Router v6 is used for client-side routing:

```
/ - HomePage
/routines - RoutinesPage
/routines/new - RoutineEditorPage (create mode)
/routines/:routineId - RoutineEditorPage (edit mode)
/start-workout - StartWorkoutPage
/active-workout - ActiveWorkoutPage
/history - WorkoutHistoryPage
/history/:workoutId - WorkoutDetailPage
```

Navigation is protected:
- ActiveWorkoutPage redirects to StartWorkoutPage if no active workout
- Back button navigation using `useNavigate(-1)`

## ID Generation

Simple ID generation using timestamp + random string:
```javascript
`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
```

This provides sufficient uniqueness for client-side usage without collisions.

## Styling Architecture

### Tailwind CSS

- **Utility-first**: Small, composable classes
- **Mobile-first**: Base styles are mobile, `md:`, `lg:` for larger screens
- **Consistent spacing**: Using Tailwind's spacing scale
- **Color palette**: Grays for base UI, blue for primary actions, red for destructive

### Design Principles

1. **Minimalism**: Clean, uncluttered interface
2. **Touch-friendly**: Large tap targets (44px minimum)
3. **Clear hierarchy**: Headers, cards, and spacing create visual structure
4. **Immediate feedback**: Hover states, active states, transitions

## Performance Considerations

### Optimizations

1. **localStorage caching**: Data persists across sessions
2. **Component memoization**: Can be added for large lists
3. **Lazy loading**: Routes can be lazy-loaded if needed
4. **Minimal re-renders**: useLocalStorage only updates when data changes

### Potential Improvements

1. **Virtual scrolling**: For very long workout histories
2. **Service worker**: For offline capability
3. **IndexedDB**: For larger datasets
4. **State management library**: Redux/Zustand if complexity grows

## Testing Strategy

### Unit Tests

- Test utility functions (id generation)
- Test custom hooks (useLocalStorage)
- Test UI components in isolation

### Integration Tests

- Test page components with mocked localStorage
- Test navigation flows
- Test form submissions

### E2E Tests (Future)

- Complete workout flow
- Routine creation and usage
- History viewing

## Future Enhancements

### Potential Features

1. **Export/Import**: Backup data as JSON
2. **Charts**: Progress tracking over time
3. **Templates**: Pre-built routine templates
4. **Timer**: Rest timer between sets
5. **Notes**: Add notes to workouts or exercises
6. **Photos**: Progress photos
7. **Body measurements**: Track weight, measurements
8. **Social**: Share workouts with friends
9. **Cloud sync**: Backend API for multi-device sync
10. **Exercise library**: Pre-defined exercises with instructions

### Technical Improvements

1. **TypeScript**: Add type safety
2. **Backend API**: Node.js/Express with PostgreSQL
3. **Authentication**: User accounts
4. **PWA**: Full offline support with service worker
5. **Native apps**: React Native for iOS/Android
6. **Analytics**: Track app usage patterns
7. **Accessibility**: ARIA labels, keyboard navigation
8. **Internationalization**: Multi-language support

---

**Last Updated**: January 2024  
**Version**: 1.0.0
