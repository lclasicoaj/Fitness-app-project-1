import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Card } from '../ui/Card';

export function WorkoutHistoryItem({ workout, onClick }) {
  const dateString = workout.created_at || workout.date;
  const date = new Date(dateString);
  
  const formattedDate = isNaN(date.getTime()) 
    ? 'Invalid Date' 
    : date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
  
  const totalSets = workout.exercises.reduce((sum, ex) => sum + (ex.sets?.length || 0), 0);
  
  return (
    <Card onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{formattedDate}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''} · {totalSets} sets
          </p>
          {workout.routineName && (
            <p className="text-xs text-blue-600 mt-1">From: {workout.routineName}</p>
          )}
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
      </div>
    </Card>
  );
}
