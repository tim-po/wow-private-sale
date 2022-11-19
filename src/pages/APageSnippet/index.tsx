import React, {useContext} from "react";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make a new page

type SnippetPagePropType = {
    someProp: any
    somePropWithDefaultOption?: string
}

const SnippetPageDefaultProps = {
    somePropWithDefaultOption: 'default value'
}

const SnippetPage = (props: SnippetPagePropType) => {

    return (
        <div className="some-classname">
        </div>
    )
};

SnippetPage.defaultProps = SnippetPageDefaultProps

export default SnippetPage

