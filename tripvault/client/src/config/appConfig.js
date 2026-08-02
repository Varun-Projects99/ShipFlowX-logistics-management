/**
 * TripVault - Centralized Application Configuration
 * Contains general branding, API connection URLs, and client preferences.
 */
export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'TripVault',
  appVersion: '2.0.0', // Finalized Week 2 Release
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  companyName: import.meta.env.VITE_COMPANY_NAME || 'TripVault Inc.',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@tripvault.com',
  defaultTheme: 'dark',
  paginationSize: 10,
  defaultLanguage: 'en',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  tokenKey: 'tripvault_token'
};

export default appConfig;
