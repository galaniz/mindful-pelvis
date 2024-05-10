/**
 * Config - Node
 */

/* Imports */

import type { ConfigVars } from './configNodeTypes'
import type { Config } from '@alanizcreative/static-site-formation/iop/config/configTypes'
import { setConfig } from '@alanizcreative/static-site-formation/iop/config/config'
import { isString, isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { LayoutNode } from '../components/Layout/LayoutNode'
import { NavigationNode, NavigationsNode } from '../components/Navigations/NavigationsNode'
import { HttpErrorNode } from '../pages/HttpError/HttpErrorNode'
import { ButtonNode } from '../objects/Button/ButtonNode'
import { ContentNode } from '../text/Content/ContentNode'
import { AssetNode } from '../objects/Asset/AssetNode'
import { ImageNode } from '../objects/Image/ImageNode'
import { ContainerNode } from '../layouts/Container/ContainerNode'
import { ColumnNode } from '../layouts/Column/ColumnNode'
import {
  RichTextNode,
  RichTextOutputNode,
  RichTextContentItemNode,
  RichTextContentNode
} from '../text/RichText/RichTextNode'
import { PostsNode } from '../objects/Posts/PostsNode'
import { CardNode } from '../objects/Cards/CardsNode'
import { FeedNode } from '../objects/Feed/FeedNode'
import { StyledNode as TextStyledNode } from '../text/Styled/StyledNode'
import { ColumnsNode as TextColumnsNode } from '../text/Columns/ColumnsNode'
import { IconNode as TextIconNode } from '../text/Icon/IconNode'
import { TabsNode } from '../objects/Tabs/TabsNode'
import { FragmentNode } from '../objects/Fragment/FragmentNode'
import { SlotNode } from '../text/Slot/SlotNode'
import { Item } from '../global/globalNodeTypes'
import { FormNode, FormFieldNode } from '../objects/Form/FormNode'

/**
 * Flexible vars object in main config
 *
 * @type {ConfigVars}
 */
const configNodeVars: ConfigVars = {
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
    cache: '',
    static: {
      'css/global/globalNoJs': 'src/global/globalNoJs.scss',
      'css/global/globalGapFallback': 'src/global/globalGapFallback.scss'
    }
  },
  js: {
    in: 'src/global/globalBrowser',
    out: 'js/global/globalBrowser'
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
    buttonType: {
      Main: 'main',
      Secondary: 'secondary'
    },
    buttonSize: {
      Default: '',
      Large: 'large'
    },
    buttonColor: {
      Default: 'primary',
      Blue: 'primary',
      Orange: 'secondary',
      Gray: 'tertiary',
      Navy: 'dark',
      Beige: 'light'
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
      Address: 'address',
      Paragraph: 'p',
      Span: 'span',
      'Heading Two': 'h2',
      'Heading Three': 'h3',
      'Heading Four': 'h4',
      'Heading Five': 'h5',
      'Heading Six': 'h6'
    },
    dimension: {
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
      '30px': 'xs',
      '45px': 's',
      '60px': 'm',
      '75px': 'l',
      '90px': 'xl',
      '120px': '2xl',
      '150px': '3xl',
      '210px': '4xl',
      Strip: 'strip'
    },
    dimension2x: {
      '45px': 90,
      '60px': 120,
      '75px': 150,
      '90px': 180,
      '120px': 240,
      '150px': 300,
      '210px': 420
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
    headingStyle: {
      Default: '',
      Text: 't-l t-wt-bold t-ht-snug',
      'Text Medium': 't t-wt-bold t-ht-snug',
      'Text Small': 't-m t-wt-bold t-ht-snug',
      'Text Extra Small': 't-s t-wt-bold t-ht-snug',
      'Heading Two Large': 't-h2-l',
      'Heading Two': 't-h2',
      'Heading Three': 't-h3',
      'Heading Four': 't-h4',
      'Heading Five': 't-h5',
      'Heading Six': 't-h6'
    },
    textStyle: {
      Default: '',
      Text: 't-l',
      'Text Medium': 't',
      'Text Small': 't-m',
      'Text Extra Small': 't-s',
      'Heading Two Large': 't-h2-l',
      'Heading Two': 't-h2',
      'Heading Three': 't-h3',
      'Heading Four': 't-h4',
      'Heading Five': 't-h5',
      'Heading Six': 't-h6'
    },
    textAlign: {
      Left: 'left',
      Center: 'center'
    },
    richTextStyles: {
      None: '',
      Full: 'full',
      Links: 'links'
    },
    heroType: {
      Minimal: 'minimal',
      'Overlap - Orange': 'Orange',
      'Overlap - Blue': 'Blue',
      'Overlap - Gray': 'Gray',
      'Overlap - Navy': 'Navy'
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
    },
    blobs: {
      None: 999,
      'Preset One': 0,
      'Preset Two': 1,
      'Preset Three': 2,
      'Preset Four': 3,
      'Preset Five': 4
    }
  }
}

/**
 * Node options
 *
 * @type {Config}
 */
const configNode: Config = setConfig({
  namespace: 'mp',
  source: 'cms',
  title: 'The Mindful Pelvis',
  meta: {
    description: 'Ontario pelvic health physiotherapy and women\'s health education.',
    image: 'img/mindful-pelvis-meta.jpg'
  },
  partialTypes: [
    'navigation',
    'navigationItem',
    'redirect'
  ],
  wholeTypes: [
    'page',
    'post',
    'service',
    'event',
    'taxonomy',
    'term'
  ],
  archiveMeta: {
    post: {
      singular: 'Post',
      plural: 'Posts',
      layout: 'card',
      display: 12,
      order: 'date'
    },
    service: {
      singular: 'Service',
      plural: 'Services',
      layout: 'card',
      display: 8,
      order: 'order'
    },
    event: {
      singular: 'Event',
      plural: 'Events',
      layout: 'date',
      display: 8,
      order: 'date'
    }
  },
  normalTypes: {
    None: '',
    Post: 'post',
    Service: 'service',
    Event: 'event'
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
    form: 'form',
    field: 'field',
    Asset: 'asset'
  },
  renderFunctions: {
    layout: LayoutNode,
    navigations: NavigationsNode,
    navigation: NavigationNode,
    httpError: HttpErrorNode,
    button: ButtonNode,
    content: ContentNode,
    image: ImageNode,
    posts: PostsNode,
    asset: AssetNode,
    card: CardNode,
    fragment: FragmentNode
  },
  filter: async (config, env) => {
    configNodeVars.cloudflare = {
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
    config.env.urls.dev = '/'
    config.env.urls.prod = 'https://themindfulpelvis.ca/'
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
    containerProps: ContainerNode,
    columnProps: ColumnNode,
    formProps: FormNode,
    fieldProps: FormFieldNode,
    richTextProps: RichTextNode,
    richTextOutput: RichTextOutputNode,
    richTextContentItem: RichTextContentItemNode,
    richTextContent: RichTextContentNode
  },
  actions: {
    renderItemStart: async ({ pageData }) => {
      const item: Item = pageData
      const type = item?.contentType
      const color = item?.heroImageMinimal?.color

      if (type === 'service' && isStringStrict(color)) {
        pageData.theme = color
      }
    }
  },
  shortcodes: {
    'instagram-feed': {
      callback: FeedNode,
      attributeTypes: {
        display: 'number',
        'show-handle': 'boolean'
      }
    },
    'text-styled': {
      callback: TextStyledNode,
      attributeTypes: {
        style: 'string',
        tag: 'string'
      }
    },
    'text-columns': {
      callback: TextColumnsNode,
      attributeTypes: {
        count: 'number',
        gap: 'string'
      }
    },
    'text-icon': {
      callback: TextIconNode,
      attributeTypes: {
        type: 'string',
        gap: 'string',
        size: 'string'
      }
    },
    tabs: {
      callback: TabsNode,
      child: {
        name: 'tab',
        attributeTypes: {
          title: 'string',
          selected: 'boolean'
        }
      }
    },
    slot: {
      callback: SlotNode,
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

configNode.store.files.instagramFeed = {
  name: 'instagram-feed.json',
  data: ''
}

/* Exports */

export { configNode, configNodeVars }
