import { MetaMaskInpageProvider } from "@metamask/providers";
import { fetchAccounts } from "../../calls/metamask/fetchAccounts";
import { EthAddress } from "../../types/types";
import { Dispatch } from "react";
import { AppAction, AppState } from "../../context/AppContext";
import { fetchAndSaveContractInformations } from "../contracts/fetchAndSaveContractInformations";

export async function fetchAndSaveAccount(
  dispatch: Dispatch<AppAction>,
  state: AppState
) {
  // @ts-ignore
  const ethereum = window.ethereum as MetaMaskInpageProvider;
  const accounts = await fetchAccounts();
  handleAccountsChanged(accounts);

  ethereum.on("accountsChanged", handleAccountsChanged);

  function handleAccountsChanged(accounts: unknown) {
    let accountList: EthAddress[] = [];
    if (accounts && (accounts as string[]).length) {
      accountList = accounts as EthAddress[];
    }
    if (accountList.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
      dispatch({ type: "setNeedInstallMetaMask", value: true });
    } else {
      dispatch({ type: "setCurrentAccount", value: accountList[0] });
    }
  }
}
