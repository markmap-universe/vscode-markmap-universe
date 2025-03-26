import { defineConfig } from 'tsup'

export default defineConfig([{
  entry: [
    'src/extension.ts',
  ],
  format: ['cjs'],
  target: 'node18',
  clean: true,
  minify: true,
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
  minify: true,
}])
