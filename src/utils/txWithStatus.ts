import { ethers } from "ethers";
import { SetStateFunction, TxStatus } from "../types/types";

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
    await tx.wait(8);
    setTxStatus({ status: "Success: Tx Confirmed", message: tx.hash });
    callback();
  } catch (e: any) {
    console.log("error");
    console.log(e);
    setTxStatus({
      status: "Error",
      message: e.message ? e.message : e.toString(),
    });
  }
};
