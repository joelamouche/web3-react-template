import { EthAddress } from "../../../types/types";

import { DowgoERC20 } from "../../../types/DowgoERC20";
import { BigNumber, ethers } from "ethers";
import {
  INFINITE_ALLOWANCE,
  ONE_DOWGO_UNIT,
  ONE_USDC_UNIT,
} from "../../../constants";
import { ERC20_ABI } from "../../../constants/ERC20ABI";
import { ERC20 } from "../../../types/ERC20";

export const approveUSD = async (
  usdAddress: EthAddress,
  dowgoAddress: EthAddress,
  provider: ethers.providers.Web3Provider
): Promise<void> => {
  try {
    const contract: ERC20 = new ethers.Contract(
      usdAddress,
      ERC20_ABI,
      provider
    ) as DowgoERC20;
    const tx = await contract
      .connect(provider.getSigner())
      .approve(dowgoAddress, INFINITE_ALLOWANCE);
    await tx.wait(6);
  } catch (error) {
    console.error(error);
  }
};
