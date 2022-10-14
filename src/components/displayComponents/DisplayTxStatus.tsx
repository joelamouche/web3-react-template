import { ChainId, TxStatus } from "../../types/types";

export const DisplayTxStatus = (txStatus: TxStatus, chainId: ChainId) => {
  const textColor =
    txStatus.status === "Waiting for signature" ||
    txStatus.status === "Tx Sent, Waiting For confirmation..."
      ? "orange"
      : txStatus.status === "Success: Tx Confirmed"
      ? "green"
      : "red";
  return (
    <>
      {
        <div
          style={{
            color: textColor,
          }}
        >
          {txStatus.status}
        </div>
      }
      {txStatus.message && (
        <div
          style={{
            color: textColor,
          }}
        >
          {txStatus.status === "Success: Tx Confirmed" ? (
            <a
              href={`https://${chainId === 5 ? "goerli." : ""}etherscan.io/tx/${
                txStatus.message
              }`}
            >
              Etherscan
            </a>
          ) : (
            txStatus.message
          )}
        </div>
      )}
    </>
  );
};
