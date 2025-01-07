const handlerMap = new Map<Element, (entry: IntersectionObserverEntry) => void>()

const handler = (entries: IntersectionObserverEntry[]) => {
  for (const entry of entries) {
    handlerMap.get(entry.target)?.(entry)
  }
}

const config: IntersectionObserverInit = {
  rootMargin: '10px 0px 10px 0px',
  threshold: 0.3,
}

const fadeVisibleObserver = new IntersectionObserver(handler, config)

export const addTargetToFadeVisibleObserver = (
  target: Element,
  handler: (entry: IntersectionObserverEntry) => void,
) => {
  fadeVisibleObserver.observe(target)
  handlerMap.set(target, handler)
}

export const removeTargetFromFadeVisibleObserver = (target: Element) => {
  fadeVisibleObserver.unobserve(target)
  handlerMap.delete(target)
}
