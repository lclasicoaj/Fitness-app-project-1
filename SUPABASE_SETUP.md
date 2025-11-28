# Supabase Setup Guide

## Database Schema Setup

You need to create two tables in your Supabase database. Run the following SQL commands in your Supabase SQL Editor:

### 1. Create Routines Table (Shared by all users)

```sql
-- Create routines table (shared across all users)
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  exercises JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS but allow all authenticated users to read
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all authenticated users to read routines
CREATE POLICY "Allow all authenticated users to read routines" 
  ON routines FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy: Allow only admin to modify routines (optional - comment out to allow all users)
-- CREATE POLICY "Allow admin to manage routines" 
--   ON routines FOR ALL 
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.role() = 'authenticated');
```

### 2. Create Workouts Table (User-specific)

```sql
-- Create workouts table (user-specific)
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id UUID REFERENCES routines(id) ON DELETE SET NULL,
  routine_name TEXT,
  exercises JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  CONSTRAINT user_owns_workout UNIQUE(id, user_id)
);

-- Enable RLS
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow users to only read/write their own workouts
CREATE POLICY "Allow users to read own workouts"
  ON workouts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert own workouts"
  ON workouts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update own workouts"
  ON workouts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete own workouts"
  ON workouts FOR DELETE
  USING (auth.uid() = user_id);
```

## Steps to Set Up:

1. **Go to your Supabase Dashboard**
   - URL: https://app.supabase.com
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar

3. **Create a new query**
   - Click "New Query"

4. **Copy and paste the Routines Table SQL above**
   - Run the query

5. **Create another query for Workouts Table**
   - Click "New Query"
   - Copy and paste the Workouts Table SQL above
   - Run the query

6. **Verify tables were created**
   - Go to "Table Editor" in the left sidebar
   - You should see `routines` and `workouts` tables

7. **Enable Email Authentication** (if not already enabled)
   - Go to "Authentication" → "Providers"
   - Make sure "Email" provider is enabled

## Data Types Explanation:

- **id**: Unique identifier for each record
- **name** (routines): Name of the workout routine
- **exercises**: JSON array containing exercise objects
- **created_at/updated_at**: Timestamps for tracking
- **user_id** (workouts): Links workout to the user who created it
- **routine_id** (workouts): Optional link to the routine used

## Example Routine Exercise Structure:

```json
{
  "id": "exercise-1",
  "name": "Bench Press",
  "sets": [
    { "weight": 185, "reps": 8 },
    { "weight": 185, "reps": 6 }
  ]
}
```

## Example Workout Exercise Structure:

```json
{
  "id": "exercise-1",
  "name": "Bench Press",
  "sets": [
    { "weight": 185, "reps": 8, "completed": true },
    { "weight": 185, "reps": 6, "completed": true }
  ]
}
```

## Troubleshooting:

- **"relation 'routines' does not exist"**: Make sure you ran the SQL to create the table
- **"permission denied"**: Check RLS policies are set up correctly
- **"auth.uid() is NULL"**: Make sure user is logged in before performing actions

For more help, visit: https://supabase.com/docs/guides/database
