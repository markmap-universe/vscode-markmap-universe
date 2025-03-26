<img src="https://raw.githubusercontent.com/markmap-universe/logo/master/hexo-markmap-logo.png" alt="Hexo logo" width="100" height="100" align="right" />

# Markdown Preview Hexo Markmap Support

[![Version](https://img.shields.io/visual-studio-marketplace/v/maxchang.vscode-hexo-markmap)](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-hexo-markmap) [![Installs](https://img.shields.io/visual-studio-marketplace/i/maxchang.vscode-hexo-markmap)](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-hexo-markmap)

Add [hexo-markmap](https://github.com/maxchang3/hexo-markmap/) preview support to VS Code's built-in markdown preview.

![](https://github.com/markmap-universe/vscode-hexo-markmap/raw/main/res/preview.png)

## Features

- Preview support to VS Code's built-in markdown preview.
- Syntax highlighting for `hexo-markmap` tags.
- Folding support for `hexo-markmap` tags.

## Usage

```markdown
{% markmap %}
---
style: |
  #${id} {
    height: 300px; /* Equivalent to {% markmap 300px %} */
  }
options:
  colorFreezeLevel: 2
---
# Markdown
# Syntax
{% endmarkmap %}
```

See [hexo-markmap documentation](https://github.com/markmap-universe/hexo-markmap#usage) for more details.
