import React, {useCallback, useEffect, useState} from "react";
import {AllocationHeader} from "../../components/AllocationHeader";
import {useWeb3React} from "@web3-react/core";
import {useAllocationMarketplaceContract} from "../../hooks/useContracts";
import {AllocationContainer} from "../../components/AllocationContainer";
import {wei2eth} from "../../utils/common";
import BorderCard from "../../components/common/BorderCard"
import {useBalanceOfBUSD} from "../../hooks/useBalance";
import {AllocationItem} from "../../components/AllocationItem";

const TIERS = [0, 1, 2, 3, 4];

export const Allocation = () => {
    const {active, account} = useWeb3React();
    const allocationMarketplaceContract = useAllocationMarketplaceContract();

    const {balance, balanceLoading, updateBalance} = useBalanceOfBUSD(account)

    const [allocationBalances, setAllocationBalances] = useState(Array(TIERS.length).fill(0));
    const [allocationPrices, setAllocationPrices] = useState(Array(TIERS.length).fill(undefined));
    const [loadingBalances, setLoadingBalances] = useState(false);
    const [loadingPrices, setLoadingPrices] = useState(false);

    const loadAllocationBalances = useCallback(async () => {
        const accounts = Array(TIERS.length).fill(account);
        if (active) {
            const balances = await allocationMarketplaceContract
                .methods
                .balanceOfBatch(accounts, TIERS)
                .call();
            setAllocationBalances(balances.map(val => parseInt(val)));
        }
    }, [active, account, allocationMarketplaceContract]);

    const loadAllocationPrices = useCallback(async () => {
        const prices = [];

        for (let tier of TIERS) {
            let tierPrice = await allocationMarketplaceContract
                .methods
                .allocationPrice(tier)
                .call();
            prices.push(tierPrice);
        }

        setAllocationPrices(prices);
    }, [allocationMarketplaceContract]);

    useEffect(() => {
        setLoadingBalances(true);
        loadAllocationBalances()
            .then(() => setLoadingBalances(false));
    }, [loadAllocationBalances]);

    useEffect(() => {
        setLoadingPrices(true);
        loadAllocationPrices()
            .then(() => setLoadingPrices(false))
    }, [loadAllocationPrices]);

    const showConnectWallet = !active
    const showLoading = loadingBalances && loadingPrices
    const showAllocationBody = !showLoading && !showConnectWallet

    const balanceMessage = balanceLoading ? "Loading..." : `Available: ${wei2eth(balance)} BUSD`

    return (
        <div className="staking-page-container mx-auto pb-18 px-4 force-height">
            <AllocationHeader/>
            {showConnectWallet && <div className="text-center">Connect Wallet</div>}
            {showLoading && <div className="text-center">Loading...</div>}
            {showAllocationBody &&
            <BorderCard noLine title={balanceMessage}
                        className={' stake-configurator'}>
                <AllocationContainer>
                    {TIERS.map((tier, ind) =>
                        <AllocationItem tier={tier} price={allocationPrices[ind]} initAmount={allocationBalances[ind]}
                                        updateBalance={updateBalance} balance={balance}/>
                    )}
                </AllocationContainer>
            </BorderCard>
            }

        </div>
    )
};

