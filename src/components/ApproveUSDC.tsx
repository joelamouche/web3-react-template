import React, { useEffect } from "react";
import { BigNumber, ethers, providers } from "ethers";
import { Address } from "../types/types";
import { ERC20_ABI } from "../constants/ERC20ABI";
import { ERC20 } from "../types/ERC20";
import { DOWGO_ADDRESS, USDC_ADDRESS } from "../constants/contractAddresses";

function ApproveUSDC(provider: providers.Web3Provider|undefined, userAddress: Address) {
  const [allowance, setAllowance] = React.useState<BigNumber>(BigNumber.from(0));

  async function getAllowance(contract: ERC20) {
    console.log("k",userAddress,(await contract.allowance(userAddress,DOWGO_ADDRESS)).toHexString())
    setAllowance(await contract.allowance(userAddress,DOWGO_ADDRESS));
  }

  async function approveUSDCToDowgo() {
    let contract: ERC20 = new ethers.Contract(
        USDC_ADDRESS,
        ERC20_ABI,
        provider
      ) as ERC20;
      console.log("approving...")
      provider &&await contract.connect(provider.getSigner()).approve(DOWGO_ADDRESS,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    getAllowance(contract)
  }
  useEffect(() => {
    if (provider && userAddress!=="0x") {
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let contract: ERC20 = new ethers.Contract(
        USDC_ADDRESS,
        ERC20_ABI,
        provider
      ) as ERC20;
      getAllowance(contract);
    }
  }, [provider,userAddress]);
  return (<div>
      <div>
        {allowance.toHexString()==="0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"? `Allowance to Dowgo Contract : Infinite`: `Allowance to Dowgo Contract : ${Number(allowance)/10**18} USDC`}
      </div>
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
