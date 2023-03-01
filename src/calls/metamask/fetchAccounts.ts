import { MetaMaskInpageProvider } from "@metamask/providers";
import { ChainId } from "../../types/types";

export const fetchAccounts = async (): Promise<unknown> => {
  try {
    const ethereum = window.ethereum as MetaMaskInpageProvider;
    const accounts = await ethereum.request({ method: "eth_accounts" });

    return accounts;
  } catch (error) {
    console.error(error);
  }
};
