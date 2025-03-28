import * as vscode from 'vscode'

type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "NONE"

const outputChannel = vscode.window.createOutputChannel('Markmap Universe', { log: true })

export const clearLogger = () => {
    outputChannel.clear()
}

export const appendLine = (level: LogLevel, message: string) => {
    outputChannel.append(`[${level}] ${message}\n`)
}

export const info = (message: string) => {
    appendLine("INFO", message)
}

export const error = (message: string) => {
    appendLine("ERROR", message)
}
