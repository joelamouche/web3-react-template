import { EthAddress, ChainId } from "../types/types";

export const LOCAL_USDC_ADDRESS = "0x44d2B6D93945963CCB8f079f9103cdff666A28A4";
export const LOCAL_DOWGO_ADDRESS = "0x510B2e7ea6EB6630D9c6598FFB3bF6Fcefd22016";

export const GOERLI_USDC_ADDRESS = "0x2F6A277f7Ab32456E24958257ad223F4Ee999092";
export const GOERLI_DOWGO_ADDRESS =
  "0x0efECc8031b551b68F793878cc99974D3bf82B1d";

export const MAINNET_DOWGO_ADDRESS =
  "0x2dcBa59f073b3A4D1E64BA502abF4CB2107EdE18";
export const MAINNET_USDC_ADDRESS =
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

export const getDowgoEthAddress = (
  chainId: ChainId | undefined
): EthAddress => {
  switch (chainId) {
    case 1: //Mainnet
      return MAINNET_DOWGO_ADDRESS;
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
    case 1: //Mainnet
      return MAINNET_USDC_ADDRESS;
    case 5: //Goerli
      return GOERLI_USDC_ADDRESS;
    default:
      console.log(
        `UNKOWN Network (getUSDCEthAddress), defaulting to localhost:8545`
      );
      return LOCAL_USDC_ADDRESS;
  }
};
