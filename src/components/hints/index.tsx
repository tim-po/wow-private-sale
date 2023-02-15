import React, { RefObject, useEffect, useState } from 'react'
import './index.scss'
import HintGeneric from './HintGeneric'
import Portal from './Portal'
import { LocalStorageInteraction, withLocalStorage } from '../../utils/general'
type PropsType = {
  boxRef: RefObject<HTMLElement>[]
  pageTitle: string
  nameRef: string[]
  title: string[]
  description: string[]
}
const Hints = (props: PropsType) => {
  const { boxRef, nameRef, title, description, pageTitle } = props
  const [isLocalDataHint, setIsLocalDataHint] = useState<boolean>()
  const [numberOpenPage, setNumberOpenPage] = useState<number>(0)
  const [stateLocal, setStateLocal] = useState<string>('true')

  const valueLocal = withLocalStorage(
    { [`${nameRef[numberOpenPage]}`]: [null] },
    LocalStorageInteraction.load,
  )
  useEffect(() => {
    if (Object.values(valueLocal).pop()[0] === null) {
      setIsLocalDataHint(true)
    }
    setTimeout(() => {
      withLocalStorage(
        { [`${nameRef[numberOpenPage]}`]: isLocalDataHint },
        LocalStorageInteraction.save,
      )
    }, 500)
  }, [isLocalDataHint, numberOpenPage])

  useEffect(() => {
    if (Object.values(valueLocal).pop() === true) {
      setIsLocalDataHint(true)
    } else if (Object.values(valueLocal).pop() === false) {
      setIsLocalDataHint(false)
    }
  }, [])

  return (
    <Portal>
      <HintGeneric
        status={isLocalDataHint === true ? '' : 'closeHint'}
        boxRef={boxRef[numberOpenPage]}
        nameRef={nameRef[numberOpenPage]}
        listRef={boxRef}
        setIsLocalDataHint={setIsLocalDataHint}
        isLocalDataHint={isLocalDataHint}
        title={title[numberOpenPage]}
        setNumberOpenPage={setNumberOpenPage}
        numberOpenPage={numberOpenPage}
        description={description[numberOpenPage]}
      />
    </Portal>
  )
}

export default Hints
