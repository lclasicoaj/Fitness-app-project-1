import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useRoutines } from '../hooks/useSupabase';
import { generateId } from '../utils/id';

export function RoutineEditorPage() {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const { routines, addRoutine, updateRoutine, deleteRoutine: deleteRoutineFromDB } = useRoutines();
  
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (routineId && routineId !== 'new') {
      const routine = routines.find(r => r.id === routineId);
      if (routine) {
        setRoutineName(routine.name);
        setExercises(routine.exercises || []);
      }
    }
  }, [routineId, routines]);
  
  const addExercise = () => {
    if (!newExerciseName.trim()) return;
    
    setExercises([...exercises, { 
      id: generateId(), 
      name: newExerciseName.trim() 
    }]);
    setNewExerciseName('');
  };
  
  const deleteExercise = (exerciseId) => {
    setExercises(exercises.filter(ex => ex.id !== exerciseId));
  };
  
  const moveExercise = (index, direction) => {
    const newExercises = [...exercises];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= exercises.length) return;
    
    [newExercises[index], newExercises[newIndex]] = [newExercises[newIndex], newExercises[index]];
    setExercises(newExercises);
  };
  
  const updateExerciseField = (exerciseId, field, value) => {
    setExercises(exercises.map(ex => 
      ex.id === exerciseId ? { ...ex, [field]: value } : ex
    ));
  };
  
  const saveRoutine = async () => {
    if (!routineName.trim()) {
      setError('Please enter a routine name');
      return;
    }
    
    if (exercises.length === 0) {
      setError('Please add at least one exercise');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      if (routineId === 'new') {
        await addRoutine({
          name: routineName.trim(),
          exercises: exercises
        });
      } else {
        await updateRoutine(routineId, {
          name: routineName.trim(),
          exercises: exercises
        });
      }
      navigate('/routines');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  
  const deleteRoutine = async () => {
    if (window.confirm('Are you sure you want to delete this routine?')) {
      setSaving(true);
      try {
        await deleteRoutineFromDB(routineId);
        navigate('/routines');
      } catch (err) {
        setError(err.message);
      } finally {
        setSaving(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={routineId === 'new' ? 'New Routine' : 'Edit Routine'} 
        showBack 
      />
      
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        <div className="space-y-6">
          <Card>
            <Input
              label="Routine Name"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              placeholder="e.g., Push Day, Leg Day"
              required
            />
          </Card>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Exercises</h2>
            
            {exercises.length === 0 ? (
              <Card>
                <p className="text-center text-gray-500">No exercises added yet</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {exercises.map((exercise, index) => (
                  <Card key={exercise.id}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveExercise(index, 'up')}
                          disabled={index === 0}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => moveExercise(index, 'down')}
                          disabled={index === exercises.length - 1}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <div className="flex-1">
                        <button
                          onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
                          className="text-left w-full"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{exercise.name}</span>
                            {exercise.sets && exercise.reps && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {exercise.sets}×{exercise.reps}
                              </span>
                            )}
                          </div>
                        </button>
                        
                        {expandedExercise === exercise.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <Input
                                label="Sets"
                                type="number"
                                value={exercise.sets || ''}
                                onChange={(e) => updateExerciseField(exercise.id, 'sets', parseInt(e.target.value) || '')}
                                placeholder="e.g., 4"
                              />
                              <Input
                                label="Reps"
                                value={exercise.reps || ''}
                                onChange={(e) => updateExerciseField(exercise.id, 'reps', e.target.value)}
                                placeholder="e.g., 8-10"
                              />
                            </div>
                            <Input
                              label="Rest Period"
                              value={exercise.rest || ''}
                              onChange={(e) => updateExerciseField(exercise.id, 'rest', e.target.value)}
                              placeholder="e.g., 90 sec"
                            />
                            <Input
                              label="Day (Optional)"
                              value={exercise.day || ''}
                              onChange={(e) => updateExerciseField(exercise.id, 'day', e.target.value)}
                              placeholder="e.g., Monday & Friday"
                            />
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => deleteExercise(exercise.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            <Card className="mt-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Exercise name"
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
        <div className="max-w-4xl mx-auto flex gap-3">
          {routineId !== 'new' && (
            <Button
              onClick={deleteRoutine}
              variant="danger"
              fullWidth
              disabled={saving}
            >
              Delete Routine
            </Button>
          )}
          <Button
            onClick={saveRoutine}
            variant="primary"
            fullWidth
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Routine'}
          </Button>
        </div>
      </div>
    </div>
  );
}
