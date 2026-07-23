import Activity from '../models/Activity.js';

export const logActivity = async (userId, actionType, title, details = '', link = '/dashboard') => {
  try {
    await Activity.create({
      user: userId,
      actionType,
      title,
      details,
      link
    });
  } catch (error) {
    console.error('[Activity Logging Error]:', error.message);
  }
};
