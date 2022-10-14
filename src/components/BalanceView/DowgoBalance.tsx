import React, { useEffect } from "react";
import { BigNumber, ethers, providers } from "ethers";
function DowgoBalance(dowgoBalance: BigNumber) {
  // const [balance, setBalance] = React.useState<BigNumber>(BigNumber.from(0));

  //   async function getBalance(contract: ERC20,_userEthAddress:EthAddress) {
  //     _userEthAddress!=="0x" && setBalance(await contract.balanceOf(_userEthAddress));
  //   }
  //   useEffect(() => {
  //     if (provider && userEthAddress!=="0x") {
  //       // Dai EthAddress
  //       let contractEthAddress = USDC_ADDRESS // real dai address"0x6B175474E89094C44Da98b954EedeAC495271d0F";

  //       // We connect to the Contract using a Provider, so we will only
  //       // have read-only access to the Contract
  //       let contract: ERC20 = new ethers.Contract(
  //         contractEthAddress,
  //         ERC20_ABI,
  //         provider
  //       ) as ERC20;
  //       getBalance(contract,userEthAddress);
  //     }
  //   }, [provider,userEthAddress]);
  return <div>{`${Number(dowgoBalance) / 10 ** 18} Dowgo`}</div>;
}

export default DowgoBalance;
