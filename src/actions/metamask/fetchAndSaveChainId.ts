import { MetaMaskInpageProvider } from "@metamask/providers";
import { fetchChainId } from "../../calls/metamask/fetchChainId";
import { ChainId } from "../../types/types";
import { Dispatch } from "react";
import { AppAction } from "../../context/AppContext";

export async function fetchAndSaveChainId(
  dispatch: Dispatch<AppAction>,
  formerChainId: ChainId | undefined
) {
  // @ts-ignore
  const ethereum = window.ethereum as MetaMaskInpageProvider;
  const chainIdUnknown = await fetchChainId();
  handleChainChanged(chainIdUnknown);

  ethereum.on("chainChanged", handleChainChanged);

  function handleChainChanged(_chainId: unknown) {
    // Only set it the first time
    if (_chainId && formerChainId === undefined) {
      dispatch({
        type: "setChainId",
        value: parseInt(_chainId as string, 16),
      });
    } else if (_chainId && _chainId !== formerChainId) {
      window.location.reload();
    }
  }
}
