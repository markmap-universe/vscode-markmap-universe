import { deriveOptions, Markmap } from 'markmap-view'
import { Toolbar } from 'markmap-toolbar'
import { debounce } from "radashi"

const resize = {
  event: new Event('resize'),
  observer: new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.dispatchEvent(resize.event)
    })
  }),
  listeners: new Map<Element, (event: Event) => void>(),
  observe: (el: Element, func: () => void) => {
    if (!(el instanceof Element) || typeof func !== "function") return

    if (!resize.listeners.has(el)) {
      resize.listeners.set(el, func)
      el.addEventListener("resize", func)
      resize.observer.observe(el)
    }
  },
  destroyAll: () => {
    resize.listeners.forEach((func, el) => {
      el.removeEventListener("resize", func)
      resize.observer.unobserve(el)
    })
    resize.listeners.clear()
  }
}

const toolbar = (markmapInstance: Markmap) => {
  const toolbar = Toolbar.create(markmapInstance)
  toolbar.setBrand(false)
  return toolbar.el
}

const updateMarkmapSize = (markmapInstance: Markmap) => {
  const svg: SVGSVGElement = markmapInstance.svg.node()
  const { y2: height } = markmapInstance.state.rect
  svg.style.height = `${height}`
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
    resize.observe(wrapper, debounce({ delay: 100 }, () => updateMarkmapSize(markmapInstance)))
  })
}

window.addEventListener('vscode.markdown.updateContent', () => {
  resize.destroyAll()
  render()
})

render()

