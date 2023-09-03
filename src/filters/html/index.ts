/**
 * Filters
 */

/* Imports */

import container from '../../layouts/container/html'
import column from '../../layouts/column/html'
import richText from '../../text/rich-text/html'
import config from '../../config/html'

/**
 * Site filters for props and rich text
 *
 * @type {object}
 */

const filters: { [key: string]: Function } = {
  renderArchiveName (archive: string = ''): string {
    if (archive !== '') {
      return config.vars.options.posts.contentType[archive]
    }

    return archive
  },
  containerProps: container,
  columnProps: column,
  richTextProps: richText.props,
  richTextOutput: richText.output,
  richTextContent: richText.content
}

/* Exports */

export default filters
