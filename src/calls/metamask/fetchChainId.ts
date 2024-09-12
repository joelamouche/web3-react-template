import { MetaMaskInpageProvider } from "@metamask/providers";

export const fetchChainId = async (): Promise<unknown> => {
  try {
    // @ts-ignore
    const ethereum = window.ethereum as MetaMaskInpageProvider;
    const chainIdUnknown = await ethereum.request({ method: "eth_chainId" });

    return chainIdUnknown;
  } catch (error) {
    console.error(error);
  }
};
