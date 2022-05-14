import React, {useEffect, useState} from "react";
import Spinner from "../common/Spinner";
import {wei2eth} from "../../utils/common";
import {useAllocationMarketplaceContract, useBUSDContract, usePancakeRouterContract} from "../../hooks/useContracts";
import fromExponential from "from-exponential";
import {getAllocationMarketplaceAddress, getBUSDAddress, getMMProAddress} from "../../utils/getAddress";
import {useWeb3React} from "@web3-react/core";
import './index.css'
import {HidingText} from "../../Standart/components/HidingText";
import BigNumber from "bignumber.js";
import Button from "../common/Button";


const INSUFFICIENT_BALANCE_ERROR_MESSAGE = "Insufficient balance";
const TRANSACTION_ERROR_MESSAGE = "Transaction failed";

const DEADLINE_OVER_NOW = 60 * 5 // 5 min
const ALLOWANCE = 10 ** 10 * 10 ** 18

const SLIPPAGE_PERCENT = 0.93 // 7 %

const calcTimeToWithdraw = (stakeEndTime, currentTime) => {
    const diffSecs = stakeEndTime - currentTime

    if (diffSecs <= 0) {
        return ''
    }
    const diff_in_days = Math.floor(diffSecs / 3600 / 24).toFixed(0);
    const diff_in_hours = Math.floor((diffSecs % (3600 * 24)) / 3600).toFixed(
      0
    );
    const diff_in_mins = Math.floor(
      ((diffSecs % (3600 * 24)) % 3600) / 60
    ).toFixed(0);
    const diff_in_secs = Math.floor((diffSecs % (3600 * 24)) % 3600) % 60;

    if(+diff_in_days > 0){
        return `${diff_in_days} Days, ${+diff_in_hours > 0 ? `${diff_in_hours} hours`: ''}`
    }

    return `${+diff_in_hours > 0 ? `${diff_in_hours}:` : ''}${(+diff_in_mins < 10 && +diff_in_mins > 0) ? '0': ''}${+diff_in_mins > 0 ? `${diff_in_mins}:` : ''}${diff_in_secs < 10 ? `0${diff_in_secs}`: `${diff_in_secs}`}`;

};

export const AllocationItem = ({tier, price, initAmount, updateBalance, balance, allocationValue, ticketAmount}) => {
    const {account} = useWeb3React();

    const allocationMarketplaceContract = useAllocationMarketplaceContract();
    const pancakeRouterContract = usePancakeRouterContract();
    const BUSDContract = useBUSDContract()
    const [loadingBuy, setLoadingBuy] = useState(false)
    const [error, setError] = useState("")
    const [amount, setAmount] = useState(initAmount)
    const [allocationData, setAllocationData] = useState({})
    const [currentTime, setCurrentTime] = useState(Math.floor(new Date().getTime() / 1000));
    const [loading, setLoading] = useState(false)
    const [claimable, setClaimable] = useState(0)
    const [numbers, setNumbers] = useState([])



    useEffect(() => {
        // @ts-ignore
        if(allocationData && currentTime < allocationData.unlockEndsAt){
            setTimeout(() => {
                setCurrentTime(Math.floor(new Date().getTime() / 1000));
            }, 1000);
        }
        if(allocationData && currentTime < allocationData.unlockEndsAt){
            geTicketClaimable()
        }
    }, [currentTime, allocationData]);

    useEffect( () => {
        geTicketClaimable()
        geTicketNumbers()
        geTicketData().then(data => setAllocationData(data))
    }, [])

    const displayError = (text, time) => {
        setError(text)
        setTimeout(()=>{
            setError("")
        }, time)
    }

    async function mainButtonClicked(){
        setLoading(true)
        await allocationMarketplaceContract.methods.claimLocked(tier).send({from: account}).once('receipt', () => {
            geTicketData()
            geTicketClaimable()
            setLoading(false)
        })
    }

    async function geTicketNumbers(){
        const ticketNumbers = await allocationMarketplaceContract.methods.getLotteryTicketsOf(account, tier).call({from: account})
        setNumbers(ticketNumbers)
    }

    async function geTicketClaimable(){
        const ticketClaimable = await allocationMarketplaceContract.methods.availableToClaim(account, tier).call({from: account})
        setClaimable(ticketClaimable)
    }

    async function geTicketData(){
        return allocationMarketplaceContract.methods.userLevelTokenInfo(account, tier).call({from: account})
    }

    const getMinAmountOut = async () => {
        const path = [getBUSDAddress(), getMMProAddress()]
        return new BigNumber((await pancakeRouterContract
            .methods
            .getAmountsOut(price, path)
            .call())[1])
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
            .mint(tier, ((await getMinAmountOut()).multipliedBy(SLIPPAGE_PERCENT).toFixed(0).toString()), getDeadline())
            .send({from: account})
    }

    const handleBuy = async () => {
        if (loadingBuy){
            return
        }

        if (parseInt(price) > parseInt(balance)) {
            displayError(INSUFFICIENT_BALANCE_ERROR_MESSAGE, 2000);
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
            displayError(TRANSACTION_ERROR_MESSAGE, 2000)
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

    const locked = allocationData && currentTime < allocationData.intitialUnlockAvailableAt
    const allClaimed = (allocationData.totalReserved - allocationData.totalClaimed === 0)
    const timeLeft = calcTimeToWithdraw(allocationData.intitialUnlockAvailableAt, currentTime)

    return (
        <div
            className={'staking-element rounded-lg'}>
            <div className={`nft-video-container rounded-lg ${amount > 0 && `border-t-${tier + 1}`}`}>
                {amount > 0 &&
                  <div className={'owned-marker'}>
                      Owned
                  </div>
                }
                {/*{amount === 0 &&*/}
                {/*    <div className={'owned-marker'}>*/}
                {/*        Only {ticketAmount} left*/}
                {/*    </div>*/}
                {/*}*/}
              <video className={'nft-video rounded-lg '} ref={videoRef} autoPlay loop muted>
                  <source src={`/videoBackgrounds/nft${tier + 1}.mp4`} type="video/webm" />
              </video>
                {price !== undefined && amount <= 0 &&
                <div className={'price'}>
                    <div style={{fontSize: 22}}>
                        Allocation up to <b>{wei2eth(allocationValue)}$</b>
                    </div>
                    <div style={{fontSize: 17}}>
                        Price: {wei2eth(price)} BUSD
                    </div>
                </div>
                }
                {amount === 0 &&
                <button
                  onClick={handleBuy}
                  className={`buy-button ${(loadingBuy || error !== "") && 'paywall'} rounded-lg text-2xl`}
                  disabled={loadingBuy}
                >
                    {loadingBuy ? (
                      <Spinner size={25} color={'#FFFFFF'}/>
                    ) : (
                      <HidingText defaultText={amount === 0 ? 'Buy': 'Buy more'} hidingText={error}
                                  peekOut={error !== ""}/>
                    )}
                </button>
                }
                {amount > 0 &&
                <div className={"ticket-container p-4 bg-black"}>
                    <div className={"w-full"}>
                        Locked: <b>{parseFloat(wei2eth(allocationData.totalReserved - allocationData.totalClaimed).toString()).toFixed(2)}</b> MMPRO
                    </div>
                    <div className={"w-full mb-4"}>
                        Claimable: <b>{parseFloat(wei2eth(claimable).toString()).toFixed(2)}</b> MMPRO
                    </div>
                    {/* @ts-ignore */}
                    <Button
                      onClick={mainButtonClicked}
                      className="unstake-button flex flex-row items-center w-48 justify-center"
                      disabled={loading || allClaimed || locked}
                      bgColor={(locked || allClaimed) ? 'gray-500' : 'primary'}
                    >
                        {loading ? (
                          <Spinner size={25} color={'#FFFFFF'}/>
                        ) : (
                          <>
                              <img
                                src={locked ? "/images/locked.svg" : "/images/unlocked.svg"}
                                width="25"
                                alt=""
                              />
                              <span className={`w-64`} style={locked ? {
                                  fontWeight: "bolder",
                                  fontSize: 16
                              } : {}}> {locked ? timeLeft : (allClaimed ? 'Already claimed' : 'Claim')}</span>
                          </>
                        )}
                    </Button>
                </div>
                }
                {numbers.length !== 0 &&
                <div className={`tickets`}>
                    <div className={'tickets-title'}>
                        Your tickets
                    </div>
                    <div className={`tickets-flex`}>
                    {numbers.map(ticketNumber => (
                      <span className={'ticket-number'} key={ticketNumber}>{+ticketNumber}</span>
                    ))}
                    </div>
                </div>
                }
            </div>
        </div>
    )

}