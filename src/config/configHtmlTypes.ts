/**
 * Config - Html Types
 */

export interface ConfigOptions {
  [key: string]: string
}

export interface ConfigVars {
  theme: ConfigOptions
  email: string
  head: string
  svg: {
    [key: string]: {
      viewBox: string
      output: string
    }
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
