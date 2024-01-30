/**
 * Config - Html
 */

/* Imports */

import type { ConfigVars } from './configHtmlTypes'
import type { Config } from '@alanizcreative/static-site-formation/lib/config/configTypes'
import { setConfig } from '@alanizcreative/static-site-formation/lib/config/config'
import { LayoutHtml } from '../components/Layout/LayoutHtml'
import { NavigationHtml, NavigationsHtml } from '../components/Navigations/NavigationsHtml'
import { HttpErrorHtml } from '../render/HttpError/HttpErrorHtml'
import { ButtonHtml } from '../objects/Button/ButtonHtml'
import { ContentHtml } from '../objects/Content/ContentHtml'
import { ImageHtml } from '../objects/Image/ImageHtml'
import { ContainerHtml } from '../layouts/Container/ContainerHtml'
import { ColumnHtml } from '../layouts/Column/ColumnHtml'
import { RichTextHtml } from '../text/RichText/RichTextHtml'

/**
 * Flexible vars object in main config
 *
 * @type {ConfigVars}
 */
const configHtmlVars: ConfigVars = {
  theme: {
    'primary-base': '#3c6e89',
    'primary-light': '#9e5330',
    'foreground-base': '#4b4f54',
    'foreground-dark': '#333f48',
    'background-base': '#f4eae0',
    'background-light': '#e5ebec'
  },
  email: 'hello@themindfulpelvis.ca',
  head: '',
  svg: {},
  css: {
    in: 'src/global/global.scss',
    out: 'css/global/global.css',
    head: '',
    cache: ''
  },
  js: {
    in: 'src/global/global.js',
    out: 'css/global/global.js'
  },
  navHalf: 0,
  options: {
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
        None: '',
        Post: 'post',
        Service: 'service',
        Event: 'event'
      }
    },
    hero: {
      type: {
        Minimal: 'minimal',
        'Overlap - Orange': 'overlap-orange',
        'Overlap - Blue': 'overlap-blue',
        'Overlap - Gray': 'overlap-gray',
        'Overlap - Navy': 'overlap-navy'
      },
      background: {
        'overlap-orange': 'primary-light',
        'overlap-blue': 'primary-base',
        'overlap-gray': 'foreground-base',
        'overlap-navy': 'foreground-dark'
      }
    }
  }
}

/**
 * Html options
 *
 * @type {Config}
 */
const configHtml: Config = setConfig({
  namespace: 'mp',
  source: 'cms',
  title: 'The Mindful Pelvis',
  meta: {
    description: 'Ontario pelvic health physiotherapy and women\'s health education.',
    image: 'img/mindful-pelvis-meta.jpg'
  },
  slug: {
    parents: {},
    bases: {
      page: {
        slug: '',
        title: ''
      },
      post: {
        slug: '',
        title: ''
      },
      category: {
        slug: 'categories',
        title: 'Categories'
      },
      service: {
        slug: 'services',
        title: 'Services'
      },
      event: {
        slug: 'events',
        title: 'Events'
      },
      eventType: {
        slug: 'event-types',
        title: 'Event Types'
      }
    }
  },
  contentTypes: {
    partial: [
      'navigation',
      'navigationItem',
      'redirect'
    ],
    whole: [
      'page',
      'post',
      'category',
      'service',
      'event',
      'eventType'
    ],
    archive: {
      post: {
        singular: 'Post',
        plural: 'Posts',
        layout: 'card',
        display: 12,
        order: 'date',
        linkContentType: ['category'],
        id: {}
      },
      category: {
        singular: 'Category',
        plural: 'Categories',
        layout: 'list',
        display: 12,
        order: 'order',
        id: {}
      },
      service: {
        singular: 'Service',
        plural: 'Services',
        layout: 'media-text',
        display: 8,
        order: 'order',
        id: {}
      },
      event: {
        singular: 'Event',
        plural: 'Events',
        layout: 'date',
        display: 8,
        order: 'date',
        linkContentType: ['eventType'],
        id: {}
      },
      eventType: {
        singular: 'Event Type',
        plural: 'Event Types',
        layout: 'list',
        display: 12,
        order: 'order',
        id: {}
      }
    },
    taxonomy: {
      category: {
        contentTypes: ['post'],
        props: ['category']
      },
      eventType: {
        contentTypes: ['event'],
        props: ['eventType']
      }
    }
  },
  renderTypes: {
    button: 'button',
    column: 'column',
    container: 'container',
    content: 'content',
    image: 'image',
    navigation: 'navigation',
    navigationItem: 'navigationItem',
    page: 'page',
    redirect: 'redirect'
  },
  renderFunctions: {
    layout: LayoutHtml,
    navigations: NavigationsHtml,
    navigation: NavigationHtml,
    httpError: HttpErrorHtml,
    button: ButtonHtml,
    content: ContentHtml,
    image: ImageHtml
  },
  filters: {
    renderArchiveName: async (archive: string = '') => {
      if (archive !== '') {
        return configHtmlVars.options.posts.contentType[archive]
      }

      return archive
    },
    containerProps: ContainerHtml,
    columnProps: ColumnHtml,
    richTextProps: RichTextHtml.props,
    richTextOutput: RichTextHtml.output,
    richTextContent: RichTextHtml.content
  },
  serverless: {
    dir: 'functions',
    import: 'lib',
    files: {
      ajax: 'ajax/index.js',
      preview: '_middleware.js',
      reload: '_middleware.js'
    },
    routes: {
      reload: []
    }
  }
})

/* Exports */

export { configHtml, configHtmlVars }
