/* 
 * QUOTA SERVICE (Neural Governance Engine V1.0)
 * Enforces the 3-Tier subscription model and daily/weekly usage caps.
 */

import { profileService } from './profileService';

export const quotaService = {
  // CONFIGURATION SYNCED WITH PM REQUEST: plan_type logic (0, 1, 2)
  TIERS: {
    0: {
      name: 'Tier 1 (Free)',
      cv_weekly_limit: 2,
      max_life_days: 14,
      keyword_limit: 5,
      features: ['Basic Templates', 'PDF Ingestion']
    },
    1: {
      name: 'Tier 2 ($19)',
      cv_weekly_limit: 6,
      cv_daily_limit: 3,
      keyword_limit: 15,
      features: ['Pro Templates', 'LinkedIn Sync', 'Aesthetic Presets']
    },
    2: {
      name: 'Tier 3 ($49)',
      cv_weekly_limit: Infinity,
      cv_daily_limit: Infinity,
      keyword_limit: Infinity,
      features: ['Unlimited Everything', 'All Templates', 'Neural Suggester', 'Cover Letter AI']
    }
  },

  /**
   * Checks if a user is currently locked out (Tier 0 > 14 days).
   */
  async checkLockoutStatus(profile) {
    if (!profile || profile.plan_type !== 0) return false;
    
    // Safety check if created_at is missing
    if (!profile.created_at) return false;

    const createdAt = new Date(profile.created_at);
    const now = new Date();
    const diffTime = Math.abs(now - createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > this.TIERS[0].max_life_days;
  },

  /**
   * Calculates usage stats based on activity logs.
   * Note: bridge to Supabase 'user_activity' table.
   */
  async getUsageStats(userId) {
    try {
        // Here we will eventually connect to supabase.
        // For now, returning safe defaults. The PM will sync this with n8n.
        return {
          weeklyCount: 0, 
          dailyCount: 0,
          lastUsage: null
        };
    } catch (error) {
        console.error('Error fetching usage stats:', error);
        // Fail-safe to allow action if DB is unreachable to prevent hard blocker
        return { weeklyCount: 0, dailyCount: 0, lastUsage: null };
    }
  },

  /**
   * Gatekeeper: Determines if a user can perform a CV action.
   */
  async canPerformAction(profile, actionId = 'CV_EXPORT') {
    // Determine user plan (default to 0 if undefined)
    const planType = (profile && profile.plan_type !== undefined) ? profile.plan_type : 0;
    
    // Super user or Tier 3 (plan_type 2) bypasses limits
    if ((profile && profile.is_admin) || planType === 2) {
      return { can: true };
    }

    // Enforce 14-day lock for Free tier (plan_type 0)
    if (planType === 0) {
      const isLocked = await this.checkLockoutStatus(profile);
      if (isLocked) {
        return { can: false, reason: 'ACCOUNT_LOCKED', limit: this.TIERS[0].max_life_days };
      }
    }

    const stats = await this.getUsageStats(profile.id);
    const tier = this.TIERS[planType] || this.TIERS[0];

    // Weekly Check
    if (stats.weeklyCount >= tier.cv_weekly_limit) {
      return { can: false, reason: 'WEEKLY_LIMIT', limit: tier.cv_weekly_limit };
    }

    // Daily Check (Tier 1 has a daily limit)
    if (tier.cv_daily_limit && stats.dailyCount >= tier.cv_daily_limit) {
      return { can: false, reason: 'DAILY_LIMIT', limit: tier.cv_daily_limit };
    }

    return { can: true };
  },

  /**
   * Keyword Limit Enforcement
   */
  getKeywordLimit(planType) {
    const pType = (planType !== undefined) ? planType : 0;
    return this.TIERS[pType]?.keyword_limit || this.TIERS[0].keyword_limit;
  }
};
