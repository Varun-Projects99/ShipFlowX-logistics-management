/**
 * ShipFlowX - General Reusable Helper Functions
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const safeJsonParse = (jsonString, fallback = {}) => {
  try {
    return JSON.parse(jsonString) || fallback;
  } catch (err) {
    return fallback;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default { truncateText, safeJsonParse, debounce };
