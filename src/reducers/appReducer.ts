import { BigNumber, providers } from "ethers";
import {
  AppAction,
  AppState,
  ChainId,
  ContractAddresses,
  EthAddress,
} from "../types/types";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  console.log("state from reducer", state);
  console.log("action", action);
  switch (action.type) {
    // MM
    case "setProvider":
      return { ...state, provider: action.value as providers.Web3Provider };
    case "setCurrentAccount":
      const newAccount = action.value as EthAddress;
      return { ...state, currentAccount: newAccount };
    case "setChainId":
      const _chainId = action.value as ChainId;
      return { ...state, chainId: _chainId };
    case "setNeedInstallMetaMask":
      return { ...state, needMMUnlock: true };
    // API
    case "setContractAddresses":
      return { ...state, contractAddresses: action.value as ContractAddresses };
    // Dowgo
    case "setCollRange":
      return { ...state, collRange: action.value as BigNumber };
    case "setPrice":
      return { ...state, price: action.value as BigNumber };
    case "setCollRange":
      return { ...state, collRange: action.value as BigNumber };
    case "setTargetRatio":
      return { ...state, targetRatio: action.value as BigNumber };
    case "setTotalSupply":
      return { ...state, totalSupply: action.value as BigNumber };
    case "setUserDowgoBalance":
      return { ...state, dowgoBalance: action.value as BigNumber };
    case "setUserUSDBalanceOnDowgo":
      return { ...state, usdBalanceOnDowgo: action.value as BigNumber };
    //USDT
    case "setUserAllowance":
      return { ...state, allowance: action.value as BigNumber };
    case "setUserUSDTBalance":
      return { ...state, usdBalance: action.value as BigNumber };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};
