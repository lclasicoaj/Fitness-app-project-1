-- INSERT DEFAULT ROUTINES INTO SUPABASE
-- Copy and paste this into Supabase SQL Editor and run

-- Insert Ajay's PPL 5-Day Workout Plan
INSERT INTO routines (name, exercises) VALUES (
  'Ajay - PPL 5-Day (Push/Pull/Legs)',
  '[
    {
      "id": "push-1-bench",
      "name": "Barbell Bench Press",
      "day": "Monday & Friday",
      "sets": 4,
      "reps": "8-10",
      "rest": "90 sec"
    },
    {
      "id": "push-1-incline",
      "name": "Incline Dumbbell Press",
      "day": "Monday",
      "sets": 3,
      "reps": "10-12",
      "rest": "60 sec"
    },
    {
      "id": "push-1-shoulders",
      "name": "Dumbbell Shoulder Press",
      "day": "Monday",
      "sets": 3,
      "reps": "10-12",
      "rest": "60 sec"
    },
    {
      "id": "push-1-lateral",
      "name": "Lateral Raises",
      "day": "Monday",
      "sets": 3,
      "reps": "12-15",
      "rest": "45 sec"
    },
    {
      "id": "push-1-tricep",
      "name": "Tricep Rope Pushdowns",
      "day": "Monday",
      "sets": 3,
      "reps": "12-15",
      "rest": "45 sec"
    },
    {
      "id": "pull-1-rows",
      "name": "Barbell Bent-Over Rows",
      "day": "Tuesday & Saturday",
      "sets": 4,
      "reps": "8-10",
      "rest": "90 sec"
    },
    {
      "id": "pull-1-pullups",
      "name": "Pull-ups or Lat Pulldown",
      "day": "Tuesday",
      "sets": 4,
      "reps": "8-10",
      "rest": "90 sec"
    },
    {
      "id": "pull-1-cable",
      "name": "Seated Cable Rows",
      "day": "Tuesday",
      "sets": 3,
      "reps": "10-12",
      "rest": "60 sec"
    },
    {
      "id": "pull-1-face",
      "name": "Face Pulls",
      "day": "Tuesday",
      "sets": 3,
      "reps": "15-20",
      "rest": "45 sec"
    },
    {
      "id": "pull-1-curls",
      "name": "Barbell Curls",
      "day": "Tuesday",
      "sets": 3,
      "reps": "10-12",
      "rest": "45 sec"
    },
    {
      "id": "legs-squats",
      "name": "Barbell Back Squats",
      "day": "Wednesday",
      "sets": 4,
      "reps": "8-10",
      "rest": "2 min"
    },
    {
      "id": "legs-rdl",
      "name": "Romanian Deadlifts (RDLs)",
      "day": "Wednesday",
      "sets": 3,
      "reps": "10-12",
      "rest": "90 sec"
    },
    {
      "id": "legs-press",
      "name": "Leg Press",
      "day": "Wednesday",
      "sets": 3,
      "reps": "12-15",
      "rest": "60 sec"
    },
    {
      "id": "legs-lunges",
      "name": "Walking Lunges",
      "day": "Wednesday",
      "sets": 3,
      "reps": "20 steps",
      "rest": "60 sec"
    },
    {
      "id": "legs-calves",
      "name": "Calf Raises",
      "day": "Wednesday",
      "sets": 4,
      "reps": "15-20",
      "rest": "45 sec"
    },
    {
      "id": "push-2-db-bench",
      "name": "Dumbbell Bench Press",
      "day": "Friday",
      "sets": 4,
      "reps": "8-10",
      "rest": "90 sec"
    },
    {
      "id": "push-2-flyes",
      "name": "Cable Flyes (High to Low)",
      "day": "Friday",
      "sets": 3,
      "reps": "12-15",
      "rest": "60 sec"
    },
    {
      "id": "push-2-arnold",
      "name": "Arnold Press",
      "day": "Friday",
      "sets": 3,
      "reps": "10-12",
      "rest": "60 sec"
    },
    {
      "id": "push-2-front",
      "name": "Front Raises",
      "day": "Friday",
      "sets": 3,
      "reps": "12-15",
      "rest": "45 sec"
    },
    {
      "id": "push-2-overhead",
      "name": "Overhead Tricep Extension",
      "day": "Friday",
      "sets": 3,
      "reps": "12-15",
      "rest": "45 sec"
    },
    {
      "id": "pull-2-tbar",
      "name": "T-Bar Rows or Chest-Supported Rows",
      "day": "Saturday",
      "sets": 4,
      "reps": "8-10",
      "rest": "90 sec"
    },
    {
      "id": "pull-2-widegrip",
      "name": "Wide Grip Lat Pulldown",
      "day": "Saturday",
      "sets": 4,
      "reps": "10-12",
      "rest": "90 sec"
    },
    {
      "id": "pull-2-dumbbells",
      "name": "Single-Arm Dumbbell Rows",
      "day": "Saturday",
      "sets": 3,
      "reps": "10-12 each",
      "rest": "60 sec"
    },
    {
      "id": "pull-2-shrugs",
      "name": "Dumbbell Shrugs",
      "day": "Saturday",
      "sets": 3,
      "reps": "12-15",
      "rest": "45 sec"
    },
    {
      "id": "pull-2-hammers",
      "name": "Hammer Curls",
      "day": "Saturday",
      "sets": 3,
      "reps": "12-15",
      "rest": "45 sec"
    }
  ]'
);

-- Verify the routine was inserted
SELECT * FROM routines WHERE name LIKE '%Ajay%';
