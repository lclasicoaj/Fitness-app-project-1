import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { ExerciseRow } from '../components/workout/ExerciseRow';
import { useWorkouts } from '../hooks/useSupabase';
import { Button } from '../components/ui/Button';

export function WorkoutDetailPage() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { workouts, deleteWorkout: deleteWorkoutFromDB } = useWorkouts();
  const [deleting, setDeleting] = useState(false);
  
  const workout = workouts.find(w => w.id === workoutId);
  
  if (!workout) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Workout Not Found" showBack />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500">This workout could not be found.</p>
        </main>
      </div>
    );
  }
  
  const date = new Date(workout.created_at || workout.date);
  const formattedDate = isNaN(date.getTime())
    ? 'Invalid Date'
    : date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  const formattedTime = isNaN(date.getTime())
    ? ''
    : date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });
  
  const exercises = workout.exercises || [];
  const totalSets = exercises.reduce((sum, ex) => sum + (ex.sets?.length || 0), 0);
  const totalReps = exercises.reduce((sum, ex) => 
    sum + (ex.sets?.reduce((s, set) => s + parseInt(set.reps || 0), 0) || 0), 0
  );
  const totalWeight = exercises.reduce((sum, ex) => 
    sum + (ex.sets?.reduce((s, set) => s + (parseInt(set.weight || 0) * parseInt(set.reps || 0)), 0) || 0), 0
  );
  
  const deleteWorkout = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setDeleting(true);
      try {
        await deleteWorkoutFromDB(workoutId);
        navigate('/history');
      } catch (error) {
        console.error('Error deleting workout:', error);
        setDeleting(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <PageHeader title="Workout Details" showBack />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900">{formattedDate}</h2>
            <p className="text-sm text-gray-500 mt-1">{formattedTime}</p>
            
            {workout.routine_name && (
              <p className="text-sm text-blue-600 mt-2">Based on: {workout.routine_name}</p>
            )}
            
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{exercises.length}</p>
                <p className="text-xs text-gray-500 mt-1">Exercises</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{totalSets}</p>
                <p className="text-xs text-gray-500 mt-1">Total Sets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{totalReps}</p>
                <p className="text-xs text-gray-500 mt-1">Total Reps</p>
              </div>
            </div>
            
            {totalWeight > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">Total Volume</p>
                <p className="text-lg font-semibold text-gray-900">{totalWeight.toLocaleString()} lbs</p>
              </div>
            )}
          </Card>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Exercises</h3>
            <div className="space-y-3">
              {exercises.map((exercise) => (
                <ExerciseRow
                  key={exercise.id}
                  exercise={exercise}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={deleteWorkout}
            variant="danger"
            fullWidth
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Workout'}
          </Button>
        </div>
      </div>
    </div>
  );
}
