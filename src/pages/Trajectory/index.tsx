import React, {useContext} from "react";
import {TrajectoryType} from "../../types";
import Diploma from "../Diploma";
import {useSearchParams} from "react-router-dom";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make a new page

type TrajectoryPropType = {
    trajectory: TrajectoryType
    somePropWithDefaultOption?: string
}

const TrajectoryDefaultProps = {
    somePropWithDefaultOption: 'default value'
}

const Trajectory = (props: TrajectoryPropType) => {
    const {trajectory} = props;
    const [searchParams] = useSearchParams()
    return (
      <div className="TrajectoryPage">
          {/*<div className="flex-row justify-content-between mb-0 align-items-center">*/}
          {/*    <h5 className="mb-0 StileText" id="scrollToTop">{trajectory.educational_plan}</h5>*/}
          {/*    <div className="CoursesRow">*/}
          {/*        <CourseSelector*/}
          {/*          tor bgColor="courseNumberFromQuery === 5 ? '#FFFFFF': '#F3F3F8'" leftOffset="selectorLeftOffset"/>*/}
          {/*        <div className="CoursesRowFirstFlex">*/}
          {/*            <button*/}
          {/*              className="{*/}
          {/*    'CourseButtonActive': number === +$route.query.course,*/}
          {/*  }"*/}
          {/*              className="CourseButton"*/}
          {/*              v-for="number in courses"*/}
          {/*              key="number"*/}
          {/*              onClick="navigateToCourse(number)"*/}
          {/*            >*/}
          {/*                <div className="Course"*/}
          {/*                     className="{'CourseButtonActive': number === +$route.query.course, }">{{number}} Курс*/}
          {/*                </div>*/}
          {/*            </button>*/}
          {/*        </div>*/}
          {/*        <button*/}
          {/*          className="CourseButtonDiploma"*/}
          {/*          onClick="navigateToCourse(5)"*/}
          {/*        >*/}
          {/*            Итого*/}
          {/*        </button>*/}
          {/*    </div>*/}
          {/*</div>*/}
          {/*<hr className="HeaderDivider"*/}
          {/*    style="courseNumberFromQuery === 5 ? {'background-color': '#FFFFFF'}: {'background-color': 'var(--gray-100)'}"/>*/}
          {/*<div className="MainTrajectoryFlex" v-if="course && courseNumberFromQuery !== 5">*/}
          {/*    <TrajectoryStats class="Mobile"/>*/}
          {/*    <div className="col-8 MobileBlock">*/}
          {/*        <div className={`mobileBottomWrapper ${isModalActive || discipline? 'ModalNone':''}`}>*/}
          {/*            <div className="BottomButtonsCurs">*/}
          {/*                <button className="buttonCourse" v-on:click="toggleModalStatistics">*/}
          {/*                    Статистика по курсу*/}
          {/*                </button>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*        <div className="flex-row pl-5 semesterSeason">*/}
          {/*            <div>*/}
          {/*                <p className="flex-column TrajectorySmallHeader mt-3" id="!checkMobi() && 'blob-0-top-left'">Осенний*/}
          {/*                    семестр</p>*/}
          {/*            </div>*/}
          {/*            <div>*/}
          {/*                <p className="flex-column TrajectorySmallHeader mt-3" id="!checkMobi() && 'blob-1-top-left'">Весенний*/}
          {/*                    семестр</p>*/}
          {/*            </div>*/}
          {/*        </div>*/}

                  {/*<Card class="ClassCard"*/}
                  {/*      onselectNewSphere="selectNewSphere(sphere.name)"*/}
                  {/*      v-for="sphere in course.classes"*/}
                  {/*      sphere="sphere"*/}
                  {/*      onfunctionSemesterSwitching="semesterSwitching()"*/}
                  {/*      selectedSphere="selectedSphere"*/}
                  {/*      blockDisclosure="blockDisclosure"*/}
                  {/*      isDisplayStateTool="isDisplayTool"*/}
                  {/*      style="'background:' + colors[sphere.name]"/>*/}
          {/*        <div style={{marginBottom: '100px'}}/>*/}
          {/*    </div>*/}
          {/*</div>*/}
          {/*{searchParams.get('course') === '5' &&*/}
          {/*    <Diploma />*/}
          {/*}*/}
          {/*<div>*/}
          {/*    <GenericModalComponent*/}
          {/*      maxHeight="true"*/}
          {/*      modal="isModalActive"*/}
          {/*      colorCloseWhite="false"*/}
          {/*      hideMobile="false"*/}
          {/*      hideDesktop="false"*/}
          {/*      onmodalClose="toggleModalStatistics()">*/}

          {/*        <TrajectoryStats/>*/}
          {/*    </GenericModalComponent>*/}
          {/*</div>*/}
          {/*<GenericModalComponent*/}
          {/*  onmodalClose="deselectModalDiscipline()"*/}
          {/*  modal="(!!discipline)"*/}
          {/*  colorCloseWhite="true"*/}
          {/*  hideMobile="false"*/}
          {/*  hideDesktop="false"*/}
          {/*>*/}
          {/*    <DisciplineModal/>*/}
          {/*</GenericModalComponent>*/}

          {/*<div className="isModalPromptActiv? '':'ModalNone'">*/}
       {/*       <ModalTooltip*/}
       {/*         v-if="isDisplayTool && +this.$route.query.course !== 5"*/}
       {/*         handelClick="hideTooltip"*/}
       {/*         countOfElement="isFirstTooltip ? [0]  [1]"*/}
       {/*         position="isFirstTooltip ? 'rightTop'  'leftTop'"*/}
       {/*         text="isFirstTooltip ? 'Здесь ты можешь увидеть все предметы 1 семестра )'*/}
       {/*'А тут 2 семестра )'"*/}
       {/*       />*/}
       {/*   </div>*/}
          {/*<RandomFeedback display-for-group="3" button=randomFeedback.firstOptionSelectButton*/}
          {/*                title="Удобно ли тебе знакомиться с образовательной программой ?"/>*/}
          {/*<RandomFeedback display-for-group="4" button=randomFeedback.secondOptionSelectButton*/}
          {/*                title="Что-то на этой странице вызвало трудности? "/>*/}
      </div>
    )
};

Trajectory.defaultProps = TrajectoryDefaultProps

export default Trajectory

