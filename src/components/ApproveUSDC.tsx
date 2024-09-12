import { BigNumber, ethers, providers } from "ethers";
import { useEffect, useState } from "react";
import { Modal, Alert } from "antd";
import {
  EthAddress,
  ChainId,
  SetStateFunction,
  TxStatus,
  ContractAddresses,
} from "../types/types";
import { ERC20_ABI } from "../constants/ERC20ABI";
import { ERC20 } from "../types/ERC20";
import { INFINITE_ALLOWANCE } from "../constants";
import { DButton } from "./displayComponents/Button";
import { DisplayTxStatus } from "./displayComponents/DisplayTxStatus";
import { launchTxWithStatus } from "../utils/txWithStatus";

async function getAllowance(
  contract: ERC20,
  _userEthAddress: EthAddress,
  setAllowance: SetStateFunction<BigNumber>,
  dowgoAddress: EthAddress | undefined
) {
  _userEthAddress !== "0x" &&
    dowgoAddress &&
    setAllowance(await contract.allowance(_userEthAddress, dowgoAddress));
}

function ApproveUSDC(
  provider: providers.Web3Provider | undefined,
  chainId: ChainId | undefined,
  userEthAddress: EthAddress,
  allowance: BigNumber,
  setAllowance: SetStateFunction<BigNumber>,
  displayModal: boolean,
  setDisplayModal: SetStateFunction<boolean>,
  contractAddresses: ContractAddresses | undefined
) {
  const [txStatus, setTxStatus] = useState<TxStatus | undefined>(undefined);

  async function approveUSDCToDowgo() {
    //TODO catch errors (like rejection)
    if (provider && chainId && contractAddresses) {
      let contract: ERC20 = new ethers.Contract(
        contractAddresses?.mockUSDCAddress,
        ERC20_ABI,
        provider
      ) as ERC20;
      launchTxWithStatus(
        setTxStatus,
        async () =>
          await contract
            .connect(provider.getSigner())
            .approve(contractAddresses?.dowgoAddress, INFINITE_ALLOWANCE),
        () => {
          setDisplayModal(false);
          getAllowance(
            contract,
            userEthAddress,
            setAllowance,
            contractAddresses?.dowgoAddress
          );
        }
      );
    }
  }
  useEffect(() => {
    if (provider && chainId && contractAddresses && userEthAddress !== "0x") {
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let contract: ERC20 = new ethers.Contract(
        contractAddresses?.mockUSDCAddress,
        ERC20_ABI,
        provider
      ) as ERC20;
      getAllowance(
        contract,
        userEthAddress,
        setAllowance,
        contractAddresses?.dowgoAddress
      );
    }
  }, [provider, userEthAddress, chainId, setAllowance,contractAddresses]);
  const handleClose = () => setDisplayModal(false);
  return (
    <Modal open={displayModal} closable={true} title="Approve USDC Spendings">
      <div>
        {allowance.toHexString() === INFINITE_ALLOWANCE
          ? `Allowance to Dowgo Contract : Infinite`
          : `Allowance to Dowgo Contract : ${
              Number(allowance) / 10 ** 18
            } USDC`}
      </div>
      <div>Dowgo Contract EthAddress :{contractAddresses?.dowgoAddress}</div>
      <Alert
        type="warning"
        key={"warning"}
        message="You need to Approve USDC Spendings to the Dowgo Contract before you can buy Dowgo token."
      />
      {txStatus && chainId && DisplayTxStatus(txStatus, chainId)}
      {DButton(handleClose, `Close`)}
      {DButton(approveUSDCToDowgo, `Approve USDC transfer to Dowgo Contract`)}
    </Modal>
  );
}

export default ApproveUSDC;
