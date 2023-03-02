import React, { useContext, useEffect } from "react";
import { EthAddress, ChainId, ContractAddresses } from "../../types/types";
import { BigNumber, providers } from "ethers";
import DowgoContract from "../../components/DowgoTradingView/OldComponents/old-index";
import ApproveUSDC from "../../components/DowgoTradingView/OldComponents/ApproveUSDC";
import { BalancePanel } from "../../components/BalanceView";

import "./invest.styles.scss";
import AppContext from "../../context/AppContext";
import { fetchContractAddresses } from "../../calls/api/fetchContractAddresses";

function OldInvest() {
  const {
    state: { provider, chainId, currentAccount },
    dispatch,
  } = useContext(AppContext);
  const [allowance, setAllowance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [dowgoBalance, setDowgoBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [usdBalance, setUSDCBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [price, setPrice] = React.useState<BigNumber>(BigNumber.from(0));
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);

  // Contract addresses
  const [contractAddresses, setContractAddresses] = React.useState<
    ContractAddresses | undefined
  >(undefined);

  // async function getAddresses(chainId: ChainId | undefined) {
  //   if (chainId) {
  //     let addresses = await fetchContractAddresses(chainId);
  //     setContractAddresses(addresses);
  //   }
  // }
  // useEffect(() => {
  //  // getAddresses(chainId);
  //  fetchContractAddresses(chainId)
  // }, [chainId]);

  return (
    <div className="invest-page-container">
      <div className="invest-balance-container">
        {BalancePanel(dowgoBalance, usdBalance, price)}
      </div>
      <div className="invest-contract-container">
        {DowgoContract(
          provider,
          currentAccount,
          allowance,
          usdBalance,
          setUSDCBalance,
          dowgoBalance,
          setDowgoBalance,
          setDisplayModal,
          chainId,
          price,
          setPrice,
          contractAddresses
        )}
        <br />
        {ApproveUSDC(
          provider,
          chainId,
          currentAccount,
          allowance,
          setAllowance,
          displayModal,
          setDisplayModal,
          contractAddresses
        )}
      </div>
    </div>
  );
}

export default OldInvest;
