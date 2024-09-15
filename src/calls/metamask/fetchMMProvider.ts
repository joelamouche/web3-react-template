import detectEthereumProvider from "@metamask/detect-provider";

export const fetchMMProvider = async (): Promise<unknown> => {
  try {
    const _provider = await detectEthereumProvider();

    return _provider;
  } catch (error) {
    console.error(error);
  }
};
