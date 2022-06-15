import { BigNumber } from "ethers";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { SetStateFunction } from "../../types/types";
import { ONE_UNIT } from "../../constants";

export const SellComponent = (
  sellDowgo: () => void,
  sellInput: BigNumber,
  setSellInput: SetStateFunction<BigNumber>,
  price: BigNumber,
  dowgoBalance: BigNumber
) => {
  return (
    <Card>
      <Card.Header>SELL</Card.Header>
      <Card.Body>
        {sellInput.mul(ONE_UNIT).gt(dowgoBalance) && (
          <Alert key={"warning"} variant={"warning"}>
            You don't have enough Dowgo tokens to sell.
          </Alert>
        )}
        <input
          type="number"
          id="quantity"
          name="quantity"
          onChange={(e) => {
            setSellInput(BigNumber.from(e.target.value));
          }}
        />
        <button
          type="button"
          onMouseUp={() => {
            if (sellInput.mul(ONE_UNIT).gt(dowgoBalance)) {
              console.log("Not enoughn Dowgo tokens");
            } else {
              sellDowgo();
            }
          }}
        >
          Sell Dowgo
        </button>
        <div>{`Value : ${
          (Number(sellInput) * Number(price)) / 10 ** 18
        } USDC`}</div>
      </Card.Body>
    </Card>
  );
};
