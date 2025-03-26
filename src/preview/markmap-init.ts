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

const init = () => document.querySelectorAll('.markmap-wrap').forEach((wrap) => {
  const [root, jsonOptions] = [].slice.call(wrap.children).map((el: Element) => JSON.parse(el.innerHTML))
  wrap.innerHTML = '<svg></svg>'
  const svg = wrap.querySelector('svg')
  const markmapInstance = Markmap.create(svg, deriveOptions(jsonOptions), root)
  wrap.append(toolbar(markmapInstance))
  resize.observe(wrap, debounce({ delay: 100 }, () => markmapInstance.fit()))
})

window.addEventListener('vscode.markdown.updateContent', init)

init()

