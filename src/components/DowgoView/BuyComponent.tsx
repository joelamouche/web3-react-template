import { BigNumber, ethers, providers } from "ethers";
import { useState } from "react";
import { Card } from "antd";
import {
  ALLOWED_NETWORKS,
  INFINITE_ALLOWANCE,
  ONE_DOWGO_UNIT,
  ONE_USDC_UNIT,
} from "../../constants";
import { DowgoERC20ABI } from "../../constants/DowgoERC20ABI";
import { DowgoERC20 } from "../../types/DowgoERC20";
import {
  ChainId,
  ContractAddresses,
  SetStateFunction,
  TxStatus,
} from "../../types/types";
import { launchTxWithStatus } from "../../utils/txWithStatus";
import { DisplayTxStatus } from "../displayComponents/DisplayTxStatus";

export const BuyComponent = (
  provider: providers.Web3Provider | undefined,
  chainId: ChainId | undefined,
  price: BigNumber,
  allowance: BigNumber,
  setDisplayModal: SetStateFunction<boolean>,
  updateContractInfo: (
    _chainId: ChainId,
    _contractAddresses: ContractAddresses | undefined
  ) => void,
  contractAddresses: ContractAddresses | undefined
) => {
  const [buyInput, setBuyInput] = useState<BigNumber>(BigNumber.from(0));
  const [txStatus, setTxStatus] = useState<TxStatus | undefined>(undefined);

  async function buyDowgo() {
    //TODO catch errors (like rejection)
    if (provider && chainId && contractAddresses?.dowgoAddress) {
      let contract: DowgoERC20 = new ethers.Contract(
        contractAddresses.dowgoAddress,
        DowgoERC20ABI,
        provider
      ) as DowgoERC20;
      launchTxWithStatus(
        setTxStatus,
        async () =>
          await contract
            .connect(provider.getSigner())
            .buy_dowgo(buyInput.mul(ONE_DOWGO_UNIT)),
        () => {
          updateContractInfo(chainId, contractAddresses);
        }
      );
    }
  }
  //TODO: check after comma values
  return (
    <Card title="BUY">
      {chainId && ALLOWED_NETWORKS.includes(ChainId[chainId]) ? (
        <div>
          <input
            type="number"
            id="quantity"
            name="quantity"
            onChange={(e) => {
              Number(e.target.value) >= 0 &&
                setBuyInput(BigNumber.from(Math.floor(Number(e.target.value))));
            }}
            value={Number(buyInput)}
          />
          <button
            type="button"
            onMouseUp={() => {
              if (buyInput.mul(price).gt(allowance)) {
                setDisplayModal(true);
              } else {
                buyDowgo();
              }
            }}
          >
            Buy Dowgo
          </button>
          {txStatus && chainId && DisplayTxStatus(txStatus, chainId)}
          <div>{`Cost : ${(
            (Number(buyInput) * Number(price)) /
            Number(ONE_USDC_UNIT)
          ).toFixed(2)}`}</div>
          <div>{`USDC Allowance to Dowgo : ${
            allowance.toHexString() === INFINITE_ALLOWANCE
              ? "Infinite"
              : (Number(allowance) / Number(ONE_USDC_UNIT)).toFixed(2)
          }`}</div>
        </div>
      ) : (
        <div>
          <span style={{ color: "red" }}> Unsupported Network</span>
        </div>
      )}
    </Card>
  );
};
