/**
 * Site data
 */

/* Imports */

const { getPermalink } = require('../utils/base')

const namespace = 'mp'
const assetsLink = `${getPermalink('', true)}/assets/`

/* Data */

module.exports = {
  title: 'The Mindful Pelvis',
  metaDescription: 'Ontario pelvic health physiotherapy and women\'s health education',
  theme: {
    primary: {
      base: '#3c6e89',
      light: '#9e5330'
    },
    foreground: {
      base: '#4b4f54',
      dark: '#333f48'
    },
    background: {
      base: '#e5ebec',
      light: '#ffffff',
      dark: '#f4eae0'
    }
  },
  assetsLink,
  styles: `${assetsLink}css/${namespace}.css`,
  scripts: {
    main: `${assetsLink}js/${namespace}.js`,
    compat: `${assetsLink}js/${namespace}-compat.js`
  },
  env: process.env.NODE_ENV,
  context: process.env.CONTEXT
}
