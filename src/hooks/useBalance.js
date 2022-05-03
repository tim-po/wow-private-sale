import {useCallback, useEffect, useState} from "react";
import {useBUSDContract, useMMProContract} from "./useContracts";
import {useWeb3React} from "@web3-react/core";
import {walletconnectNoQr} from "../wallet/connectors";

export const useBalanceOfToken = (tokenContract) => {

    const {account, active, activate} = useWeb3React();

    const [balance, setBalance] = useState();
    const [balanceLoading, setBalanceLoading] = useState(true)
    const [shouldTryWalletConnect, setShouldTryWalletConnect] = useState(false)

    const updateBalance = useCallback(async () => {
        if (active) {
            setBalanceLoading(true)
            const b = await tokenContract.methods.balanceOf(account).call();
            setBalance(b)
            setBalanceLoading(false)
        }

    }, [tokenContract, account, active])

    function tryWalletConnect() {
        if(!active && shouldTryWalletConnect){
            setShouldTryWalletConnect(false)
            activate(walletconnectNoQr);
        }
    }

    useEffect(() => {
        updateBalance().then()
    }, [updateBalance])

    useEffect(() => {
        if(active && shouldTryWalletConnect){
            setShouldTryWalletConnect(false)
        } else {
            tryWalletConnect()
        }
    }, [active, shouldTryWalletConnect])

    useEffect(()=>{
        setTimeout(()=>{
            setShouldTryWalletConnect(true)
        }, 1000)
    }, [])

    return {balance, balanceLoading, updateBalance}
};

export const useBalanceOfBUSD = () => {
    const contact = useBUSDContract()
    return useBalanceOfToken(contact)
};

export const useBalanceOfMMPRO = () => {
    const contact = useMMProContract()
    return useBalanceOfToken(contact)
};