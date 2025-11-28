import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RoutineListItem } from '../components/routine/RoutineListItem';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useRoutines } from '../hooks/useSupabase';
import { generateId } from '../utils/id';

export function StartWorkoutPage() {
  const navigate = useNavigate();
  const { routines, loading } = useRoutines();
  const [, setActiveWorkout] = useLocalStorage('activeWorkout', null);
  
  const startBlankWorkout = () => {
    const workout = {
      id: generateId(),
      date: new Date().toISOString(),
      exercises: [],
      routineName: null
    };
    setActiveWorkout(workout);
    navigate('/active-workout');
  };
  
  const startFromRoutine = (routine) => {
    const workout = {
      id: generateId(),
      date: new Date().toISOString(),
      routineName: routine.name,
      routineId: routine.id,
      exercises: routine.exercises.map(ex => ({
        id: generateId(),
        name: ex.name,
        sets: [],
        plannedSets: ex.sets,
        plannedReps: ex.reps,
        rest: ex.rest,
        day: ex.day
      }))
    };
    setActiveWorkout(workout);
    navigate('/active-workout');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Start Workout" showBack />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading routines...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Start Workout" showBack />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <Card>
            <h2 className="font-semibold text-gray-900 mb-2">Quick Start</h2>
            <p className="text-sm text-gray-500 mb-4">Start with a blank workout</p>
            <Button
              onClick={startBlankWorkout}
              variant="primary"
              fullWidth
            >
              <PlusIcon className="w-5 h-5 inline mr-2" />
              Start Blank Workout
            </Button>
          </Card>
          
          {routines.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Start from Routine</h2>
              <div className="space-y-3">
                {routines.map((routine) => (
                  <RoutineListItem
                    key={routine.id}
                    routine={routine}
                    onClick={() => startFromRoutine(routine)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
