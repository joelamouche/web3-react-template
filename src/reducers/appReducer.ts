import { providers } from "ethers";
import { AppAction, AppState, ChainId, EthAddress } from "../types/types";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  console.log("action", action);
  switch (action.type) {
    case "setProvider":
      return { ...state, provider: action.value as providers.Web3Provider };
    case "setCurrentAccount":
      const newAccount = action.value as EthAddress;
      return { ...state, currentAccount: newAccount };
    case "setChainId":
      const _chainId = action.value as ChainId;
      return { ...state, chainId: _chainId };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};
