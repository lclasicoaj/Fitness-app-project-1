# 🏋️ Fitness App - Complete Project Documentation

**Version:** 1.0.0  
**Framework:** React 19.2.0 with React Router 7.9.6  
**Backend:** Supabase (PostgreSQL with Auth)  
**Styling:** Tailwind CSS 3.4.18  
**State Management:** React Context API + Custom Hooks  
**Build Tool:** Create React App  
**Date Created:** November 27, 2025

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [Authentication Flow](#authentication-flow)
7. [Data Flow & Relationships](#data-flow--relationships)
8. [Component Documentation](#component-documentation)
9. [Page Documentation](#page-documentation)
10. [Hooks & Utilities](#hooks--utilities)
11. [API Integration](#api-integration)
12. [Key Features](#key-features)
13. [Data Persistence](#data-persistence)
14. [Security Implementation](#security-implementation)
15. [Deployment Guide](#deployment-guide)

---

## 1. Project Overview

### Purpose
A comprehensive fitness tracking application allowing users to:
- Create and manage workout routines (exercises with sets, reps, rest periods)
- Log workouts in real-time with weight and reps per set
- Track workout history with detailed statistics
- Use pre-built routines (Ajay's PPL plan included)
- Edit and customize routines
- View progress and analytics

### Key Features
✅ User authentication (email/password via Supabase Auth)  
✅ Shared routines database (all authenticated users can access)  
✅ User-specific workout history (isolated per user)  
✅ Real-time routine and workout management  
✅ Dark-themed, responsive UI  
✅ Progressive Web App ready  
✅ Session persistence (auto-login on refresh)  

### Technology Decisions
- **React 19** - Latest concurrent features for smooth updates
- **Supabase** - Managed PostgreSQL with built-in Auth
- **Tailwind CSS** - Rapid UI development with consistency
- **Context API** - Simple state management without Redux complexity
- **Local Storage** - Session-level active workout state (temporary)
- **Row Level Security** - Data isolation at database layer

---

## 2. Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React App (Frontend)                  │
│  - Pages (7 page components)                            │
│  - UI Components (Button, Input, Card, PageHeader)      │
│  - Workout Components (ExerciseRow, SetRow, etc)        │
└────────────────┬────────────────────────────────────────┘
                 │
                 ├──► AuthContext (Global Auth State)
                 │
                 ├──► Custom Hooks:
                 │    - useAuth() - Authentication
                 │    - useRoutines() - Routine operations
                 │    - useWorkouts() - Workout operations
                 │    - useLocalStorage() - Session state
                 │
                 └──► Supabase Client SDK
                      │
                      ├─► PostgreSQL Database
                      │   ├─ routines (shared)
                      │   ├─ workouts (user-specific)
                      │   └─ auth.users (Supabase managed)
                      │
                      └─► Auth Service
                          ├─ Session management
                          ├─ JWT tokens
                          └─ Row Level Security (RLS)
```

### State Management Strategy

**Global State (AuthContext):**
- Current user (email, id, session)
- Authentication status (loading, error)
- Sign-up, sign-in, sign-out functions

**Page-Level State (Custom Hooks):**
- Routines (fetch, add, update, delete)
- Workouts (fetch, add, delete)
- Real-time loading/error states

**Session State (Local Storage):**
- Active workout in progress (temporary, cleared after save)
- Not persisted to database until completed

**Component-Level State (useState):**
- Form inputs
- UI toggles (expanded/collapsed)
- Error messages

---

## 3. Database Schema

### Table: `routines`

**Purpose:** Store all available workout routines (shared across users)

```sql
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  exercises JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policy
CREATE POLICY "Enable read access for all authenticated users"
ON routines FOR SELECT
USING (auth.role() = 'authenticated_user');

-- Index for performance
CREATE INDEX idx_routines_name ON routines(name);
```

**Fields:**
- `id` - UUID primary key (auto-generated)
- `name` - String, routine name (e.g., "Push Day 1 (Monday)")
- `exercises` - JSONB array of exercise objects
- `created_at` - ISO 8601 timestamp (auto-set)
- `updated_at` - ISO 8601 timestamp (auto-updated)

**Exercises JSONB Structure:**
```json
[
  {
    "id": "p1-1",
    "name": "Barbell Bench Press",
    "sets": 4,
    "reps": "8-10",
    "rest": "90 sec",
    "day": "Monday & Friday"
  },
  {
    "id": "p1-2",
    "name": "Incline Dumbbell Press",
    "sets": 3,
    "reps": "10-12",
    "rest": "60 sec",
    "day": "Monday"
  }
]
```

---

### Table: `workouts`

**Purpose:** Store completed workouts (user-specific, RLS protected)

```sql
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id UUID REFERENCES routines(id),
  routine_name TEXT,
  exercises JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security: Users can only access their own workouts
CREATE POLICY "Enable read/write for authenticated users own workouts"
ON workouts
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workouts_created_at ON workouts(created_at DESC);
```

**Fields:**
- `id` - UUID primary key (auto-generated)
- `user_id` - UUID foreign key to auth.users (ensures data isolation)
- `routine_id` - UUID foreign key to routines (optional, for reference)
- `routine_name` - String, name of routine used (denormalized for quick display)
- `exercises` - JSONB array of completed exercise sets
- `created_at` - ISO 8601 timestamp (when workout was saved)
- `updated_at` - ISO 8601 timestamp (auto-updated)

**Exercises JSONB Structure (Completed Workout):**
```json
[
  {
    "id": "ex-uuid",
    "name": "Barbell Bench Press",
    "plannedSets": 4,
    "plannedReps": "8-10",
    "rest": "90 sec",
    "day": "Monday & Friday",
    "sets": [
      {
        "id": "set-1",
        "weight": 185,
        "reps": 8
      },
      {
        "id": "set-2",
        "weight": 185,
        "reps": 8
      },
      {
        "id": "set-3",
        "weight": 185,
        "reps": 8
      },
      {
        "id": "set-4",
        "weight": 185,
        "reps": 8
      }
    ]
  }
]
```

---

### SQL Queries Used

#### Query 1: Insert Routines (Seeding)
```sql
INSERT INTO routines (name, exercises) VALUES (
  'Push Day 1 (Monday)',
  '[
    {"id": "p1-1", "name": "Barbell Bench Press", "sets": 4, "reps": "8-10", "rest": "90 sec"},
    {"id": "p1-2", "name": "Incline Dumbbell Press", "sets": 3, "reps": "10-12", "rest": "60 sec"}
  ]'
);
```
**Purpose:** Seed database with pre-built workout routines  
**Used By:** Manual SQL execution in Supabase editor  
**Related Components:** StartWorkoutPage, RoutinesPage

#### Query 2: Fetch All Routines (Read)
```sql
SELECT * FROM routines ORDER BY created_at DESC;
```
**Purpose:** Retrieve all available routines for users  
**Used By:** `useRoutines()` hook  
**Related Components:** RoutinesPage, StartWorkoutPage  
**Security:** RLS ensures all authenticated users can access

#### Query 3: Fetch User's Workouts (Read)
```sql
SELECT * FROM workouts WHERE user_id = auth.uid() ORDER BY created_at DESC;
```
**Purpose:** Get only current user's completed workouts  
**Used By:** `useWorkouts()` hook  
**Related Components:** WorkoutHistoryPage, WorkoutDetailPage  
**Security:** RLS automatically filters by auth.uid()

#### Query 4: Insert Workout (Create)
```sql
INSERT INTO workouts (user_id, routine_id, routine_name, exercises)
VALUES (
  auth.uid(),
  'routine-uuid',
  'Push Day 1 (Monday)',
  '[{"id": "ex-1", "name": "Barbell Bench Press", "sets": [...]}]'
)
RETURNING *;
```
**Purpose:** Save completed workout  
**Used By:** ActiveWorkoutPage finishWorkout()  
**Related Components:** ActiveWorkoutPage  
**Security:** RLS enforces user_id = auth.uid()

#### Query 5: Update Routine (Update)
```sql
UPDATE routines
SET name = 'New Name', exercises = '[...]'::jsonb, updated_at = NOW()
WHERE id = 'routine-uuid'
RETURNING *;
```
**Purpose:** Modify routine (name, exercises)  
**Used By:** RoutineEditorPage saveRoutine()  
**Related Components:** RoutineEditorPage  
**Security:** Any authenticated user can modify (consider restricting in production)

#### Query 6: Delete Routine (Delete)
```sql
DELETE FROM routines WHERE id = 'routine-uuid' RETURNING *;
```
**Purpose:** Remove a routine  
**Used By:** RoutineEditorPage deleteRoutine()  
**Related Components:** RoutineEditorPage  
**Security:** Any authenticated user can delete

#### Query 7: Delete Workout (Delete)
```sql
DELETE FROM workouts WHERE id = 'workout-uuid' AND user_id = auth.uid() RETURNING *;
```
**Purpose:** Remove a workout record  
**Used By:** WorkoutDetailPage deleteWorkout()  
**Related Components:** WorkoutDetailPage  
**Security:** RLS ensures only own workouts can be deleted

---

## 4. Project Structure

```
my-fitness-app/
├── public/
│   ├── index.html          # HTML entry point
│   ├── manifest.json       # PWA manifest
│   └── robots.txt         # SEO directives
│
├── src/
│   ├── config/
│   │   └── supabase.js              # ✅ Supabase client initialization
│   │       - SUPABASE_URL: String
│   │       - SUPABASE_ANON_KEY: String
│   │       - createClient() setup
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx          # ✅ Global auth state management
│   │       - useAuth() hook
│   │       - signUp(email, password)
│   │       - signIn(email, password)
│   │       - signOut()
│   │       - User session management
│   │       - Auto-login on refresh
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx           # Reusable button component
│   │   │   ├── Input.jsx            # Form input component
│   │   │   ├── Card.jsx             # Container card component
│   │   │   └── PageHeader.jsx       # Top navigation bar
│   │   │
│   │   ├── routine/
│   │   │   └── RoutineListItem.jsx  # Single routine display
│   │   │
│   │   ├── workout/
│   │   │   ├── ExerciseRow.jsx      # Single exercise display
│   │   │   ├── SetRow.jsx           # Single set (weight + reps)
│   │   │   └── WorkoutHistoryItem.jsx # Workout history entry
│   │   │
│   │   └── ProtectedRoute.jsx       # ✅ Route protection wrapper
│   │       - Requires auth
│   │       - Redirects to /login
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js       # Session state management
│   │   │   - Get/set from localStorage
│   │   │   - Auto-parse JSON
│   │   │
│   │   └── useSupabase.js           # ✅ Supabase operations
│   │       - useRoutines()
│   │       - useWorkouts()
│   │       - CRUD operations
│   │       - Error handling
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx            # ✅ Auth page (signup/signin)
│   │   ├── HomePage.jsx             # Dashboard with logout
│   │   ├── RoutinesPage.jsx         # View all routines
│   │   ├── RoutineEditorPage.jsx    # Create/edit routines
│   │   ├── StartWorkoutPage.jsx     # ✅ Select routine to start
│   │   ├── ActiveWorkoutPage.jsx    # Log sets during workout
│   │   ├── WorkoutHistoryPage.jsx   # View past workouts
│   │   └── WorkoutDetailPage.jsx    # View single workout details
│   │
│   ├── utils/
│   │   └── id.js                    # UUID generation helper
│   │
│   ├── App.js                       # ✅ Main app with routing
│   │   - AuthProvider wrapper
│   │   - Protected routes
│   │   - Router setup
│   │
│   ├── App.css                      # App-level styles
│   ├── index.js                     # React entry point
│   ├── index.css                    # Global styles
│   └── setupTests.js                # Jest configuration
│
├── package.json                     # Dependencies & scripts
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── SEED_DEFAULT_ROUTINE.sql         # ✅ SQL: Insert Ajay's PPL routine
├── SEED_INDIVIDUAL_ROUTINES.sql     # ✅ SQL: Insert individual day routines
└── COMPLETE_PROJECT_DOCUMENTATION.md # This file
```

**✅ = Critical files for this project**

---

## 5. Setup Instructions

### Prerequisites
- Node.js 16+ (LTS recommended)
- npm 8+
- Supabase account (free tier: https://supabase.com)
- Git

### Step 1: Create React App
```bash
npx create-react-app my-fitness-app
cd my-fitness-app
```

### Step 2: Install Dependencies
```bash
npm install @supabase/supabase-js react-router-dom @heroicons/react tailwindcss postcss autoprefixer
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Configure Tailwind CSS
Edit `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Edit `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Create Supabase Project
1. Sign up at https://supabase.com
2. Create new project (choose region)
3. Go to Project Settings → API keys
4. Copy `Project URL` and `anon public key`

### Step 5: Create Database Tables
Go to SQL Editor in Supabase and run:

**Create routines table:**
```sql
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  exercises JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE POLICY "Enable read access for all authenticated users"
ON routines FOR SELECT
USING (auth.role() = 'authenticated_user');

CREATE INDEX idx_routines_name ON routines(name);
```

**Create workouts table:**
```sql
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id UUID REFERENCES routines(id),
  routine_name TEXT,
  exercises JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE POLICY "Enable read/write for authenticated users own workouts"
ON workouts
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workouts_created_at ON workouts(created_at DESC);
```

### Step 6: Create Configuration File
Create `src/config/supabase.js`:
```javascript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'YOUR_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### Step 7: Add All Source Files
[See Section 6+ for all component code]

### Step 8: Seed Default Routines (Optional)
Go to Supabase SQL Editor and run `SEED_INDIVIDUAL_ROUTINES.sql` to add Ajay's PPL routines.

### Step 9: Start Development Server
```bash
npm start
```

Server runs at http://localhost:3000

---

## 6. Authentication Flow

### Flow Diagram

```
User Landing
    ↓
Is authenticated? (Check AuthContext)
    ├─ NO → Redirect to /login
    │        ├─ Email/Password inputs
    │        ├─ Sign Up button → signUp(email, password)
    │        │  ├─ Supabase Auth creates user
    │        │  ├─ User verified email (optional)
    │        │  └─ Redirect to /
    │        │
    │        └─ Sign In button → signIn(email, password)
    │           ├─ Supabase Auth authenticates
    │           ├─ JWT token stored in session
    │           └─ Redirect to /
    │
    └─ YES → Access app pages
             ├─ AuthContext provides user info
             ├─ useAuth() hook available
             └─ Sign Out option in HomePage
```

### AuthContext Implementation

```javascript
// src/contexts/AuthContext.jsx
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login on app start
  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user);
    setLoading(false);
  }, []);

  const signUp = async (email, password) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) throw error;
    setUser(data.user);
  };

  const signIn = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    setUser(data.user);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

### ProtectedRoute Component

```javascript
// src/components/ProtectedRoute.jsx
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### Session Persistence
- JWT tokens stored in Supabase's session storage (browser managed)
- Auto-checked on app refresh via `getSession()`
- Sessions expire after 1 hour (configurable in Supabase)
- Refresh tokens handled automatically by Supabase

---

## 7. Data Flow & Relationships

### User Creating & Using a Routine

```
┌──────────────────────────────────────────────────────────┐
│ 1. USER CREATES ROUTINE                                  │
└──────────────────────────────────────────────────────────┘
RoutineEditorPage
  ├─ State: routineName, exercises[]
  ├─ User enters name: "Push Day 1 (Monday)"
  ├─ User adds exercises:
  │  ├─ Exercise 1: "Barbell Bench Press" (4 sets, 8-10 reps)
  │  ├─ Exercise 2: "Incline Dumbbell Press" (3 sets, 10-12 reps)
  │  └─ ...
  └─ User clicks "Save Routine"
       ├─ Call: updateRoutine() hook
       └─ Supabase:
            ├─ INSERT INTO routines (name, exercises)
            └─ Returns: routine object with UUID id

┌──────────────────────────────────────────────────────────┐
│ 2. ROUTINE STORED IN DATABASE                            │
└──────────────────────────────────────────────────────────┘
routines table:
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Push Day 1 (Monday)",
  exercises: [
    {id: "p1-1", name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: "90 sec"},
    {id: "p1-2", name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60 sec"}
  ],
  created_at: "2025-11-27T10:30:00Z"
}

┌──────────────────────────────────────────────────────────┐
│ 3. USER STARTS WORKOUT FROM ROUTINE                      │
└──────────────────────────────────────────────────────────┘
StartWorkoutPage
  ├─ Fetch routines via useRoutines()
  ├─ Display list of all routines
  ├─ User clicks "Push Day 1 (Monday)"
  ├─ Call: startFromRoutine(routine)
  └─ Create active workout in localStorage:
       {
         id: "new-uuid",
         routineId: "550e8400...",
         routineName: "Push Day 1 (Monday)",
         exercises: [
           {
             id: "ex-uuid",
             name: "Barbell Bench Press",
             plannedSets: 4,
             plannedReps: "8-10",
             rest: "90 sec",
             sets: []  // Empty until user logs
           }
         ]
       }
       └─ Navigate to /active-workout

┌──────────────────────────────────────────────────────────┐
│ 4. USER LOGS SETS DURING WORKOUT                         │
└──────────────────────────────────────────────────────────┘
ActiveWorkoutPage
  ├─ Get active workout from localStorage
  ├─ For each exercise, display:
  │  ├─ Exercise name
  │  ├─ Target: "4 sets × 8-10 reps • Rest: 90 sec"
  │  └─ Button: "Add Set"
  │
  ├─ User clicks "Add Set"
  ├─ ExerciseRow shows new set form:
  │  ├─ Input: Weight (e.g., 185)
  │  ├─ Input: Reps (e.g., 8)
  │  └─ Button: Save Set
  │
  ├─ User enters weight: 185, reps: 8
  ├─ Click: Save Set
  └─ Update active workout in localStorage:
       exercises[0].sets = [
         {id: "set-1", weight: 185, reps: 8}
       ]

┌──────────────────────────────────────────────────────────┐
│ 5. USER FINISHES WORKOUT                                 │
└──────────────────────────────────────────────────────────┘
ActiveWorkoutPage
  ├─ User completes all sets for all exercises
  ├─ Click: "Finish Workout"
  ├─ Validation:
  │  ├─ At least 1 exercise added
  │  └─ At least 1 set logged
  │
  └─ Call: addWorkout() hook
       ├─ Transform active workout to database format
       └─ Supabase:
            ├─ INSERT INTO workouts (user_id, routine_id, routine_name, exercises)
            ├─ user_id = auth.uid() (auto-set by RLS)
            └─ Returns: workout object with UUID id

┌──────────────────────────────────────────────────────────┐
│ 6. WORKOUT SAVED IN DATABASE                             │
└──────────────────────────────────────────────────────────┘
workouts table (user-specific, RLS protected):
{
  id: "660f8400-e29b-41d4-a716-446655440000",
  user_id: "auth.uid()",  // Automatically set
  routine_id: "550e8400-e29b-41d4-a716-446655440000",
  routine_name: "Push Day 1 (Monday)",
  exercises: [
    {
      id: "ex-uuid",
      name: "Barbell Bench Press",
      plannedSets: 4,
      plannedReps: "8-10",
      rest: "90 sec",
      sets: [
        {id: "set-1", weight: 185, reps: 8},
        {id: "set-2", weight: 185, reps: 8},
        {id: "set-3", weight: 190, reps: 7},
        {id: "set-4", weight: 190, reps: 6}
      ]
    }
  ],
  created_at: "2025-11-27T11:30:00Z"
}

┌──────────────────────────────────────────────────────────┐
│ 7. USER VIEWS WORKOUT HISTORY                            │
└──────────────────────────────────────────────────────────┘
WorkoutHistoryPage
  ├─ Call: useWorkouts() hook
  ├─ Supabase:
  │  ├─ SELECT * FROM workouts WHERE user_id = auth.uid()
  │  ├─ RLS enforces user isolation
  │  └─ Returns: List of user's workouts
  │
  ├─ Display each workout:
  │  ├─ Date: "Wednesday, Nov 27, 2025"
  │  ├─ 5 exercises · 15 sets
  │  └─ From: Push Day 1 (Monday)
  │
  └─ User clicks workout
       └─ Navigate to /history/{workoutId}

┌──────────────────────────────────────────────────────────┐
│ 8. USER VIEWS WORKOUT DETAILS                            │
└──────────────────────────────────────────────────────────┘
WorkoutDetailPage
  ├─ Get workoutId from URL params
  ├─ Find workout in workouts list
  ├─ Display:
  │  ├─ Date & Time
  │  ├─ Stats: 5 exercises, 15 sets, 2,850 total weight
  │  └─ For each exercise:
  │     ├─ Exercise name
  │     ├─ All logged sets (weight, reps)
  │     └─ Delete button
  │
  └─ User can delete workout
       ├─ Click: "Delete"
       ├─ Confirm dialog
       └─ Supabase:
            ├─ DELETE FROM workouts WHERE id = workoutId AND user_id = auth.uid()
            ├─ RLS enforces ownership check
            └─ Return to history
```

---

## 8. Component Documentation

### UI Components

#### Button.jsx
```javascript
<Button 
  onClick={handler}
  variant="primary|secondary|ghost|danger"
  size="sm|md|lg"
  fullWidth={boolean}
  disabled={boolean}
>
  Content
</Button>
```

#### Input.jsx
```javascript
<Input
  label="Label"
  type="text|number|email|password"
  value={value}
  onChange={handler}
  placeholder="Placeholder"
  required={boolean}
/>
```

#### Card.jsx
```javascript
<Card onClick={handler}>
  Content inside container
</Card>
```

#### PageHeader.jsx
```javascript
<PageHeader 
  title="Page Title"
  showBack={true}
  action={<ReactNode />}
/>
```

---

### Workout Components

#### ExerciseRow.jsx
Displays single exercise with sets and planned targets.

**Props:**
- `exercise` (object) - Exercise data with sets array
- `onUpdate` (function) - Called when exercise changes
- `onDelete` (function) - Called to remove exercise
- `readOnly` (boolean) - Disable editing

**Features:**
- Collapsible (expand/collapse)
- Shows planned sets × reps × rest time
- Display count of actual sets logged
- Add/remove sets buttons
- Delete exercise button

#### SetRow.jsx
Displays single set with weight and reps inputs.

**Props:**
- `set` (object) - {id, weight, reps}
- `index` (number) - Set number (1-indexed for display)
- `onUpdate` (function) - Called when set changes
- `onDelete` (function) - Called to remove set
- `readOnly` (boolean) - Disable editing

#### WorkoutHistoryItem.jsx
Displays single workout entry in history list.

**Props:**
- `workout` (object) - Workout data from database
- `onClick` (function) - Called when clicked

**Display:**
- Date formatted (e.g., "Wed, Nov 27, 2025")
- Exercise count and total sets
- Routine name (if from routine)

#### RoutineListItem.jsx
Displays single routine in routine selection list.

**Props:**
- `routine` (object) - Routine data
- `onClick` (function) - Called when clicked

**Display:**
- Routine name
- Exercise count

---

## 9. Page Documentation

### LoginPage.jsx
**Route:** `/login`  
**Protected:** No (accessible to all)  
**Purpose:** User authentication

**Features:**
- Toggle between Sign Up and Sign In modes
- Email and password inputs
- Form validation
- Error display
- Auto-redirect to home if already authenticated

**Flow:**
1. User enters email and password
2. Click Sign Up or Sign In
3. AuthContext handles Supabase auth
4. On success, redirect to home page
5. JWT session token stored automatically

---

### HomePage.jsx
**Route:** `/`  
**Protected:** Yes  
**Purpose:** Main dashboard

**Features:**
- Display user email
- Navigation buttons to:
  - View Routines
  - Start Workout
  - Workout History
  - Edit Profile (future)
- Logout button with icon
- Last workout summary (if exists)

---

### RoutinesPage.jsx
**Route:** `/routines`  
**Protected:** Yes  
**Purpose:** View all available routines

**Features:**
- Fetch all routines from database
- Display routine list with exercise count
- Click routine to view details
- Create new routine button
- Edit routine button
- Delete routine button

**Data Flow:**
1. Load: useRoutines() hook fetches all routines
2. Display: RoutineListItem for each
3. Click: Navigate to /routine/{routineId} for details

---

### RoutineEditorPage.jsx
**Route:** `/routine/new` or `/routine/:routineId`  
**Protected:** Yes  
**Purpose:** Create or edit workout routines

**Features:**
- Input routine name
- Add/remove exercises
- Reorder exercises (up/down buttons)
- Expand each exercise to edit:
  - Sets (number)
  - Reps (range, e.g., "8-10")
  - Rest period (e.g., "90 sec")
  - Day assignment (e.g., "Monday & Friday")
- Save to database
- Delete routine (with confirmation)

**Data Structure:**
```javascript
exercise = {
  id: "unique-id",
  name: "Exercise Name",
  sets: 4,
  reps: "8-10",
  rest: "90 sec",
  day: "Monday & Friday"
}
```

---

### StartWorkoutPage.jsx
**Route:** `/start-workout`  
**Protected:** Yes  
**Purpose:** Select routine or start blank workout

**Features:**
- Quick Start: Blank workout button
- Start from Routine: List of all available routines
- Display exercise count for each routine
- Click to load routine and begin workout

**Key Logic:**
```javascript
startFromRoutine = (routine) => {
  // Transform routine exercises to active workout format
  workout = {
    routineId: routine.id,
    routineName: routine.name,
    exercises: routine.exercises.map(ex => ({
      name: ex.name,
      plannedSets: ex.sets,        // Target number
      plannedReps: ex.reps,        // Target range
      rest: ex.rest,
      day: ex.day,
      sets: []                      // Empty, user fills during workout
    }))
  }
  // Save to localStorage (session)
  navigate('/active-workout')
}
```

---

### ActiveWorkoutPage.jsx
**Route:** `/active-workout`  
**Protected:** Yes  
**Purpose:** Log sets during active workout

**Features:**
- Display routine name (if from routine)
- List exercises with targets
- Add/edit/remove sets for each exercise
- Add new exercises mid-workout
- Finish workout button (saves to database)
- Cancel workout button

**Data Persistence:**
- Session state in localStorage (temporary)
- Only saved to database when "Finish Workout" clicked
- Clears localStorage after save

**Validation:**
- At least 1 exercise
- At least 1 set logged
- All sets must have weight and reps

---

### WorkoutHistoryPage.jsx
**Route:** `/history`  
**Protected:** Yes  
**Purpose:** View all past workouts

**Features:**
- Fetch user's workouts from database
- Display workout list sorted by date (newest first)
- Show date, exercise count, set count, routine name
- Click to view workout details
- Responsive loading state

**Data Source:**
- useWorkouts() hook fetches from workouts table
- Filtered by user_id via RLS

---

### WorkoutDetailPage.jsx
**Route:** `/history/:workoutId`  
**Protected:** Yes  
**Purpose:** View complete workout details

**Features:**
- Display workout date and time
- Show routine name (if applicable)
- Statistics:
  - Total exercises
  - Total sets
  - Total reps
  - Total weight moved
- Display each exercise with all logged sets
- Delete workout button
- Print/export (future)

**Calculations:**
```javascript
totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0)
totalReps = exercises.reduce((sum, ex) => 
  sum + ex.sets.reduce((s, set) => s + parseInt(set.reps), 0)
, 0)
totalWeight = exercises.reduce((sum, ex) => 
  sum + ex.sets.reduce((s, set) => s + (parseInt(set.weight) * parseInt(set.reps)), 0)
, 0)
```

---

## 10. Hooks & Utilities

### useAuth()
**Location:** AuthContext.jsx  
**Purpose:** Access global authentication state

**Returns:**
```javascript
{
  user: { id, email, ...},
  loading: boolean,
  signUp: (email, password) => Promise,
  signIn: (email, password) => Promise,
  signOut: () => Promise
}
```

**Usage:**
```javascript
const { user, loading, signOut } = useAuth();
```

---

### useRoutines()
**Location:** hooks/useSupabase.js  
**Purpose:** Fetch and manage routines

**Returns:**
```javascript
{
  routines: [routine, ...],
  loading: boolean,
  error: string | null,
  addRoutine: (routine) => Promise,
  updateRoutine: (id, routine) => Promise,
  deleteRoutine: (id) => Promise
}
```

**Implementation:**
```javascript
export function useRoutines() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const { data, error } = await supabase
          .from('routines')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setRoutines(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  const addRoutine = async (routine) => {
    const { data, error } = await supabase
      .from('routines')
      .insert([routine])
      .select();
    
    if (error) throw error;
    setRoutines([data[0], ...routines]);
    return data[0];
  };

  // ... updateRoutine, deleteRoutine

  return { routines, loading, error, addRoutine, updateRoutine, deleteRoutine };
}
```

---

### useWorkouts()
**Location:** hooks/useSupabase.js  
**Purpose:** Fetch and manage user workouts

**Returns:**
```javascript
{
  workouts: [workout, ...],
  loading: boolean,
  error: string | null,
  addWorkout: (workout) => Promise,
  deleteWorkout: (id) => Promise
}
```

**Key Features:**
- Auto-filters by user (user_id = auth.uid())
- RLS enforces user isolation at database level
- Returns only current user's workouts

---

### useLocalStorage()
**Location:** hooks/useLocalStorage.js  
**Purpose:** Session state management

**Returns:** [value, setValue]

**Usage:**
```javascript
const [activeWorkout, setActiveWorkout] = useLocalStorage('activeWorkout', null);
// Auto-serializes/deserializes JSON
```

---

### generateId()
**Location:** utils/id.js  
**Purpose:** Generate UUIDs for new entities

```javascript
export function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

---

## 11. API Integration

### Supabase Client Initialization

```javascript
// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

**Environment Variables:**
```bash
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJxxxxxx
```

### API Endpoints Used

**Authentication:**
- `supabase.auth.signUp()` - Register new user
- `supabase.auth.signInWithPassword()` - Login
- `supabase.auth.signOut()` - Logout
- `supabase.auth.getSession()` - Get current session
- `supabase.auth.onAuthStateChange()` - Listen to auth changes

**Routines:**
- `SELECT * FROM routines` - Fetch all routines
- `INSERT INTO routines (name, exercises) VALUES (...)` - Create routine
- `UPDATE routines SET ... WHERE id = ...` - Update routine
- `DELETE FROM routines WHERE id = ...` - Delete routine

**Workouts:**
- `SELECT * FROM workouts WHERE user_id = auth.uid()` - Fetch user's workouts
- `INSERT INTO workouts (...)` - Save completed workout
- `DELETE FROM workouts WHERE id = ... AND user_id = auth.uid()` - Delete workout

---

## 12. Key Features

### ✅ Implemented Features

1. **User Authentication**
   - Email/password signup and signin
   - Session persistence (auto-login)
   - Sign out with cleanup
   - Protected routes with redirect

2. **Routine Management**
   - Create custom routines
   - Edit routine name and exercises
   - Add/remove/reorder exercises
   - Set exercise details (sets, reps, rest, day)
   - Delete routines
   - Pre-seeded routines (Ajay's PPL)

3. **Workout Logging**
   - Start workout from routine
   - Start blank workout
   - Log sets with weight and reps
   - Add/remove sets mid-workout
   - Add new exercises mid-workout
   - Save workout to database
   - Cancel in-progress workout

4. **Workout History**
   - View all completed workouts
   - Sorted by date (newest first)
   - Display workout metadata (date, exercise count, sets)
   - View detailed workout with all sets
   - Calculate statistics (total weight, total reps)
   - Delete workouts

5. **UI/UX**
   - Dark theme responsive design
   - Tailwind CSS styling
   - Form validation
   - Loading states
   - Error handling and display
   - Collapsible exercise details
   - Smooth navigation

6. **Data Security**
   - Row Level Security (RLS) for data isolation
   - User authentication required
   - Workouts isolated per user
   - Session-based JWT tokens
   - No direct database access from frontend

---

### 🔄 Future Features (Not Implemented)

- [ ] Workout progress charts/graphs
- [ ] Exercise library with images/videos
- [ ] Rest timer during workout
- [ ] Workout notes/comments
- [ ] Share routines with friends
- [ ] User profile customization
- [ ] Email verification
- [ ] Password reset
- [ ] Social features (follow, compare)
- [ ] Mobile app (React Native)
- [ ] Offline mode (PWA)
- [ ] Export workout data (CSV, PDF)
- [ ] Integration with fitness trackers
- [ ] Real-time multiplayer workouts

---

## 13. Data Persistence

### Local Storage (Session)
- **Key:** `activeWorkout`
- **Format:** JSON string
- **Lifetime:** Until browser session ends or user completes/cancels
- **Purpose:** Temporary state during active workout
- **Auto-cleared:** When user finishes or cancels workout

**Data:**
```json
{
  "id": "uuid",
  "date": "2025-11-27T...",
  "routineId": "uuid",
  "routineName": "Push Day 1",
  "exercises": [...]
}
```

### Supabase Database (Persistent)
- **Tables:** routines, workouts
- **Backup:** Supabase auto-backups
- **Retention:** Indefinite (unless user deletes)
- **Access:** Only via authenticated API

**Routines Table:**
- Shared across all authenticated users
- Read-only (consider restricting write access)
- Stored as JSON in JSONB column

**Workouts Table:**
- User-specific (RLS enforced)
- Auto-timestamped
- Linked to user via user_id
- Linked to routine via routine_id (optional)

---

## 14. Security Implementation

### Authentication
- **Method:** Email/password via Supabase Auth
- **Storage:** JWT tokens in browser session
- **Expiration:** 1 hour (configurable)
- **Refresh:** Automatic via Supabase

### Authorization
- **Method:** Row Level Security (RLS) policies
- **Workouts:** `auth.uid() = user_id` (users only access own)
- **Routines:** All authenticated users can read (consider restricting)
- **Database:** Policies enforced at row level (not application level)

### Data Protection
- **HTTPS:** All Supabase connections encrypted
- **API Key:** Separate public key (anon) and service role key
- **Credentials:** Store in environment variables (never hardcode)
- **SQL Injection:** Parameterized queries via Supabase SDK

### Best Practices
1. Never expose secret keys in frontend code
2. Use environment variables for Supabase credentials
3. Validate user input on frontend and backend
4. Use RLS policies for data isolation
5. Regularly audit access logs
6. Enable 2FA in production
7. Use HTTPS only
8. Implement rate limiting (Supabase enterprise)

---

## 15. Deployment Guide

### Option 1: Deploy to Vercel (Recommended)

1. **Connect Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/my-fitness-app.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import GitHub repository
   - Add environment variables:
     - REACT_APP_SUPABASE_URL
     - REACT_APP_SUPABASE_ANON_KEY
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - Go to project settings
   - Add domain
   - Update DNS records

### Option 2: Deploy to Netlify

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to https://app.netlify.com
   - Drag & drop `build/` folder
   - Or connect GitHub for auto-deploy

3. **Add environment variables**
   - Site settings → Build & Deploy → Environment
   - Add REACT_APP_* variables

### Option 3: Deploy to AWS

1. **Build**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync build/ s3://my-fitness-app-bucket
   ```

3. **Set up CloudFront** for CDN

### Environment Variables for Production

Create `.env.production` (never commit to git):
```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Production Configuration

1. **Enable Email Verification**
   - Auth settings → Providers → Email
   - Enable "Confirm email before signing in"

2. **Set Up Email Templates**
   - Auth settings → Email Templates
   - Customize confirmation, reset, etc.

3. **Configure CORS**
   - Settings → API → CORS allowed origins
   - Add deployment URL

4. **Enable RLS**
   - All tables should have RLS enabled
   - Verify policies are in place

5. **Set Up Backups**
   - Settings → Backups
   - Enable daily backups
   - Test restore process

### Performance Optimization

1. **Build optimization**
   ```bash
   npm run build
   # Check bundle size
   npm run analyze  # if package installed
   ```

2. **Code splitting**
   - Already handled by React Router

3. **Image optimization**
   - Use next-image or similar

4. **Caching**
   - Set cache headers in deployment
   - Service Workers for offline

---

## 16. Troubleshooting

### Common Issues & Solutions

**Issue:** "Cannot find module '@supabase/supabase-js'"
**Solution:**
```bash
npm install @supabase/supabase-js
npm install react-router-dom @heroicons/react
npm install -D tailwindcss postcss autoprefixer
```

**Issue:** "Supabase_URL is undefined"
**Solution:** Check `.env.local` file has:
```bash
REACT_APP_SUPABASE_URL=your-url
REACT_APP_SUPABASE_ANON_KEY=your-key
```

**Issue:** "RLS policy denies access"
**Solution:** 
- Verify user is authenticated
- Check RLS policy matches user condition
- Ensure auth.uid() is set correctly

**Issue:** "Workouts not showing for other users"
**Solution:**
- This is intentional (RLS isolates per user)
- workouts table has `user_id` filter
- Each user only sees own workouts

**Issue:** "Date showing as 'Invalid Date'"
**Solution:**
- Check `created_at` field is ISO 8601 format
- Use `new Date(dateString)` with fallback
- Validate date before formatting

---

## 17. Summary for AI Assistants

This fitness app is a complete, production-ready React application with the following key characteristics:

### Architecture
- **Frontend:** React 19 with React Router 7 for navigation
- **Backend:** Supabase (managed PostgreSQL + Auth)
- **State:** AuthContext + Custom Hooks + LocalStorage
- **Styling:** Tailwind CSS with dark theme

### Database
- **2 tables:** routines (shared), workouts (user-specific)
- **JSONB storage:** Exercise details stored as JSON in database
- **RLS policies:** Automatic user isolation for workouts table
- **Relationships:** workouts.routine_id → routines.id (optional)

### Key Flows
1. User authenticates → AuthContext updates
2. User creates routine → Saved to routines table
3. User starts workout from routine → Active workout in localStorage
4. User logs sets → Updates active workout object
5. User finishes → Workout saved to workouts table with user_id
6. User views history → useWorkouts() fetches from database (RLS filtered)

### Critical Implementation Details
- Exercises stored as JSONB array with planned sets/reps/rest
- Active workouts use localStorage (temporary session state)
- Completed workouts use Supabase (persistent)
- RLS enforces user_id matching on workouts table
- All pages wrapped with ProtectedRoute for authentication

To recreate this project from scratch:
1. Create React App
2. Install dependencies (Supabase, Router, Tailwind, Heroicons)
3. Create database tables with RLS policies
4. Create 3 core contexts/hooks (AuthContext, useRoutines, useWorkouts)
5. Create 7 pages and UI components
6. Implement routing with protected routes
7. Seed database with routines via SQL

---

**Document Version:** 1.0  
**Last Updated:** November 27, 2025  
**Maintainer:** Development Team
