import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Card } from '../ui/Card';

export function RoutineListItem({ routine, onClick }) {
  return (
    <Card onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{routine.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {routine.exercises.length} exercise{routine.exercises.length !== 1 ? 's' : ''}
          </p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
      </div>
    </Card>
  );
}
