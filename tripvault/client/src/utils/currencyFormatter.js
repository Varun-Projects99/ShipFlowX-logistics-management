/**
 * ShipFlowX - Currency Formatting Utility
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount === undefined || amount === null) return '';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch (err) {
    return `${currency} ${amount}`;
  }
};

export default { formatCurrency };
