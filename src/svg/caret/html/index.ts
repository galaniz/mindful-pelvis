/**
 * Svg - caret html
 */

/* Imports */

import config from '../../../config/html'

/**
 * Function - output svg for down, left and right caret
 *
 * @param {string} direction
 * @param {string} classes
 * @return {string} HTML - svg
 */

const caretSvg = (direction: string = 'down', classes: string = ''): string => {
  /* Paths by type */

  const paths: { [key: string]: string } = {
    down: 'm2.22,5.82c.17-.15.36-.23.58-.24.22,0,.42.07.58.24l6.56,6.56,6.56-6.56c.15-.15.34-.23.57-.24.23,0,.43.07.59.24.17.15.25.34.26.57,0,.23-.07.43-.24.59l-7.31,7.31c-.07.07-.14.12-.21.15-.07.03-.15.04-.23.04s-.16-.01-.23-.04c-.07-.03-.14-.08-.21-.15L2.2,6.99c-.15-.15-.23-.34-.23-.57s.08-.43.25-.59Z',
    left: 'm14.21,2.27c.15.17.23.36.24.58,0,.22-.07.42-.24.58l-6.56,6.56,6.56,6.56c.15.15.23.34.24.57,0,.23-.07.43-.24.59-.15.17-.34.25-.57.26-.23,0-.43-.07-.59-.24l-7.31-7.31c-.07-.07-.12-.14-.15-.21-.03-.07-.04-.15-.04-.23s.01-.16.04-.23c.03-.07.08-.14.15-.21l7.31-7.31c.15-.15.34-.23.57-.23s.43.08.59.25Z',
    right: 'm5.79,17.73c-.15-.17-.23-.36-.24-.58,0-.22.07-.42.24-.58l6.56-6.56L5.79,3.44c-.15-.15-.23-.34-.24-.57,0-.23.07-.43.24-.59.15-.17.34-.25.57-.26.23,0,.43.07.59.24l7.31,7.31c.07.07.12.14.15.21.03.07.04.15.04.23s-.01.16-.04.23c-.03.07-.08.14-.15.21l-7.31,7.31c-.15.15-.34.23-.57.23s-.43-.08-.59-.25Z'
  }

  /* Check path exists */

  const path: string = paths[direction] !== undefined ? paths[direction] : ''

  if (path === '') {
    return ''
  }

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = `caret-${direction}-icon`

  config.vars.svg[id] = {
    viewBox,
    output: `<path d="${path}" fill="currentcolor" />`
  }

  /* Output */

  return `
    <svg
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      role="img"
      ${classes !== '' ? ` class="${classes}"` : ''}
    >
      <use href="#${id}" />
    </svg>
  `
}

/* Exports */

export default caretSvg
