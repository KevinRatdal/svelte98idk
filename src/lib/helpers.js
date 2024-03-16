

/**
 * @param {number} x Base number
 * @param {number} y Number
 */
export function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

/**
   * @param {number} value number value
   * @returns {string} color
   */
export function numberColor(value) {
  const index = getBaseLog(2, value);
  const colorOpts = [
    '',
    'gray',
    'black',
    'green',
    'blue',
    'seagreen',
    'purple',
    'navy',
    'mediumvioletred',
    'maroon',
    'firebrick',
    'red',
    'purple',
    'purple',
    'purple'
  ];
  return colorOpts.at(index) ?? '';
}

/**
   * @param {number} value number value
   * @returns {string} font size
   */
 export function fontSize(value) {
  let i = String(value).length - 1;

  const opts = ['2.4em', '2.4em', '2em', '1.6em', '1em', '1em'];
  if (i === -1 || i >= opts.length) i = 0;
  return opts[i];
}