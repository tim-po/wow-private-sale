import {useWeb3} from "./useWeb3";
import MMPRO from '../contracts/MMPRO.json'
import PancakeRouter from '../contracts/PancakeRouter.json'
import USDT from '../contracts/USDT.json'
import PrivateSale from '../contracts/PrivateSale.json'
import {getMMProAddress, getPancakeAddress, getPrivateSaleAddress, getUsdtAddress} from "../web3/address";
export const useContract = (abi: any, address: string) => {
	const web3 = useWeb3();
	return new web3.eth.Contract(abi, address);
};

export const useMMProContract = () => {
	const abi = MMPRO.abi;
	return useContract(abi, getMMProAddress());
};

export const usePancakeRouterContract = () => {
	const abi = PancakeRouter.abi;
	return useContract(abi, getPancakeAddress());
}

export const useUSDTContract = () => {
	const abi = USDT.abi
	return useContract(abi, getUsdtAddress())
}

export const usePrivateSaleContract = () => {
	const abi = PrivateSale.abi
	return useContract(abi, getPrivateSaleAddress())
}