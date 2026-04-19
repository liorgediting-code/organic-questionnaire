// Runtime configuration injection
// This file is loaded before the main script and sets the webhook URL
// from environment variables (via Vercel's build process) or from a fallback

(function() {
  // In production on Vercel, this placeholder gets replaced during build
  // See build.js and vercel.json for the substitution logic
  window.QUESTIONNAIRE_WEBHOOK_URL = '__WEBHOOK_URL_PLACEHOLDER__';

  // If placeholder wasn't replaced (local dev), warn in console
  if (window.QUESTIONNAIRE_WEBHOOK_URL.indexOf('PLACEHOLDER') !== -1) {
    console.warn('Webhook URL not configured. Set WEBHOOK_URL in Vercel environment variables.');
    window.QUESTIONNAIRE_WEBHOOK_URL = null;
  }
})();
