import * as vscode from 'vscode';
import { markmap } from '@/markdown-it/markmap'
import type MarkdownIt from 'markdown-it'


export function activate(ctx: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(markmap)
    }
  }
}

