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
}
export type ConnectMMStatus="Connected"|"Disconnected"|"Please connect to MetaMask"|"Please install MetaMask"
export type Address = `0x${string}`;

export type SetStateFunction<T> = Dispatch<React.SetStateAction<T>>;
