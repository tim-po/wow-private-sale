import React, {useContext, useState} from "react";
import './index.scss'
import styled from 'styled-components';
import {CountType} from "../../../types";

type DisciplinesModalPropType = {
  discipline: (CountType & { disciplines: CountType[] })
  course?: number
  headerBg?: string
}

const DisciplinesModalDefaultProps = {}

const DisciplinesModal = (props: DisciplinesModalPropType) => {
  const {discipline, course, headerBg} = props
  return (
    <div className="disciplineModalContainer">
      <div className="disciplineHeaderContainer" style={{background: `${headerBg}`}}>
        {course && <div className="course-of-disc">{course}</div>}
        <div className="classesNameDisc">{discipline.name}</div>
      </div>
      <div className="ExamModalContainer">
        <div
          className="disciplinesElementsContainer">
          {discipline.disciplines.map((smth: any, index: number) => (
            <div className="disciplinesElements" key={smth.name}>
              {Object.values(smth['control_types']).map((el: any) => (
                <div className="disciplinesElement" key={el.name}>
                  <div className="d-flex flex-row">
                    <div className="disciplinesElementsCount">{index + 1}</div>
                    <div>{smth.name}</div>
                  </div>
                  <div className="disciplines-elements__name">{el.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

DisciplinesModal.defaultProps = DisciplinesModalDefaultProps

export default DisciplinesModal