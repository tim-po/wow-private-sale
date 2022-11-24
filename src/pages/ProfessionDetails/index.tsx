import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import BgContext from "../../Context/Background";
import {BASE_URL} from "../../constants";
import axios from "axios";
import {KeywordType, PresetType, Profession} from "../../types";
import BackButtonContext from "../../Context/BackButton";
import ModalsContext from "../../Context/Modal";
import keyword from "../../components/Keyword";
import Keyword from "../../components/Keyword";
import {makeEmptyList} from "../../utils/general";
import './index.scss'
import SelectedPresets from "../../components/SelectedPresets";

// CONSTANTS

// DEFAULT FUNCTIONS


const ProfessionDetails = () => {

  const navigate = useNavigate()
  const {setBg} = useContext(BgContext)
  const {setNewBackButtonProps} = useContext(BackButtonContext)
  // const {setKeywordsForModal} = useContext(ModalsContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false);
  const [requiredWordsLimit, setRequiredWordsLimit] = useState(0);
  const [profession, setProfession] = useState<Profession | undefined>(undefined);
  const [presets, setPresets] = useState<PresetType[]>([]);
  const [selectedPresetIds, setSelectedPresetIds] = useState<string[]>([]);
  const [addedKeywords, setAddedKeywords] = useState<KeywordType[]>([]);

  useEffect(() => {
    setBg('white');
    getProfession()
    getPresets()
    loadAddedWordsFromLocal()

    if (searchParams.get('view') === 'main') {
      setNewBackButtonProps('Все профессии', '/professions')
    } else {
      setNewBackButtonProps(`${profession?.name}: описание`, `/professionDetails?view=main&id=${searchParams.get('id')}`)
    }
  }, [])

  useEffect(() => {
    calculateRequiredLimit()
  }, [profession])

  const loadAddedWordsFromLocal = () => {
    let keywords = localStorage.getItem('addedKeywords')
    if (keywords === '' || !keywords) {
      setAddedKeywords([])
    } else {
      setAddedKeywords(JSON.parse(keywords))
    }
  }

  const getPresets = async () => {
    const response = await axios.get(`${BASE_URL}/presets/`)
    setPresets(response.data)
    let ids = localStorage.getItem('presetIds')
    if (ids) {
      setSelectedPresetIds(ids.split(','))
    }
  }
  const getProfession = async () => {
    const response = await axios.get(`${BASE_URL}professions/${searchParams.get('id')}/`)
    setProfession(response.data)
  }

  const openTrajectoryChoice = async () => {
    setIsLoading(true)
    if (!profession) {
      return
    }
    const selectedPresets = presets.filter(preset => selectedPresetIds.includes(preset.id))
    let postKeywords = [...addedKeywords, ...profession.related_keywords].map(item => item.id)
    selectedPresets.forEach(preset => {
      preset.keywords.forEach(word => {
        postKeywords.push(word.id)
      })
    })
    const response = await axios.post(`${BASE_URL}trajectories/?top_n=3`, {'keywords': postKeywords})

    let ids: string[] = []
    response.data.forEach((el: any) => ids.push(el.id))
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

  // const openKeywordsModal = () => {
  //   setKeywordsForModal(profession?.related_keywords || [])
  // }

  const clearChoice = () => {
    switch (searchParams.get('view')) {
      case 'keywords':
        setAddedKeywords([])
        localStorage.setItem('addedKeywords', JSON.stringify([]))
        break;
      case 'skills':
        setSelectedPresetIds([])
        localStorage.setItem('presetIds', '')
        break;
      default:
        break;
    }
  }

  const currentHeader = () => {
    switch (searchParams.get('view')) {
      case 'keywords':
        return 'Ключевые слова'
      case 'skills':
        return 'Наборы навыков'
      case 'main':
        return profession ? profession.name : ''
      default:
        return ''
    }
  }

  const calculateRequiredLimit = () => {
    if (profession) {
      setRequiredWordsLimit(Math.ceil(profession.related_keywords.length * 0.8))
    }
  }

  // const deleteKeyword = (keyword: KeywordType) => {
  //     const mewKeywords = [...addedKeywords].filter(item => item.id != keyword.id)
  //     setAddedKeywords([...addedKeywords].filter(item => item.id != keyword.id))
  // }

  const isClearButtonDisabled = () => {
    if (searchParams.get('view') === 'keywords' && addedKeywords.length < 1) {
      return true
    }
    return searchParams.get('view') === 'skills' && selectedPresetIds.length < 1;

  }

  return (
    <div className="professionDetails">
      <div className="headerFlex">
        <h4 className="currentHeader fontWeightBold" id="scrollToTop"> {currentHeader()}</h4>
        {searchParams.get('view') !== 'main' &&
          <div className="bottomLeftContainer">
            <button
              className={`clear ${isClearButtonDisabled() ? 'disabled' : ''}`}
              onClick={clearChoice}
            >
              Очистить выбор
            </button>
            <button className="save" onClick={saveChoice}>Сохранить</button>
          </div>
        }
      </div>
      {searchParams.get('view') === 'main' &&
        <div className="keywordsCustomisationFlex">
          <div className="professionsContainer">
            <div className="professionDescription">
              <p className="subheader subheader-mobile">Описание</p>
              <div className="keywords__card">
                <div className="profession-data">
                  {profession &&
                    <>
                      {makeEmptyList(40).map(index => {
                        return (
                          <div
                            key="n"
                            className="skeleton"
                            style={{'width': Math.floor(Math.random() * (100 - 30 + 1)) + 30 + 'px', 'height': '12px'}}
                          />
                        )
                      })}
                    </>
                  }
                  {profession &&
                    <p className="mb-0">
                      {profession ? profession.description : ""}
                    </p>
                  }
                </div>
              </div>
              <div className="blockDescription">
                <div className="professionDescriptionText">
                  {!selectedPresetIds.length &&
                    <span className="build-trajectory-text">
                      Мы уже собрали для тебя готовый набор ключевых слов. Этого будет достаточно чтобы построить траекторию
                      <br/>
                      Ты можешь продолжить без изменений или добавить то, что хочешь изучить дополнительно.
                    </span>
                  }
                  {selectedPresetIds.length &&
                    <span>
                    Вау, ты добавил новые навыки! Теперь можно строить траекторию
                   </span>
                  }
                  <div className="blockDescriptionMobil">
                    <button className="button-primary" onClick={openTrajectoryChoice}>
                      {selectedPresetIds.length ? 'Мне все нравится' : 'Построить'}
                    </button>
                  </div>
                </div>
                {!selectedPresetIds.length && <img src="/static/professionLamsIcon.svg" className="lamp-icon" />}
                {selectedPresetIds.length && <img src="/static/finger-like.svg" className="like" alt="icon"/>}
              </div>
              {/*<div*/}
              {/*  className="keywords__warning mb-2"*/}
              {/*  v-if="(keywords && keywords.length > 0) ? (keywords.length <= requiredWordsLimit)  false"*/}
              {/*>*/}
              {/*    <div className="d-flex">*/}
              {/*        <img src="/static/warning.svg" alt="" className="mr-2"/>*/}
              {/*        Ты можешь удалить не более 30% набора ключевых слов своей профессии*/}
              {/*    </div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="right-flex">
            <div className="containerPresets">
              <div className="blockFlex">
                <div id="blob-1-top-left" className="subheader">
                  <span className="subheader-title">Наборы навыков</span>
                  {selectedPresetIds.length &&
                    <div className="subheader-counter">+{
                      selectedPresetIds.length
                    }</div>
                  }
                </div>
                {selectedPresetIds.length &&
                  <div onClick={editSkillSets} className="edit-button">
                    <img src="/static/MagicWand.svg" className="edit-button-icon"/>
                    <span className="edit-button-text">Редактировать</span>
                  </div>
                }
              </div>
              {/*<LoadingScreen header="Подбираем траектории" isLoading={isLoading}/>*/}
              {/*<SelectedPresets canDelete={false} selectedPresets={}/>*/}
            </div>
            <div className="containerBlockFlex">
              <div className="blockFlex">
                <div id="blob-0-top-left" className="subheader">
                  <span className="subheader-title">Ключевые слова</span>
                  {addedKeywords.length &&
                    <div className="subheader-counter">+{
                      addedKeywords.length
                    }</div>
                  }
                </div>
                <div onClick={editKeywords} className="edit-button">
                  <img src="/static/MagicWand.svg" className="edit-button-icon"/>
                  <span className="edit-button-text">Редактировать</span>
                </div>
              </div>
              <div className="row keywords__required" id="blob-0-bottom-right">
                {!profession || !profession.related_keywords.length &&
                  <>
                    {makeEmptyList(20).map(index => {
                      return (
                        <div
                          key={index}
                          className="skeleton"
                          style={{width: Math.floor(Math.random() * (300 - 41 + 1)) + 41 + 'px'}}
                        />
                      )
                    })}
                  </>
                }

                {profession &&
                  <>
                    {profession.related_keywords.slice(0, 25).map(keyword => {
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
                }
                {profession && profession.related_keywords.length > 25 &&
                  <button className="modalKeywords ">
                    +{profession.related_keywords.length - 25}
                  </button>
                }
              </div>

            </div>
          </div>
        </div>
      }
      <div className="blockDescriptionMobil bottom">
        <button className="button-primary" onClick={openTrajectoryChoice}>
          {selectedPresetIds.length ? 'Мне все нравится' : 'Построить'}
        </button>
      </div>
      {/*{searchParams.get('view') === 'keywords' &&*/}
      {/*  <Keywords/>*/}
      {/*}*/}
      {/*{searchParams.get('view') === 'skills' &&*/}
      {/*  <SkillSets/>*/}
      {/*}*/}
    </div>
  )
}

export default ProfessionDetails

