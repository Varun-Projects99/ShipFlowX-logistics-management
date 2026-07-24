/**
 * ShipFlowX - API Route Endpoints Constants
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  TRIPS: {
    BASE: '/trips',
    BY_ID: (id) => `/trips/${id}`,
    DUPLICATE: (id) => `/trips/${id}/duplicate`,
    ARCHIVE: (id) => `/trips/${id}/archive`,
    FAVORITE: (id) => `/trips/${id}/favorite`
  },
  MEMORIES: {
    BASE: '/memories',
    BY_ID: (id) => `/memories/${id}`,
    FAVORITE: (id) => `/memories/${id}/favorite`
  },
  PHOTOS: {
    BASE: '/photos',
    BY_ID: (id) => `/photos/${id}`,
    UPLOAD: '/photos/upload',
    FAVORITE: (id) => `/photos/${id}/favorite`
  },
  FAVORITES: {
    BASE: '/favorites',
    TOGGLE: '/favorites/toggle'
  },
  STATS: {
    DASHBOARD: '/stats/dashboard',
    ANALYTICS: '/stats/analytics'
  },
  SEARCH: {
    GLOBAL: '/search'
  },
  USER: {
    PROFILE: '/user/profile',
    PASSWORD: '/user/password',
    EXPORT: '/user/export-data',
    DATA: '/user/data'
  }
};

export default API_ENDPOINTS;
