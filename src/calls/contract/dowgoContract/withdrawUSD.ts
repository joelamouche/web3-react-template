import { EthAddress } from "../../../types/types";

import { DowgoERC20 } from "../../../types/DowgoERC20";
import { BigNumber, ethers } from "ethers";
import { DowgoERC20ABI } from "../../../constants/DowgoERC20ABI";
import { ONE_USDC_UNIT } from "../../../constants";

export const withdrawUSD = async (
  dowgoAddress: EthAddress,
  provider: ethers.providers.Web3Provider,
  withdrawAmount: number
): Promise<void> => {
  try {
    const contract: DowgoERC20 = new ethers.Contract(
      dowgoAddress,
      DowgoERC20ABI,
      provider
    ) as DowgoERC20;
    const tx=await contract
      .connect(provider.getSigner())
      .withdraw_usdc(BigNumber.from(withdrawAmount * Number(ONE_USDC_UNIT)));
    await tx.wait(6)
  } catch (error) {
    console.error(error);
  }
};
