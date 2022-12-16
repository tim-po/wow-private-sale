import React, {useEffect, useState} from "react";

const useStickyHeaders = () => {
  const [stickyHeaders, setStickyHeaders] = useState<{[key: number]: {id: number, stickinesOrder: number}}>({})
  const containerRef = React.createRef<HTMLDivElement>();

  const createStickyBlock = (order: number) => {
    const id = Math.round(Math.random()*1000)
    const newBlock = {id: id, stickinesOrder: order}
    console.log(order)
    // setStickyHeaders(
    //   {
    //     ...(stickyHeaders || {}),
    //     ...{[id]: newBlock}
    //   }
    // )
    return `${id}-${order}`
  }

  const setupStickyBlocks = () => {
    let customStickyBlocks = window.document.querySelectorAll('[data-custom-sticky]')
    console.log(customStickyBlocks)

    const blocksWithProps: any[] = []
    customStickyBlocks.forEach(block => {
      // @ts-ignore
      const attribute = block.attributes['data-custom-sticky'].nodeValue.split('-')
      console.log(attribute)
      const props = {id: +attribute[0], order: +attribute[1]}
      blocksWithProps.push({element: block, ...props})
    })
    console.log(blocksWithProps)

    const blocksGroupedByOrder: {[key: number]: any[] } = {}
    blocksWithProps.forEach(block => {
      blocksGroupedByOrder[block.order] = [...(blocksGroupedByOrder[block.order] || []), block]
    })

    console.log(blocksGroupedByOrder)
    let top = 0
    Object.values(blocksGroupedByOrder).forEach((group, index) => {
      group.forEach(block => {
        block.element.style.position = 'sticky'
        block.element.style.top = `${top}px`
      })
      console.log(group[0].element)
      console.log(group[0].element.clientHeight)
      top += group[0].element.offsetHeight
    })
  }

  useEffect(() => {
    setupStickyBlocks()
  }, []);

  return {
    createStickyBlock,
    containerRef
  }
}

export default useStickyHeaders;