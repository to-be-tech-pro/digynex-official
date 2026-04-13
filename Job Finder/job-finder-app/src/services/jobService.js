/* 
 * JOB SERVICE (Modular V1.0 - Commercial SaaS Architecture)
 * Responsible for fetching discovered jobs and personal applications from Supabase.
 * Strictly follows Rule 1: Engine first.
 */
import { supabase } from '../lib/supabase';

export const jobService = {
  /**
   * Fetches real-time job matches (Discovery Stream) from the database.
   */
  async getDiscoveryJobs() {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('status', 'discovery')
      .eq('is_active', true)
      .order('match_score', { ascending: false });

    if (error) {
      console.error('Job Engine Discovery Error:', error.message);
      return [];
    }
    return data;
  },

  /**
   * Fetches user-specific job applications.
   * @param {string} userEmail - Used to link with user_activity or personal logs.
   */
  async getMyApplications(userEmail) {
    if (!userEmail) return [];
    
    // In a full implementation, we'd have a 'user_jobs' join table.
    // For now, we'll return discovery jobs that the user has interacted with
    // in the 'user_activity' table, or simply return a subset.
    const { data, error } = await supabase
      .from('user_activity')
      .select('details')
      .eq('user_id', userEmail)
      .eq('action', 'JOB_APPLY');

    if (error) {
       console.error('Job Engine Pipeline Error:', error.message);
       return [];
    }
    
    return data.map(log => log.details);
  }
};
