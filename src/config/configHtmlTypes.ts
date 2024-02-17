/**
 * Config - Html Types
 */

/**
 * @typedef {Object.<string, string>} ConfigOptions
 */
export interface ConfigOptions {
  [key: string]: string
}

/**
 * @typedef {object} ConfigInsta
 * @prop {string} url
 * @prop {string} src
 * @prop {string} alt
 */
export interface ConfigInsta {
  url: string
  src: string
  alt: string
}

/**
 * @typedef {object} ConfigSvg
 * @prop {string} viewBox
 * @prop {string} output
 */
export interface ConfigSvg {
  viewBox: string
  output: string
}

/**
 * @typedef {object} ConfigVars
 * @prop {ConfigInsta[]} instagramFeed
 * @prop {ConfigOptions} theme
 * @prop {string} email
 * @prop {string} head
 * @prop {Object.<string, ConfigSvg>} svg
 * @prop {object} css
 * @prop {string} css.in
 * @prop {string} css.out
 * @prop {string} css.head
 * @prop {string} css.cache
 * @prop {object} js
 * @prop {string} js.in
 * @prop {string} js.out
 * @prop {number} navHalf
 * @prop {object} options
 * @prop {object} options.button
 * @prop {ConfigOptions} options.button.type
 * @prop {ConfigOptions} options.button.size
 * @prop {ConfigOptions} options.tag
 * @prop {ConfigOptions} options.width
 * @prop {ConfigOptions} options.justify
 * @prop {ConfigOptions} options.align
 * @prop {ConfigOptions} options.order
 * @prop {ConfigOptions} options.layout
 * @prop {ConfigOptions} options.maxWidth
 * @prop {ConfigOptions} options.padding
 * @prop {ConfigOptions} options.gap
 * @prop {ConfigOptions} options.aspectRatio
 * @prop {ConfigOptions} options.borderRadius
 * @prop {object} options.content
 * @prop {ConfigOptions} options.content.text
 * @prop {ConfigOptions} options.content.heading
 * @prop {ConfigOptions} options.content.align
 * @prop {object} options.posts
 * @prop {ConfigOptions} options.posts.contentType
 * @prop {object} options.hero
 * @prop {ConfigOptions} options.hero.type
 * @prop {ConfigOptions} options.hero.background
 */
export interface ConfigVars {
  instagramFeed: ConfigInsta[]
  theme: ConfigOptions
  email: string
  head: string
  svg: {
    [key: string]: ConfigSvg
  }
  css: {
    in: string
    out: string
    head: string
    cache: string
  }
  js: {
    in: string
    out: string
  }
  navHalf: number
  options: {
    button: {
      type: ConfigOptions
      size: ConfigOptions
    }
    tag: ConfigOptions
    width: ConfigOptions
    justify: ConfigOptions
    align: ConfigOptions
    order: ConfigOptions
    layout: ConfigOptions
    maxWidth: ConfigOptions
    padding: ConfigOptions
    gap: ConfigOptions
    aspectRatio: ConfigOptions
    borderRadius: ConfigOptions
    content: {
      text: ConfigOptions
      heading: ConfigOptions
      align: ConfigOptions
    }
    posts: {
      contentType: ConfigOptions
    }
    hero: {
      type: ConfigOptions
      background: ConfigOptions
    }
  }
}
