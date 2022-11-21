import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../constants";
import './index.scss';
import BgContext from "Context/Background";
import {KeywordType} from "types";
import ModalsContext from "Context/KeywordsModal";
import {useSearchParams} from "react-router-dom";
import Link from 'components/Link';
import Description from "components/DiplomaGeneral/Description";
import Keywords from "components/DiplomaGeneral/Keywords";
import {makeKeywordsArray} from "utils/makeKeywordsArray";
import Card from "components/DiplomaGeneral/Card";
import {colors} from "../../constants";

type DiplomaSharePropType = {}

const DiplomaShareDefaultProps = {
  somePropWithDefaultOption: 'default value'
}

const DiplomaShare = () => {

  const [diplomaShareData, setDiplomaShareData] = useState<any>(undefined);
  const [keywords, setKeywords] = useState<KeywordType[]>([]);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(true);

  const [searchParams] = useSearchParams()

  const {setBg} = useContext(BgContext)
  const {setDisciplinesForModal, setKeywordsForModal} = useContext(ModalsContext)

  const getDiplomaShareData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trajectories/${searchParams.get('id')}/share/`)
      setDiplomaShareData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const getDeclension = (count: number) => {
    count %= 100;
    if (count >= 5 && count <= 20) {
      return "предметов";
    }
    count %= 10;
    if (count === 1) {
      return "предмет";
    }
    if (count >= 2 && count <= 4) {
      return "предмета";
    }
    return "предметов";
  }

  const openDisciplinesModal = (course: any, headerBg: string, item: any) => {
    setDisciplinesForModal(course, headerBg, item)
  }

  const openKeywordsModal = () => {
    setKeywordsForModal(keywords || [])
  }

  useEffect(() => {
    getDiplomaShareData()
    setBg('#F1F2F8')
  }, [])

  useEffect(() => {
    if (diplomaShareData && diplomaShareData.main_keywords.length) {
      const keywordsArray = makeKeywordsArray(diplomaShareData.main_keywords)
      setKeywords(keywordsArray)
    }
  }, [diplomaShareData])

  return (
    <div className="DiplomaPage">
      <div className="justify-content-between mb-0 align-items-center">
        <h5
          className="mb-0 titleShare">Траектория построена для {searchParams.get('name') ? searchParams.get('name') : 'анонимного будущего студента'}</h5>
        <div>
        </div>
      </div>
      <div className="DiplomaContainerShare">
        <div className="DiplomaCardShareLeft">
          <Description iconUrl={'/static/school.svg'} title={diplomaShareData?.educational_plan}/>
          <Keywords
            keywords={keywords?.slice(0, 10)}
            keywordsCount={keywords?.length}
            openKeywordsModal={openKeywordsModal}
            isKeywordsButtonHidden={false}
          />
          <div className={`DiplomaCard diplomaCardAbout ${isMobileModalOpen ? '' : 'closeBlock'}`}>
            <div className="row ">
              <img
                src="/static/closeBtn.svg"
                alt="close"
                className="closeBtn"
                onClick={() => setIsMobileModalOpen(false)}
              />
              <div className="likes-icon">
                <img src={'/static/like.svg'}/>
              </div>
              <div className="col">
                <div className="mb-2">
                  Этот образовательный маршрут построен с помощью <a href="/" className="TrackLink">ITMO.TRACK</a>.Ты
                  можешь создать свою траекторию вместе с нами!
                </div>
                <div className="buttons-wrapper">
                  <a href="/" className="MainButton mainButtonDiploma mr-2">
                    Хочу так же
                  </a>
                  <Link href={diplomaShareData?.educational_plan.replace('', '+')}>Читать больше на abit.itmo.ru</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="MargTopMobil">
          <div className="DiplomaCard mb-4">
            <div className="d-flex flexColumn DiplomaDisciplinesCard">
              <div className="LineImg"/>
              {diplomaShareData?.courses.map((course: any) => (
                <div className="flex-grow-1 mr-3 blockShare" key={course.course}>
                  <p
                    className="TextCenter mobilNone diplomaDisciplinesCount">{course.disciplines_count} {getDeclension(course.disciplines_count)}</p>
                  <p className="CourseLabel">{course.course} курс</p>
                  <div className="d-flexMobil">
                    {course.classes.map((item: any) => (
                      <Card
                        isDiplomaCard={false}
                        name={item.name}
                        title={item.name}
                        subtitle={item.disciplines_count}
                        openDisciplinesModal={() => openDisciplinesModal(`${course.course} курс`, colors[item.name], item)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

DiplomaShare.defaultProps = DiplomaShareDefaultProps

export default DiplomaShare

