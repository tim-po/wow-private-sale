import React, {useEffect, useState} from "react";
import './index.scss';
import axios from "axios";
import {BASE_URL, colors} from "../../../constants";
import {TrajectoryDisciplineType} from 'types'
import {useSearchParams} from "react-router-dom";

type TrajectoryDisciplineModalPropType = {
  id: number
}

const TrajectoryDisciplineModal = (props: TrajectoryDisciplineModalPropType) => {

  const {id} = props
  const [searchParams] = useSearchParams()
  const [trajectoryDisciplineData, setTrajectoryDisciplineData] = useState<TrajectoryDisciplineType | undefined>(undefined)
  const [sortedPrevDisciplines, setSortedPrevDisciplines] = useState<string[]>([])
  const [isOtherReplacementOptionsOpen, setIsOtherReplacementOptionsOpen] = useState<boolean>(false)

  const getDisciplineData = async (disciplineId?: number) => {
    try {
      const response = await axios.get(`${BASE_URL}trajectory_disciplines/${disciplineId ? disciplineId : id}/`)
      setTrajectoryDisciplineData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const sortPrevDisciplines = () => {
    const sortedDisciplines: string[] = []

    if (trajectoryDisciplineData && trajectoryDisciplineData.prev_disciplines?.length) {
      trajectoryDisciplineData.prev_disciplines.forEach(function (entry) {
        sortedDisciplines.push(entry.name)
      });
    }

    const result = sortedDisciplines.reduce((acc: string[], item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    }, [])

    setSortedPrevDisciplines(result)
  }

  const toggleReplacementOptions = () => {
    setIsOtherReplacementOptionsOpen(!isOtherReplacementOptionsOpen)
  }

  useEffect(() => {
    getDisciplineData()
  }, [])

  useEffect(() => {
    sortPrevDisciplines()
  }, [trajectoryDisciplineData])

  return (
    <div className="containerDiscipline">
      {trajectoryDisciplineData &&
        <>
          <div
            className="disciplineImage"
            style={{background: `${colors[trajectoryDisciplineData.class]}`}}
          >
            <div className="subjectsFlex">
              {trajectoryDisciplineData.prev_disciplines?.length ?
                <p className="TextCenter modalColHeader">
                  Сначала изучить
                </p>
                :
                ''
              }
              <div>
                {sortedPrevDisciplines.map(sortedDiscipline => (
                  <div className="disciplineCardModal mb-2 mx-auto">
                    {sortedDiscipline}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="subjectsFlex"
            >
              <p
                className="TextCenter modalColHeader">
                {searchParams.get('course')} курс
              </p>
              <div>
                <button
                  className="disciplineCardModal mx-auto"
                  onClick={toggleReplacementOptions}
                >
                  {trajectoryDisciplineData.name}
                  {trajectoryDisciplineData.replacement_options?.length ?
                    <img
                      src="/static/arrowBottom.svg"
                      alt="arrow"
                      className={`Arrow ${isOtherReplacementOptionsOpen ? 'open' : 'close'}`}
                    />
                    :
                    ''
                  }
                </button>
                {trajectoryDisciplineData.replacement_options?.length ?
                  <div
                    className={`disciplineCardModal fallingDiscipline mx-auto mt-3 replacement_options ${isOtherReplacementOptionsOpen ? 'open' : 'close'}`}
                  >
                    {trajectoryDisciplineData.replacement_options.map(replacementOption => (
                      <button
                        className="discipline"
                        onClick={() => getDisciplineData(replacementOption.id)}
                      >
                        {replacementOption.name}
                      </button>
                    ))}
                  </div>
                  :
                  ''
                }
              </div>
            </div>
            <div className="subjectsFlex">
              {trajectoryDisciplineData.next_disciplines?.length ?
                <p
                  className={`TextCenter modalColHeader ${trajectoryDisciplineData.next_disciplines.length ? '' : 'displayNone'}`}>
                  Где пригодится
                </p>
                :
                ''
              }
              {trajectoryDisciplineData.next_disciplines?.length ?
                <div>
                  {trajectoryDisciplineData.next_disciplines.map(nextDiscipline => (
                    <div
                      // className="disc ? furtherUse= true  ''"
                      className="disciplineCardModal mb-2 mx-auto"
                    >
                      {nextDiscipline.name}
                    </div>
                  ))}
                </div>
                :
                ''
              }
              <div>

                <div
                  // v-for="disc in sort(discipline.next_disciplines)"
                  // className="disc ? furtherUse= true  ''"
                  // className="disciplineCardModal mb-2 mx-auto"
                >
                  {/*{{disc}}*/}
                </div>
              </div>
            </div>
          </div>
          <div className="disciplineModalContent">
            <div
              className="justify-content-between align-items-center mb-4 containerName">
              <h5
                className="discModalHeader mb-0"
                style={{maxWidth: '700px'}}
              >
                {trajectoryDisciplineData.name}
              </h5>
              <div className="tags">
              <span
                className={`disciplineDetail ${trajectoryDisciplineData.necessity && 'discipline-detail-pink'} ${!trajectoryDisciplineData.necessity && 'discipline-detail-green'}`}
              >
                {
                  trajectoryDisciplineData.necessity ?
                    "Обязательный предмет"
                    :
                    "Предмет по выбору"
                }
              </span>
                <span className="disciplineDetail disciplineDetailYellow">
              {trajectoryDisciplineData.control}
            </span>
              </div>
            </div>
            <p className="modalKeywordsHeader">
              Полученные знания и навыки -
              <span
                className="modalKeywordsCoverage"
                style={{color: `${colors[trajectoryDisciplineData.class]}`}}
              >
               Пересечение с ключевыми словами
                {Math.round(trajectoryDisciplineData.keywords_coverage * 100)}%
            </span>
            </p>
            <div className={'aligned-keywords-wrapper'}>
              {trajectoryDisciplineData.keywords_aligned_with_user.map(keyword => (
                <div
                  className="modalKeyword mr-2 mb-2"
                  style={{background: `${colors[trajectoryDisciplineData.class]}60`}}
                >
                  {keyword}
                </div>
              ))}
              {trajectoryDisciplineData.keywords.filter(word => !trajectoryDisciplineData.keywords_aligned_with_user.includes(word) && word !== '').map(keyword => (
                <div
                  style={{background: `${colors[trajectoryDisciplineData.class]}20`}}
                  className="mr-2 mb-2 modalKeyword"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </>
      }
    </div>
  )
};

export default TrajectoryDisciplineModal;