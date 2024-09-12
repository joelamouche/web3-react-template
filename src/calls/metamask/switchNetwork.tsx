import { ChainId } from "../../types/types";

export const switchNetwork = async (chainId: ChainId) => {
  try {
    //@ts-ignore
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error) {
    console.log(error);
  }
};
