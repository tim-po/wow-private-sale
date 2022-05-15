import React, {useContext} from 'react';
import {useLocale} from "../../Standart/hooks/useLocale";
import texts from './localization'
import LocaleContext from "../../Standart/LocaleContext";
import {localized} from "../../Standart/hooks/localized";

export const AllocationHeader = () => {
    const {locale} = useContext(LocaleContext)
    return (
        <div key={locale} className="w-full py-6 text-center">
            <div className="staking-text-and-stats-flex flex items-center justify-between w-full mt-6 px-4 pb-4">
                <div className="staking-page-main-text-container text-left">
                    <p className="mb-2 font-semibold md:text-6xl text-5xl">{localized(texts.AllocationMarket, locale)}</p>
                    <p className="text-2xl mb-2 font-light">
                        {localized(texts.ConnectWalletMessage, locale)}
                    </p>
                    <p className="text-2xl mb-2 font-light">
                        {localized(texts.MetamaskPricesMessage, locale)}
                    </p>
                </div>
            </div>
        </div>
    )
};
