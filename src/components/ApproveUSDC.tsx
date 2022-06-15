import { BigNumber, ethers, providers } from "ethers";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { Address, SetStateFunction } from "../types/types";
import { ERC20_ABI } from "../constants/ERC20ABI";
import { ERC20 } from "../types/ERC20";
import { DOWGO_ADDRESS, USDC_ADDRESS } from "../constants/contractAddresses";
import { INFINITE_ALLOWANCE } from "../constants";
import { DButton } from "./displayComponents/Button";

function ApproveUSDC(
  provider: providers.Web3Provider | undefined,
  userAddress: Address,
  allowance: BigNumber,
  setAllowance: SetStateFunction<BigNumber>,
  displayModal: boolean,
  setDisplayModal: SetStateFunction<boolean>
) {
  async function getAllowance(contract: ERC20, _userAddress: Address) {
    console.log(
      "allowance",
      _userAddress,
      (await contract.allowance(_userAddress, DOWGO_ADDRESS)).toHexString()
    );
    _userAddress !== "0x" &&
      setAllowance(await contract.allowance(_userAddress, DOWGO_ADDRESS));
  }

  async function approveUSDCToDowgo() {
    //TODO catch errors (like rejection)
    let contract: ERC20 = new ethers.Contract(
      USDC_ADDRESS,
      ERC20_ABI,
      provider
    ) as ERC20;
    console.log("approving...");
    console.log(
      "signer",
      provider && (await provider.getSigner().getAddress())
    );
    provider &&
      (await contract
        .connect(provider.getSigner())
        .approve(DOWGO_ADDRESS, INFINITE_ALLOWANCE));
    console.log("allowed");
    getAllowance(contract, userAddress);
  }
  useEffect(() => {
    if (provider && userAddress !== "0x") {
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let contract: ERC20 = new ethers.Contract(
        USDC_ADDRESS,
        ERC20_ABI,
        provider
      ) as ERC20;
      getAllowance(contract, userAddress);
    }
  }, [provider, userAddress]);
  const handleClose = () => setDisplayModal(false);
  return (
    <Modal show={displayModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Approve USDC Spendings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          {allowance.toHexString() === INFINITE_ALLOWANCE
            ? `Allowance to Dowgo Contract : Infinite`
            : `Allowance to Dowgo Contract : ${
                Number(allowance) / 10 ** 18
              } USDC`}
        </div>
        <div>Dowgo Contract Address : {DOWGO_ADDRESS}</div>
        <Alert key={"warning"} variant={"warning"}>
          You need to Approve USDC Spendings to the Dowgo Contract before you
          can buy Dowgo token.
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        {DButton(handleClose, `Close`)}
        {DButton(approveUSDCToDowgo, `Approve USDC transfer to Dowgo Contract`)}
      </Modal.Footer>
    </Modal>
  );
}

export default ApproveUSDC;
