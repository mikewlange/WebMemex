import urlRegex from 'url-regex'
// Check https://mathiasbynens.be/demo/url-regex for results RE: this pattern

const allWhitespacesPattern = /\s+/g
const nonWordsPattern = /[_\W]+/g // NOTE: This kills accented characters; maybe make better
const singleDigitNumbersPattern = /\b\d\b/g
const urlPattern = urlRegex()

const removeUrls = (text = '') =>
    text.replace(urlPattern, ' ')

const removePunctuation = (text = '') =>
    text.replace(nonWordsPattern, ' ')

// Removes any single digit numbers that appear on their own
const removeSingleDigitNumbers = (text = '') =>
    text.replace(singleDigitNumbersPattern, ' ')

const cleanupWhitespaces = (text = '') =>
    text.replace(allWhitespacesPattern, ' ').trim()

/**
 * Takes in some text content and strips it of unneeded data. Currently does
 * puncation (although includes accented characters), numbers, and whitespace.
 * TODO: pass in options to disable certain functionality.
 *
 * @param {any} content A content string to transform.
 * @returns {any} Object containing the transformed `content` + less important
 *  `lengthBefore`, `lengthAfter` stats.
 */
export default function transform({ text = '' }) {
    // Short circuit if no text
    if (!text || !text.replace(/\s/g, '')) {
        return text
    }

    let searchableText = text

    const lengthBefore = searchableText.length

    // Remove URLs first before we start messing with things
    searchableText = removeUrls(searchableText)

    // We don't care about searching on punctuation, so remove that
    searchableText = removePunctuation(searchableText)

    // We don't care single digit numbers
    searchableText = removeSingleDigitNumbers(searchableText)

    // We don't care about non-single-space whitespace (' ' is cool)
    searchableText = cleanupWhitespaces(searchableText)

    const lengthAfter = searchableText.length

    return { text: searchableText, lengthBefore, lengthAfter }
}
