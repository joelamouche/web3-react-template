import { BigNumber, ethers, providers } from "ethers";
import { useState } from "react";
import { Alert } from 'antd';
import { ChainId, TxStatus } from "../../types/types";
import { ONE_USDC_UNIT } from "../../constants";
import { DowgoERC20 } from "../../types/DowgoERC20";
import { DowgoERC20ABI } from "../../constants/DowgoERC20ABI";
import { getDowgoEthAddress } from "../../constants/contractAddresses";
import { launchTxWithStatus } from "../../utils/txWithStatus";
import { DisplayTxStatus } from "../displayComponents/DisplayTxStatus";

export const WithdrawComponent = (
  provider: providers.Web3Provider | undefined,
  chainId: ChainId | undefined,
  usdcBalanceOnContract: BigNumber,
  updateContractInfo: (_chainId: ChainId) => void
) => {
  const [withdrawInput, setWithdrawInput] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [txStatus, setTxStatus] = useState<TxStatus | undefined>(undefined);

  async function withdrawUSDC() {
    //TODO catch errors (like rejection)
    let contract: DowgoERC20 = new ethers.Contract(
      getDowgoEthAddress(chainId),
      DowgoERC20ABI,
      provider
    ) as DowgoERC20;
    if (provider && chainId) {
      launchTxWithStatus(
        setTxStatus,
        async () =>
          await contract
            .connect(provider.getSigner())
            .withdraw_usdc(withdrawInput.mul(ONE_USDC_UNIT)),
        () => updateContractInfo(chainId)
      );
    }
  }
  return (
    <div>
      {withdrawInput.mul(ONE_USDC_UNIT).gt(usdcBalanceOnContract) && (
        <Alert key={"warning"} type={"warning"} message="You don't have enough USDC tokens to withdraw." />
      )}
      <input
        type="number"
        id="quantity"
        name="quantity"
        onChange={(e) => {
          Number(e.target.value) >= 0 &&
            setWithdrawInput(
              BigNumber.from(Math.floor(Number(e.target.value)))
            );
        }}
        value={Number(withdrawInput)}
      />
      <button
        type="button"
        onMouseUp={() => {
          if (withdrawInput.mul(ONE_USDC_UNIT).gt(usdcBalanceOnContract)) {
            console.log("Not enough USDC on contract tokens");
            setTxStatus({
              status: "Error",
              message: "Not enough USDC on contract tokens",
            });
          } else {
            withdrawUSDC();
          }
        }}
      >
        Withdraw USDC From Contract
      </button>
      {txStatus && chainId && DisplayTxStatus(txStatus, chainId)}
    </div>
  );
};
