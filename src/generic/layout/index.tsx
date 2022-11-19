import React, {useContext} from "react";
import './index.scss'

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type layoutPropType = {
    // You should declare props like this, delete this if you don't need props
    someProp: any
    somePropWithDefaultOption?: string
}

const layoutDefaultProps = {
    // You should declare default props like this, delete this if you don't need props
    somePropWithDefaultOption: 'default value'
}

const layout = (props: layoutPropType) => {
    return (
        <div className={'layout'}>
        </div>
    )
};

layout.defaultProps = layoutDefaultProps

export default layout