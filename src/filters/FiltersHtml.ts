/**
 * Filters
 */

/* Imports */

import { ContainerHtml } from '../layouts/Container/ContainerHtml'
import { ColumnHtml } from '../layouts/Column/ColumnHtml'
import { RichTextHtml } from '../text/RichText/RichTextHtml'
import { configHtml } from '../config/configHtml'

/**
 * Site filters for props and rich text
 *
 * @type {object}
 */

const FiltersHtml: { [key: string]: Function } = {
  renderArchiveName (archive: string = ''): string {
    if (archive !== '') {
      return configHtml.vars.options.posts.contentType[archive]
    }

    return archive
  },
  containerProps: ContainerHtml,
  columnProps: ColumnHtml,
  richTextProps: RichTextHtml.props,
  richTextOutput: RichTextHtml.output,
  richTextContent: RichTextHtml.content
}

/* Exports */

export { FiltersHtml }
