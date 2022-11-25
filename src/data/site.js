/**
 * Site data
 */

/* Imports */

const { getPermalink } = require('../utils/base')

/* Data */

module.exports = {
  title: 'The Mindful Pelvis',
  themeColor: '#f4eae0',
  styles: `${getPermalink('', true)}/assets/css/mp.css`
}
