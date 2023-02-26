import React from 'react'
import './index.scss'
import ImgMainLetterB from 'images/icons/Static/imgMainLetterB'
import ImgMainLetterA from 'images/icons/Static/imgMainLetterA'
import ImgMainLetterC from 'images/icons/Static/imgMainLetterC'
import ImgMainLetterD from 'images/icons/Static/imgMainLetterD'
import CareerSlider from './CareerSlider'

const ProfessionCareer = () => {
  return (
    <div className="professionCareerWrapper">
      <span className="professionCareerWrapperTitle">Карьера</span>
      <CareerSlider />
      <span className="professionCareerWrapperTitle">Чем ты будешь заниматься</span>
      <div className="activitiesBlock">
        <div className="activitiesBlockItem">
          <ImgMainLetterA width={40} height={40} />
          <span className="actionBlockItemText">
            Рефакторить и оптимизировать разработанные приложений
          </span>
        </div>
        <div className="activitiesBlockItem">
          <ImgMainLetterB width={40} height={40} />
          <span className="actionBlockItemText">
            Рефакторить и оптимизировать разработанные приложений
          </span>
        </div>
        <div className="activitiesBlockItem">
          <ImgMainLetterC width={40} height={40} />
          <span className="actionBlockItemText">
            Рефакторить и оптимизировать разработанные приложений
          </span>
        </div>
        <div className="activitiesBlockItem">
          <ImgMainLetterD width={40} height={40} />
          <span className="actionBlockItemText">
            Рефакторить и оптимизировать разработанные приложений
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfessionCareer
