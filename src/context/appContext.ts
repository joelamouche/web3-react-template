import { createContext } from "react";
import { AppAction, AppState, EthAddress } from "../types/types";

export const initialAppState = {
  currentAccount: "0x" as EthAddress,
  provider: undefined,
  chainId: undefined,
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialAppState,
  dispatch: () => null,
});

export default AppContext;
