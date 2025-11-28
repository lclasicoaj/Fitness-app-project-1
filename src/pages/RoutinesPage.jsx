import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { RoutineListItem } from '../components/routine/RoutineListItem';
import { useRoutines } from '../hooks/useSupabase';

export function RoutinesPage() {
  const navigate = useNavigate();
  const { routines, loading } = useRoutines();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Routines" showBack />
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
      <PageHeader 
        title="Routines" 
        showBack 
        action={
          <Button
            onClick={() => navigate('/routines/new')}
            size="sm"
          >
            <PlusIcon className="w-4 h-4 inline mr-1" />
            New
          </Button>
        }
      />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {routines.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No routines yet</p>
            <Button onClick={() => navigate('/routines/new')}>
              Create Your First Routine
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {routines.map((routine) => (
              <RoutineListItem
                key={routine.id}
                routine={routine}
                onClick={() => navigate(`/routines/${routine.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
