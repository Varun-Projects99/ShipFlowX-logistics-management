/**
 * ShipFlowX - Unique Tracking Number Generator Utility
 */
export const generateTrackingNumber = (carrier = 'SFX') => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randStr = '';
  for (let i = 0; i < 9; i++) {
    randStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${carrier}-${randStr}-${Date.now().toString().slice(-4)}`;
};

export default { generateTrackingNumber };
