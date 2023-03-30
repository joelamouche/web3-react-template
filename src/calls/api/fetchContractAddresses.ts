import { ChainId, ContractAddresses } from "../../types/types";
import {
  DEFAULT_GOERLI_DOWGO_ADDRESS,
  DEFAULT_GOERLI_USDC_ADDRESS,
  LOCAL_DOWGO_ADDRESS,
  LOCAL_USDC_ADDRESS,
  MAINNET_DOWGO_ADDRESS,
  MAINNET_USDC_ADDRESS,
} from "../../constants/contractAddresses";
import axios from "axios";

export const fetchContractAddresses = async (
  chainId: ChainId
): Promise<ContractAddresses> => {
  try {
    const addresses = await getContractAddresses(chainId);

    return addresses;
  } catch (error) {
    console.error(error);
  }
};

const getContractAddresses = async (
  chainId: ChainId
): Promise<ContractAddresses> => {
  switch (chainId) {
    case 1: //Mainnet
      return {
        usdAddress: MAINNET_USDC_ADDRESS,
        dowgoAddress: MAINNET_DOWGO_ADDRESS,
      };
    case 5: //Goerli
      const respGoerli = (
        await axios.get(
          "https://211thuucd8.execute-api.eu-west-3.amazonaws.com/latestDeployment/goerli"
        )
      ).data;
      return respGoerli
        ? {
            usdAddress: respGoerli.mockUSDAddress,
            dowgoAddress: respGoerli.dowgoAddress,
          }
        : {
            usdAddress: DEFAULT_GOERLI_USDC_ADDRESS,
            dowgoAddress: DEFAULT_GOERLI_DOWGO_ADDRESS,
          };
    case 11155111: //Sepolia
      const respSepolia = (
        await axios.get(
          "https://211thuucd8.execute-api.eu-west-3.amazonaws.com/latestDeployment/sepolia"
        )
      ).data;
      return respSepolia
        ? {
            usdAddress: respSepolia.mockUSDAddress,
            dowgoAddress: respSepolia.dowgoAddress,
          }
        : {
            usdAddress: DEFAULT_GOERLI_USDC_ADDRESS,
            dowgoAddress: DEFAULT_GOERLI_DOWGO_ADDRESS,
          };
    default:
      console.log(
        `UNKOWN Network (getDowgoEthAddress), defaulting to localhost:8545`
      );
      return {
        usdAddress: LOCAL_USDC_ADDRESS,
        dowgoAddress: LOCAL_DOWGO_ADDRESS,
      };
  }
};
