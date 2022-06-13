import { BigNumber } from "ethers";
import Card from "react-bootstrap/Card";
import { SetStateFunction } from "../../types/types";

export const SellComponent=(sellDowgo:()=>void,sellInput:BigNumber,setSellInput:SetStateFunction<BigNumber>,price:BigNumber)=>{

    return (<Card>
        <Card.Header>SELL</Card.Header>
        <Card.Body>
    <input type="number" id="quantity" name="quantity" onChange={(e)=>{
      setSellInput(BigNumber.from(e.target.value))
    }}/>
    <button
      type="button"
      onMouseUp={() => {
       sellDowgo()
      }}
    >
      Sell Dowgo
    </button>
        <div>{`Value : ${Number(sellInput)*Number(price)/10**18} USDC`}</div></Card.Body>
  </Card>)
}