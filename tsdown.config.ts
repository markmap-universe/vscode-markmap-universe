import { defineConfig } from 'tsdown'

export default defineConfig((options) => [{
  entry: [
    'src/extension.ts',
  ],
  format: ['cjs'],
  target: 'node18',
  clean: true,
  minify: !options.watch,
  copy: [
    {
      from: 'src/syntaxes/*.json',
      to: 'dist/syntaxes',
    }
  ],
  external: [
    'vscode',
  ],
}, {
  entry: 'src/preview/markmap-init.ts',
  format: ['iife'],
  target: ['chrome89'],
  platform: 'browser',
  clean: true,
  dts: false,
  minify: !options.watch,
  copy:[
    {
      from: 'src/preview/*.css',
      to: 'dist',
    }
  ]
}])
