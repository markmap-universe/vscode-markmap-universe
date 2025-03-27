import matter from 'gray-matter'
import { Transformer } from 'markmap-lib'
import { markmapWrapper } from './template'
import { parseFrontmatter, resetCounter, template } from './utils'
import { MARKMAP_CLOSE, MARKMAP_OPEN_RE } from '@/shared'

import type MarkdownIt from 'markdown-it'

const transformer = new Transformer()

export function markmap(md: MarkdownIt) {
    // Reset counter before normalize
    md.core.ruler.before('normalize', 'markmap_newline', state => {
        resetCounter()
    })

    // Add markmap block rule
    md.block.ruler.before('fence', 'markmap', (state, startLine, endLine, silent) => {
        let pos = state.bMarks[startLine] + state.tShift[startLine]
        let max = state.eMarks[startLine]

        if (pos >= max) return false

        const line = state.src.slice(pos, max).trim()

        const match = line.match(MARKMAP_OPEN_RE)

        if (!match) return false

        if (silent) return true

        const height: string | undefined = match[1]
        let nextLine = startLine
        let haveEndMarker = false

        while (nextLine < endLine) {
            pos = state.bMarks[nextLine] + state.tShift[nextLine]
            max = state.eMarks[nextLine]

            if (pos < max && state.src.slice(pos, max).trim() === MARKMAP_CLOSE) {
                haveEndMarker = true
                break
            }

            nextLine++
        }

        state.line = nextLine + (haveEndMarker ? 1 : 0)

        const token = state.push('markmap', 'div', 0)
        token.meta = { height }
        token.content = state.getLines(startLine + 1, nextLine, state.sCount[startLine], true)
        token.markup = '{% markmap %}'
        token.map = [startLine, state.line]

        return true
    }, {
        alt: ['paragraph', 'reference', 'blockquote', 'list'],
    })

    const renderMarkmap = (_content: string, height?: string) => {
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

    const defaultFenceRenderer = md.renderer.rules.fence

    if (defaultFenceRenderer) {
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
            const token = tokens[idx]
            const info = token.info.trim()

            if (info === 'markmap') {
                const content = tokens[idx].content
                return renderMarkmap(content)
            }

            return defaultFenceRenderer(tokens, idx, options, env, self)
        }
    }

    md.renderer.rules.markmap = (tokens, idx) => {
        const _content = tokens[idx].content
        const height: string | undefined = tokens[idx].meta?.height
        return renderMarkmap(_content, height)
    }
}
