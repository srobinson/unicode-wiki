// tslint:disable:quotemark

/**
 * REGEX to pull out wikipedia redirect purl
 */
export const REDIRECT_TEST =
  '<div class=\\"redirectMsg\\"><p>Redirect to:</p><ul class=\\"redirectText\\"><li><a href=\\"/wiki/([0-9a-zA-Z_\\-()%/]*)'

/**
 * REGEX matches all relative herf/src urls and replace with absolute urls
 */

export const ABSOLUTE_URL_TEST = /(href|src)=(\\?)"(\/(w|wiki)\/)/gi
export const ABSOLUTE_URL_REPLACE = '$1="https://en.wikipedia.org$3'

export const RELATIVE_URL_TEST = /(href|src)="(\.\/)/gi
export const RELATIVE_URL_REPLACE = '$1="https://en.wikipedia.org/wiki/'

export const HREF_TEST = /<a((?:(?!>).)*)>/gi
export const HREF_REPLACE = '<a target="_blank"$1>'
export const BODY_TEST = /(<body[^>]*>((.|[\n\r])*)<\/body>)/
export const BODY_REPLACE = (className: string) => `<div class="${className}">$1</div>`
export const TITLE_TEST = /(<title>(.+)<\/title>)/
export const TITLE_REPLACE =
  '$1<link href="https://unicode.wiki/unicode-fonts.css" rel="stylesheet">'

export const STYLESHEET_RE = /<link rel="stylesheet" href="(?:(?!>).)*>/gm
export const SCRIPT_RE = /<script(?:(?!><\/script>).)*><\/script>/gm
export const BODY_RE = /<body[^>]*>((.|[\n\r])*)<\/body>/gm

/**
 * REGEX matches all inline style blocks
 */
export const INLINE_STYLE_BLOCK_TEST = /(<style.+<\/style>)/gi

/**
 * REGEX matches all inline font-family style properties
 */
export const INLINE_FONT_FAMILY_STYLES_TEST = /(font-family:(.+?));/gi

/**
 * Parse a camel case string and insert token between each word
 *
 * @param input string to parse
 * @param token token to insert between each work
 */
export const splitCamelCase = (input: string, token: string = " "): string => {
  return (
    input
      // insert token before all caps
      .replace(/([A-Z])/g, token + "$1")
      // uppercase the first character
      .replace(/^./, str => str.toUpperCase())
      .trim()
  )
}

/**
 * Simple non-recursive T=transform of a= primitive object
 * to a string representation of key value pairs
 *
 * @param source the object to be transformed
 * @param seperator the token used to separate key/value pairs
 * @param equals the token used to separate the key and value
 */
export const objectToString = (source: Object, seperator: string = "&", equals: string = "=") => {
  return Object.keys(source)
    .map(key => `${key}${equals}${source[key]}`)
    .join(seperator)
}
