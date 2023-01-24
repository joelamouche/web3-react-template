import React, { useEffect  } from "react";
import { EthAddress, ChainId, ContractAddresses } from "../../types/types";
import { BigNumber, providers } from "ethers";
import DowgoContract from "../../components/DowgoView";
import ApproveUSDC from "../../components/ApproveUSDC";
import { BalancePanel } from "../../components/BalanceView";

import { getContractAddresses } from "../../constants/contractAddresses";

import './profile.styles.scss';

function Profile() {

  const [provider, setProvider] = React.useState<
    providers.Web3Provider | undefined
  >(undefined);
  const [chainId, setChainId] = React.useState<ChainId | undefined>(undefined);
  const [currentAccount, setCurrentAccount] = React.useState<EthAddress>("0x");
  const [allowance, setAllowance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [dowgoBalance, setDowgoBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [usdcBalance, setUSDCBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [price, setPrice] = React.useState<BigNumber>(BigNumber.from(0));
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);

  // Contract addresses
  const [contractAddresses, setContractAddresses] = React.useState<
    ContractAddresses | undefined
  >(undefined);
  async function getAddresses(chainId: ChainId | undefined) {
    if (chainId) {
      let addresses = await getContractAddresses(chainId);
      setContractAddresses(addresses);
    }
  }
  useEffect(() => {
    getAddresses(chainId);
  }, [chainId]);

  return (
    <div className="profile-page-container">
      <div className="profile-balance-container">
        {BalancePanel(dowgoBalance, usdcBalance, price)}
      </div>
      <div className="profile-contract-container">
        {DowgoContract(
          provider,
          currentAccount,
          allowance,
          usdcBalance,
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

export default Profile;
