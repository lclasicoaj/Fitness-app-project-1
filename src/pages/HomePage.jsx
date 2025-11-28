import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayIcon, ClipboardDocumentListIcon, ClockIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const menuItems = [
    {
      title: 'Start Workout',
      description: 'Begin a new workout session',
      icon: PlayIcon,
      path: '/start-workout',
      color: 'text-blue-600'
    },
    {
      title: 'Routines',
      description: 'Manage your workout routines',
      icon: ClipboardDocumentListIcon,
      path: '/routines',
      color: 'text-green-600'
    },
    {
      title: 'Workout History',
      description: 'View past workouts',
      icon: ClockIcon,
      path: '/history',
      color: 'text-purple-600'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Workout Tracker" />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {user && (
          <div className="mb-6 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
            <span className="text-sm text-blue-900">
              Logged in as <span className="font-semibold">{user.email}</span>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
        
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Card key={item.path} onClick={() => navigate(item.path)}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gray-100 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
