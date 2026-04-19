// Runtime configuration injection
// This file is loaded before the main script and sets the webhook URL
// from environment variables (via Vercel's build process) or from a fallback

(function() {
  // In production on Vercel, this placeholder gets replaced during build
  // See build.js and vercel.json for the substitution logic
  window.QUESTIONNAIRE_WEBHOOK_URL = 'https://hook.eu2.make.com/uk8tvqsbrpo7n60yk8lely3r6hgo9ijt';
})();
