<img src="https://raw.githubusercontent.com/markmap-universe/logo/master/universe.png" alt="Markmap Universe logo" width="100" height="100" align="right" />

# VS Code Markmap Universe

[![版本](https://img.shields.io/visual-studio-marketplace/v/maxchang.vscode-markmap-universe)](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-markmap-universe) [![安装量](https://img.shields.io/visual-studio-marketplace/i/maxchang.vscode-markmap-universe)](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-markmap-universe) [![English](https://img.shields.io/badge/README-English-blue)](README.md)

在 VS Code 的内置 Markdown 预览中使用 markmap 思维导图，无缝支持 `hexo-markmap` 标签和 `markmap` 代码块。

## 功能  

- **实时 Markmap 预览**
- **支持 `hexo-markmap` 标签**：  
  - 识别 `{% markmap %}...{% endmarkmap %}` 语法。  
  - 为 `hexo-markmap` 标签提供折叠功能。 
- **支持代码块**：  
  - 渲染带有 `markmap` 标识符的代码块。  
- **可自定义预览**：  
  - 通过 frontmatter 调整样式和选项。  
  - 兼容 [remark-markmap](https://github.com/markmap-universe/remark-markmap#frontmatter-options) 和 [hexo-markmap](https://github.com/markmap-universe/hexo-markmap#options)。  
- **语法高亮**：<small>（仍存在一些问题）</small>  
  - 高亮显示 Markmap frontmatter 和 Markdown 内容。

![](res/preview.png)


## 使用方法

### `hexo-markmap` 标签

```markdown
{% markmap %}
---
style: |
  #${id} {
    height: 300px; /* 等价于 {% markmap 300px %} */
  }
options:
  colorFreezeLevel: 2
---
# Markdown
# 语法
{% endmarkmap %}
```

### 代码块

````markdown
```markmap
---
style: |
  #${id} {
    height: 300px;
  }
options:
  colorFreezeLevel: 2
---
# Markdown
# 语法
```
````

### 独立选项

您可以在 `markmap` 标签中单独自定义每个思维导图。

#### Frontmatter 选项

所有 frontmatter 选项均为可选。

- **`id`**：用于定义 `markmap-wrap` 元素的 ID。  
  - 如果未指定，将生成一个唯一的 ID。

- **`style`**：用于定义思维导图的自定义 CSS 样式。
  - `${id}` 占位符可用于样式字段。在渲染时，它将被替换为 `markmap-wrap` 的实际 ID，确保页面上的每个思维导图元素具有唯一的样式和行为。
  
- **`options`**：对应 markmap 项目中的 [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html)。有关更多详细信息，请参考 [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list)。

#### 标签选项

您还可以直接在标签中指定思维导图的高度。

```markdown
{% markmap 300px %}
# Markdown
# 语法
{% endmarkmap %}
```

### 配置

**`markmap-universe.globalOptions`**
  - **类型**：`object`**：所有思维导图的全局选项。对应 [`Frontmatter 选项`](#frontmatter-选项) 中的 [`options`](#jsonOptions)。
  - **默认值**：`{}`
