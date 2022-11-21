import React, {useContext, useState} from "react";
import './index.scss'
import {KeywordType} from "../../types";

// CONSTANTS
const randomFeedbackSelectOptions = [
  'Поиск ключевых слов 🔎️',
    'Добавление/ удаление слов 🗑',
    'Все сложно  🤯', 'Все понятно 👌'
]


// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type KeywordsPropType = {
    // You should declare props like this, delete this if you don't need props
    someProp: any
    somePropWithDefaultOption?: string
}

const KeywordsDefaultProps = {
    // You should declare default props like this, delete this if you don't need props
    somePropWithDefaultOption: 'default value'
}

const Keywords = (props: KeywordsPropType) => {
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [keywordsToAdd, setKeywordsToAdd] = useState<KeywordType[]>([]);
  const [requiredWordsLimit, setRequiredWordsLimit] = useState(0);
  const [isSearchUnsuccessful, setIsSearchUnsuccessful] = useState(false);
  const [isBadWord, setIsBadWord] = useState(false);

  return (
      <div className="keywords" id="box">
          <div>
              <div className="keywordsCustomisationFlex">
                  <div className="leftBlock">
                      <div className="search">
                          <!--            <h4 id='blob-1-top-left' class="subheader top deckHidden">Добавь то, что хочешь изучить</h4>-->
                          <div id="blob-1-top-left" className="subheader top deckHidden">
                              <span className="subheader-title">Добавь то, что хочешь изучить</span>
                              <div className="subheader-counter" v-if="addedKeywords.length">+{{
                                  addedKeywords
                                  .length
                              }}</div>
                          </div>
                          <SearcKeywords/>
                          <div className="keywordsSubtext" id='blob-1-bottom-right'>
                              Например: язык программирования C#
                          </div>
                          <div
                            v-if="addedKeywords ? addedKeywords.length === 0  true"
                            className="textCenter mt-4 magnifierTextContainer"
                          >
                              <img src="/magnifier.svg" width="94" height="139" alt=""/>
                              <span className="magnifier">
              Ищи и добавляй навыки, которые хочешь получить в ИТМО
            </span>
                          </div>
                          <div className="keywordsAddedContainer">
                              <b-row className="keywordsAdded" no-gutters>
                                  <Keyword
                                    v-for="keyword in addedKeywords"
                                    key="keyword"
                                    deletable="true"
                                    keyword="keyword"
                                    bg-color="'var(--color-secondary)'"
                                    ondeleteSelf="deleteAddedKeyword(keyword)"
                                  />
                              </b-row>
                          </div>
                      </div>
                  </div>
                  <div className="searchBlock">
                      <p className="subheader">
                          Уже в наборе
                      </p>
                      <div className="keywordsPresets">
                          <div
                            v-if="!keywords.length"
                            v-for="n in 100"
                            key="n"
                            className="skeleton"
                            style="{'width': Math.floor(Math.random() * (390 - 41 + 1)) + 41 + 'px'}"
                          />
                          <Keyword
                            v-if="keywords.length"
                            v-for="keyword in keywords"
                            key="keyword.text"
                            keyword="keyword"
                            bg-color="'var(--color-secondary)'"
                            ondeleteSelf="deleteKeyword(keyword)"
                          />
                      </div>
                  </div>
              </div>
          </div>
          <!--        <ModalTooltip-->
          <!--          v-if="isTool"-->
          <!--          handelClick = "hideTooltip"-->
          <!--          countOfElement = "isEditing ? [0,1]  [0]"-->
          <!--          position = "!isEditing ? 'topRight'  'center01'"-->
          <!--          text = " isEditing ? 'Теперь ты можешь удалять и добавлять навыки (ключевые слова)' -->
          <!--          `Мы подобрали навыки, необходимые для присета ${profession.name}`"-->
          <!--        />-->
          {/*<RandomFeedback display-for-group="8" button=buttonFeedback*/}
          {/*                title="Что-то на этой странице вызвало трудности? "/>*/}
      </div>
    )
};

Keywords.defaultProps = KeywordsDefaultProps

export default Keywords