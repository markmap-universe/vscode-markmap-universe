import matter from 'gray-matter'
import { Transformer } from 'markmap-lib'
import { markmapWrapper } from './template'
import { parseFrontmatter, template } from './utils'
import { MARKMAP_CLOSE, MARKMAP_OPEN_RE } from '@/shared'

import type MarkdownIt from 'markdown-it'

const transformer = new Transformer()

export function markmap(md: MarkdownIt) {
    const MARKMAP_SINGLE_NEWLINE = /((?<!\n)\n)([ \t]*{%\s*markmap\b.*?%}\s*)/g

    // Preprocess: ensure each {% markmap %} directive is preceded by an extra newline,
    // so that it has a blank line before it and is treated as a block.
    md.core.ruler.before('normalize', 'markmap_newline', state => {
        state.src = state.src.replace(
            MARKMAP_SINGLE_NEWLINE,
            '$1\n$2'
        )
    })

    // Add markmap block rule
    md.block.ruler.before('fence', 'markmap', (state, startLine, endLine) => {
        const startLineText = state.src.slice(state.bMarks[startLine], state.eMarks[startLine]).trim()
        const match = startLineText.match(MARKMAP_OPEN_RE)

        if (!match) return false

        const height: string | undefined = match[1]
        let nextLine = startLine + 1


        // Find {% endmarkmap %}
        while (nextLine < endLine) {
            if (state.src.slice(state.bMarks[nextLine], state.eMarks[nextLine]).trim() === MARKMAP_CLOSE) {
                state.line = nextLine + 1

                const openToken = state.push('markmap_open', 'div', 1)
                openToken.block = true
                openToken.markup = match[0]

                const contentToken = state.push('markmap_content', '', 0)
                contentToken.content = state.getLines(startLine + 1, nextLine, 0, false)
                contentToken.meta = { height }


                const closeToken = state.push('markmap_close', 'div', -1)
                closeToken.block = true
                closeToken.markup = MARKMAP_CLOSE

                return true
            }
            nextLine++
        }

        return false
    }, {
        alt: ['paragraph', 'reference', 'blockquote', 'list'],
    })

    md.renderer.rules.markmap_open = () => ``

    md.renderer.rules.markmap_content = (tokens, idx) => {
        // parse content
        const _content = tokens[idx].content
        const height: string | undefined = tokens[idx].meta?.height

        // parse frontmatter
        const { data: rawFrontmatter, content } = matter(_content)
        const frontmatter = parseFrontmatter(rawFrontmatter, content)
        const { id, style, options } = frontmatter

        // transform content
        const { root } = transformer.transform(content)
        const wrapHTML = markmapWrapper(id, JSON.stringify(root), JSON.stringify(options), height)
        const styleHTML = `<style>${template(style, { id })}</style>`

        return `${wrapHTML}\n${styleHTML}`
    }

    md.renderer.rules.markmap_close = () => ``
}


