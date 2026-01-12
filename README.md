<img src="https://raw.githubusercontent.com/markmap-universe/logo/master/universe.png" alt="Markmap Universe logo" width="100" height="100" align="right" />

# VS Code Markmap Universe

[![Version](https://img.shields.io/visual-studio-marketplace/v/maxchang.vscode-markmap-universe)](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-markmap-universe) 
[![Installs](https://img.shields.io/visual-studio-marketplace/i/maxchang.vscode-markmap-universe)](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-markmap-universe) 
[![Open VSX Version](https://img.shields.io/open-vsx/v/maxchang/vscode-markmap-universe)](https://open-vsx.org/extension/maxchang/vscode-markmap-universe)
[![Open VSX Installs](https://img.shields.io/open-vsx/dt/maxchang/vscode-markmap-universe)](https://open-vsx.org/extension/maxchang/vscode-markmap-universe)
[![简体中文](https://img.shields.io/badge/README-简体中文-purple)](README.zh_CN.md)

Use mindmap in VS Code's built-in Markdown preview with markmap, seamlessly supporting both `hexo-markmap` tags and `markmap` code blocks.

## Features  

- **Real-time Markmap Preview**
- **`hexo-markmap` Tag Support**:  
  - Recognize `{% markmap %}...{% endmarkmap %}` syntax.  
  - Provide folding for `hexo-markmap` tags. 
- **Code Block Support**: 
  - Render fenced code blocks with the `markmap` language identifier.  
- **Customizable Preview**:  
  - Adjust styles and options via frontmatter.  
  - Compatible with [remark-markmap](https://github.com/markmap-universe/remark-markmap#frontmatter-options) and [hexo-markmap](https://github.com/markmap-universe/hexo-markmap#options).  
- **Syntax highlighting**: <small>(Still have some issues)</small>
  - Highlight Markmap frontmatter and Markdown content. 

![](res/preview.png)


## Usage

### `hexo-markmap` Tags

```markdown
{% markmap %}
---
markmap:
  colorFreezeLevel: 2
---
# Markdown
# Syntax
{% endmarkmap %}
```

### Code Block

````markdown
```markmap
---
markmap:
  colorFreezeLevel: 2
---
# Markdown
# Syntax
```
````

### Inline Options

You can customize each mindmap individually in the `markmap` tag.

#### Frontmatter Options

All frontmatter options are optional.

- **`id`** : Used to define the ID of the `markmap-wrap` element.  

- **`markmap`** : Correspond to the [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html) in the markmap project. For more details, please refer to [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list).

</details>

#### Tag Options

You can also specify the height of the mindmap directly in the tag, by default it will be calculated based on the content.


```markdown
{% markmap 300px %}
# Markdown
# Syntax
{% endmarkmap %}
```

### Configuration

**`markmap-universe.globalOptions`**
  - **Type**: `object`: Global options for all mindmaps. Correspond to the `markmap` in [`Frontmatter Options`](#frontmatter-options).
  - **Default**: `{}`

**`markmap-universe.toolbar`**
  - **Type**: `boolean`: Show the toolbar.
  - **Default**: `true`

## Credit

References to the following projects:

- [vscode-markdown-markmap](https://github.com/phoihos/vscode-markdown-markmap)
- [markmap-vscode](https://github.com/markmap/markmap-vscode/)
