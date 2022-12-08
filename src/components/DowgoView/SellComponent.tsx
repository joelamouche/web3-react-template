import { BigNumber, ethers, providers } from "ethers";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { ChainId, EthAddress, TxStatus } from "../../types/types";
import {
  ALLOWED_NETWORKS,
  ONE_DOWGO_UNIT,
  ONE_USDC_UNIT,
} from "../../constants";
import { DowgoERC20 } from "../../types/DowgoERC20";
import { DowgoERC20ABI } from "../../constants/DowgoERC20ABI";
import { launchTxWithStatus } from "../../utils/txWithStatus";
import { DisplayTxStatus } from "../displayComponents/DisplayTxStatus";

export const SellComponent = (
  provider: providers.Web3Provider | undefined,
  chainId: ChainId | undefined,
  price: BigNumber,
  dowgoBalance: BigNumber,
  updateContractInfo: (_chainId: ChainId) => void,
  dowgoAddress: EthAddress | undefined
) => {
  const [sellInput, setSellInput] = useState<BigNumber>(BigNumber.from(0));
  const [txStatus, setTxStatus] = useState<TxStatus | undefined>(undefined);

  async function sellDowgo() {
    //TODO catch errors (like rejection)
    if (provider && chainId && dowgoAddress) {
      let contract: DowgoERC20 = new ethers.Contract(
        dowgoAddress,
        DowgoERC20ABI,
        provider
      ) as DowgoERC20;
      launchTxWithStatus(
        setTxStatus,
        async () =>
          await contract
            .connect(provider.getSigner())
            .sell_dowgo(sellInput.mul(ONE_DOWGO_UNIT)),
        () => updateContractInfo(chainId)
      );
    }
  }
  return (
    <Card>
      <Card.Header>SELL</Card.Header>
      <Card.Body>
        {chainId && ALLOWED_NETWORKS.includes(ChainId[chainId]) ? (
          <div>
            {sellInput.mul(ONE_DOWGO_UNIT).gt(dowgoBalance) && (
              <Alert key={"warning"} variant={"warning"}>
                You don't have enough Dowgo tokens to sell.
              </Alert>
            )}
            <input
              type="number"
              id="quantity"
              name="quantity"
              onChange={(e) => {
                Number(e.target.value) >= 0 &&
                  setSellInput(
                    BigNumber.from(Math.floor(Number(e.target.value)))
                  );
              }}
              value={Number(sellInput)}
            />
            <button
              type="button"
              onMouseUp={() => {
                if (sellInput.mul(ONE_DOWGO_UNIT).gt(dowgoBalance)) {
                  console.log("Not enough Dowgo tokens");
                  setTxStatus({
                    status: "Error",
                    message: "Not enough Dowgo tokens",
                  });
                } else {
                  sellDowgo();
                }
              }}
            >
              Sell Dowgo
            </button>
            {txStatus && chainId && DisplayTxStatus(txStatus, chainId)}
            <div>{`Value : ${
              (Number(sellInput) * Number(price)) / Number(ONE_USDC_UNIT)
            } USDC`}</div>
          </div>
        ) : (
          <div>
            <span style={{ color: "red" }}> Unsupported Network</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
