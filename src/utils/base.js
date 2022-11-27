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

const getPermalink = (slug = '', asset = false) => {
  const env = process.env.NODE_ENV
  let url = 'http://localhost:8080'

  if (env === 'production') {
    url = 'https://themindfulpelvis.ca'
  }

  if (env === 'preview') {
    url = 'https://previewthemindfulpelvis.netlify.app'
  }

  if (asset && process.env.CONTEXT === 'deploy-preview') {
    url = '.'
  }

  return url + slug
}

/* Exports */

module.exports = {
  meta,
  getSlug,
  getPermalink
}
