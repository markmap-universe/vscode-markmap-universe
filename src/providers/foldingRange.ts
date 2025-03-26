import * as vscode from 'vscode'
import { MARKMAP_CLOSE, MARKMAP_OPEN_RE } from '@/shared'

export const foldingProvider: vscode.FoldingRangeProvider = {
    provideFoldingRanges(document, _context, _token) {
        const ranges: vscode.FoldingRange[] = []
        let startLine = -1
        for (let i = 0; i < document.lineCount; i++) {
            const lineText = document.lineAt(i).text
            if (MARKMAP_OPEN_RE.test(lineText)) {
                startLine = i
            } else if (lineText.trim() === MARKMAP_CLOSE && startLine !== -1) {
                ranges.push(new vscode.FoldingRange(startLine, i, vscode.FoldingRangeKind.Region))
                startLine = -1
            }
        }
        return ranges
    }
}

