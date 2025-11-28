import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for fetching shared routines from Supabase
 * All users can see and use the same routines
 */
export function useRoutines() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchRoutines = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('routines')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setRoutines(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching routines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [user]);

  const addRoutine = async (routine) => {
    try {
      const { data, error: insertError } = await supabase
        .from('routines')
        .insert([routine])
        .select()
        .single();

      if (insertError) throw insertError;
      setRoutines([data, ...routines]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRoutine = async (id, updates) => {
    try {
      const { data, error: updateError } = await supabase
        .from('routines')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      setRoutines(routines.map((r) => (r.id === id ? data : r)));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRoutine = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from('routines')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setRoutines(routines.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    routines,
    loading,
    error,
    addRoutine,
    updateRoutine,
    deleteRoutine,
  };
}

/**
 * Custom hook for fetching user-specific workouts from Supabase
 * Each user can only see their own workouts
 */
export function useWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('workouts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setWorkouts(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching workouts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [user]);

  const addWorkout = async (workout) => {
    try {
      const { data, error: insertError } = await supabase
        .from('workouts')
        .insert([{ ...workout, user_id: user.id }])
        .select()
        .single();

      if (insertError) throw insertError;
      setWorkouts([data, ...workouts]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateWorkout = async (id, updates) => {
    try {
      const { data, error: updateError } = await supabase
        .from('workouts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;
      setWorkouts(workouts.map((w) => (w.id === id ? data : w)));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteWorkout = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;
      setWorkouts(workouts.filter((w) => w.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    workouts,
    loading,
    error,
    addWorkout,
    updateWorkout,
    deleteWorkout,
  };
}
