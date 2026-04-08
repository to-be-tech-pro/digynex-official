const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'file:///d:/Amila/With%20Antigravity/DigyNex-Official/Job%20Finder/reports/JOB_FINDER_LUXE_REPORT.html';
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: 'd:/Amila/With Antigravity/DigyNex-Official/Job Finder/reports/AI_JOB_FINDER_MASTER_PLAN_NEW.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });
    await browser.close();
    console.log('PDF Generated Successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();
