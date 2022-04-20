/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {Footer} from "./components/Footer";
import {Header} from "./components/Header";

import {injected} from "./wallet";
import {Allocation} from "./pages/Allocation";

export const App = () => {
    const {active, activate, networkError} = useWeb3React();


    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized && !active && !networkError) {
                activate(injected);
            }
        });
    }, [activate, networkError]);

    return (
        <div className="w-full overflow-hidden main-gradient" style={{minHeight: '100vh'}}>
            <Header/>
            <Allocation/>
            <Footer/>
        </div>
    );
};
