import React, { useEffect, useState } from 'react'
import './index.scss'
import HintGeneric from './HintGeneric'
import Portal from './Portal'
import { LocalStorageInteraction, withLocalStorage } from '../../utils/general'
type PropsType = {
  boxRef: any
  pageTitle: string
  nameRef: string[]
  title: string[]
  description: string[]
}
const Hints = (props: PropsType) => {
  const { boxRef, nameRef, title, description, pageTitle } = props
  const [isLocalStorage, setIsLocalStorage] = useState<boolean>()
  const [numberOpenPage, setNumberOpenPage] = useState<number>(0)

  const valueLocal = withLocalStorage(
    { [`${nameRef[numberOpenPage]}`]: [null] },
    LocalStorageInteraction.load,
  )
  useEffect(() => {
    if (Object.values(valueLocal).pop()[0] === null ) {
      setIsLocalStorage(true)
    }
    setTimeout(() => {
      withLocalStorage(
        { [`${nameRef[numberOpenPage]}`]: isLocalStorage },
        LocalStorageInteraction.save,
      )
    }, 500)

  }, [isLocalStorage, numberOpenPage])

  useEffect(() => {

    if (Object.values(valueLocal).pop() === true) {
      setIsLocalStorage(true)
    } else if (
      Object.values(valueLocal).pop() === false
    ) {
      setIsLocalStorage(false)
    }
  }, [])

  return (
    <Portal>
      <HintGeneric
        status={isLocalStorage === true ? '' : 'closeHint'}
        boxRef={boxRef[numberOpenPage]}
        nameRef={nameRef[numberOpenPage]}
        listRef={boxRef}
        setIsLocalStorage={setIsLocalStorage}
        isLocalStorage={isLocalStorage}
        title={title[numberOpenPage]}
        setNumberOpenPage={setNumberOpenPage}
        numberOpenPage={numberOpenPage}
        description={description[numberOpenPage]}
      />
    </Portal>
  )
}

export default Hints
