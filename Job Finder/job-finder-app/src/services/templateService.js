/* 
 * TEMPLATE SERVICE (Modular V1.0 - Commercial SaaS Architecture)
 * Orchestrates CV Template selection, DB persistence, and High-Fidelity specimen rendering.
 * Strictly follows ORFL Separation of Concerns.
 */
import { supabase } from '../lib/supabase'
import { profileService } from './profileService'

export const templateService = {
  /**
   * Fetches the complete list of available CV templates from the database.
   */
  async getTemplates() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching templates:', error.message);
      return [];
    }
    return data;
  },

  /**
   * Persists the user's selected template choice to their global profile.
   */
  async setSelectedTemplate(user, templateId) {
    if (!user) return { error: 'No authenticated user available for sync' };
    
    return await profileService.syncProfile(user, {
      selectedTemplate: templateId
    });
  },

  /**
   * High-Fidelity Specimen Engine: Fetches and paints HTML specimens with custom branding.
   * This provides the "Visual Confidence" needed for conversion.
   */
  async getSpecimenHtml(templateId, colors, profile) {
    const templateMap = {
      1: 'specimen-classic-elite.html',
      2: 'specimen-sidebar-modern.html',
      3: 'specimen-executive-one.html',
      4: 'specimen-minimalist-pure.html',
      5: 'specimen-sidebar-modern.html', // Fallback for Titan Prime
      6: 'specimen-minimalist-pure.html'  // Fallback for Nano Clean
    };

    const fileName = templateMap[templateId] || 'specimen-classic-elite.html';
    
    try {
      const response = await fetch(`/templates/${fileName}`);
      if (!response.ok) throw new Error(`Template load error: ${response.status}`);
      let html = await response.text();

      // Neural Aesthetic Injection (Viewport & Branding Calibration)
      const styleInjection = `
        <style>
          :root {
            --cv-primary: ${colors.primary || '#0A2647'} !important;
            --cv-secondary: ${colors.secondary || '#C1A172'} !important;
          }
          body, html { 
            margin: 0 !important; 
            padding: 0 !important; 
            overflow: hidden !important;
            width: 100%;
            height: 100%;
            -webkit-print-color-adjust: exact;
          }
          .page {
              box-shadow: none !important;
              margin: 0 auto !important;
              width: 210mm !important;
              height: 297mm !important;
          }
          /* High-Fidelity Scrollbar Suppression */
          ::-webkit-scrollbar { display: none; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
        </style>
      `;
      
      html = html.replace('</head>', `${styleInjection}</head>`);

      // Identity Engine Injection (Surgical Placeholder Swap)
      // We only override the specimen content if the user has provided real identity data.
      // This preserves the "WOW" factor of the specimens by default.
      if (profile && profile.basic) {
          const fullName = profile.basic.fullName;
          const headline = profile.basic.headline;
          const email = profile.basic.email;

          if (fullName) {
              html = html.replace(/\[FULL_NAME\]/g, fullName);
              html = html.replace(/AMILA PERERA/g, fullName);
          }
          if (headline) {
              html = html.replace(/\[HEADLINE\]/g, headline);
              html = html.replace(/Project Manager \| Telecommunication Strategist/g, headline);
              html = html.replace(/Senior Project Manager \| Telco Strategist/g, headline);
              html = html.replace(/Project Manager/g, headline);
          }
          if (email) {
              html = html.replace(/\[EMAIL\]/g, email);
              html = html.replace(/amilawijayantha858@gmail.com/g, email);
              html = html.replace(/amila\.p@workmail\.com/g, email);
          }
      }

      // 3. Neural Keyword Injection (Surgical Stealth Divider Sync)
      if (profile && profile.secretKeywords) {
          const keywords = Array.isArray(profile.secretKeywords) 
              ? profile.secretKeywords.join(' ') 
              : profile.secretKeywords;
          
          html = html.replace(/PROJECT MANAGER TELECOM 5G PMP SWEDEN ARTHA TESHAN DIALOG PMO AI CLOUD PYTHON JAVA SCRUM AGILE NFV SDN/g, keywords);
      }
      
      return html;
    } catch (error) {
       console.error('Specimen Engine Fail:', error);
       return `
          <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: #0A2647; color: rgba(255,255,255,0.4); font-family: sans-serif; text-align: center; padding: 20px;">
            <div>
              <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
              <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Specimen Preview Unstable</div>
              <div style="font-size: 10px; margin-top: 5px; opacity: 0.5;">Engine Sync Interrupted</div>
            </div>
          </div>
       `;
    }
  },

  /**
   * Cover Letter Specimen Engine: Generates a professional document preview.
   * Matches the user's visual identity for maximum brand coherence.
   */
  async getCoverLetterHtml(text, colors, profile) {
    const primary = colors.primary || '#0A2647';
    const name = profile.basic?.fullName || 'Professional Candidate';
    const email = profile.basic?.email || '';
    const phone = profile.basic?.phone || '';
    const location = profile.basic?.location || '';
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary: ${primary};
          }
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Inter', sans-serif;
            color: #1e293b;
            background: #f1f5f9;
            display: flex;
            justify-content: center;
          }
          .page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            padding: 25mm 30mm;
            box-sizing: border-box;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          .header {
            border-bottom: 2px solid var(--primary);
            padding-bottom: 20px;
            margin-bottom: 40px;
            text-align: left;
          }
          .name {
            font-family: 'Playfair Display', serif;
            font-size: 18pt;
            color: var(--primary);
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 700;
          }
          .contact {
            font-size: 8.5pt;
            color: #64748b;
            margin-top: 8px;
            display: flex;
            gap: 15px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .date {
            margin-bottom: 35px;
            font-weight: 600;
            color: #475569;
            font-size: 10pt;
          }
          .content {
            white-space: pre-line;
            color: #334155;
            text-align: justify;
            font-size: 10.5pt;
            line-height: 1.8;
          }
          .footer {
            margin-top: 60px;
          }
          .sign-off {
            margin-top: 10px;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
            font-size: 12pt;
            color: var(--primary);
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <h1 class="name">${name}</h1>
            <div class="contact">
              ${email ? `<span>${email}</span>` : ''}
              ${phone ? `<span>${phone}</span>` : ''}
              ${location ? `<span>${location}</span>` : ''}
            </div>
          </div>
          <div class="date">${date}</div>
          <div class="content">${text || 'Waiting for AI to synthesize your professional profile into a cover letter specimen...'}</div>
          <div class="footer">
            <div>Sincerely,</div>
            <div class="sign-off">${name}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};
