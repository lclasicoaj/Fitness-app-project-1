# 🧪 Testing Guide - Supabase Auth Implementation

## Server Status

✅ **Development Server:** Running at http://localhost:3000
✅ **Supabase Credentials:** Configured
✅ **All Code:** Compiled successfully

---

## 🎯 Testing Checklist

### Phase 1: Database Setup
- [ ] Go to Supabase dashboard
- [ ] Create `routines` table with SQL
- [ ] Create `workouts` table with SQL
- [ ] Verify tables appear in Table Editor
- [ ] Check RLS policies are enabled

### Phase 2: Authentication Flow
- [ ] Visit http://localhost:3000
- [ ] Should see Login page
- [ ] Click "Sign Up"
- [ ] Enter test email (e.g., test@example.com)
- [ ] Enter password (e.g., password123)
- [ ] Click "Sign Up"
- [ ] See success message or email confirmation
- [ ] Click "Sign In"
- [ ] Enter same credentials
- [ ] Should redirect to home page

### Phase 3: Routine Management
- [ ] Click "Routines" from home
- [ ] Should load (may be empty initially)
- [ ] Click "+ New"
- [ ] Enter routine name (e.g., "Push Day")
- [ ] Add exercises: "Bench Press", "Shoulder Press"
- [ ] Click "Save Routine"
- [ ] Should redirect to routines list
- [ ] Routine should appear in list

### Phase 4: Starting a Workout
- [ ] Go back to home (click Workout Tracker)
- [ ] Click "Start Workout"
- [ ] Should see "Start Blank Workout" button
- [ ] Should see your routine listed
- [ ] Click your routine
- [ ] Should go to active workout
- [ ] Exercises from routine should be loaded

### Phase 5: Adding Sets
- [ ] On active workout page
- [ ] For "Bench Press" exercise
- [ ] Click on exercise row to expand
- [ ] Add set: weight=185, reps=8
- [ ] Press Enter or click add
- [ ] Set should appear under exercise
- [ ] Add another set: weight=185, reps=6
- [ ] Both sets should show

### Phase 6: Saving Workout
- [ ] On active workout page with exercises/sets
- [ ] Click "Finish Workout"
- [ ] Should redirect to history page
- [ ] Your workout should appear at top of list

### Phase 7: Viewing History
- [ ] Click "Workout History" from home
- [ ] Should see your workout
- [ ] Workout should show date and exercise count
- [ ] Click on workout
- [ ] Should show detailed stats:
  - Date and time
  - Number of exercises
  - Total sets
  - Total reps
  - Total volume (if weight entered)

### Phase 8: Deleting Workout
- [ ] On workout detail page
- [ ] Click "Delete Workout"
- [ ] Confirm deletion
- [ ] Should redirect to history
- [ ] Workout should be removed from list

### Phase 9: Logout
- [ ] Go to home page
- [ ] Click "Logout" button (blue banner)
- [ ] Should redirect to login page
- [ ] Navigate back to / should redirect to login

### Phase 10: Session Persistence
- [ ] Sign in again
- [ ] Refresh page (F5)
- [ ] Should stay logged in
- [ ] Navigate to routines
- [ ] Should see your routine
- [ ] Close browser and reopen
- [ ] Go to app URL
- [ ] Should still be logged in

---

## 🔍 What to Check

### In Browser
- [ ] No red error messages
- [ ] Console has no errors (F12 → Console)
- [ ] Network requests succeed (F12 → Network)
- [ ] Data persists after refresh
- [ ] Logout clears session

### In Supabase
- [ ] Go to SQL Editor
- [ ] Run: `SELECT COUNT(*) FROM routines;`
- [ ] Should show your routine count
- [ ] Run: `SELECT COUNT(*) FROM workouts WHERE user_id = (SELECT auth.uid());`
- [ ] Should show your workout count

---

## ✅ Expected Behavior

### After Signup
```
User enters email → Click Sign Up → 
Success message → Can sign in with same email
```

### After Login
```
User enters email/password → Click Sign In → 
Redirected to home page → See user email in blue banner
```

### Creating Routine
```
Click New → Enter name → Add exercises → 
Click Save → Routine appears in list → Data in Supabase
```

### Starting Workout
```
Click Start Workout → Select routine → 
Exercises pre-loaded → Can add sets → 
Click Finish → Saved to Supabase → Appears in History
```

### Viewing History
```
Click History → All workouts listed → 
Click workout → See detailed stats → 
Can delete if desired
```

### Logout
```
Click Logout → Redirected to login → 
Cannot access protected routes → 
Session cleared from Supabase
```

---

## 🐛 Common Issues & Fixes

### Issue: "User not found" error
**Fix:** You need to sign up first before signing in. Sign up creates the user in Supabase.

### Issue: "permission denied" error
**Fix:** Wait 30 seconds for RLS policies to sync, then try logging out/back in.

### Issue: Routines not showing
**Fix:** 
1. Make sure routines table was created
2. Try refreshing page
3. Check Network tab (F12) for failed requests
4. Check console for errors

### Issue: Workouts not saving
**Fix:**
1. Make sure at least one exercise has one set
2. Check you're logged in
3. Check Network tab for request failures
4. Try closing browser and reopening

### Issue: "Compiled with warnings"
**Fix:** This is normal. Warnings don't affect functionality. If you want to remove them, look in the console output for the specific warning and add `// eslint-disable-next-line` above the line.

### Issue: App won't load at localhost:3000
**Fix:** 
1. Check terminal - is npm start still running?
2. Check for port conflicts: `netstat -ano | findstr ":3000"`
3. Kill if needed: `taskkill /PID [number] /F`
4. Restart: `npm start`

---

## 📊 Test Data

### Test Account
- Email: test@example.com (or any email)
- Password: password123

### Test Routine
- Name: Push Day
- Exercises: Bench Press, Shoulder Press, Tricep Dips

### Test Workout Sets
- Exercise 1 (Bench Press): 185 lbs × 8 reps, 185 lbs × 6 reps
- Exercise 2 (Shoulder Press): 115 lbs × 10 reps, 115 lbs × 8 reps

---

## 🎯 Success Criteria

- [ ] Can sign up with email
- [ ] Can sign in with credentials
- [ ] Session persists after refresh
- [ ] Can create routines
- [ ] Routines appear in list
- [ ] Can start workout from routine
- [ ] Can add sets to exercises
- [ ] Workout saves successfully
- [ ] Workout appears in history
- [ ] Can view workout details
- [ ] Can delete workout
- [ ] Can logout
- [ ] Cannot access protected routes after logout
- [ ] Can sign in again

---

## 🎉 All Tests Passing?

If you've completed all the testing steps above, your Supabase authentication implementation is working correctly!

**Next steps:**
1. Deploy to production
2. Invite users to test
3. Monitor for any issues
4. Add more features

---

## 📝 Notes

- **Active Workouts** are stored in localStorage (temporary session state)
- **Routines** are stored in Supabase (shared, persistent)
- **Workouts** are stored in Supabase (user-specific, persistent)
- **User Sessions** are managed by Supabase Auth (automatic)
- **RLS Policies** ensure users can only access their own workouts

---

## 🆘 Still Having Issues?

Check:
1. Browser console for errors: F12 → Console tab
2. Network requests: F12 → Network tab
3. Supabase dashboard for table/policy issues
4. Firewall/VPN not blocking Supabase
5. Correct email/password for signin

If still stuck, check the auth logs:
1. Go to Supabase dashboard
2. Authentication → Users
3. Look for your user in the list
4. Check if email is verified
