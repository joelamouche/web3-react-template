import { createContext } from "react";
import { ChainId, ContractAddresses, EthAddress } from "../types/types";
import { BigNumber, providers } from "ethers";
import { NotificationInstance } from "antd/lib/notification";

export const initialAppState = {
  // MM
  currentAccount: "0x" as EthAddress,
  provider: undefined,
  chainId: undefined,
  needMMUnlock: false,

  // USDT
  allowance: BigNumber.from(0),
  usdBalance: BigNumber.from(0),

  // Dowgo
  dowgoBalance: BigNumber.from(0),
  usdBalanceOnDowgo: BigNumber.from(0),
  price: BigNumber.from(0),
  contractAddresses: undefined,
  targetRatio: BigNumber.from(0),
  collRange: BigNumber.from(0),
  totalSupply: BigNumber.from(0),
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Notification API
  notificationApi: NotificationInstance | undefined;
}>({
  state: initialAppState,
  dispatch: () => null,
  notificationApi: undefined,
});

// State Management types

export interface AppAction {
  type: string;
  value:
    | EthAddress
    | providers.Web3Provider
    | ChainId
    | BigNumber
    | ContractAddresses
    | boolean
    | undefined;
}

export interface AppState {
  // Metamask
  currentAccount: EthAddress;
  provider: providers.Web3Provider | undefined;
  chainId: ChainId | undefined;
  needMMUnlock: boolean;

  // USDT
  allowance: BigNumber;
  usdBalance: BigNumber;

  // Dowgo
  dowgoBalance: BigNumber;
  usdBalanceOnDowgo: BigNumber;
  price: BigNumber;
  totalSupply: BigNumber;
  contractAddresses: ContractAddresses | undefined;
  targetRatio: BigNumber;
  collRange: BigNumber;
}

export default AppContext;
