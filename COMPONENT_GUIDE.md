# 🧩 Component Guide

A visual guide to all components in the Workout Tracker app.

## 📋 Component Overview

### UI Components (`src/components/ui/`)

#### Button.jsx
**Purpose**: Reusable button component with variants

**Props**:
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `disabled`: boolean
- `onClick`: function

**Example Usage**:
```jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Save
</Button>
```

---

#### Input.jsx
**Purpose**: Reusable input field with label

**Props**:
- `label`: string
- `type`: 'text' | 'number' | etc.
- `value`: string
- `onChange`: function
- `placeholder`: string
- `required`: boolean
- `min`, `max`, `step`: for number inputs

**Example Usage**:
```jsx
<Input
  label="Weight (lbs)"
  type="number"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
  placeholder="135"
/>
```

---

#### Card.jsx
**Purpose**: Container component with consistent styling

**Props**:
- `children`: React nodes
- `className`: additional CSS classes
- `onClick`: optional click handler (makes it clickable)

**Example Usage**:
```jsx
<Card onClick={() => navigate('/somewhere')}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

---

#### PageHeader.jsx
**Purpose**: Consistent page header with back button and actions

**Props**:
- `title`: string
- `showBack`: boolean (shows back arrow)
- `action`: React node (right-side action button)

**Example Usage**:
```jsx
<PageHeader 
  title="Routines" 
  showBack 
  action={<Button onClick={handleAdd}>New</Button>}
/>
```

---

### Workout Components (`src/components/workout/`)

#### ExerciseRow.jsx
**Purpose**: Display and edit a single exercise with all its sets

**Props**:
- `exercise`: object with `{ id, name, sets }`
- `onUpdate`: function(updatedExercise)
- `onDelete`: function()
- `readOnly`: boolean (for history view)

**Features**:
- Expandable/collapsible
- Shows set count
- Add/remove sets
- Delete exercise

**Example Usage**:
```jsx
<ExerciseRow
  exercise={exercise}
  onUpdate={(updated) => updateExercise(updated)}
  onDelete={() => deleteExercise(exercise.id)}
/>
```

---

#### SetRow.jsx
**Purpose**: Display and edit a single set (weight + reps)

**Props**:
- `set`: object with `{ id, weight, reps }`
- `index`: number (set number)
- `onUpdate`: function(updatedSet)
- `onDelete`: function()
- `readOnly`: boolean

**Example Usage**:
```jsx
<SetRow
  set={set}
  index={0}
  onUpdate={(updated) => updateSet(updated)}
  onDelete={() => deleteSet(set.id)}
/>
```

---

#### WorkoutHistoryItem.jsx
**Purpose**: Display summary of a completed workout

**Props**:
- `workout`: object with full workout data
- `onClick`: function

**Displays**:
- Formatted date
- Exercise count
- Total sets
- Routine name (if applicable)

**Example Usage**:
```jsx
<WorkoutHistoryItem
  workout={workout}
  onClick={() => navigate(`/history/${workout.id}`)}
/>
```

---

### Routine Components (`src/components/routine/`)

#### RoutineListItem.jsx
**Purpose**: Display summary of a routine

**Props**:
- `routine`: object with `{ id, name, exercises }`
- `onClick`: function

**Displays**:
- Routine name
- Exercise count

**Example Usage**:
```jsx
<RoutineListItem
  routine={routine}
  onClick={() => navigate(`/routines/${routine.id}`)}
/>
```

---

## 📄 Page Components (`src/pages/`)

### HomePage.jsx
**Purpose**: Main landing page with navigation

**Features**:
- Three main navigation cards
- Links to Start Workout, Routines, History

**State**: None (navigation only)

---

### RoutinesPage.jsx
**Purpose**: List all saved routines

**Features**:
- Display all routines
- Create new routine button
- Navigate to edit routine

**State**: 
- `routines` from localStorage

---

### RoutineEditorPage.jsx
**Purpose**: Create or edit a routine

**Features**:
- Name routine
- Add/remove exercises
- Reorder exercises (up/down)
- Save or delete routine

**State**:
- `routineName`: string
- `exercises`: array
- `newExerciseName`: string

**localStorage**:
- Reads/writes `routines`

---

### StartWorkoutPage.jsx
**Purpose**: Choose how to start a workout

**Features**:
- Start blank workout
- Start from routine (lists all routines)

**State**:
- `routines` from localStorage

**Action**:
- Creates new workout in `activeWorkout`
- Navigates to ActiveWorkoutPage

---

### ActiveWorkoutPage.jsx
**Purpose**: Track current workout in progress

**Features**:
- Add/remove exercises
- Add/remove sets
- Finish workout (saves to history)
- Cancel workout

**State**:
- `activeWorkout` from localStorage
- `newExerciseName`: string

**localStorage**:
- Reads/writes `activeWorkout`
- Writes to `history` on finish

---

### WorkoutHistoryPage.jsx
**Purpose**: List all completed workouts

**Features**:
- Display workouts in reverse chronological order
- Navigate to workout details

**State**:
- `history` from localStorage

---

### WorkoutDetailPage.jsx
**Purpose**: Show details of a completed workout

**Features**:
- Display all exercises and sets (read-only)
- Show statistics (total volume, sets, reps)
- Delete workout

**State**:
- `history` from localStorage
- Finds specific workout by ID from URL

**Calculations**:
- Total sets
- Total reps
- Total volume (weight × reps)

---

## 🔧 Hooks (`src/hooks/`)

### useLocalStorage.js
**Purpose**: Persist state in localStorage automatically

**Signature**:
```javascript
function useLocalStorage(key, defaultValue)
```

**Returns**: `[value, setValue]` (like useState)

**How it works**:
1. Initializes from localStorage or uses default
2. Automatically saves to localStorage on every change
3. Handles JSON serialization/deserialization

**Example Usage**:
```jsx
const [routines, setRoutines] = useLocalStorage('routines', []);

// Update works like useState
setRoutines([...routines, newRoutine]);
```

---

## 🛠️ Utilities (`src/utils/`)

### id.js
**Purpose**: Generate unique IDs for new items

**Function**:
```javascript
function generateId()
```

**Returns**: string like `"1234567890-abc123def"`

**Example Usage**:
```jsx
import { generateId } from '../utils/id';

const newExercise = {
  id: generateId(),
  name: "Bench Press",
  sets: []
};
```

---

## 🎨 Styling Patterns

### Tailwind Utility Classes

**Common Patterns**:

**Spacing**:
- `space-y-3`: Vertical spacing between children
- `gap-2`: Gap in flex containers
- `p-4`: Padding
- `px-4 py-6`: Padding X and Y

**Layout**:
- `flex items-center justify-between`: Flex row with space-between
- `grid grid-cols-3 gap-4`: 3-column grid

**Colors**:
- `bg-white`: White background
- `text-gray-900`: Dark text
- `text-blue-600`: Blue accent
- `border-gray-200`: Light border

**Interactive**:
- `hover:bg-gray-100`: Hover effect
- `active:bg-gray-200`: Active/press effect
- `transition-colors`: Smooth color transitions

---

## 🔄 Data Flow Examples

### Creating a Routine
```
RoutinesPage (click New)
  → RoutineEditorPage (mode: create)
    → User adds exercises
    → Click Save
    → setRoutines([...routines, newRoutine])
    → localStorage updated automatically
  → Navigate back to RoutinesPage
```

### Starting and Finishing Workout
```
StartWorkoutPage (select routine)
  → setActiveWorkout(newWorkout)
  → localStorage updated
  → Navigate to ActiveWorkoutPage
    → User adds sets
    → Each change updates activeWorkout in localStorage
    → Click Finish
    → setHistory([activeWorkout, ...history])
    → setActiveWorkout(null)
  → Navigate to WorkoutHistoryPage
```

### Viewing History
```
WorkoutHistoryPage
  → Loads history from localStorage
  → Click workout
  → WorkoutDetailPage (with workoutId)
    → Finds workout in history array
    → Displays read-only view
    → Calculates statistics
```

---

## 📦 Component Dependencies

### Dependency Graph

```
App
├── Router
    ├── HomePage
    │   └── Card
    ├── RoutinesPage
    │   ├── PageHeader
    │   ├── Button
    │   └── RoutineListItem (uses Card)
    ├── RoutineEditorPage
    │   ├── PageHeader
    │   ├── Button
    │   ├── Input
    │   └── Card
    ├── StartWorkoutPage
    │   ├── PageHeader
    │   ├── Button
    │   ├── Card
    │   └── RoutineListItem
    ├── ActiveWorkoutPage
    │   ├── PageHeader
    │   ├── Button
    │   ├── Input
    │   ├── Card
    │   └── ExerciseRow
    │       └── SetRow (uses Input)
    ├── WorkoutHistoryPage
    │   ├── PageHeader
    │   └── WorkoutHistoryItem (uses Card)
    └── WorkoutDetailPage
        ├── PageHeader
        ├── Button
        ├── Card
        └── ExerciseRow (readOnly)
            └── SetRow (readOnly)
```

---

## 🎯 Best Practices

### When Creating New Components

1. **Keep them small**: Each component should do one thing well
2. **Use props for customization**: Avoid hard-coded values
3. **Follow naming conventions**: PascalCase for components
4. **Colocate by feature**: Put related components in the same folder
5. **Use Tailwind utilities**: Avoid custom CSS when possible

### When Using Components

1. **Import from correct path**: Use relative paths consistently
2. **Spread common props**: Use destructuring for cleaner code
3. **Handle edge cases**: Check for null/undefined before rendering
4. **Add keys to lists**: Always use unique keys in map()

### When Managing State

1. **Use useLocalStorage for persistence**: Not useState for stored data
2. **Keep state close to where it's used**: Avoid prop drilling
3. **Update state immutably**: Use spread operators or map()
4. **Clear activeWorkout on finish**: Prevent stale data

---

**Component Count**: 19 total
- UI Components: 4
- Workout Components: 3
- Routine Components: 1
- Page Components: 7
- Hooks: 1
- Utils: 1
- Main App: 1

**Last Updated**: January 2024
