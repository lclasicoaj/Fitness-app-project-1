# 🎯 Getting Started with Workout Tracker

Welcome! This guide will help you get started with your new workout tracking app.

## 🚀 First Steps

### 1. Start the Application

The development server should already be running. If not, run:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Create Your First Routine

1. Click **"Routines"** from the home page
2. Click **"New"** button
3. Enter a routine name (e.g., "Push Day", "Full Body")
4. Add exercises by typing the name and clicking the **+** button
5. Reorder exercises using the up/down arrows if needed
6. Click **"Save Routine"**

**Example Routines:**
- **Push Day**: Bench Press, Shoulder Press, Tricep Dips
- **Pull Day**: Pull-ups, Bent Over Rows, Bicep Curls
- **Leg Day**: Squats, Deadlifts, Leg Press, Calf Raises

### 3. Start Your First Workout

#### Option A: From a Routine
1. Click **"Start Workout"** from home page
2. Select a routine you created
3. All exercises will be pre-loaded
4. Add sets (weight + reps) for each exercise
5. Click **"Finish Workout"** when done

#### Option B: Blank Workout
1. Click **"Start Workout"** from home page
2. Click **"Start Blank Workout"**
3. Add exercises as you go
4. Add sets for each exercise
5. Click **"Finish Workout"** when done

### 4. Track Your Progress

1. Click **"Workout History"** from home page
2. See all your completed workouts
3. Tap any workout to see detailed stats
4. Review your progress over time

## 💡 Tips for Daily Use

### During Your Workout

- **Add sets quickly**: Enter weight, press Tab, enter reps, press Enter
- **Collapse exercises**: Click the arrow to minimize and see more exercises at once
- **Delete mistakes**: Use the trash icon to remove sets or exercises
- **Add exercises on the fly**: Not in your routine? Add it during the workout!

### Building Good Routines

- **Keep it simple**: 4-6 exercises per routine is ideal
- **Group by movement pattern**: Push, Pull, Legs, or Upper/Lower splits
- **Name clearly**: Use names you'll recognize at a glance

### Staying Organized

- **Create routines for each workout split**: Push, Pull, Legs, Full Body, etc.
- **Review history regularly**: Check your progress weekly
- **Clean up old workouts**: Delete test workouts to keep history clean

## 📱 Mobile Usage

### Best Practices at the Gym

1. **Save your routine beforehand** - Don't create routines at the gym
2. **Start workout** - Quick tap to begin
3. **Focus on one exercise at a time** - Use collapse/expand to stay focused
4. **Finish and save** - Don't forget to tap "Finish Workout"!

### Offline Use

The app works completely offline! All data is stored locally on your device.

## 🔧 Customization Ideas

### Workout Splits You Can Create

**Push/Pull/Legs (PPL)**
- Push Day: Chest, Shoulders, Triceps
- Pull Day: Back, Biceps
- Leg Day: Quads, Hamstrings, Calves

**Upper/Lower Split**
- Upper Body: All upper body muscles
- Lower Body: All lower body muscles

**Full Body**
- Full Body: Mix of all muscle groups

**Bro Split**
- Chest Day
- Back Day
- Shoulder Day
- Arm Day
- Leg Day

## 📊 Understanding Your Stats

In the workout detail view, you'll see:

- **Exercises**: Total number of exercises performed
- **Total Sets**: Sum of all sets across all exercises
- **Total Reps**: Sum of all reps across all sets
- **Total Volume**: Weight × Reps summed (useful for tracking progressive overload)

**Example:**
- Bench Press: 3 sets × 10 reps × 135 lbs = 4,050 lbs volume
- This helps you track if you're increasing your total work over time

## 🎨 Interface Guide

### Icons Explained

- **➕ Plus Icon**: Add new item (routine, exercise, set)
- **🗑️ Trash Icon**: Delete item
- **⬆️⬇️ Arrows**: Reorder exercises in routines
- **← Back Arrow**: Go back to previous page
- **✓ Check Icon**: Finish/complete action

### Color Meanings

- **Blue Buttons**: Primary actions (start, save, add)
- **Red Buttons**: Destructive actions (delete)
- **Gray Buttons**: Secondary actions (cancel, back)

## 🔒 Your Data

### Where Is It Stored?

All your data is stored in your browser's localStorage:
- Nothing is sent to any server
- Your data never leaves your device
- Completely private and secure

### Backing Up Your Data

To backup your data manually:

1. Open browser console (F12)
2. Go to "Application" or "Storage" tab
3. Find "Local Storage" → select your domain
4. Copy the data from `routines` and `history` keys
5. Save to a text file

### Clearing Data

If you want to start fresh:

1. Open browser console (F12)
2. Type: `localStorage.clear()`
3. Press Enter
4. Refresh the page

**Warning**: This deletes all your workout data!

## 🐛 Troubleshooting

### App Won't Load
- Clear browser cache and reload
- Try a different browser
- Check browser console for errors (F12)

### Data Not Saving
- Make sure localStorage is enabled in your browser
- Check if you're in private/incognito mode (data won't persist)
- Ensure you have storage space available

### Workout Disappeared
- Check "Active Workout" - you might have a workout in progress
- Check "Workout History" - it might have been saved there

### Can't Edit Routine
- You can't edit routines during an active workout
- Finish or cancel your current workout first

## 📚 Next Steps

Now that you're set up:

1. ✅ Create 2-3 routines for your workout split
2. ✅ Complete your first workout
3. ✅ Check out your stats in history
4. ✅ Stay consistent and track your progress!

## 🙋 Need Help?

- Check [SETUP.md](SETUP.md) for installation issues
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- Check [README.md](README.md) for feature overview

---

**Happy lifting! 💪**

Remember: Consistency is key. The best workout is the one you actually do!
