import { providers } from "ethers";
import { AppAction, AppState, ChainId, EthAddress } from "../types/types";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  console.log("action", action);
  switch (action.type) {
    case "setProvider":
      return { ...state, provider: action.value as providers.Web3Provider };
    case "setCurrentAccount":
      console.log("setCurrentAccount", action.value);
      return { ...state, currentAccount: action.value as EthAddress };
    case "setChainId":
      return { ...state, chainId: action.value as ChainId };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};
