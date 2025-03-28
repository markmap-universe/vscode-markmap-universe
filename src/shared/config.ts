import * as vscode from 'vscode'

const getGlobalOptions = () => vscode.workspace
        .getConfiguration('markmap-universe')
        .get('globalOptions', {})

export let globalOptions = getGlobalOptions()

vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("markmap-universe")) {
        globalOptions = getGlobalOptions()
        vscode.commands.executeCommand('markdown.preview.refresh')
    }
})
