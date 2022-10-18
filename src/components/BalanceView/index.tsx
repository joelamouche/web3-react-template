import { BigNumber } from "ethers";
import Card from "react-bootstrap/Card";
import DowgoBalance from "./DowgoBalance";
import USDCBalance from "./USDCBalance";

export const BalancePanel = (
  dowgoBalance: BigNumber,
  usdcBalance: BigNumber,
  price: BigNumber
) => {
  return (
    <Card style={{ width: "80vw", marginLeft: "10vw" }}>
      <Card.Header>Balances</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <div>
          {DowgoBalance(dowgoBalance, price)}
          {USDCBalance(usdcBalance)}
        </div>
      </Card.Body>
    </Card>
  );
};
