import { BigNumber } from "ethers";
import Card from "react-bootstrap/Card";
import { SetStateFunction } from "../../types/types";

export const BuyComponent=(buyDowgo:()=>void,buyInput:BigNumber,setBuyInput:SetStateFunction<BigNumber>,price:BigNumber)=>{

    return (<Card>
      <Card.Header>BUY</Card.Header>
      <Card.Body>
    <input type="number" id="quantity" name="quantity" onChange={(e)=>{
      setBuyInput(BigNumber.from(e.target.value))
    }}/>
    <button
      type="button"
      onMouseUp={() => {
       buyDowgo()
      }}
    >
      Buy Dowgo
    </button>
    <div>{`Cost : ${Number(buyInput)*Number(price)/10**18} USDC`}</div></Card.Body>
  </Card>)
}