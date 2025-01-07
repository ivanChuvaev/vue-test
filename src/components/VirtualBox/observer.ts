const handlerMap = new Map<Element, (entry: IntersectionObserverEntry) => void>()

const handler = (entries: IntersectionObserverEntry[]) => {
  for (const entry of entries) {
    handlerMap.get(entry.target)?.(entry)
  }
}

const config: IntersectionObserverInit = {
  rootMargin: '100px 0px 100px 0px',
  threshold: 0.0,
}

const observer = new IntersectionObserver(handler, config)

export const addTargetToObserver = (
  target: Element,
  handler: (entry: IntersectionObserverEntry) => void,
) => {
  observer.observe(target)
  handlerMap.set(target, handler)
}

export const removeTargetFromObserver = (target: Element) => {
  observer.unobserve(target)
  handlerMap.delete(target)
}
