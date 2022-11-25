import React, {useContext, useState} from "react";
import './index.scss'
import {isMobile} from "react-device-detect";
import {CourseType} from "../../../types";
import {hierarchy, pack} from "d3-hierarchy";
import {allControllTypes, colors} from "../../../constants";
import ControlTypeTile from "../../ControlTypeTile";
import ModalContext from "../../../Context/Modal";


// CONSTANTS
const focusedCircleRadius = 90

// DEFAULT FUNCTIONS

type TrajectoryStatsPropType = {
  course?: CourseType,
  className: string
}

const TrajectoryStatsDefaultProps = {}

const TrajectoryStats = (props: TrajectoryStatsPropType) => {
  const {course, className="Mobile"} = props;
  const [focusedCircleLoading, setFocusedCircleLoading] = useState(false);
  const [focusedCircle, setFocusedCircle] = useState<any>(undefined);

  const {displayModal} = useContext(ModalContext)

  const transformedClassData = () => {
    return {
      name: "Top Level",
      children: amount().map((klass) => ({
        ...klass,
        size: klass.amount,
        parent: "Top Level",
      })),
    };
  }

  const getNecessityCount = () => {
    const necessityCount = {necessary: 0, chosen: 0}
    if (course) {
      course.necessity_count.forEach(type => {
        // @ts-ignore
        necessityCount[type.name] = type.count
      })
    }

    return necessityCount
  }

  const layoutData = () => {
    // Generate a D3 hierarchy
    const rootHierarchy = hierarchy(transformedClassData())
      // @ts-ignore
      .sum((d) => d.size)
    .sort((a, b) => {
        // @ts-ignore
      return b.value - a.value;
    });
    return pack().size([400, 400]).padding(8)(rootHierarchy);
  }

  const amount = () => {
    let amountReturn: { name: any; amount: any; }[] = [];

    if (course !== undefined) {
      course.classes_count.forEach(klass => {
        amountReturn.push({
          name: klass["name"],
          amount: klass["count"],
        });
      })
    }

    return amountReturn;
  }

  const getCircleTextOf = (klass: any) => {
    if (klass.data.name.length < klass.r / 3.2 ||
      (!focusedCircleLoading && isFocusedOnCircleOf(klass)) ||
      klass.r > focusedCircleRadius
    ) {
      return klass.data.name
    }
    return `${klass.data.name.substring(0, klass.r / 4.2)}...`
  }

  const getTransitionOf = (klass: any) => {
    let xTrans = klass.x - klass.r
    let yTrans = klass.y - klass.r

    if (focusedCircle === undefined || focusedCircle.r > focusedCircleRadius) {
      return {x: xTrans, y: yTrans}
    }

    let focusCircleXtrans = focusedCircle.x - focusedCircleRadius
    let focusCircleYtrans = focusedCircle.y - focusedCircleRadius

    if (focusedCircle.x - focusedCircleRadius < 0) {
      focusCircleXtrans = 4
    }
    if (focusedCircle.y - focusedCircleRadius < 0) {
      focusCircleYtrans = 4
    }

    if (focusedCircle.x + focusedCircleRadius > 400) {
      focusCircleXtrans = 400 - (focusedCircleRadius * 2)
    }
    if (focusedCircle.y + focusedCircleRadius > 400) {
      focusCircleYtrans = 400 - (focusedCircleRadius * 2)
    }

    if (isFocusedOnCircleOf(klass)) {
      return {x: focusCircleXtrans, y: focusCircleYtrans}
    }

    let rDiff = (focusedCircleRadius - focusedCircle.r)
    let xDiff = klass.x - focusedCircle.x
    let yDiff = klass.y - focusedCircle.y

    xTrans += xDiff / 2 * (rDiff / Math.abs(xDiff)) * Math.sqrt(400 - xDiff) / 20
    yTrans += yDiff / 2 * (rDiff / Math.abs(yDiff)) * Math.sqrt(400 - yDiff) / 20

    return {x: xTrans, y: yTrans}
  }
  const isFocusedOnCircleOf = (klass: any) => {
    return focusedCircle && focusedCircle.data.name === klass.data.name
  }
  const focusOnCircle = (klass: any) => {
    if (focusedCircle === undefined) {
      setFocusedCircle(klass)
      setFocusedCircleLoading(true)
      setTimeout(() => {
        setFocusedCircleLoading(false)
      }, 300)
    }
  }

  const openNecessaryDisciplinesModal = () => {
    // displayModal(<ListOfExams name="Обязательные" list="getList.necessary.disciplines"/>)
  }
  const openChosenDisciplinesModal = () => {
    // displayModal(<ListOfExams name="По выбору" list="getList.chosen.disciplines"/>)
  }
  return (
    <div className={`StatsContainer ${className}`}>
      <div className="MainHeader">Статистика</div>
      <div
        className="TrajectoryCard"
        style={{'padding': 0}}
      >
        <div className="StatsCircles">
          {layoutData().children?.map((klass: any) => {
            return (
              <div
                className={`Circle ${(focusedCircle && focusedCircle.data.name === klass.data.name) ? 'Focused' : ''}`}
                key={klass.data.name}
                onMouseEnter={(e) => {
                  setFocusedCircle(klass)
                }}
                onMouseLeave={(e) => {
                  console.log(focusedCircle, klass)
                  if (focusedCircle.data.name === klass.data.name) {
                    setFocusedCircle(undefined)
                  }
                }}
                style={
                  {
                    'background': `${isFocusedOnCircleOf(klass) ? colors[klass.data.name] : '#F3F3F4'}`,
                    'left': `${getTransitionOf(klass).x}px`,
                    'top': `${getTransitionOf(klass).y}px`,
                    'width': `${klass.r * 2}px`,
                    'height': `${klass.r * 2}px`,
                    'minWidth': `${klass.r * 2}px`,
                    'minHeight': `${klass.r * 2}px`,
                  }
                }
              >
                <div className="CircleValue">
                  {klass.data.amount}
                </div>
                <div className="CircleText">
                  {getCircleTextOf(klass)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="scroll">
        <div className="rowContent">
          {allControllTypes.map((controlTypeName) => {
            if(!course){
              return null
            }
            return (
              <ControlTypeTile
                controlType={
                  course.control_type_count.find((controlType) => controlType.name === controlTypeName) ||
                  {name: controlTypeName, count: 0}
                }
              />
            )
          })}
        </div>
      </div>
      <h6 className="mt-4 disciplines">Дисциплины</h6>
      <div className="DisciplinesNecessityCol TrajectoryCard mt-1 marginMobil">
        <div
          className={`DisciplinesNecessityFlex ${getNecessityCount().necessary > 0 ? '' : 'notActive'}`}
          onClick={openNecessaryDisciplinesModal}
        >
          <button className="HoverDisciplinesNecessityFlex">
            Обязательные
          </button>
          <span>
          {getNecessityCount().necessary}
        </span>
        </div>
        <div
          className={`DisciplinesNecessityFlex ${getNecessityCount().chosen > 0 ? '' : 'notActive'}`}
          onClick={openChosenDisciplinesModal}
        >
          <button className="HoverDisciplinesNecessityFlex">
            По выбору
          </button>
          <span>
          {
            getNecessityCount().chosen
          }
        </span>
        </div>
      </div>
    </div>
  )
};

TrajectoryStats.defaultProps = TrajectoryStatsDefaultProps

export default TrajectoryStats