import React, { useEffect } from "react";
import { BigNumber, ethers, providers } from "ethers";
import { Address } from "../types/types";
import { ERC20_ABI } from "../constants/ERC20ABI";
import { ERC20 } from "../types/ERC20";
import { DOWGO_ADDRESS, USDC_ADDRESS } from "../constants/contractAddresses";
import { INFINITE_ALLOWANCE } from "../constants";

function ApproveUSDC(provider: providers.Web3Provider|undefined, userAddress: Address) {
  const [allowance, setAllowance] = React.useState<BigNumber>(BigNumber.from(0));

  async function getAllowance(contract: ERC20,_userAddress:Address) {
    console.log("allowance",_userAddress,(await contract.allowance(_userAddress,DOWGO_ADDRESS)).toHexString())
    _userAddress!=="0x" && setAllowance(await contract.allowance(_userAddress,DOWGO_ADDRESS));
  }

  async function approveUSDCToDowgo() {
    //TODO catch errors (like rejection)
    let contract: ERC20 = new ethers.Contract(
        USDC_ADDRESS,
        ERC20_ABI,
        provider
      ) as ERC20;
      console.log("approving...")
      console.log("signer",provider&& await provider.getSigner().getAddress())
      provider &&await contract.connect(provider.getSigner()).approve(DOWGO_ADDRESS,INFINITE_ALLOWANCE)
      console.log("allowed")
    getAllowance(contract,userAddress)
  }
  useEffect(() => {
    console.log("k",userAddress)
    if (provider && userAddress!=="0x") {
      console.log("oj")
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let contract: ERC20 = new ethers.Contract(
        USDC_ADDRESS,
        ERC20_ABI,
        provider
      ) as ERC20;
      getAllowance(contract,userAddress);
    }
  }, [provider,userAddress]);
  return (<div>
      <div>
        {allowance.toHexString()===INFINITE_ALLOWANCE? `Allowance to Dowgo Contract : Infinite`: `Allowance to Dowgo Contract : ${Number(allowance)/10**18} USDC`}
      </div>
      <div>Dowgo Contract Address : {DOWGO_ADDRESS}</div>
      <div>
        <button
          type="button"
          onMouseUp={() => {
           approveUSDCToDowgo()
          }}
        >
          Approve USDC transfer to Dowgo Contract
        </button>
      </div>
      </div>);
}

export default ApproveUSDC;
