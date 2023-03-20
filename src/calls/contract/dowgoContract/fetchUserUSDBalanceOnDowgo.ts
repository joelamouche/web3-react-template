import { EthAddress } from "../../../types/types";

import { DowgoERC20 } from "../../../types/DowgoERC20";
import { BigNumber, ethers } from "ethers";
import { DowgoERC20ABI } from "../../../constants/DowgoERC20ABI";

export const fetchUserUSDBalanceOnDowgo = async (
  dowgoAddress: EthAddress,
  provider: ethers.providers.Provider,
  userEthAddress: EthAddress
): Promise<BigNumber> => {
  try {
    const contract: DowgoERC20 = new ethers.Contract(
      dowgoAddress,
      DowgoERC20ABI,
      provider
    ) as DowgoERC20;
    const balance = await contract.usdcUserBalances(userEthAddress);
    return balance;
  } catch (error) {
    console.error(error);
  }
};
