import { Dispatch } from "react";
import { fetchMMProvider } from "../../calls/metamask/fetchMMProvider";
import { ethers } from "ethers";
import { AppAction } from "../../context/AppContext";

export async function fetchAndSaveProvider(dispatch: Dispatch<AppAction>) {
  // this returns the provider, or null if it wasn't detected
  const _provider = await fetchMMProvider();

  if (_provider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    // @ts-ignore
    if (_provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    // Access the decentralized web!
    const provider = new ethers.providers.Web3Provider(_provider);
    dispatch({ type: "setProvider", value: provider });
  } else {
    console.log("Please install MetaMask!");
    dispatch({ type: "setNeedInstallMetaMask", value: true });
  }
}
