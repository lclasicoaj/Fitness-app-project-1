import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { ExerciseRow } from '../components/workout/ExerciseRow';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useWorkouts } from '../hooks/useSupabase';
import { generateId } from '../utils/id';

export function ActiveWorkoutPage() {
  const navigate = useNavigate();
  const [activeWorkout, setActiveWorkout] = useLocalStorage('activeWorkout', null);
  const { addWorkout } = useWorkouts();
  const [newExerciseName, setNewExerciseName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!activeWorkout) {
      navigate('/start-workout');
    }
  }, [activeWorkout, navigate]);
  
  if (!activeWorkout) {
    return null;
  }
  
  const addExercise = () => {
    if (!newExerciseName.trim()) return;
    
    const newExercise = {
      id: generateId(),
      name: newExerciseName.trim(),
      sets: []
    };
    
    setActiveWorkout({
      ...activeWorkout,
      exercises: [...activeWorkout.exercises, newExercise]
    });
    setNewExerciseName('');
  };
  
  const updateExercise = (exerciseId, updatedExercise) => {
    setActiveWorkout({
      ...activeWorkout,
      exercises: activeWorkout.exercises.map(ex => 
        ex.id === exerciseId ? updatedExercise : ex
      )
    });
  };
  
  const deleteExercise = (exerciseId) => {
    setActiveWorkout({
      ...activeWorkout,
      exercises: activeWorkout.exercises.filter(ex => ex.id !== exerciseId)
    });
  };
  
  const finishWorkout = async () => {
    if (activeWorkout.exercises.length === 0) {
      setError('Add at least one exercise to save the workout');
      return;
    }
    
    const hasAnySets = activeWorkout.exercises.some(ex => ex.sets.length > 0);
    if (!hasAnySets) {
      setError('Add at least one set to save the workout');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      // Save to Supabase
      await addWorkout({
        routine_name: activeWorkout.routineName || null,
        routine_id: activeWorkout.routineId || null,
        exercises: activeWorkout.exercises,
        created_at: new Date().toISOString(),
      });
      
      // Clear active workout
      setActiveWorkout(null);
      
      // Navigate to history
      navigate('/history');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  
  const cancelWorkout = () => {
    if (window.confirm('Are you sure you want to cancel this workout? All progress will be lost.')) {
      setActiveWorkout(null);
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <PageHeader 
        title="Active Workout" 
        action={
          <Button
            onClick={cancelWorkout}
            variant="ghost"
            size="sm"
          >
            Cancel
          </Button>
        }
      />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {activeWorkout.routineName && (
            <Card>
              <p className="text-sm text-gray-500">Based on routine:</p>
              <p className="font-semibold text-blue-600">{activeWorkout.routineName}</p>
            </Card>
          )}
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Exercises</h2>
            
            {activeWorkout.exercises.length === 0 ? (
              <Card>
                <p className="text-center text-gray-500">No exercises added yet</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {activeWorkout.exercises.map((exercise) => (
                  <ExerciseRow
                    key={exercise.id}
                    exercise={exercise}
                    onUpdate={(updated) => updateExercise(exercise.id, updated)}
                    onDelete={() => deleteExercise(exercise.id)}
                  />
                ))}
              </div>
            )}
            
            <Card className="mt-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add exercise"
                  value={newExerciseName}
                  onChange={(e) => setNewExerciseName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addExercise()}
                  className="flex-1"
                />
                <Button onClick={addExercise} size="md">
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={finishWorkout}
            variant="primary"
            fullWidth
            size="lg"
            disabled={saving}
          >
            <CheckIcon className="w-5 h-5 inline mr-2" />
            {saving ? 'Saving...' : 'Finish Workout'}
          </Button>
        </div>
      </div>
    </div>
  );
}
