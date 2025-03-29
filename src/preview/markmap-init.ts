import { deriveOptions, Markmap } from 'markmap-view'
import { Toolbar } from 'markmap-toolbar'
import { debounce } from "radashi"

const resize = {
  event: new Event('resize'),
  observer: new ResizeObserver((entries) =>
    entries.forEach((entry) => entry.target.dispatchEvent(resize.event))
  ),
  observe: (el: Element, func: () => void) => {
    resize.observer.observe(el)
    el.addEventListener('resize', func)
  },
}

const toolbar = (markmapInstance: Markmap) => {
  const toolbar = Toolbar.create(markmapInstance)
  toolbar.setBrand(false)
  return toolbar.el
}

const init = () => {
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
    const elements: Element[] = [svg]
    const markmapInstance = Markmap.create(svg, deriveOptions(jsonOptions), root)
    if (wrapper.dataset?.toolbar !== 'false') elements.push(toolbar(markmapInstance))
    wrapper.replaceChildren(...elements)
    resize.observe(wrapper, debounce({ delay: 100 }, () => markmapInstance.fit()))
  })
}

window.addEventListener('vscode.markdown.updateContent', init)

init()

