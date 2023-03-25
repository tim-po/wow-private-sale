import {useWeb3React} from "@web3-react/core";
import Web3 from "web3";

const httpProvider = new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/", {
	timeout: 10000,
});

export const useWeb3 = () => {
	const { library } = useWeb3React();
	let web3;
	if (library) {
		web3 = new Web3(library.currentProvider || httpProvider);
	} else {
		web3 = new Web3(httpProvider);
	}
	return web3;
};