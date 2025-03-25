import matter from 'gray-matter'
import { Transformer } from 'markmap-lib'
import { markmapWrapper } from './template'
import { parseFrontmatter, template } from './utils'

import type MarkdownIt from 'markdown-it'
import { type RuleBlock } from "markdown-it/lib/parser_block.mjs"

const transformer = new Transformer()

export function markmap(md: MarkdownIt) {
    const MARKMAP_OPEN_RE = /^{%\s*markmap\s*(.*?)\s*%}$/
    const MARKMAP_CLOSE = '{% endmarkmap %}'

    const markmapTokenizer: RuleBlock = (
        state,
        startLine,
        endLine,
        silent
    ) => {
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
    }

    md.block.ruler.before('fence', 'markmap', markmapTokenizer, {
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


