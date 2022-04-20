import React, {useEffect, useState} from "react";
import Spinner from "../common/Spinner";
import Button from "../common/Button";
import {wei2eth} from "../../utils/common";
import {useAllocationMarketplaceContract, useBUSDContract, usePancakeRouterContract} from "../../hooks/useContracts";
import fromExponential from "from-exponential";
import {getAllocationMarketplaceAddress, getBUSDAddress, getMMProAddress} from "../../utils/getAddress";
import {useWeb3React} from "@web3-react/core";
import './index.css'


const INSUFFICIENT_BALANCE_ERROR_MESSAGE = "Insufficient balance";
const TRANSACTION_ERROR_MESSAGE = "Transaction failed";

const DEADLINE_OVER_NOW = 60 * 5 // 5 min
const ALLOWANCE = 10 ** 10 * 10 ** 18

export const AllocationItem = ({tier, price, initAmount, updateBalance, balance}) => {
    const {account} = useWeb3React();

    const allocationMarketplaceContract = useAllocationMarketplaceContract();
    const pancakeRouterContract = usePancakeRouterContract();
    const BUSDContract = useBUSDContract()
    const [amount, setAmount] = useState(initAmount)
    const [loadingBuy, setLoadingBuy] = useState(false)
    const [error, setError] = useState("")

    const getMinAmountOut = async () => {
        const path = [getBUSDAddress(), getMMProAddress()]
        return (await pancakeRouterContract
            .methods
            .getAmountsOut(price, path)
            .call())[1]
    }

    const getDeadline = () => {
        return Math.floor(new Date().getTime() / 1000) + DEADLINE_OVER_NOW;
    }

    const getAllowance = async () => {
        return await BUSDContract
            .methods
            .allowance(account, getAllocationMarketplaceAddress())
            .call();
    }

    const approve = async () => {
        const amount2eth = fromExponential(ALLOWANCE);
        await BUSDContract
            .methods
            .approve(getAllocationMarketplaceAddress(), amount2eth)
            .send({from: account});
    };

    const mint = async () => {
        await allocationMarketplaceContract
            .methods
            .mint(tier, await getMinAmountOut(), getDeadline())
            .send({from: account})
    }

    const handleBuy = async () => {
        if (loadingBuy){
            return
        }

        if (parseInt(price) > parseInt(balance)) {
            setError(INSUFFICIENT_BALANCE_ERROR_MESSAGE);
            return
        }

        setLoadingBuy(true)
        try {
            const allowance = await getAllowance()

            if (parseInt(price) > parseInt(allowance)) {
                await approve()
            }
            await mint()
            await updateBalance()
            setError("")
            setAmount(amount + 1)
        } catch (e) {
            setError(TRANSACTION_ERROR_MESSAGE)
            console.log({error: e})
        }
        setLoadingBuy(false)

    }

    const videoRef = React.createRef();

    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.playbackRate = 0.7;
        }
    }, [videoRef])

    return (
        <div
            className={'staking-element rounded-lg'}>
            <div className={`nft-video-container shadow-t-${tier + 1}`}>
              <video className={'nft-video rounded-lg '} ref={videoRef} autoPlay loop muted>
                  <source src={`/videoBackgrounds/Render_Tier${tier + 1}.webm`} type="video/webm" />
              </video>
                {price !== undefined &&
                <div className={'price text-2xl'}>
                    {parseInt(wei2eth(price))} BUSD
                </div>
                }
                {/*{amount > 0 &&*/}
                {/*<div className={'total text-2xl bg-primary rounded-lg z-10'}>*/}
                {/*    {amount}*/}
                {/*</div>*/}
                {/*}*/}
                {amount === 0 &&
                <button
                  onClick={handleBuy}
                  className={`buy-button ${amount === 0 && 'paywall'} rounded-lg text-2xl`}
                  disabled={loadingBuy}
                >
                    {loadingBuy ? (
                      <Spinner size={25} color={'#FFFFFF'}/>
                    ) : (
                      <>
                          <span className="w-64">Buy</span>
                      </>
                    )}
                </button>
                }
            </div>
        </div>
    )

}