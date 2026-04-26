/* 
 * JOB SERVICE (Modular V1.0 - Commercial SaaS Architecture)
 * Responsible for fetching discovered jobs and personal applications from Supabase.
 * Strictly follows Rule 1: Engine first.
 */
import { supabase } from '../lib/supabase';

export const jobService = {
  /**
   * Triggers the Neural Engine (n8n) Scraper for real-time discovery.
   * @param {string} keyword - Search term (e.g., 'Developer')
   * @param {string} country - Country code (e.g., 'gb')
   * @param {string} email - User identifier for quota tracking
   */
  async searchJobs(keyword, country, email, city = '') {
    const webhookUrl = import.meta.env.VITE_N8N_SCRAPER_WEBHOOK;
    if (!webhookUrl) {
      console.error('Neural Scraper Error: Webhook URL not configured in .env');
      return [];
    }

    try {
      const response = await fetch(`${webhookUrl}?q=${encodeURIComponent(keyword)}&country=${encodeURIComponent(country)}&email=${encodeURIComponent(email)}&city=${encodeURIComponent(city)}`);
      if (!response.ok) throw new Error('Neural Scraper Connection Failure');
      return await response.json();
    } catch (err) {
      console.error('Job Engine Search Error:', err.message);
      return [];
    }
  },

  /**
   * Fetches real-time role suggestions using a Hybrid Neural Engine.
   * Primary: ESCO Global Occupation Taxonomy (Truly Global)
   * Secondary: Supabase Neural Cache (Platform Discovery)
   * @param {string} term - Partial role name
   */
  async getRoleSuggestions(term) {
    if (!term || term.length < 2) return [];

    try {
      // 1. Fetch from ESCO (Truly Global Discovery)
      const escoUrl = `https://ec.europa.eu/esco/api/search?language=en&type=occupation&text=${encodeURIComponent(term)}&limit=10`;
      
      const [escoRes, cacheRes] = await Promise.allSettled([
        fetch(escoUrl).then(r => r.json()),
        supabase.rpc('discover_roles', { search_term: term })
      ]);

      let suggestions = [];

      // Extract ESCO results
      if (escoRes.status === 'fulfilled' && escoRes.value?._embedded?.results) {
        suggestions = escoRes.value._embedded.results.map(r => r.title);
      }

      // Extract Cache results as fallback/boost
      if (cacheRes.status === 'fulfilled' && !cacheRes.value.error) {
        const cacheTitles = cacheRes.value.data.map(row => row.role);
        suggestions = [...new Set([...suggestions, ...cacheTitles])];
      }

      return suggestions.slice(0, 5);
    } catch (err) {
      console.error('Hybrid Discovery Error:', err);
      return [];
    }
  },

  /**
   * Fetches real-time job matches (Discovery Stream) from the latest neural cache.
   * @param {string} country - Optional country name to filter cache (e.g., 'Sweden')
   */
  async getDiscoveryJobs(country = null) {
    const countryCodeMap = {
      'sweden': 'se',
      'germany': 'de',
      'united kingdom': 'gb',
      'norway': 'no',
      'finland': 'fi',
      'denmark': 'dk',
      'sri lanka': 'lk',
      'united states': 'us',
      'canada': 'ca',
      'australia': 'au',
      'france': 'fr',
      'netherlands': 'nl'
    };
    
    // We grab the most recent scrape result to populate the dashboard on load
    let query = supabase
      .from('job_scrapes')
      .select('jobs, search_key')
      .order('created_at', { ascending: false });

    if (country) {
      const code = countryCodeMap[country.toLowerCase()] || country.toLowerCase();
      query = query.ilike('search_key', `%_${code}%`);
    }

    const { data, error } = await query.limit(1).maybeSingle();

    if (error) {
      console.error('Job Engine Discovery Error:', error.message);
      return [];
    }
    
    if (!data) return [];

    // Map JSONB structure to UI format
    return (data.jobs || []).map(j => ({
       id: j.id,
       company: j.company,
       role: j.title || j.role,
       location: j.location,
       match_score: j.match_score || 0,
       posted_at: 'Recently Discovered',
       hex_color: '#0A2647',
       description: j.description
    }));
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
