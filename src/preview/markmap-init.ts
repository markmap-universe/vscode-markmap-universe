import { deriveOptions, Markmap } from 'markmap-view'
import { Toolbar } from 'markmap-toolbar'
import { debounce } from "radashi"

const resize = {
  resizeListeners: new Map<HTMLElement, () => void>(),

  add(el: HTMLElement, callback: () => void) {
    if (!(el instanceof HTMLElement) || typeof callback !== "function") return
    if (!this.resizeListeners.has(el)) {
      callback() // Call the callback immediately to set the initial size
      this.resizeListeners.set(el, callback)
    }
  },

  clear() {
    this.resizeListeners.clear()
  }
}

window.addEventListener('resize', () => {
  resize.resizeListeners.forEach(callback => callback())
})

const toolbar = (markmapInstance: Markmap) => {
  const toolbar = Toolbar.create(markmapInstance)
  toolbar.setBrand(false)
  return toolbar.el
}

const updateMarkmapSize = (markmapInstance: Markmap, autoHeight: boolean) => {
  if (autoHeight) {
    const svg: SVGSVGElement = markmapInstance.svg.node()
    const { y2: height } = markmapInstance.state.rect
    svg.style.height = `${height}`
  }
  markmapInstance.fit()
}

const render = () => {
  document.querySelectorAll<HTMLElement>('.markmap-wrap').forEach((wrapper) => {
    if (wrapper.children.length < 2) return
    const [root, jsonOptions] = Array.from(wrapper.children, (el) => {
      try {
        return JSON.parse(el.innerHTML)
      } catch {
        console.warn('Failed to parse JSON:', el.innerHTML)
        return null
      }
    })
    if (!root || !jsonOptions) return
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    wrapper.replaceChildren(svg)
    const markmapInstance = Markmap.create(svg, deriveOptions(jsonOptions), root)
    if (wrapper.dataset?.toolbar !== 'false') wrapper.appendChild(toolbar(markmapInstance))
    const autoHeight = !wrapper.style.height
    resize.add(wrapper, debounce({ delay: 100 }, () => updateMarkmapSize(markmapInstance, autoHeight)))
  })
}

window.addEventListener('vscode.markdown.updateContent', () => {
  resize.clear()
  render()
})

render()

