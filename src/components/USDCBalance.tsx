import React, { useEffect } from "react";
import { BigNumber, ethers, providers } from "ethers";
import { Address } from "../types/types";
import { ERC20_ABI } from "../constants/ERC20ABI";
import { ERC20 } from "../types/ERC20";
import { USDC_ADDRESS } from "../constants/contractAddresses";

function USDCBalance(provider: providers.Web3Provider|undefined, userAddress: Address) {
  const [balance, setBalance] = React.useState<BigNumber>(BigNumber.from(0));

  async function getBalance(contract: ERC20,_userAddress:Address) {
    console.log("balance",_userAddress,await contract.balanceOf(_userAddress))
    _userAddress!=="0x" && setBalance(await contract.balanceOf(_userAddress));
  }
  useEffect(() => {
    if (provider && userAddress!=="0x") {
      // Dai Address
      let contractAddress = USDC_ADDRESS // real dai address"0x6B175474E89094C44Da98b954EedeAC495271d0F";


      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let contract: ERC20 = new ethers.Contract(
        contractAddress,
        ERC20_ABI,
        provider
      ) as ERC20;
      getBalance(contract,userAddress);
    }
  }, [provider,userAddress]);
  return (<div>{`Balance : ${Number(balance)/10**18} USDC`}</div>);
}

export default USDCBalance;
