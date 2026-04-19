// Build script - runs during Vercel deploy to inject WEBHOOK_URL env variable
const fs = require('fs');
const path = require('path');

const webhookUrl = process.env.WEBHOOK_URL || '';

if (!webhookUrl) {
  console.warn('⚠️  WEBHOOK_URL environment variable is not set!');
  console.warn('   Set it in Vercel dashboard: Settings > Environment Variables');
}

const configPath = path.join(__dirname, 'config.js');
let config = fs.readFileSync(configPath, 'utf8');
config = config.replace('__WEBHOOK_URL_PLACEHOLDER__', webhookUrl);
fs.writeFileSync(configPath, config);

console.log('✓ Build complete. Webhook URL injected into config.js');
