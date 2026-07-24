/**
 * ShipFlowX - Centralized Application Configuration
 * Contains general branding, API connection URLs, and client preferences.
 */
export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'ShipFlowX',
  appVersion: '1.0.0',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  companyName: import.meta.env.VITE_COMPANY_NAME || 'ShipFlowX Inc.',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@shipflowx.com',
  defaultTheme: 'dark',
  paginationSize: 10,
  defaultLanguage: 'en',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  tokenKey: 'shipflowx_token'
};

export default appConfig;
