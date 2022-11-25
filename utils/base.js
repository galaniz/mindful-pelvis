/**
 * Base variables and functions
 */

/* Meta data by content type */

const meta = {
  page: {
    slugBase: '/'
  }
}

/* Return slug with base from meta data */

const getSlug = (contentType = 'page', slug = '') => {
  const slugBase = meta[contentType].slugBase

  return slugBase + slug
}

/* Return absolute url */

const getPermalink = (slug = '') => {
  const env = process.env.NODE_ENV
  let url = 'http://localhost:8000'

  if (env === 'production') {
    url = 'https://the-mindful-pelvis.netlify.app'
  }

  if (env === 'preview') {
    url = 'https://preview-the-mindful-pelvis.netlify.app'
  }

  return url + slug
}

/* Exports */

module.exports = {
  meta,
  getSlug,
  getPermalink
}
