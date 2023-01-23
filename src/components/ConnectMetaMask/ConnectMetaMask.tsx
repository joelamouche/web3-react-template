//@ts-ignore
import React, { useEffect } from "react";
import { Menu } from "antd";
import { Link } from 'react-router-dom';

import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import {
  EthAddress,
  ChainId,
  ConnectMMStatus,
  SetStateFunction,
} from "../../types/types";
import { ethers, providers } from "ethers";
import { DButton } from "../displayComponents/Button";
import { ALLOWED_NETWORKS } from "../../constants";

//icons import
import { ReactComponent as ProfileIcon } from "../../assets/header/profile-icon.svg";

import "./header-animation";

import "./ConnectMetaMask.styles.css";

function ConnectMetaMask(
  provider: providers.Web3Provider | undefined,
  setProvider: SetStateFunction<providers.Web3Provider | undefined>,
  currentAccount: EthAddress,
  setCurrentAccount: SetStateFunction<EthAddress>,

  chainId: ChainId | undefined,
  setChainId: SetStateFunction<ChainId | undefined>
) {
  const [status, setStatus] = React.useState<ConnectMMStatus>("Disconnected");

  // CONNECT TO METAMASK

  async function detectProvider() {
    // this returns the provider, or null if it wasn't detected
    const provider = await detectEthereumProvider();

    if (provider) {
      startApp(provider as MetaMaskInpageProvider); // Initialize your app
    } else {
      console.log("Please install MetaMask!");
      setStatus("Please install MetaMask");
    }
  }

  function startApp(_provider: MetaMaskInpageProvider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (_provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    // Access the decentralized web!
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(_provider);
    setProvider(provider);
    setStatus("Connected");
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
      if (_chainId && chainId === undefined) {
        setChainId(parseInt(_chainId as string, 16));
        // If Chain id changed,we recommend reloading the page, unless you must do otherwise
      } else if (_chainId && _chainId !== chainId) {
        window.location.reload();
      }
    }
  }

  // detect chain id
  useEffect(() => {
    if (provider) {
      detectChainId(window.ethereum as MetaMaskInpageProvider);
    }
  }, [provider]);

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
    let accountList: EthAddress[] = [];
    if (accounts && (accounts as string[]).length) {
      accountList = accounts as EthAddress[];
    }
    if (accountList.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
      setStatus("Please connect to MetaMask");
    } else if (accountList[0] !== currentAccount) {
      setCurrentAccount(accountList[0]);
      setStatus("Connected");
    }
  }

  useEffect(() => {
    if (provider) {
      checkAccounts(window.ethereum as MetaMaskInpageProvider);
    }
  }, [provider]);

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
  const supportedNetwork =
    chainId && ALLOWED_NETWORKS.includes(ChainId[chainId]);
  return (
    <div>
      <Menu theme="dark" mode="horizontal" className="menu-container">
        
        <Menu.Item key="dowgo-funds" className="">
          <Link to="dowgo-funds" className="funds-menu-item">
            FUNDS
          </Link>
        </Menu.Item>
        
        <Menu.Item key="governance" className="">
          GOVERNANCE
        </Menu.Item>
        <Menu.SubMenu
          key="profile-container"
          icon={<Link to="/profile" className="profile-icon-link"><ProfileIcon className="profile-menu-icon" /></Link>}
        >
          <Menu.Item key="zero" className="">
            <div className="status-menu-item">
              Status :{" "}
              <span
                style={{
                  color:
                    status === "Connected"
                      ? "green"
                      : status === "Disconnected"
                      ? "red"
                      : "orange",
                }}
              >
                {status}
              </span>
            </div>
          </Menu.Item>
          <Menu.Item key="un" className="">
            <div className="account-menu-item">
              Account:{" "}
              {currentAccount !== "0x"
                ? `${currentAccount.substring(
                    0,
                    4
                  )}...${currentAccount.substring(38, 42)}`
                : "Not Connected"}
            </div>
          </Menu.Item>
          <Menu.Item key="deux" className="">
            <div className="chain-menu-item">
              Chain: {chainId ? ChainId[chainId] : "Unkown Chain"}
              {supportedNetwork ? null : (
                <span style={{ color: "red" }}> Unsupported Network</span>
              )}
            </div>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="trois" className="">
          {provider &&
            DButton(() => {
              connect(window.ethereum as MetaMaskInpageProvider);
            }, `Connect to MetaMask`)}
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default ConnectMetaMask;
