import React, {useEffect, useState} from "react";

export const createStickyBlock = (order: number) => {
  const id = Math.round(Math.random()*1000)
  if(order === -1){
    return {'data-custom-sticky': `${id}-hidden`}
  }
  return {'data-custom-sticky': `${id}-${order}`}
}

export const updateStickyBlocks = () => {
  let customStickyBlocks = window.document.querySelectorAll('[data-custom-sticky]')

  const blocksWithProps: any[] = []
  customStickyBlocks.forEach(block => {
    // @ts-ignore
    const attribute = block.attributes['data-custom-sticky'].nodeValue.split('-')
    if(attribute[1] === 'hidden'){
      // @ts-ignore
      block.style.position = 'sticky'
      // @ts-ignore
      block.style.top = `${-420}px`
    }else{
      const props = {id: +attribute[0], order: +attribute[1]}
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
    })
    top += group[0].element.offsetHeight
  })
}

export const calculateTotalStickyHeight = () => {
  let customStickyBlocks = window.document.querySelectorAll('[data-custom-sticky]')

  let top = 0
  customStickyBlocks.forEach((element, index) => {
    // @ts-ignore
    const attribute = element.attributes['data-custom-sticky'].nodeValue.split('-')
    if(attribute[1] !== 'hidden'){
      // @ts-ignore
      top += element.offsetHeight
    }
  })

  return top
}