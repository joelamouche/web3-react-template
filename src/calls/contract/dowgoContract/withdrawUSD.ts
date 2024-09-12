import { EthAddress } from "../../../types/types";

import { DowgoERC20 } from "../../../types/DowgoERC20";
import { BigNumber, ethers } from "ethers";
import { DowgoERC20ABI } from "../../../constants/DowgoERC20ABI";
import { ONE_USDC_UNIT } from "../../../constants";
import { NotificationInstance } from "antd/lib/notification";
import { openErrorNotification, openNotification } from "../notificationUtils";

export const withdrawUSD = async (
  dowgoAddress: EthAddress,
  provider: ethers.providers.Web3Provider,
  withdrawAmount: number,
  notificationApi: NotificationInstance
): Promise<void> => {
  try {
    const contract: DowgoERC20 = new ethers.Contract(
      dowgoAddress,
      DowgoERC20ABI,
      provider
    ) as DowgoERC20;
    const tx = await contract
      .connect(provider.getSigner())
      .withdraw_usdc(BigNumber.from(withdrawAmount * Number(ONE_USDC_UNIT)));
    openNotification(
      { status: "Tx Sent, Waiting For confirmation..." },
      notificationApi
    );
    await tx.wait();
    openNotification({ status: "Success: Tx Confirmed" }, notificationApi);
  } catch (error) {
    console.error(error);
    openErrorNotification(error, notificationApi);
  }
};
