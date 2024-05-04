// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wwetgcygxxltafxrxvgr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3ZXRnY3lneHhsdGFmeHJ4dmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MTIwNDIsImV4cCI6MjAzMDM4ODA0Mn0.g6b12CJAKXQT1QkW1Pm2p4J_WvPyJgOZRHMNg5jMfNA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
