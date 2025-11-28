import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { WorkoutHistoryItem } from '../components/workout/WorkoutHistoryItem';
import { useWorkouts } from '../hooks/useSupabase';

export function WorkoutHistoryPage() {
  const navigate = useNavigate();
  const { workouts, loading } = useWorkouts();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Workout History" showBack />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading workouts...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Workout History" showBack />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {workouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No workouts completed yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {workouts.map((workout) => (
              <WorkoutHistoryItem
                key={workout.id}
                workout={workout}
                onClick={() => navigate(`/history/${workout.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
