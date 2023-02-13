export const createStickyBlock = (order: number) => {
  const id = Math.round(Math.random()*1000)
  if(order === -1){
    return {'data-custom-sticky': `${id}-hidden`}
  }
  return {'data-custom-sticky': `${id}-${order}`}
}

export const updateStickyBlocks = () => {
  let customStickyBlocks: NodeListOf<HTMLDivElement> = window.document.querySelectorAll('[data-custom-sticky]')

  const blocksWithProps: any[] = []
  customStickyBlocks.forEach(block => {
    // @ts-ignore
    const attribute = block.attributes['data-custom-sticky'].nodeValue.split('-')
    if(attribute[1] === 'hidden'){
      block.style.position = 'sticky'
      block.style.top = `${-420}px`
    }else{
      const props = {id: +attribute[0], order: attribute[1]}
      blocksWithProps.push({element: block, ...props})
    }
  })

  const blocksGroupedByOrder: {[key: number]: any[] } = {}

  blocksWithProps.forEach(block => {
    blocksGroupedByOrder[block.order] = [...(blocksGroupedByOrder[block.order] || []), block]
  })

  let top = 0
  Object.values(blocksGroupedByOrder).sort().forEach((group, index) => {
    group.forEach(block => {
      block.element.style.position = 'sticky'
      block.element.style.top = `${top}px`

      block.element.classList.add(`sticky-header-${index}`)
      block.element.classList.add(`sticky-header`)

      const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
        {threshold: [1], rootMargin: `${-top-2}px 0px 0px 0px`,}
      );

      observer.observe(block.element);
    })
    top += group[0].element.clientHeight
  })
}

export const calculateTotalStickyHeight = (group?: number) => {
  let customStickyBlocks: NodeListOf<HTMLDivElement> = window.document.querySelectorAll('[data-custom-sticky]')

  let top = 0
  customStickyBlocks.forEach((element) => {
    //@ts-ignore
    const attribute = element.attributes['data-custom-sticky'].nodeValue.split('-')
    if(attribute[1] !== 'hidden'){
      if(group){
        if(group <= attribute[0]){
          top += element.offsetHeight
        }
      }else{
        top += element.offsetHeight
      }
    }
  })

  return top
}