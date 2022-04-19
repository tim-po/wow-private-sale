import {useCallback, useEffect, useState} from "react";

export const useBalanceOfToken = (tokenContract, address) => {
    const [balance, setBalance] = useState();
    const [balanceLoading, setBalanceLoading] = useState(true)

    const updateBalance = useCallback(async () => {
        setBalanceLoading(true)
        const b = await tokenContract.methods.balanceOf(address).call();
        setBalanceLoading(false)
        setBalance(b)
    }, [tokenContract, address])

    useEffect(() => {
        updateBalance().then()
    })
    
    return {balance, balanceLoading, updateBalance}
};
