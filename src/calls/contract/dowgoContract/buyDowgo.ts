import { EthAddress, TxStatus } from "../../../types/types";

import { DowgoERC20 } from "../../../types/DowgoERC20";
import { BigNumber, ethers } from "ethers";
import { DowgoERC20ABI } from "../../../constants/DowgoERC20ABI";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../../constants";
import { notification } from "antd";
import { NotificationInstance } from "antd/lib/notification";
import { openErrorNotification, openNotification } from "../notificationUtils";

export const buyDowgo = async (
  dowgoAddress: EthAddress,
  provider: ethers.providers.Web3Provider,
  buyAmount: number,
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
      .buy_dowgo(
        BigNumber.from(
          Math.floor(buyAmount * Number(ONE_DOWGO_UNIT)).toString()
        )
      );
    openNotification(
      { status: "Tx Sent, Waiting For confirmation..." },
      notificationApi
    );
    await tx.wait(6);
    openNotification({ status: "Success: Tx Confirmed" }, notificationApi);
  } catch (e) {
    console.error(e);
    openErrorNotification(e, notificationApi);
  }
};
