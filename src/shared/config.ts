import * as vscode from 'vscode'

const getConfigs = () => vscode.workspace.getConfiguration('markmap-universe')

const getGlobalOptions = () => getConfigs().get('globalOptions', {})

const getToolbar = () => getConfigs().get('toolbar', true)

export let globalOptions = getGlobalOptions()

export let toolbar = getToolbar()

vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("markmap-universe")) {
        globalOptions = getGlobalOptions()
        toolbar = getToolbar()
        vscode.commands.executeCommand('markdown.preview.refresh')
    }
})
