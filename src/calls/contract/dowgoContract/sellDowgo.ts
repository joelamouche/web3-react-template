import { EthAddress } from "../../../types/types";

import { DowgoERC20 } from "../../../types/DowgoERC20";
import { BigNumber, ethers } from "ethers";
import { DowgoERC20ABI } from "../../../constants/DowgoERC20ABI";
import { ONE_DOWGO_UNIT } from "../../../constants";

export const sellDowgo = async (
  dowgoAddress: EthAddress,
  provider: ethers.providers.Web3Provider,
  sellAmount: number
): Promise<void> => {
  try {
    const contract: DowgoERC20 = new ethers.Contract(
      dowgoAddress,
      DowgoERC20ABI,
      provider
    ) as DowgoERC20;
    const tx = await contract
      .connect(provider.getSigner())
      .sell_dowgo(
        BigNumber.from(
          Math.floor(sellAmount * Number(ONE_DOWGO_UNIT)).toString()
        )
      );
    await tx.wait(6);
  } catch (error) {
    console.error(error);
  }
};
