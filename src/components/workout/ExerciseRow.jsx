import React, { useState } from 'react';
import { TrashIcon, PlusIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { SetRow } from './SetRow';
import { Button } from '../ui/Button';
import { generateId } from '../../utils/id';

export function ExerciseRow({ exercise, onUpdate, onDelete, readOnly = false }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const addSet = () => {
    const newSet = {
      id: generateId(),
      weight: '',
      reps: ''
    };
    onUpdate({
      ...exercise,
      sets: [...exercise.sets, newSet]
    });
  };
  
  const updateSet = (setId, updatedSet) => {
    onUpdate({
      ...exercise,
      sets: exercise.sets.map(s => s.id === setId ? updatedSet : s)
    });
  };
  
  const deleteSet = (setId) => {
    onUpdate({
      ...exercise,
      sets: exercise.sets.filter(s => s.id !== setId)
    });
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
            {exercise.plannedSets && exercise.plannedReps && (
              <p className="text-xs text-gray-500">
                Target: {exercise.plannedSets} sets × {exercise.plannedReps} reps
                {exercise.rest && ` • Rest: ${exercise.rest}`}
                {exercise.day && ` • ${exercise.day}`}
              </p>
            )}
          </div>
          <span className="text-sm text-gray-500">({exercise.sets.length} sets done)</span>
        </div>
        
        {!readOnly && (
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {isExpanded && (
        <div className="space-y-2">
          <div className="flex gap-2 text-xs font-medium text-gray-500 px-2">
            <span className="w-8"></span>
            <span className="flex-1 text-center">Weight (lbs)</span>
            <span className="flex-1 text-center">Reps</span>
            {!readOnly && <span className="w-9"></span>}
          </div>
          
          {exercise.sets.map((set, index) => (
            <SetRow
              key={set.id}
              set={set}
              index={index}
              onUpdate={(updatedSet) => updateSet(set.id, updatedSet)}
              onDelete={() => deleteSet(set.id)}
              readOnly={readOnly}
            />
          ))}
          
          {!readOnly && (
            <Button
              onClick={addSet}
              variant="ghost"
              size="sm"
              fullWidth
              className="mt-2"
            >
              <PlusIcon className="w-4 h-4 inline mr-1" />
              Add Set
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
