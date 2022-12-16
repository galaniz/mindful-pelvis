/**
 * Site data
 */

/* Imports */

const { getPermalink } = require('../utils/base')

/* Data */

module.exports = {
  title: 'The Mindful Pelvis',
  description: 'Ontario pelvic health physiotherapy and women\'s health education',
  themeColor: '#f4eae0',
  styles: `${getPermalink('', true)}/assets/css/mp.css`,
  env: process.env.NODE_ENV
}
