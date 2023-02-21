import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BASE_URL } from '../../constants'
import axios from 'axios'
import Keyword from '../../components/Keyword'
import { makeEmptyList } from '../../utils/general'
import './index.scss'
import SelectedPresets from '../../components/SelectedPresets'
import { useProfession } from '../../Models/useProfession'
import Keywords from './Keywords'
import SkillSets from './SkillSets'
import LoadingScreen from '../../components/LoadingScreen'
import MagicWand from '../../images/icons/MagicWand'
import FingerLike from 'images/icons/Static/fingerLike'
import ProfessionLamsIcon from 'images/icons/Static/lightBulbs'

import KeywordsModal from '../../components/Modals/KeywordsModal'
import ModalsContext from '../../Context/Modal'
import { isMobile } from 'react-device-detect'
import { createStickyBlock, updateStickyBlocks } from '../../utils/stickyHeaders'
import Hints from '../../components/hints'
import { changeBg } from '../../utils/background/background'
import NotFound from '../../components/NotFound'
import { TrajectoryType } from 'types'

const ProfessionDetails = () => {
  const navigate = useNavigate()
  const { displayModal } = useContext(ModalsContext)
  // const {setKeywordsForModal} = useContext(ModalsContext)
  const [searchParams] = useSearchParams()

  const { profession, presets, keywords, error } = useProfession(
    searchParams.get('id') || '',
  )

  const [isLoading, setIsLoading] = useState(false)
  const [requiredWordsLimit, setRequiredWordsLimit] = useState(0)

  useEffect(() => {
    changeBg('white')
  }, [])

  useEffect(() => {
    updateStickyBlocks()
  }, [searchParams.get('view'), profession])

  const calculateRequiredLimit = () => {
    if (profession) {
      setRequiredWordsLimit(Math.ceil(profession.related_keywords.length * 0.8))
    }
  }

  useEffect(() => {
    calculateRequiredLimit()
  }, [profession])

  const openTrajectoryChoice = async () => {
    if (!profession) {
      return
    }
    setIsLoading(true)

    const response = await axios.post(`${BASE_URL}trajectories/?top_n=10`, {
      keywords: keywords.allIds,
    })

    const ids: string[] = []
    response.data.forEach((el: TrajectoryType) => ids.push(el.id))
    navigate(`/trajectories?ids=${JSON.stringify(ids)}`)
  }

  const saveChoice = () => {
    navigate(`professionDetails?id=${profession?.id}&view=main`)
  }

  const editKeywords = () => {
    navigate(`professionDetails?id=${profession?.id}&view=keywords`)
  }

  const editSkillSets = () => {
    navigate(`professionDetails?id=${profession?.id}&view=skills`)
  }

  const openKeywordsModal = () => {
    displayModal(<KeywordsModal keywords={keywords.display} />)
  }

  const clearChoice = () => {
    switch (searchParams.get('view')) {
      case 'keywords':
        keywords.clear()
        break
      case 'skills':
        presets.clear()
        break
      default:
        break
    }
  }

  const currentHeader = () => {
    switch (searchParams.get('view')) {
      case 'keywords':
        return 'Ключевые слова'
      case 'skills':
        return 'Наборы навыков'
      case 'main':
        return profession ? profession.name : '|'
      default:
        return ''
    }
  }

  const isClearButtonDisabled = () => {
    if (searchParams.get('view') === 'keywords' && keywords.added.length < 1) {
      return true
    }
    return searchParams.get('view') === 'skills' && presets.selected.length < 1
  }
  const hintEditKeywords = useRef<HTMLButtonElement>(null)
  const hintEditPresets = useRef<HTMLButtonElement>(null)
  // const hintEditKeyword = findDOMNode(hintEditKeywords);
  if (
    error ||
    !searchParams.get('view') ||
    !['keywords', 'skills', 'main'].includes(searchParams.get('view') ?? '')
  ) {
    return <NotFound />
  }

  return (
    <div className="professionDetails">
      <div className="headerFlex" {...createStickyBlock(1)} data-margin-top="0">
        <h4 className="currentHeader fontWeightBold" id="scrollToTop">
          {' '}
          {currentHeader()}
        </h4>

        {searchParams.get('view') !== 'main' && (
          <div className="bottomLeftContainer">
            <button
              className={`clear ${isClearButtonDisabled() ? 'disabled' : ''}`}
              onClick={clearChoice}
            >
              Очистить выбор
            </button>
            <button className="save" onClick={saveChoice}>
              Сохранить
            </button>
          </div>
        )}
      </div>

      {searchParams.get('view') === 'main' && (
        <div className="keywordsCustomisationFlex">
          <div className="professionContainer">
            <div className="professionDescription">
              <p className="subheader subheader-mobile" {...createStickyBlock(2)}>
                Описание
              </p>
              <div className="keywords__card">
                <div className="profession-data">
                  {profession ? (
                    <p className="mb-0">{profession.description ?? ''}</p>
                  ) : (
                    makeEmptyList(40).map((_, index) => {
                      return (
                        <div
                          key={index}
                          className="skeleton"
                          style={{
                            width: Math.floor(Math.random() * (100 - 30 + 1)) + 30 + 'px',
                            height: '12px',
                          }}
                        />
                      )
                    })
                  )}
                </div>
              </div>
              <div className="blockDescription">
                <div className="professionDescriptionText">
                  {presets.selected.length === 0 && (
                    <span className="build-trajectory-text">
                      Мы уже собрали для тебя готовый набор ключевых слов. Этого будет
                      достаточно чтобы построить траекторию.
                      <br />
                      Ты можешь продолжить без изменений или добавить то, что хочешь
                      изучить дополнительно.
                    </span>
                  )}
                  {presets.selected.length > 0 && (
                    <span>
                      Вау, ты добавил новые навыки! Теперь можно строить траекторию
                    </span>
                  )}
                  <div className="blockDescriptionMobil">
                    <button className="button-primary" onClick={openTrajectoryChoice}>
                      {presets.selected.length ? 'Мне все нравится' : 'Построить'}
                    </button>
                  </div>
                </div>
                {presets.selected.length === 0 && (
                  <div className="lamp-icon">
                    <ProfessionLamsIcon />
                  </div>
                )}
                {presets.selected.length > 0 && (
                  <div className="like">
                    <FingerLike />
                  </div>
                )}
              </div>
              {/* <div*/}
              {/*  className="keywords__warning mb-2"*/}
              {/*  v-if="(keywords && keywords.length > 0) ? (keywords.length <= requiredWordsLimit)  false"*/}
              {/* > */}
              {/*    <div className="d-flex">*/}
              {/*        <img src="/images/exclamationMarkInOutline.svg" alt="" className="mr-2"/>*/}
              {/*        Ты можешь удалить не более 30% набора ключевых слов своей профессии*/}
              {/*    </div>*/}
              {/* </div> */}
            </div>
          </div>
          <div className="right-flex">
            <div className="containerPresets">
              <div className="blockFlex" {...createStickyBlock(2)}>
                <div id="blob-1-top-left" className="subheader">
                  <span className="subheader-title">Наборы навыков</span>
                  {presets.selected.length > 0 && (
                    <div className="subheader-counter">+{presets.selected.length}</div>
                  )}
                </div>
                {presets.selected.length > 0 && (
                  <button onClick={editSkillSets} className="edit-button">
                    <div className="edit-button-icon">
                      <MagicWand width={20} height={20} />
                    </div>
                    <span className="edit-button-text">Редактировать</span>
                  </button>
                )}
              </div>
              <LoadingScreen header="Подбираем траектории" isLoading={isLoading} />
              <SelectedPresets
                hintEditPresets={hintEditPresets}
                isHidden={false}
                selectedPresets={presets.selected}
              />
            </div>
            <div className="containerBlockFlex">
              <div className="blockFlex">
                <div id="blob-0-top-left" className="subheader">
                  <span className="subheader-title" {...createStickyBlock(2)}>
                    Ключевые слова
                  </span>
                  {keywords.added.length > 0 && (
                    <div className="subheader-counter">+{keywords.added.length}</div>
                  )}
                </div>
                <button
                  onClick={editKeywords}
                  ref={hintEditKeywords}
                  className="edit-button"
                >
                  <div className="edit-button-icon">
                    <MagicWand width={20} height={20} />
                  </div>
                  <span className="edit-button-text">Редактировать</span>
                </button>
              </div>
              <div className="keywordsRequired" id="blob-0-bottom-right">
                {(!profession || !profession.related_keywords.length) && (
                  <>
                    {makeEmptyList(20).map((_, index) => {
                      return (
                        <div
                          key={index}
                          className="skeleton"
                          style={{
                            width: Math.floor(Math.random() * (300 - 41 + 1)) + 41 + 'px',
                          }}
                        />
                      )
                    })}
                  </>
                )}

                {profession && (
                  <>
                    {isMobile
                      ? keywords.display.slice(0, 10).map(keyword => {
                          return (
                            <Keyword
                              deletable={false}
                              key={keyword.text}
                              keyword={keyword}
                              bg-color="'var(--color-secondary)'"
                              // onDeleteSelf={()=>deleteKeyword(keyword)}
                            />
                          )
                        })
                      : keywords.display.slice(0, 25).map(keyword => {
                          return (
                            <Keyword
                              deletable={false}
                              key={keyword.text}
                              keyword={keyword}
                              bg-color="'var(--color-secondary)'"
                              // onDeleteSelf={()=>deleteKeyword(keyword)}
                            />
                          )
                        })}
                  </>
                )}
                {isMobile
                  ? profession &&
                    profession.related_keywords.length > 10 && (
                      <button className="modalKeywords" onClick={openKeywordsModal}>
                        +{profession.related_keywords.length - 10}
                      </button>
                    )
                  : profession &&
                    profession.related_keywords.length > 25 && (
                      <button className="modalKeywords" onClick={openKeywordsModal}>
                        +{profession.related_keywords.length - 25}
                      </button>
                    )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="blockDescriptionMobil bottom">
        <button className="button-primary" onClick={openTrajectoryChoice}>
          {presets.selected.length ? 'Мне все нравится' : 'Построить'}
        </button>
      </div>

      {profession && searchParams.get('view') === 'keywords' && <Keywords />}

      {searchParams.get('view') === 'skills' && <SkillSets />}
      <Hints
        boxRef={[hintEditKeywords, hintEditPresets]}
        pageTitle="ProfessionDetails"
        nameRef={['hintEditKeywords', 'hintEditPresets']}
        description={[
          'Мы уже собрали для тебя набор ключевых слов для траектории твоей профессии. Ты можешь его редактировать - удалять и добавлять навыки.',
          'В дополнение к ключевым словам ты можешь добавить наборы навыков, которые тебе интересны. Набор навыков - заранее собранный комплект ключевых слов.',
        ]}
        title={['Ключевые слова', 'Наборы навыков']}
      />
    </div>
  )
}

export default ProfessionDetails
