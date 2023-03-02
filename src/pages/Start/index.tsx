import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import ImgMainLetterB from 'images/icons/Static/imgMainLetterB'
import ImgMainLetterA from '../../images/icons/Static/imgMainLetterA'
import ImgMainLetterC from 'images/icons/Static/imgMainLetterC'
import Stars from '../../images/icons/Static/stars'
import Wave from 'images/icons/Static/wave'
import ManOnHomepage from '../../images/icons/manOnHomepage'
import { scrollToElement } from '../../utils/scrollToElement'
import { changeBg } from '../../utils/background/background'
import * as Scroll from 'react-scroll'

const Start = () => {
  useEffect(() => {
    changeBg('var(--bg-color-invert)')
  }, [])

  useEffect(() => {
    const scroll = Scroll.animateScroll
    scroll.scrollToTop()
    changeBg('var(--bg-color-invert)')
  }, [])

  return (
    <div className="ContainerLanding">
      <div className="Landing pb-5">
        <section className="LandingCard">
          <div className="LandingCardFlex FirstBlock">
            <div className="d-flex flex-column Desires">
              <h1 className="MainTitle">Переведем твои цели на язык дисциплин</h1>
              <div className="d-flex flex-column justify-content-center ImgMain StarsMobil">
                <ManOnHomepage />
              </div>
              <div className="FlexButton">
                <Link to="/professions" className="LinkProfession MainButton">
                  Поехали!
                </Link>
                <button
                  onClick={() => scrollToElement('scrollToAbout')}
                  className="SecondaryButton"
                >
                  Это как?
                </button>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center ImgMain Stars">
              <ManOnHomepage />
            </div>
          </div>
          <span className="HeaderSubtext">
            <span>ITMO.TRACK – Персональные</span>&nbsp;
            <span>образовательные траектории</span>
          </span>
        </section>
        <section className="info LandingCardFlex" id="scrollToAbout">
          <div className="HelloCard mr-3">
            <div className="TextCenter">
              <div className="hand-icon">
                <Wave />
              </div>
            </div>
            <p className="HelloText">
              Мы понимаем, как сложно бывает выбрать образовательную программу. Здесь мы
              поможем тебе построить свой путь в ИТМО.
            </p>
          </div>
          <div className="InfoCard flex-grow-1">
            <div className="InfoTitle">
              В ИТМО ты сам выбираешь, что изучать. Мы собрали самые популярные и
              востребованные профессии и навыки, по которым ты можешь построить свою
              персональную образовательную траекторию. Это очень просто:
            </div>
            <div className="point-wrapper">
              <div className="letter-icon">
                <ImgMainLetterA width={52} height={60} />
              </div>
              <p className="InfoText">
                Выбери профессию своей мечты, добавь интересующие тебя навыки и технологии
              </p>
            </div>
            <div className="point-wrapper">
              <div className="letter-icon">
                <ImgMainLetterB width={52} height={60} />
              </div>
              <p className="InfoText">
                Выбери наиболее подходящую образовательную программу
              </p>
            </div>
            <div className="point-wrapper">
              <div className="letter-icon">
                <ImgMainLetterC width={52} height={60} />
              </div>
              <p className="InfoText">Бинго! Твоя траектория готова!</p>
            </div>
          </div>
        </section>
        <div className="FinalCard mt-3 d-flex">
          <div className="Stars">
            <Stars />
          </div>
          <div className="mobilStar">
            <div className="FinalCardTitle">Начни свой путь к профессии мечты!</div>
            <div className="FlexEducationalTrajectory">
              <div className="StarsMobil">
                <Stars />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start
