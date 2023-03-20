import { EthAddress } from "../../../types/types";

import { BigNumber, ethers } from "ethers";
import { ERC20_ABI } from "../../../constants/ERC20ABI";
import { ERC20 } from "../../../types/ERC20";

export const fetchUserAllowance = async (
  usdtAddress: EthAddress,
  dowgoAddress: EthAddress,
  provider: ethers.providers.Provider,
  userEthAddress: EthAddress
): Promise<BigNumber> => {
  try {
    const contract: ERC20 = new ethers.Contract(
      usdtAddress,
      ERC20_ABI,
      provider
    ) as ERC20;
    const allowance = await contract.allowance(userEthAddress, dowgoAddress);
    return allowance;
  } catch (error) {
    console.error(error);
  }
};
