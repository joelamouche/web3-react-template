import { BigNumber, ethers, providers } from "ethers";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
import { getDowgoEthAddress } from "../../constants/contractAddresses";
import { DowgoERC20ABI } from "../../constants/DowgoERC20ABI";
import { DowgoERC20 } from "../../types/DowgoERC20";
import { ChainId, SetStateFunction, TxStatus } from "../../types/types";
import { launchTxWithStatus } from "../../utils/txWithStatus";
import { DisplayTxStatus } from "../displayComponents/DisplayTxStatus";

export const BuyComponent = (
  provider: providers.Web3Provider | undefined,
  chainId: ChainId | undefined,
  price: BigNumber,
  allowance: BigNumber,
  setDisplayModal: SetStateFunction<boolean>,
  updateContractInfo: () => void
) => {
  const [buyInput, setBuyInput] = useState<BigNumber>(BigNumber.from(0));
  const [txStatus, setTxStatus] = useState<TxStatus | undefined>(undefined);

  async function buyDowgo() {
    //TODO catch errors (like rejection)
    let contract: DowgoERC20 = new ethers.Contract(
      getDowgoEthAddress(chainId),
      DowgoERC20ABI,
      provider
    ) as DowgoERC20;
    if (provider) {
      launchTxWithStatus(
        setTxStatus,
        async () =>
          await contract
            .connect(provider.getSigner())
            .buy_dowgo(buyInput.mul(ONE_DOWGO_UNIT)),
        updateContractInfo
      );
    }
  }
  //TODO: check after comma values
  return (
    <Card>
      <Card.Header>BUY</Card.Header>
      <Card.Body>
        <input
          type="number"
          id="quantity"
          name="quantity"
          onChange={(e) => {
            Number(e.target.value) >= 0 &&
              setBuyInput(BigNumber.from(e.target.value));
          }}
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
        <div>{`Cost : ${
          (Number(buyInput) * Number(price)) / Number(ONE_USDC_UNIT)
        } USDC`}</div>
      </Card.Body>
    </Card>
  );
};
