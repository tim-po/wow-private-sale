import React, {useContext} from "react";
import './index.scss'
import ModalContext from "../../Context/Modal";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type ControlTypeTilePropType = {
    // You should declare props like this, delete this if you don't need props
    controlType: any
    somePropWithDefaultOption?: string
}

const ControlTypeTileDefaultProps = {
    // You should declare default props like this, delete this if you don't need props
    somePropWithDefaultOption: 'default value'
}

const ControlTypeTile = (props: ControlTypeTilePropType) => {
    const {displayModal} = useContext(ModalContext)
    return (
      <div className="count>0 ? '':'notActive'">
          {/*<button className="CourseCardControlCard" className="additionalClassnames" v-on:click="modalClose">*/}
          {/*    <span>{{controlType}}</span>*/}
          {/*    <br/>*/}
          {/*    <b style="font-size: 18px; font-weight: 600">*/}
          {/*        {{count}}*/}
          {/*    </b>*/}
          {/*</button>*/}
          {/*<GenericModalComponent*/}
          {/*  modal="isModalActive"*/}
          {/*  colorCloseWhite="false"*/}
          {/*  hideMobile="false"*/}
          {/*  hideDesktop="false"*/}
          {/*  onmodalClose="modalClose()">*/}
          {/*    <ListOfExams name="controlType" list="list"/>*/}
          {/*</GenericModalComponent>*/}
      </div>
    )
};

ControlTypeTile.defaultProps = ControlTypeTileDefaultProps

export default ControlTypeTile