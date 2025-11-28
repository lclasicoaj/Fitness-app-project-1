import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { RoutinesPage } from './pages/RoutinesPage';
import { RoutineEditorPage } from './pages/RoutineEditorPage';
import { StartWorkoutPage } from './pages/StartWorkoutPage';
import { ActiveWorkoutPage } from './pages/ActiveWorkoutPage';
import { WorkoutHistoryPage } from './pages/WorkoutHistoryPage';
import { WorkoutDetailPage } from './pages/WorkoutDetailPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routines"
            element={
              <ProtectedRoute>
                <RoutinesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routines/:routineId"
            element={
              <ProtectedRoute>
                <RoutineEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/start-workout"
            element={
              <ProtectedRoute>
                <StartWorkoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/active-workout"
            element={
              <ProtectedRoute>
                <ActiveWorkoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <WorkoutHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history/:workoutId"
            element={
              <ProtectedRoute>
                <WorkoutDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
