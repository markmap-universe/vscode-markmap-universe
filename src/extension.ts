import type MarkdownIt from 'markdown-it'
import { defineExtension } from 'reactive-vscode'
import { markmap } from '@/markdown-it/markmap'
import { logger } from '@/utils'


export = defineExtension(() => {
  logger.info('Extension Activated')
  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(markmap)
    }
  }
})
