-- INSERT ALL INDIVIDUAL DAY ROUTINES
-- Copy and paste this into Supabase SQL Editor and run

-- PUSH DAY 1 (Monday)
INSERT INTO routines (name, exercises) VALUES (
  'Push Day 1 (Monday)',
  '[
    {"id": "p1-1", "name": "Barbell Bench Press", "sets": 4, "reps": "8-10", "rest": "90 sec"},
    {"id": "p1-2", "name": "Incline Dumbbell Press", "sets": 3, "reps": "10-12", "rest": "60 sec"},
    {"id": "p1-3", "name": "Dumbbell Shoulder Press", "sets": 3, "reps": "10-12", "rest": "60 sec"},
    {"id": "p1-4", "name": "Lateral Raises", "sets": 3, "reps": "12-15", "rest": "45 sec"},
    {"id": "p1-5", "name": "Tricep Rope Pushdowns", "sets": 3, "reps": "12-15", "rest": "45 sec"}
  ]'
);

-- PULL DAY 1 (Tuesday)
INSERT INTO routines (name, exercises) VALUES (
  'Pull Day 1 (Tuesday)',
  '[
    {"id": "pl1-1", "name": "Barbell Bent-Over Rows", "sets": 4, "reps": "8-10", "rest": "90 sec"},
    {"id": "pl1-2", "name": "Pull-ups or Lat Pulldown", "sets": 4, "reps": "8-10", "rest": "90 sec"},
    {"id": "pl1-3", "name": "Seated Cable Rows", "sets": 3, "reps": "10-12", "rest": "60 sec"},
    {"id": "pl1-4", "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "45 sec"},
    {"id": "pl1-5", "name": "Barbell Curls", "sets": 3, "reps": "10-12", "rest": "45 sec"}
  ]'
);

-- LEG DAY (Wednesday)
INSERT INTO routines (name, exercises) VALUES (
  'Leg Day (Wednesday)',
  '[
    {"id": "leg-1", "name": "Barbell Back Squats", "sets": 4, "reps": "8-10", "rest": "2 min"},
    {"id": "leg-2", "name": "Romanian Deadlifts (RDLs)", "sets": 3, "reps": "10-12", "rest": "90 sec"},
    {"id": "leg-3", "name": "Leg Press", "sets": 3, "reps": "12-15", "rest": "60 sec"},
    {"id": "leg-4", "name": "Walking Lunges", "sets": 3, "reps": "20 steps", "rest": "60 sec"},
    {"id": "leg-5", "name": "Calf Raises", "sets": 4, "reps": "15-20", "rest": "45 sec"}
  ]'
);

-- PUSH DAY 2 (Friday)
INSERT INTO routines (name, exercises) VALUES (
  'Push Day 2 (Friday)',
  '[
    {"id": "p2-1", "name": "Dumbbell Bench Press", "sets": 4, "reps": "8-10", "rest": "90 sec"},
    {"id": "p2-2", "name": "Cable Flyes (High to Low)", "sets": 3, "reps": "12-15", "rest": "60 sec"},
    {"id": "p2-3", "name": "Arnold Press", "sets": 3, "reps": "10-12", "rest": "60 sec"},
    {"id": "p2-4", "name": "Front Raises", "sets": 3, "reps": "12-15", "rest": "45 sec"},
    {"id": "p2-5", "name": "Overhead Tricep Extension", "sets": 3, "reps": "12-15", "rest": "45 sec"}
  ]'
);

-- PULL DAY 2 (Saturday)
INSERT INTO routines (name, exercises) VALUES (
  'Pull Day 2 (Saturday)',
  '[
    {"id": "pl2-1", "name": "T-Bar Rows or Chest-Supported Rows", "sets": 4, "reps": "8-10", "rest": "90 sec"},
    {"id": "pl2-2", "name": "Wide Grip Lat Pulldown", "sets": 4, "reps": "10-12", "rest": "90 sec"},
    {"id": "pl2-3", "name": "Single-Arm Dumbbell Rows", "sets": 3, "reps": "10-12 each", "rest": "60 sec"},
    {"id": "pl2-4", "name": "Dumbbell Shrugs", "sets": 3, "reps": "12-15", "rest": "45 sec"},
    {"id": "pl2-5", "name": "Hammer Curls", "sets": 3, "reps": "12-15", "rest": "45 sec"}
  ]'
);

-- Verify all routines were inserted
SELECT id, name, created_at FROM routines ORDER BY created_at DESC;
