import {InjectedConnector} from "@web3-react/injected-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import Web3 from "web3";
import { provider } from "web3-core";
export const injected = new InjectedConnector({
	supportedChainIds: [56]
});

export const walletconnect = new WalletConnectConnector({
	rpc: {
		56: "https://bsc-dataseed.binance.org/",
	},
	qrcode: true,
	bridge: "https://bridge.walletconnect.org",
});

export const walletconnectNoQr = new WalletConnectConnector({
	rpc: {
		56: "https://bsc-dataseed.binance.org/",
	},
	qrcode: false,
	bridge: "https://bridge.walletconnect.org",
});

export const getLibrary = (provider) => {
	console.log(provider)
	return new Web3(provider);
}