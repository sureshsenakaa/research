// ==========================================
// Urbanscapes-LK: Utility Functions
// ==========================================

/**
 * Format a number as Sri Lankan Rupees
 * @param {number} value - The value to format
 * @returns {string} Formatted string e.g. "Rs. 18,500,000"
 */
export function formatCurrency(value) {
  if (value >= 1000000) {
    return `Rs. ${(value / 1000000).toFixed(1)}M`;
  }
  return `Rs. ${value.toLocaleString('en-LK')}`;
}

/**
 * Format a full currency value without abbreviation
 * @param {number} value
 * @returns {string} e.g. "Rs. 18,500,000"
 */
export function formatCurrencyFull(value) {
  return `Rs. ${value.toLocaleString('en-LK')}`;
}

/**
 * Format area in square kilometers
 * @param {number} sqkm - Area in km²
 * @returns {string} e.g. "142.5 km²"
 */
export function formatArea(sqkm) {
  return `${sqkm.toFixed(1)} km²`;
}

/**
 * Format area in perches
 * @param {number} perches
 * @returns {string} e.g. "12.5 perches"
 */
export function formatPerches(perches) {
  return `${perches.toFixed(1)} perches`;
}

/**
 * Generate a color from a cool-warm gradient based on value
 * @param {number} value - Current value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {string} HSL color string
 */
export function getHeatColor(value, min, max) {
  const ratio = (value - min) / (max - min);
  // From cyan (180) to red (0) through yellow
  const hue = (1 - ratio) * 180;
  return `hsl(${hue}, 85%, 55%)`;
}

/**
 * Normalize an array of weights to sum to 100
 * @param {Object} weights - Object with numeric values
 * @returns {Object} Normalized weights summing to 100
 */
export function normalizeWeights(weights) {
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
  if (total === 0) return weights;
  const normalized = {};
  for (const [key, val] of Object.entries(weights)) {
    normalized[key] = Math.round((val / total) * 100);
  }
  return normalized;
}

/**
 * Format a timestamp to relative time
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} e.g. "2 hours ago"
 */
export function formatRelativeTime(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${diffDays}d ago`;
}

/**
 * Get severity color based on alert severity
 * @param {string} severity - 'critical', 'high', 'medium', 'low'
 * @returns {string} Hex color
 */
export function getSeverityColor(severity) {
  const colors = {
    critical: '#ff4757',
    high: '#ff6348',
    medium: '#ffa502',
    low: '#2ed573',
  };
  return colors[severity] || '#adb5bd';
}

/**
 * Interpolate between two values
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Progress (0-1)
 * @returns {number}
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Clamp a value between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
