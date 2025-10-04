// Currency formatting utilities

/**
 * Format price in Indian Rupees
 * @param {number} price - The price to format
 * @param {boolean} showSymbol - Whether to show the ₹ symbol
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, showSymbol = true) => {
  if (price === null || price === undefined || isNaN(price)) {
    return showSymbol ? '₹0.00' : '0.00';
  }
  
  const formattedPrice = price.toFixed(2);
  return showSymbol ? `₹${formattedPrice}` : formattedPrice;
};

/**
 * Format price for display in product cards and lists
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatProductPrice = (price) => {
  return formatPrice(price, true);
};

/**
 * Format price for cart totals and checkout
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatTotalPrice = (price) => {
  return formatPrice(price, true);
};

/**
 * Convert USD to INR (approximate rate)
 * @param {number} usdPrice - Price in USD
 * @param {number} exchangeRate - Exchange rate (default: 83.5)
 * @returns {number} Price in INR
 */
export const convertUsdToInr = (usdPrice, exchangeRate = 83.5) => {
  return usdPrice * exchangeRate;
};
