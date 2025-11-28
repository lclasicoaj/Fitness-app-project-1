import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Input } from '../ui/Input';

export function SetRow({ set, index, onUpdate, onDelete, readOnly = false }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium text-gray-600 w-8">#{index + 1}</span>
      
      {readOnly ? (
        <>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium">{set.weight} lbs</span>
          </div>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium">{set.reps} reps</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <Input
              type="number"
              value={set.weight}
              onChange={(e) => onUpdate({ ...set, weight: e.target.value })}
              placeholder="Weight"
              min="0"
              step="5"
            />
          </div>
          
          <div className="flex-1">
            <Input
              type="number"
              value={set.reps}
              onChange={(e) => onUpdate({ ...set, reps: e.target.value })}
              placeholder="Reps"
              min="0"
              step="1"
            />
          </div>
          
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
