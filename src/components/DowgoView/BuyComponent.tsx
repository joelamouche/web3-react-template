import { BigNumber } from "ethers";
import Card from "react-bootstrap/Card";
import { ONE_UNIT } from "../../constants";
import { SetStateFunction } from "../../types/types";

export const BuyComponent = (
  buyDowgo: () => void,
  buyInput: BigNumber,
  setBuyInput: SetStateFunction<BigNumber>,
  price: BigNumber,
  allowance: BigNumber,
  setDisplayModal: SetStateFunction<boolean>
) => {
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
            setBuyInput(BigNumber.from(e.target.value));
          }}
        />
        <button
          type="button"
          onMouseUp={() => {
            console.log("oh",buyInput,Number(allowance))
            if (buyInput.mul(10**6).gt(allowance)) {
              setDisplayModal(true);
            } else {
              buyDowgo();
            }
          }}
        >
          Buy Dowgo
        </button>
        <div>{`Cost : ${
          (Number(buyInput) * Number(price)) / 10 ** 18
        } USDC`}</div>
      </Card.Body>
    </Card>
  );
};
