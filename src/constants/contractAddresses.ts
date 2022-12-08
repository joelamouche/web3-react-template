import axios from "axios";
import { EthAddress, ChainId, ContractAddresses } from "../types/types";

export const LOCAL_USDC_ADDRESS = "0x44d2B6D93945963CCB8f079f9103cdff666A28A4";
export const LOCAL_DOWGO_ADDRESS = "0x510B2e7ea6EB6630D9c6598FFB3bF6Fcefd22016";

export const DEFAULT_GOERLI_USDC_ADDRESS =
  "0x2F6A277f7Ab32456E24958257ad223F4Ee999092";
export const DEFAULT_GOERLI_DOWGO_ADDRESS =
  "0x0efECc8031b551b68F793878cc99974D3bf82B1d";

export const MAINNET_DOWGO_ADDRESS =
  "0x2dcBa59f073b3A4D1E64BA502abF4CB2107EdE18";
export const MAINNET_USDC_ADDRESS =
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

export const getContractAddresses = async (
  chainId: ChainId | undefined
): Promise<ContractAddresses> => {
  switch (chainId) {
    case 1: //Mainnet
      return {
        mockUSDCAddress: MAINNET_USDC_ADDRESS,
        dowgoAddress: MAINNET_DOWGO_ADDRESS,
      };
    case 5: //Goerli
      return (
        (
          await axios.get(
            "https://211thuucd8.execute-api.eu-west-3.amazonaws.com/latestDeployment"
          )
        ).data || {
          mockUSDCAddress: DEFAULT_GOERLI_USDC_ADDRESS,
          dowgoAddress: DEFAULT_GOERLI_DOWGO_ADDRESS,
        }
      );
    default:
      console.log(
        `UNKOWN Network (getDowgoEthAddress), defaulting to localhost:8545`
      );
      return {
        mockUSDCAddress: LOCAL_USDC_ADDRESS,
        dowgoAddress: LOCAL_DOWGO_ADDRESS,
      };
  }
};

// export const getUSDCEthAddress = async(
//   chainId: ChainId | undefined
// ): Promise<EthAddress> => {
//   switch (chainId) {
//     case 1: //Mainnet
//       return MAINNET_USDC_ADDRESS;
//     case 5: //Goerli
//       return latestGoerliAddress || DEFAULT_GOERLI_USDC_ADDRESS;
//     default:
//       console.log(
//         `UNKOWN Network (getUSDCEthAddress), defaulting to localhost:8545`
//       );
//       return LOCAL_USDC_ADDRESS;
//   }
// };
