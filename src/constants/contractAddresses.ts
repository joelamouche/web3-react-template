import { EthAddress, ChainId } from "../types/types";

export const LOCAL_USDC_ADDRESS = "0x44d2B6D93945963CCB8f079f9103cdff666A28A4";
export const LOCAL_DOWGO_ADDRESS = "0x510B2e7ea6EB6630D9c6598FFB3bF6Fcefd22016";

export const GOERLI_USDC_ADDRESS = "0xD363E49B5421C2FcA7f74bC3f34E215d3676a36c";
export const GOERLI_DOWGO_ADDRESS =
  "0x510B2e7ea6EB6630D9c6598FFB3bF6Fcefd22016";

export const getDowgoEthAddress = (
  chainId: ChainId | undefined
): EthAddress => {
  switch (chainId) {
    case 5: //Goerli
      return GOERLI_DOWGO_ADDRESS;
    default:
      console.log(
        `UNKOWN Network (getDowgoEthAddress), defaulting to localhost:8545`
      );
      return LOCAL_DOWGO_ADDRESS;
  }
};

export const getUSDCEthAddress = (chainId: ChainId | undefined): EthAddress => {
  switch (chainId) {
    case 5: //Goerli
      return GOERLI_USDC_ADDRESS;
    default:
      console.log(
        `UNKOWN Network (getUSDCEthAddress), defaulting to localhost:8545`
      );
      return LOCAL_USDC_ADDRESS;
  }
};
