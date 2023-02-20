import { BigNumber, providers } from "ethers";
import { Dispatch } from "react";

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
  HARMONY_MAINNET = 1666600000,
  HARMONY_TESTNET = 1666700000,
  MOONRIVER = 1285,
  LOCAL_TESTNET = 1337,
}
export type ConnectMMStatus =
  | "Connected"
  | "Disconnected"
  | "Please connect to MetaMask"
  | "Please install MetaMask";
export type EthAddress = `0x${string}`;

export type TxStatus = {
  status:
    | "Error"
    | "Waiting for signature"
    | "Tx Sent, Waiting For confirmation..."
    | "Success: Tx Confirmed";
  message?: string;
};

export interface ContractAddresses {
  mockUSDCAddress: EthAddress;
  dowgoAddress: EthAddress;
}

export type SetStateFunction<T> = Dispatch<React.SetStateAction<T>>;

// State Management

export interface AppAction {
  type: string;
  value: EthAddress | providers.Web3Provider | ChainId;
}

export interface AppState {
  currentAccount: EthAddress;
  provider: providers.Web3Provider | undefined;
  chainId: ChainId | undefined;
}
