import { NotificationInstance } from "antd/lib/notification";
import { TxStatus } from "../../types/types";

export const openNotification = (
  txSTatus: TxStatus,
  notificationApi: NotificationInstance
) => {
  // | "Error"
  // | "Waiting for signature"
  // | "Tx Sent, Waiting For confirmation..."
  // | "Success: Tx Confirmed";
  const notificationStyle = {
    color: "#969696",
    background: "#191922",
    borderRadius: "8px",
  };

  switch (txSTatus.status) {
    case "Error":
      notificationApi.error({
        message: `Error`,
        description: txSTatus.message,
        placement: "bottomRight",
        duration: 30,
        style: notificationStyle,
      });
      break;
    case "Tx Sent, Waiting For confirmation...":
      notificationApi.warning({
        message: "Tx Sent, Waiting For confirmation...",
        placement: "bottomRight",
        duration: 72,
        style: notificationStyle,
      });
      break;
    case "Success: Tx Confirmed":
      notificationApi.success({
        message: "Success: Tx Confirmed",
        placement: "bottomRight",
        style: notificationStyle,
      });
      break;

    default:
      console.log(`Unhandled tx Status`);
  }
};

export const openErrorNotification = (
  e: Error,
  notificationApi: NotificationInstance
) => {
  const alreadySoldErrorMessage =
    "Contract already sold all dowgo tokens before next rebalancing";
  const alreadyBoughtErrorMessage =
    "Contract already bought all dowgo tokens before next rebalancing";

  const isAlreadySoldError = e.toString().search(alreadySoldErrorMessage) > -1;
  const isAlreadyBoughtError =
    e.toString().search(alreadyBoughtErrorMessage) > -1;
  openNotification(
    {
      status: "Error",
      message: isAlreadySoldError
        ? alreadySoldErrorMessage
        : isAlreadyBoughtError
        ? alreadyBoughtErrorMessage
        : e.message
        ? e.message
        : e.toString(),
    },
    notificationApi
  );
};
