//@ts-ignore
import React, { useContext, useEffect } from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Dropdown, MenuProps } from "antd";
import { ethers } from "ethers";

import "./header-animation";

import AppContext from "../../context/AppContext";
import { RoundButton } from "../displayComponents/RoundButton";

//icons
import { ReactComponent as InfoIcon } from "../../assets/icons/info-icon.svg";
import { ReactComponent as MetamaskIcon } from "../../assets/icons/metamask-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow-right-icon.svg";

import { smallIconStyle } from "../../styles/iconStyle";
import { lightGrey, primaryColor } from "../../styles/colors";
import { EthAddress, ConnectMMStatus } from "../../types/types";

function ConnectMetaMask() {
  const { state, dispatch } = useContext(AppContext);
  const [needInstallMetaMask, setNeedInstallMetaMask] =
    React.useState<boolean>(false);

  // CONNECT TO METAMASK

  async function detectProvider() {
    // this returns the state.provider, or null if it wasn't detected
    const _provider = await detectEthereumProvider();

    if (_provider) {
      startApp(_provider as MetaMaskInpageProvider); // Initialize your app
    } else {
      console.log("Please install MetaMask!");
      setNeedInstallMetaMask(true);
      // TODO: add modal to signal user to install metamask
    }
  }

  function startApp(_prov: MetaMaskInpageProvider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (_prov !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    // Access the decentralized web!
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(_prov);
    dispatch({ type: "setProvider", value: provider }); //setProvider(provider);
  }

  // detect MM at the start of the Dapp
  useEffect(() => {
    detectProvider();
  }, []);

  /**********************************************************/
  /* Handle chain (network) and chainChanged (per EIP-1193) */
  /**********************************************************/

  async function detectChainId(ethereum: MetaMaskInpageProvider) {
    const chainIdUnknown = await ethereum.request({ method: "eth_chainId" });
    handleChainChanged(chainIdUnknown);

    ethereum.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId: unknown) {
      // Set chain id the first time
      if (_chainId && state.chainId === undefined) {
        dispatch({
          type: "setChainId",
          value: parseInt(_chainId as string, 16),
        }); //setChainId(parseInt(_chainId as string, 16));
        // If Chain id changed,we recommend reloading the page, unless you must do otherwise
      } else if (_chainId && _chainId !== state.chainId) {
        window.location.reload();
      }
    }
  }

  // detect chain id
  useEffect(() => {
    if (state.provider) {
      detectChainId(window.ethereum as MetaMaskInpageProvider);
    }
  }, [state.provider]);

  /***********************************************************/
  /* Handle user accounts and accountsChanged (per EIP-1193) */
  /***********************************************************/
  function checkAccounts(ethereum: MetaMaskInpageProvider) {
    ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      });

    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    ethereum.on("accountsChanged", handleAccountsChanged);
  }

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts: unknown) {
    console.log("handleAccountsChanged", accounts[0]);
    let accountList: EthAddress[] = [];
    if (accounts && (accounts as string[]).length) {
      accountList = accounts as EthAddress[];
    }
    if (accountList.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
      setNeedInstallMetaMask(true);
    } else if (accountList[0] !== state.currentAccount) {
      console.log("check", accountList[0]);
      dispatch({ type: "setCurrentAccount", value: accountList[0] }); //setCurrentAccount(accountList[0]);
    }
  }

  useEffect(() => {
    if (state.provider) {
      checkAccounts(window.ethereum as MetaMaskInpageProvider);
    }
  }, [state.provider]);

  /*********************************************/
  /* Access the user's accounts (per EIP-1102) */
  /*********************************************/

  // You should only attempt to request the user's accounts in response to user
  // interaction, such as a button click.
  // Otherwise, you popup-spam the user like it's 1999.
  // If you fail to retrieve the user's account(s), you should encourage the user
  // to initiate the attempt.

  // While you are awaiting the call to eth_requestAccounts, you should disable
  // any buttons the user can click to initiate the request.
  // MetaMask will reject any additional requests while the first is still
  // pending.
  function connect(ethereum: MetaMaskInpageProvider) {
    console.log("co");
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
  }
  const items: MenuProps["items"] = [
    {
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontStyle: "italic", color: lightGrey }}>
            We can’t find metamask extension
          </span>
          <InfoIcon
            style={{ ...smallIconStyle, color: lightGrey, marginLeft: "10px" }}
          />
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <MetamaskIcon style={smallIconStyle} />
          <a style={{ margin: "0 16px" }} href="https://metamask.io/download/">
            Install Metamask
          </a>
          <ArrowRightIcon style={{ ...smallIconStyle, color: primaryColor }} />
        </div>
      ),
      key: "1",
    },
  ];

  return {
    key: "Connect",
    icon: (
      <Dropdown menu={{ items }} open={needInstallMetaMask}>
        {RoundButton(() => {
          connect(window.ethereum as MetaMaskInpageProvider);
        }, "Connect")}
      </Dropdown>
    ),
  };
}

export default ConnectMetaMask;
