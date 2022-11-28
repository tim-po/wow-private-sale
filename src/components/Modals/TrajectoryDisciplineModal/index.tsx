import React, {useEffect, useState} from "react";
import './index.scss';

type TrajectoryDisciplineModalPropType = {}

const TrajectoryDisciplineModal = (props: TrajectoryDisciplineModalPropType) => {

  return (
    <div className="containerDiscipline">
      <div
        // v-if="!!discipline"
        className="disciplineImage"
        // style="'background:' + colors[discipline.class]"
      >
        <div className="subjectsFlex">
          <p
            // v-if="discipline && discipline.prev_disciplines && discipline.prev_disciplines.length > 0"
            className="TextCenter modalColHeader"
          >Сначала изучить</p>
          <div>
            <div
              // v-for="(disc) in sort(discipline.prev_disciplines)"
              // className="disc? studyFirst=true  ''"
              // className="disciplineCardModal mb-2 mx-auto"
            >
              {/*{{disc}}*/}
            </div>
          </div>
        </div>
        <div
          className="subjectsFlex"
        >
          <p
            // className="TextCenter modalColHeader"
            // className="
            //     // 'modal-col-header-deactive': !discipline.next_disciplines,
            //      courseDate ? '': 'displayNone'
            //   "
          >курс</p>
          <div>
            <button
              // className="disciplineCardModal mx-auto"
              // className="discipline.name? courseDate=true  ''"
              // onClick="arrowOpenFunc"
            >
              {/*{{discipline.name}}*/}
              <img
                // v-if="discipline && discipline.replacement_options && discipline.replacement_options.length > 0"
                src="/arrowBottom.svg"
                // className="Arrow"
                // className="arrow ? 'close':'open'"
              />
            </button>
            <div
              // className="disciplineCardModal fallingDiscipline mx-auto mt-3 replacement_options"
              // v-if="discipline && discipline.replacement_options && discipline.replacement_options.length > 0"
              // className="arrow ? 'close':'open'"
            >
              <button
                // v-for="dist in discipline.replacement_options"
                // className="discipline"
                // v-on:click="replacement_option(dist.id)"
              >
                {/*{{dist.name}}*/}
              </button>
            </div>
          </div>
        </div>
        <div className="subjectsFlex">
          <p
            // v-if="discipline && discipline.next_disciplines && discipline.next_disciplines.length > 0"
            // className="
            //     'modal-col-header-deactive': !discipline.next_disciplines,
            //      discipline.next_disciplines.length > 0 ? '': 'displayNone'
            //   "
            // className="TextCenter modalColHeader"
          >
            Где пригодится
          </p>
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
      <div
        // v-if="!!discipline" className="disciplineModalContent"
      >
        <div
          className="justify-content-between align-items-center mb-4 containerName">
          <h5
            className="discModalHeader mb-0"
            // style="max-width: 700px"
          >
            {/*{{discipline.name}}*/}
          </h5>
          <div className="tags">
              <span
                // className="disciplineDetail"
                // className="{
                //   'discipline-detail-green': !discipline.necessity,
                //   'discipline-detail-pink': discipline.necessity,
                // }"
              >
                {/*{{*/}
                {/*  discipline.necessity*/}
                {/*    ? "Обязательный предмет"*/}
                {/*    "Предмет по выбору"*/}
                {/*}}*/}
              </span>
            <span className="disciplineDetail disciplineDetailYellow">
              {/*{{discipline.control}}*/}
            </span>
          </div>
        </div>
        <p className="modalKeywordsHeader">
          Полученные знания и навыки -
          <span
            className="modalKeywordsCoverage"
            // style="'color:' + colors[discipline.class]"
          >
              Пересечение с ключевыми словами
            {/*{{Math.round(discipline.keywords_coverage * 100)}}%*/}
            </span>
        </p>
        <div>
          <div
            className="modalKeyword mr-2 mb-2"
            // style="
            //     'background:' + colors[discipline.class]+'60' + '!important'
            //   "
            // v-for="alignedKeyword in discipline.keywords_aligned_with_user"
          >
            {/*{{alignedKeyword}}*/}
          </div>
          <div
            // v-for="keyword in [...discipline.keywords].filter(word => !discipline.keywords_aligned_with_user.includes(word) && word !== '')"
          >
            <div
              // style="
              //   'background:' + colors[discipline.class]+'20' + '!important'
              // "
              className="mr-2 mb-2 modalKeyword"
            >
              {/*{{keyword}}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TrajectoryDisciplineModal;