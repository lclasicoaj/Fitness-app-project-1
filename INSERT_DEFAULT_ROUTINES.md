# 🏋️ INSERT DEFAULT ROUTINES INTO SUPABASE

## 📋 Overview

I've created SQL scripts to seed your Supabase database with Ajay's complete PPL (Push/Pull/Legs) workout plan. You have two options:

### **Option 1: One Complete Routine** ⭐ RECOMMENDED
- Single routine with all 25 exercises
- Users see everything in one routine
- Easy to manage
- File: `SEED_DEFAULT_ROUTINE.sql`

### **Option 2: 5 Individual Day Routines**
- Separate routine for each workout day
- Users can pick and choose which days to train
- More flexibility
- File: `SEED_INDIVIDUAL_ROUTINES.sql`

---

## 🚀 QUICK SETUP (Choose One Option)

### **OPTION 1: Insert Complete PPL Routine** (Recommended)

1. Go to: **https://app.supabase.com**
2. Click: **SQL Editor** → **New Query**
3. Open: `SEED_DEFAULT_ROUTINE.sql` from your project
4. Copy all SQL
5. Paste into Supabase SQL Editor
6. Click: **Run** ✅

**Result:** Users will see "Ajay - PPL 5-Day (Push/Pull/Legs)" with all 25 exercises

---

### **OPTION 2: Insert Individual Day Routines**

1. Go to: **https://app.supabase.com**
2. Click: **SQL Editor** → **New Query**
3. Open: `SEED_INDIVIDUAL_ROUTINES.sql` from your project
4. Copy all SQL
5. Paste into Supabase SQL Editor
6. Click: **Run** ✅

**Result:** Users will see 5 separate routines:
- Push Day 1 (Monday)
- Pull Day 1 (Tuesday)
- Leg Day (Wednesday)
- Push Day 2 (Friday)
- Pull Day 2 (Saturday)

---

## 📊 What Gets Inserted

### Complete Routine (Option 1)

**Routine Name:** `Ajay - PPL 5-Day (Push/Pull/Legs)`

**Exercises (25 total):**

#### Push Days
1. **Barbell Bench Press** - 4 sets × 8-10 reps (90 sec rest)
2. **Incline Dumbbell Press** - 3 sets × 10-12 reps (60 sec rest)
3. **Dumbbell Shoulder Press** - 3 sets × 10-12 reps (60 sec rest)
4. **Lateral Raises** - 3 sets × 12-15 reps (45 sec rest)
5. **Tricep Rope Pushdowns** - 3 sets × 12-15 reps (45 sec rest)
6. **Dumbbell Bench Press** - 4 sets × 8-10 reps (90 sec rest)
7. **Cable Flyes (High to Low)** - 3 sets × 12-15 reps (60 sec rest)
8. **Arnold Press** - 3 sets × 10-12 reps (60 sec rest)
9. **Front Raises** - 3 sets × 12-15 reps (45 sec rest)
10. **Overhead Tricep Extension** - 3 sets × 12-15 reps (45 sec rest)

#### Pull Days
11. **Barbell Bent-Over Rows** - 4 sets × 8-10 reps (90 sec rest)
12. **Pull-ups or Lat Pulldown** - 4 sets × 8-10 reps (90 sec rest)
13. **Seated Cable Rows** - 3 sets × 10-12 reps (60 sec rest)
14. **Face Pulls** - 3 sets × 15-20 reps (45 sec rest)
15. **Barbell Curls** - 3 sets × 10-12 reps (45 sec rest)
16. **T-Bar Rows or Chest-Supported Rows** - 4 sets × 8-10 reps (90 sec rest)
17. **Wide Grip Lat Pulldown** - 4 sets × 10-12 reps (90 sec rest)
18. **Single-Arm Dumbbell Rows** - 3 sets × 10-12 each (60 sec rest)
19. **Dumbbell Shrugs** - 3 sets × 12-15 reps (45 sec rest)
20. **Hammer Curls** - 3 sets × 12-15 reps (45 sec rest)

#### Leg Day
21. **Barbell Back Squats** - 4 sets × 8-10 reps (2 min rest)
22. **Romanian Deadlifts (RDLs)** - 3 sets × 10-12 reps (90 sec rest)
23. **Leg Press** - 3 sets × 12-15 reps (60 sec rest)
24. **Walking Lunges** - 3 sets × 20 steps (60 sec rest)
25. **Calf Raises** - 4 sets × 15-20 reps (45 sec rest)

---

## ✅ After Inserting

### Check in Supabase
1. Go to **Table Editor**
2. Click **routines** table
3. You should see your routine(s)

### Check in App
1. Go to **http://localhost:3000**
2. Sign in
3. Click **Routines**
4. You should see "Ajay - PPL 5-Day" or individual days
5. Click to see all exercises with sets/reps

---

## 🎯 User Experience

### When User Clicks Routine

**Option 1 (Complete):**
```
Ajay - PPL 5-Day ✓
├── Barbell Bench Press (4×8-10)
├── Incline Dumbbell Press (3×10-12)
├── Dumbbell Shoulder Press (3×10-12)
├── ... (all 25 exercises)
└── Hammer Curls (3×12-15)
```

**Option 2 (Individual Days):**
```
Push Day 1 (Monday) ✓
├── Barbell Bench Press (4×8-10)
├── Incline Dumbbell Press (3×10-12)
├── ... (5 exercises per day)
└── Tricep Rope Pushdowns (3×12-15)
```

---

## 🔄 Data Structure

### Exercise Format (Stored in JSONB)
```json
{
  "id": "unique-id",
  "name": "Exercise Name",
  "sets": 4,
  "reps": "8-10",
  "rest": "90 sec",
  "day": "Monday & Friday" // optional
}
```

### When User Starts Workout
When user selects the routine, the exercises are loaded into the active workout:

```json
{
  "id": "workout-id",
  "routineName": "Ajay - PPL 5-Day",
  "routineId": "routine-uuid",
  "exercises": [
    {
      "id": "ex-1",
      "name": "Barbell Bench Press",
      "sets": [
        { "weight": 185, "reps": 8 },
        { "weight": 185, "reps": 8 },
        { "weight": 185, "reps": 8 },
        { "weight": 185, "reps": 8 }
      ]
    }
  ]
}
```

---

## 💡 Tips

### Customize Exercise Names
If you want to change exercise names, edit the `.sql` file before running it:

```sql
{"id": "p1-1", "name": "Your Custom Name", "sets": 4, "reps": "8-10"}
```

### Add More Exercises
You can add more exercises to the JSONB array. Structure:

```json
{
  "id": "unique-id",
  "name": "Exercise Name",
  "sets": NUMBER,
  "reps": "X-Y or NUMBER steps",
  "rest": "TIME"
}
```

### Delete Routines
If you need to remove them, run in SQL Editor:

```sql
DELETE FROM routines WHERE name LIKE '%Ajay%';
-- or
DELETE FROM routines WHERE name LIKE '%Push%' OR name LIKE '%Pull%' OR name LIKE '%Leg%';
```

---

## ❓ FAQ

### Q: Can I insert both options?
A: Yes! You can run both SQL scripts. Users will see all routines.

### Q: Can users modify these routines?
A: No, they're shared (read-only in the routines table). Users can create their own routines or copy exercises to a new routine.

### Q: Do the routines sync across devices?
A: Yes! All routines are stored in Supabase and sync automatically.

### Q: Can I add more routines later?
A: Yes! Same SQL INSERT method. Create `.sql` files for additional routines.

### Q: What if exercise name is wrong?
A: Edit the `.sql` file before running, or delete and re-run with corrections.

---

## 🚀 NEXT STEPS

1. **Choose** Option 1 or Option 2
2. **Copy** the SQL from the file
3. **Run** in Supabase SQL Editor
4. **Verify** in Table Editor
5. **Test** in your app at http://localhost:3000
6. **Done!** Users see the routines

---

## 📞 TROUBLESHOOTING

### Routines don't appear in app
- Refresh page (F5)
- Check SQL Editor - did it say "Success"?
- Check Table Editor - do you see the routines?
- Check Network tab (F12) for errors

### Wrong data appears
- Delete: `DELETE FROM routines WHERE name LIKE '%Ajay%';`
- Re-run the SQL with corrections

### Exercise sets/reps not showing
- They're stored in JSONB column
- When user starts workout, they load into the session
- Check browser console for errors

---

## ✨ THAT'S IT!

Your default routines are ready to use. Users will see professional workout plans with detailed sets and reps!

**Choose Option 1 or 2 above and run the SQL.** 🏋️💪
