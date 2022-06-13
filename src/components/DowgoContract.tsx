import React, { useEffect } from "react";
import { BigNumber, ethers, providers } from "ethers";
import { Address } from "../types/types";
import { DOWGO_ADDRESS } from "../constants/contractAddresses";
import { DowgoERC20 } from "../types/DowgoERC20";
import { DowgoERC20ABI } from "../constants/DowgoERC20ABI";
import { ONE_UNIT } from "../constants";

function DowgoContract(provider: providers.Web3Provider|undefined, userAddress: Address,allowance:BigNumber) {
  const [balance, setBalance] = React.useState<BigNumber>(BigNumber.from(0));
  const [price, setPrice] = React.useState<BigNumber>(BigNumber.from(0));
  const [buyInput, setBuyInput] = React.useState<BigNumber>(BigNumber.from(0));
  const [sellInput, setSellInput] = React.useState<BigNumber>(BigNumber.from(0));

  async function getBalance(contract: DowgoERC20,_userAddress:Address) {
    _userAddress!=="0x" && setBalance(await contract.balanceOf(_userAddress));
  }
  async function getPrice(contract: DowgoERC20) {
    console.log("price",Number(await contract.currentPrice()))
    setPrice(await contract.currentPrice());
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
      getBalance(contract,userAddress)
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
      getBalance(contract,userAddress)
  }
  useEffect(() => {
    if (provider && userAddress!=="0x") {

      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let contract: DowgoERC20 = new ethers.Contract(
        DOWGO_ADDRESS,
        DowgoERC20ABI,
        provider
      ) as DowgoERC20;
      getBalance(contract,userAddress);
      getPrice(contract)
    }
  }, [provider,userAddress]);
  return (
    <div>
      <div>
        {`Balance : ${Number(balance)/10**18} Dowgo`}
      </div>
      <div>
        {`Current Dowgo price : ${Number(price)/10**18} USDC/Dowgo`}
      </div>
      <div>
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
        <div>{`Cost : ${Number(buyInput)*Number(price)/10**18} USDC`}</div>
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default DowgoContract;
