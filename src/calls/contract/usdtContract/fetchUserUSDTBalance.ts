import { EthAddress } from "../../../types/types";

import { BigNumber, ethers } from "ethers";
import { ERC20_ABI } from "../../../constants/ERC20ABI";
import { ERC20 } from "../../../types/ERC20";

export const fetchUserUSDTBalance = async (
  usdtAddress: EthAddress,
  provider: ethers.providers.Provider,
  userEthAddress: EthAddress
): Promise<BigNumber> => {
  try {
    const contract: ERC20 = new ethers.Contract(
      usdtAddress,
      ERC20_ABI,
      provider
    ) as ERC20;
    const balance = await contract.balanceOf(userEthAddress);
    return balance;
  } catch (error) {
    console.error(error);
  }
};
