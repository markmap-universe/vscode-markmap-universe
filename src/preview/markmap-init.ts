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

const init = () => document.querySelectorAll<HTMLElement>('.markmap-wrap').forEach((wrapper) => {
  const [root, jsonOptions] = Array.from(wrapper.children, (el) => JSON.parse(el.innerHTML))
  wrapper.innerHTML = '<svg></svg>'
  const svg = wrapper.querySelector('svg')
  const markmapInstance = Markmap.create(svg, deriveOptions(jsonOptions), root)
  if (wrapper?.dataset?.toolbar !== 'false') {
    wrapper.append(toolbar(markmapInstance))
  }
  resize.observe(wrapper, debounce({ delay: 100 }, () => markmapInstance.fit()))
})

window.addEventListener('vscode.markdown.updateContent', init)

init()

