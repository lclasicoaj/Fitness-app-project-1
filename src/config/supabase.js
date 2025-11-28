import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://txflrtcvfbbfhepmaxxk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4ZmxydGN2ZmJiZmhlcG1heHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzI4OTMsImV4cCI6MjA3OTgwODg5M30.vsH0xbZarfzb_GOxsqyC1snQRl6cMsxLCr6l5JCRjuQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
