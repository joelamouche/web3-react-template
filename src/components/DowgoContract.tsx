import React, { useEffect } from "react";
import { BigNumber, ethers, providers } from "ethers";
import { Address } from "../types/types";
import { ERC20_ABI } from "../constants/ERC20ABI";
import { ERC20 } from "../types/ERC20";
import { DOWGO_ADDRESS } from "../constants/contractAddresses";

function DowgoContract(provider: providers.Web3Provider|undefined, userAddress: Address) {
  const [balance, setBalance] = React.useState<BigNumber>(BigNumber.from(0));

  async function getBalance(contract: ERC20) {
    console.log("k",userAddress,await contract.balanceOf(userAddress))
    setBalance(await contract.balanceOf(userAddress));
  }
  useEffect(() => {
    if (provider && userAddress!=="0x") {

      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let contract: ERC20 = new ethers.Contract(
        DOWGO_ADDRESS,
        ERC20_ABI,
        provider
      ) as ERC20;
      getBalance(contract);
    }
  }, [provider,userAddress]);
  return (
    <div>
      <div>
        {`Balance : ${Number(balance)/10**18} Dowgo`}
      </div>
      <div>
        <button
          type="button"
          onMouseUp={() => {
           //buyDowgo()
          }}
        >
          Connect to MetaMask
        </button>
      </div>
    </div>
  );
}

export default DowgoContract;
