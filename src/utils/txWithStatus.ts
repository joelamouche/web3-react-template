import { ethers } from "ethers";
import { SetStateFunction, TxStatus } from "../types/types";

const alreadySoldErrorMessage =
  "Contract already sold all dowgo tokens before next rebalancing";
const alreadyBoughtErrorMessage =
  "Contract already bought all dowgo tokens before next rebalancing";

function checkTxStatus(
  tx: ethers.ContractTransaction,
  countdown: number,
  cb: () => void
) {
  if (countdown === 0) {
    cb();
  } else {
    setTimeout(() => {
      console.log(countdown);
      // console.log(tx.confirmations)
      checkTxStatus(tx, countdown - 1, cb);
    }, 15000);
  }
}

export const launchTxWithStatus = async (
  setTxStatus: SetStateFunction<TxStatus | undefined>,
  call: () => Promise<ethers.ContractTransaction>,
  callback: () => void
) => {
  try {
    setTxStatus({ status: "Waiting for signature" });
    const tx = await call();
    setTxStatus({
      status: "Tx Sent, Waiting For confirmation...",
      message: tx.hash,
    });
    // checkTxStatus(tx,6,()=>{
    //   callback()
    // })
    await tx.wait();
    setTxStatus({ status: "Success: Tx Confirmed", message: tx.hash });
    callback();
  } catch (e: any) {
    console.log("error");
    console.log(e);
    const isAlreadySoldError =
      e.toString().search(alreadySoldErrorMessage) > -1;
    const isAlreadyBoughtError =
      e.toString().search(alreadyBoughtErrorMessage) > -1;
    setTxStatus({
      status: "Error",
      message: isAlreadySoldError
        ? alreadySoldErrorMessage
        : isAlreadyBoughtError
        ? alreadyBoughtErrorMessage
        : e.message
        ? e.message
        : e.toString(),
    });
  }
};
