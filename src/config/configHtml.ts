/**
 * Config - Html
 */

/* Imports */

import type { ConfigVars } from './configHtmlTypes'
import type { Config } from '@alanizcreative/static-site-formation/iop/config/configTypes'
import { setConfig } from '@alanizcreative/static-site-formation/iop/config/config'
import { isString } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { LayoutHtml } from '../components/Layout/LayoutHtml'
import { NavigationHtml, NavigationsHtml } from '../components/Navigations/NavigationsHtml'
import { HttpErrorHtml } from '../pages/HttpError/HttpErrorHtml'
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
import { FauxHeadingHtml } from '../text/FauxHeading/FauxHeadingHtml'
import { ColumnsHtml as TextColumnsHtml } from '../text/Columns/ColumnsHtml'
import { TabsHtml } from '../objects/Tabs/TabsHtml'
import { FragmentHtml } from '../objects/Fragment/FragmentHtml'
import { SlotHtml } from '../text/Slot/SlotHtml'

/**
 * Flexible vars object in main config
 *
 * @type {ConfigVars}
 */
const configHtmlVars: ConfigVars = {
  email: 'hello@themindfulpelvis.ca',
  instagram: 'themindfulpelvis',
  cloudflare: {
    namespaceId: '',
    accountId: '',
    token: '',
    apiEmail: '',
    apiKey: ''
  },
  theme: {
    'primary-base': '#3c6e89',
    'secondary-base': '#9e5330',
    'foreground-light': '#4b4f54',
    'foreground-base': '#333f48',
    'background-base': '#f4eae0'
  },
  head: '',
  svg: {},
  css: {
    in: 'src/global/global',
    out: 'css/global/global',
    head: '',
    cache: ''
  },
  js: {
    in: 'src/global/global',
    out: 'js/global/global'
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
    'Navy Light': 'foreground-base',
    'Gray Light': 'foreground-light',
    'Orange Light': 'secondary-base',
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
      '1/1': '12',
      '5/6': '10',
      '3/4': '9',
      '2/3': '8',
      '3/5': '7',
      '1/2': '6',
      '2/5': '5',
      '1/3': '4',
      '1/4': '3',
      '1/6': '2',
      '100%': 'full',
      '45px': 's',
      '60px': 'm',
      '75px': 'l',
      '90px': 'xl',
      '120px': '2xl',
      '150px': '3xl'
    },
    width2x: {
      '45px': 90,
      '60px': 120,
      '75px': 150,
      '90px': 180,
      '120px': 240,
      '150px': 300
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
      None: '1-1',
      '1:1': '1-1',
      '16:9': '16-9'
    },
    borderRadius: {
      None: '',
      '100%': 'full'
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
        'Heading Two': 'h2',
        'Heading Three': 'h3',
        'Heading Four': 'h4',
        'Heading Five': 'h5',
        'Heading Six': 'h6'
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
      Navy: 'foreground-base',
      Gray: 'foreground-light',
      Orange: 'secondary-base',
      Blue: 'primary-base',
      'Navy Light': 'foreground-base-fade',
      'Gray Light': 'foreground-base-fade',
      'Orange Light': 'secondary-base-fade',
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
    card: 'card',
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
    card: CardHtml,
    fragment: FragmentHtml
  },
  filter: async (config, env) => {
    configHtmlVars.cloudflare = {
      namespaceId: isString(env.CF_KV_NAMESPACE) ? env.CF_KV_NAMESPACE : '',
      accountId: isString(env.CF_ACCOUNT_ID) ? env.CF_ACCOUNT_ID : '',
      token: isString(env.CF_TOKEN) ? env.CF_TOKEN : '',
      apiEmail: isString(env.CF_API_EMAIL) ? env.CF_API_EMAIL : '',
      apiKey: isString(env.CF_API_KEY) ? env.CF_API_KEY : ''
    }

    config.env.cache = env.USE_11TY_CACHE === 'true'
    config.env.dev = env.ENVIRONMENT === 'dev'
    config.env.prod = env.ENVIRONMENT === 'production'
    config.env.dir = isString(env.ELEVENTY_ROOT) ? env.ELEVENTY_ROOT : ''
    config.cms.name = 'contentful'
    config.cms.space = isString(env.CTFL_SPACE_ID) ? env.CTFL_SPACE_ID : ''
    config.cms.previewAccessToken = isString(env.CTFL_CPA_TOKEN) ? env.CTFL_CPA_TOKEN : ''
    config.cms.previewHost = 'preview.contentful.com'
    config.cms.deliveryAccessToken = isString(env.CTFL_CDA_TOKEN) ? env.CTFL_CDA_TOKEN : ''
    config.cms.deliveryHost = 'cdn.contentful.com'
    config.apiKeys.smtp2go = isString(env.SMPT2GO_API_KEY) ? env.SMPT2GO_API_KEY : ''

    return config
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
        'show-handle': 'boolean'
      }
    },
    'faux-heading': {
      callback: FauxHeadingHtml,
      attributeTypes: {
        style: 'string'
      }
    },
    'text-columns': {
      callback: TextColumnsHtml,
      attributeTypes: {
        count: 'number',
        gap: 'string'
      }
    },
    tabs: {
      callback: TabsHtml,
      child: {
        name: 'tab',
        attributeTypes: {
          title: 'string',
          selected: 'boolean'
        }
      }
    },
    slot: {
      callback: SlotHtml,
      attributeTypes: {
        type: 'string',
        size: 'string'
      }
    }
  },
  serverless: {
    dir: 'functions',
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
  name: 'instagram-feed.json',
  data: ''
}

/* Exports */

export { configHtml, configHtmlVars }
