import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import Web3 from "web3";
import { provider } from "web3-core";

export const injected = new InjectedConnector({
	supportedChainIds: [56, 97]
})
export const walletconnect = new WalletConnectConnector({
	rpc: {
		56: "https://bsc-dataseed.binance.org/",
		97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
	},
	qrcode: true,
	bridge: "https://bridge.walletconnect.org",
});

export const getLibrary = (provider: provider) => new Web3(provider);