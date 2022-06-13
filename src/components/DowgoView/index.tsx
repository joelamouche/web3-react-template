import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { BigNumber, ethers, providers } from "ethers";
import { Address, SetStateFunction } from "../../types/types";
import { DOWGO_ADDRESS, USDC_ADDRESS } from "../../constants/contractAddresses";
import { DowgoERC20 } from "../../types/DowgoERC20";
import { DowgoERC20ABI } from "../../constants/DowgoERC20ABI";
import { ONE_UNIT } from "../../constants";
import { ERC20 } from "../../types/ERC20";
import { ERC20_ABI } from "../../constants/ERC20ABI";
import { BuyComponent } from "./BuyComponent";
import { SellComponent } from "./SellComponent";

function DowgoContract(provider: providers.Web3Provider|undefined, userAddress: Address,allowance:BigNumber,usdcBalance:BigNumber,setUSDCBalance: SetStateFunction<BigNumber>,dowgoBalance:BigNumber, setDowgoBalance: SetStateFunction<BigNumber>) {
  //const [balance, setBalance] = React.useState<BigNumber>(BigNumber.from(0));
  const [price, setPrice] = React.useState<BigNumber>(BigNumber.from(0));
  const [buyInput, setBuyInput] = React.useState<BigNumber>(BigNumber.from(0));
  const [sellInput, setSellInput] = React.useState<BigNumber>(BigNumber.from(0));

  async function updatePrice(contract: DowgoERC20) {
    setPrice(await contract.currentPrice());
  }
  async function updateDowgoBalance(contract: DowgoERC20,_userAddress:Address) {
    _userAddress!=="0x" && setDowgoBalance(await contract.balanceOf(_userAddress));
  }
  async function updateUSDCBalance(_userAddress:Address) {
    // USDC Address
    let contract: ERC20 = new ethers.Contract(
      USDC_ADDRESS,
      ERC20_ABI,
      provider
    ) as ERC20;
    _userAddress!=="0x" && setUSDCBalance(await contract.balanceOf(_userAddress));
  }

  async function buyDowgo() {
    //TODO catch errors (like rejection)
    let contract: DowgoERC20 = new ethers.Contract(
        DOWGO_ADDRESS,
        DowgoERC20ABI,
        provider
      ) as DowgoERC20;
      console.log("buy input",Number(buyInput.mul(ONE_UNIT)))
      provider &&await contract.connect(provider.getSigner()).buy_dowgo(buyInput.mul(ONE_UNIT))
      console.log("allowed")
      updateDowgoBalance(contract,userAddress)
      updateUSDCBalance(userAddress)
  }
  async function sellDowgo() {
    //TODO catch errors (like rejection)
    let contract: DowgoERC20 = new ethers.Contract(
        DOWGO_ADDRESS,
        DowgoERC20ABI,
        provider
      ) as DowgoERC20;
      console.log("buy input",Number(buyInput.mul(ONE_UNIT)))
      provider &&await contract.connect(provider.getSigner()).sell_dowgo(sellInput.mul(ONE_UNIT))
      console.log("allowed")
      updateDowgoBalance(contract,userAddress)
      updateUSDCBalance(userAddress)
  }
  useEffect(() => {
    if (provider && userAddress!=="0x") {

      // Dowgo
      let contract: DowgoERC20 = new ethers.Contract(
        DOWGO_ADDRESS,
        DowgoERC20ABI,
        provider
      ) as DowgoERC20;
      updateDowgoBalance(contract,userAddress);

      updateUSDCBalance(userAddress)
      updatePrice(contract)
    }
  }, [provider,userAddress]);
  return (
    <Card style={{width:"80vw",marginLeft:"10vw"}}>
      <Card.Header>{`Dowgo (${Number(price)/10**18} USDC/Dowgo)`}</Card.Header>
      <Card.Body>
        <Container>
        <Row> <Col>{BuyComponent(buyDowgo,buyInput,setBuyInput,price)}</Col>
      <Col>{SellComponent(sellDowgo,sellInput,setSellInput,price)}</Col></Row>
     </Container>
      </Card.Body>
      {/* <div>
        <input type="number" id="quantity" name="quantity" onChange={(e)=>{
          setSellInput(BigNumber.from(e.target.value))
        }}></input>
        <button
          type="button"
          onMouseUp={() => {
           sellDowgo()
          }}
        >
          Sell Dowgo
        </button>
        <div>{`Value : ${Number(sellInput)*Number(price)/10**18} USDC`}</div>
      </div> */}
    </Card>
  );
}

export default DowgoContract;
