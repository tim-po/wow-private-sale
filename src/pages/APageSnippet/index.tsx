import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";

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
    const {locale} = useContext(LocaleContext)

    return (
        <div className="some-classname">
            {/* example of localisation usage */}
            <div>
                {localized(texts, locale)}
            </div>
        </div>
    )
};

SnippetPage.defaultProps = SnippetPageDefaultProps

export default SnippetPage

