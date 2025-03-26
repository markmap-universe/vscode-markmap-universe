import cpy from "cpy"
import { defineConfig } from 'tsup'

export default defineConfig((options) => [{
  entry: [
    'src/extension.ts',
  ],
  format: ['cjs'],
  target: 'node18',
  clean: true,
  minify: !options.watch,
  async onSuccess() {
    await cpy('src/syntaxes/*.json', 'dist/syntaxes')
  },
  external: [
    'vscode',
  ],
}, {
  entry: [
    'src/preview/markmap-init.ts',
    'src/preview/style.css',
  ],
  format: ['iife'],
  target: ['chrome89'],
  platform: 'browser',
  clean: true,
  dts: false,
  minify: true
}])
