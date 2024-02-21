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
import { AssetHtml } from '../objects/Asset/AssetHtml'
import { ImageHtml } from '../objects/Image/ImageHtml'
import { ContainerHtml } from '../layouts/Container/ContainerHtml'
import { ColumnHtml } from '../layouts/Column/ColumnHtml'
import { RichTextHtml } from '../text/RichText/RichTextHtml'
import { PostsHtml } from '../objects/Posts/PostsHtml'
import { CardHtml } from '../objects/Cards/CardsHtml'
import { FeedHtml } from '../objects/Feed/FeedHtml'

/**
 * Flexible vars object in main config
 *
 * @type {ConfigVars}
 */
const configHtmlVars: ConfigVars = {
  instagramFeed: [
    {
      url: 'https://www.instagram.com/themindfulpelvis/reel/CpizeIUp889/',
      src: 'instagram-feed-fallback/post-1',
      alt: "International Women's Day: model of vulva on sunny window sill and de-stigmatizing vulvas."
    },
    {
      url: 'https://www.instagram.com/themindfulpelvis/reel/CpTj_ujM34A/',
      src: 'instagram-feed-fallback/post-2',
      alt: 'Endometriosis awareness month: Toronto park on wintry day sharing my endo story and the latest research about endometriosis.'
    },
    {
      url: 'https://www.instagram.com/themindfulpelvis/p/CpDDaUHu3rk/',
      src: 'instagram-feed-fallback/post-3',
      alt: "Research dissemination: cesarean sections don't protect against pelvic floor dysfunction."
    },
    {
      url: 'https://www.instagram.com/themindfulpelvis/reel/Co49vG0rQX4/',
      src: 'instagram-feed-fallback/post-4',
      alt: 'Pelvic wand: tool to and prolong in-clinic treatments at home for patients with bladder urgency and/or pelvic pain and expectant mamas for perineal prep.'
    },
    {
      url: 'https://www.instagram.com/themindfulpelvis/reel/Conr8HWrtOF/',
      src: 'instagram-feed-fallback/post-5',
      alt: 'Desk with laptop, books, keyboard and cup of coffee to show a glimpse into an academic day as a PhD student.'
    }
  ],
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
  backgrounds: [
    'Navy',
    'Blue',
    'Orange',
    'Gray',
    'Navy Light',
    'Blue Light',
    'Orange Light'
  ],
  shades: {
    'Navy Light': 'foreground-dark',
    'Gray Light': 'foreground-base',
    'Orange Light': 'primary-light',
    'Blue Light': 'primary-base'
  },
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
      Default: '',
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
      '1/6': '1-6',
      '100%': '100-pc',
      '45px': 's',
      '60px': 'm',
      '75px': 'l',
      '90px': 'xl',
      '120px': '2xl',
      '150px': '3xl'
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
      },
      headingLevel: {
        'Heading Two': 'heading-2',
        'Heading Three': 'heading-3',
        'Heading Four': 'heading-4',
        'Heading Five': 'heading-5',
        'Heading Six': 'heading-6'
      }
    },
    hero: {
      type: {
        Minimal: 'minimal',
        'Overlap - Orange': 'Orange',
        'Overlap - Blue': 'Blue',
        'Overlap - Gray': 'Gray',
        'Overlap - Navy': 'Navy'
      }
    },
    color: {
      None: '',
      Default: '',
      Navy: 'foreground-dark',
      Gray: 'foreground-base',
      Orange: 'primary-light',
      Blue: 'primary-base',
      'Navy Light': 'foreground-dark-fade',
      'Gray Light': 'foreground-dark-fade',
      'Orange Light': 'primary-light-fade',
      'Blue Light': 'primary-base-fade'
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
    archives: {},
    parents: {},
    bases: {
      page: {
        slug: '',
        title: ''
      },
      post: {
        slug: 'archive',
        title: 'archive'
      },
      service: {
        slug: 'archive',
        title: 'archive'
      },
      event: {
        slug: 'archive',
        title: 'archive'
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
      'service',
      'event'
    ],
    archive: {
      post: {
        singular: 'Post',
        plural: 'Blog',
        layout: 'card',
        display: 12,
        order: 'date',
        id: {}
      },
      service: {
        singular: 'Service',
        plural: 'Services',
        layout: 'card',
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
        id: {}
      }
    },
    taxonomy: {}
  },
  renderTypes: {
    button: 'button',
    column: 'column',
    container: 'container',
    content: 'content',
    image: 'image',
    posts: 'posts',
    navigation: 'navigation',
    navigationItem: 'navigationItem',
    page: 'page',
    redirect: 'redirect',
    Asset: 'asset'
  },
  renderFunctions: {
    layout: LayoutHtml,
    navigations: NavigationsHtml,
    navigation: NavigationHtml,
    httpError: HttpErrorHtml,
    button: ButtonHtml,
    content: ContentHtml,
    image: ImageHtml,
    posts: PostsHtml,
    asset: AssetHtml,
    card: CardHtml
  },
  filters: {
    renderArchiveName: async (archive = '') => {
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
  shortcodes: {
    'instagram-feed': {
      callback: FeedHtml,
      attributeTypes: {
        display: 'number',
        handle: 'string',
        'show-handle': 'boolean'
      }
    }
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

configHtml.store.files.instagramFeed = {
  data: '',
  name: 'instagram-feed.json'
}

/* Exports */

export { configHtml, configHtmlVars }
