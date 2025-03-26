import * as vscode from 'vscode'
import { markmap } from '@/markdown-it/markmap'
import { foldingProvider } from '@/providers/FoldingRange'

import type MarkdownIt from 'markdown-it'


export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerFoldingRangeProvider({ language: 'markdown' }, foldingProvider)
  )
  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(markmap)
    }
  }
}

