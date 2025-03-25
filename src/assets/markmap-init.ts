import { deriveOptions, Markmap } from 'markmap-view'
import { Toolbar } from 'markmap-toolbar'

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

const debounce = (callback: (...args: any[]) => void, wait: number) => {
  let timeout: number
  return (...args: any[]): void => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), wait)
  }
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
  resize.observe(wrap, debounce(() => markmapInstance.fit(), 100))
})

window.addEventListener('vscode.markdown.updateContent', init)

init()

