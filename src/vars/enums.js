/**
 * Vars - enums
 */

/**
 * Namespace
 *
 * @type {string}
 */

const enumNamespace = 'mp'

/**
 * Site info
 *
 * @type {object}
 */

const enumSite = {
  title: 'The Mindful Pelvis',
  email: 'hello@themindfulpelvis.ca',
  meta: {
    description: 'Ontario pelvic health physiotherapy and women\'s health education.',
    image: 'img/mindful-pelvis-meta.jpg'
  }
}

/**
 * Colors
 *
 * @type {object}
 */

const enumColors = {
  primary: {
    base: '#3c6e89',
    light: '#9e5330'
  },
  foreground: {
    base: '#4b4f54',
    dark: '#333f48'
  },
  background: {
    base: '#f4eae0',
    light: '#e5ebec'
  },
  negative: {
    dark: '#8e5050'
  },
  positive: {
    dark: '#536644'
  }
}

/**
 * Contentful content type by ids
 *
 * @type {object}
 */

const enumContentTypes = {
  button: 'button',
  column: 'column',
  container: 'container',
  content: 'content',
  image: 'image',
  navigation: 'navigation',
  navigationItem: 'navigationItem',
  page: 'page',
  redirect: 'redirect'
}

/**
 * Contentful field options
 *
 * @type {object}
 */

const enumOptions = {
  button: {
    type: {
      Main: 'main',
      Secondary: 'secondary'
    },
    size: {
      Default: '',
      Large: 'large'
    }
  },
  tag: {
    Div: 'div',
    Section: 'section',
    'Unordered List': 'ul',
    'Ordered List': 'ol',
    'List Item': 'li',
    Figure: 'figure',
    'Figure Caption': 'figcaption',
    Article: 'article',
    Aside: 'aside',
    Header: 'header',
    Footer: 'footer',
    Address: 'address'
  },
  width: {
    None: '',
    Auto: 'auto',
    '1/1': '1-1',
    '4/5': '4-5',
    '3/4': '3-4',
    '2/3': '2-3',
    '3/5': '3-5',
    '1/2': '1-2',
    '2/5': '2-5',
    '1/3': '1-3',
    '1/4': '1-4',
    '1/5': '1-5',
    '1/6': '1-6'
  },
  justify: {
    None: '',
    Start: 'start',
    Center: 'center',
    End: 'end',
    Spread: 'between'
  },
  align: {
    None: '',
    Start: 'start',
    Center: 'center',
    End: 'end'
  },
  order: {
    Default: '',
    First: 'first',
    'First - Small Screens': 'first-s',
    'First - Medium Screens': 'first-m',
    'First - Large Screens': 'first-l',
    Last: 'last',
    'Last - Small Screens': 'last-s',
    'Last - Medium Screens': 'last-m',
    'Last - Large Screens': 'last-l'
  },
  layout: {
    Column: 'column',
    Row: 'row'
  },
  maxWidth: {
    None: '',
    '1300px': 'container',
    '1160px': 'container-m',
    '800px': 'container-s'
  },
  padding: {
    None: '',
    '5px': '5xs',
    '10px': '4xs',
    '15px': '3xs',
    '20px': '2xs',
    '30px': 'xs',
    '45px': 's',
    '60px': 'm',
    '75px': 'l',
    '90px': 'xl',
    '120px': '2xl',
    '150px': '3xl'
  },
  gap: {
    None: '',
    Default: '',
    '5px': '5xs',
    '10px': '4xs',
    '15px': '3xs',
    '20px': '2xs',
    '30px': 'xs',
    '45px': 's',
    '60px': 'm'
  },
  aspectRatio: {
    None: '',
    '1:1': '100',
    '16:9': '56'
  },
  borderRadius: {
    None: '',
    '100%': '100-pc'
  },
  content: {
    text: {
      Default: 't-l',
      Medium: 't',
      Small: 't-m',
      'Extra Small': 't-s'
    },
    heading: {
      Default: '',
      'Heading Two Large': 'h2-l',
      'Heading Two': 'h2',
      'Heading Three': 'h3',
      'Heading Four': 'h4',
      'Heading Five': 'h5',
      'Heading Six': 'h6'
    },
    align: {
      Left: 'left',
      Center: 'center'
    }
  },
  posts: {
    contentType: {
      None: ''
    }
  },
  hero: {
    type: {
      Minimal: 'minimal',
      'Overlay - Orange': 'overlay-orange',
      'Overlay - Blue': 'overlay-blue',
      'Overlay - Gray': 'overlay-gray',
      'Overlay - Navy': 'overlay-navy'
    },
    background: {
      'overlay-orange': 'primary-light',
      'overlay-blue': 'primary-base',
      'overlay-gray': 'foreground-base',
      'overlay-navy': 'foreground-dark'
    }
  }
}

/* Export */

module.exports = {
  enumNamespace,
  enumSite,
  enumColors,
  enumContentTypes,
  enumOptions
}
