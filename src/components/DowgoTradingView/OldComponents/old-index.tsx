import React, { useEffect } from "react";
import { Card, Col, Row } from "antd";
import { BigNumber, ethers, providers } from "ethers";
import {
  EthAddress,
  ChainId,
  SetStateFunction,
  ContractAddresses,
} from "../../../types/types";
import { DowgoERC20 } from "../../../types/DowgoERC20";
import { DowgoERC20ABI } from "../../../constants/DowgoERC20ABI";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../../constants";
import { ERC20 } from "../../../types/ERC20";
import { ERC20_ABI } from "../../../constants/ERC20ABI";
import { BuyComponent } from "./BuyComponent";
import { SellComponent } from "./SellComponent";
import { WithdrawComponent } from "./WithdrawComponent";

import "./old-index-contract.styles.scss";

const margin = "0.5em";

function DowgoContract(
  provider: providers.Web3Provider | undefined,
  userEthAddress: EthAddress,
  allowance: BigNumber,
  usdBalance: BigNumber,
  setUSDCBalance: SetStateFunction<BigNumber>,
  dowgoBalance: BigNumber,
  setDowgoBalance: SetStateFunction<BigNumber>,
  setDisplayModal: SetStateFunction<boolean>,
  chainId: ChainId | undefined,
  price: BigNumber,
  setPrice: SetStateFunction<BigNumber>,
  contractAddresses: ContractAddresses | undefined
) {
  const [targetRatio, setTargetRatio] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [collRange, setCollRange] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [totalSupply, setTotalSupply] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [usdBalanceOnContract, setUsdcBalanceOnContract] =
    React.useState<BigNumber>(BigNumber.from(0));

  async function updatePrice(contract: DowgoERC20) {
    setPrice(await contract.currentPrice());
  }
  async function updateTargetRatio(contract: DowgoERC20) {
    setTargetRatio(await contract.targetRatio());
  }
  async function updateCollRange(contract: DowgoERC20) {
    setCollRange(await contract.collRange());
  }
  async function updateTotalSupply(contract: DowgoERC20) {
    setTotalSupply(await contract.totalSupply());
  }
  async function updateDowgoBalance(
    contract: DowgoERC20,
    _userEthAddress: EthAddress
  ) {
    _userEthAddress !== "0x" &&
      setDowgoBalance(await contract.balanceOf(_userEthAddress));
  }
  async function updateUSDCBalance(
    _userEthAddress: EthAddress,
    _chainId: ChainId
  ) {
    if (chainId && contractAddresses && _userEthAddress !== "0x") {
      // USDC EthAddress
      let contract: ERC20 = new ethers.Contract(
        contractAddresses?.usdAddress,
        ERC20_ABI,
        provider
      ) as ERC20;
      setUSDCBalance(await contract.balanceOf(_userEthAddress));
    }
  }
  async function updateUSDCBalanceOnContract(
    contract: DowgoERC20,
    _userEthAddress: EthAddress
  ) {
    _userEthAddress !== "0x" &&
      setUsdcBalanceOnContract(
        await contract.usdcUserBalances(_userEthAddress)
      );
  }

  function updateContractInfo(
    _chainId: ChainId,
    _contractAddresses: ContractAddresses | undefined
  ) {
    if (_contractAddresses) {
      let contract: DowgoERC20 = new ethers.Contract(
        _contractAddresses.dowgoAddress,
        DowgoERC20ABI,
        provider
      ) as DowgoERC20;
      updateUSDCBalance(userEthAddress, _chainId);
      updateDowgoBalance(contract, userEthAddress);
      updateUSDCBalanceOnContract(contract, userEthAddress);
      updatePrice(contract);
      updateTargetRatio(contract);
      updateCollRange(contract);
      updateTotalSupply(contract);
    }
  }

  useEffect(() => {
    if (provider && userEthAddress !== "0x" && chainId) {
      updateContractInfo(chainId, contractAddresses);
    }
  }, [provider, userEthAddress, chainId, contractAddresses]);
  return (
    <div>
      <Card
        style={{ width: "80vw", marginTop: "2vh" }}
        title={`Dowgo Alpha Contract`}
        className="dowgo-contract-card"
      >
        <Row gutter={24}>
          {" "}
          <Col span={16}>
            <div className="withdraw-formula">
              <div style={{ margin }}>{`Price: ${
                Number(price) / Number(ONE_USDC_UNIT)
              } USDC/Dowgo`}</div>
              <div style={{ margin }}>
                {contractAddresses ? contractAddresses.dowgoAddress : "Loading"}
              </div>
              <div style={{ margin }}>
                {`Dowgo Total Supply : 
              ${Number(totalSupply) / Number(ONE_DOWGO_UNIT)} DWG = ${(
                  (Number(totalSupply) * Number(price)) /
                  Number(ONE_DOWGO_UNIT) /
                  Number(ONE_USDC_UNIT)
                ).toFixed(2)} USD`}
              </div>
              <div style={{ margin }}>
                {`Max Buy/Sell Amount : Total Supply * Target Ratio (${
                  Number(targetRatio) / 10 ** 2
                }%) * Collateral Range (${Number(collRange) / 10 ** 2}%) = ${
                  Number(
                    totalSupply
                      .mul(targetRatio)
                      .mul(collRange)
                      .div(10 ** 8)
                  ) / Number(ONE_DOWGO_UNIT)
                } DWG1`}
              </div>
              <div style={{ margin }}>
                {`User USDC Balance on the Contract : ${(
                  Number(usdBalanceOnContract) / Number(ONE_USDC_UNIT)
                ).toFixed(2)} USDC`}
              </div>
            </div>
          </Col>
          <Col span={8}>
            <h2 className="withdraw-title">Withdraw USDC from Contract</h2>
            <div style={{ margin }}>
              {WithdrawComponent(
                provider,
                chainId,
                usdBalanceOnContract,
                updateContractInfo,
                contractAddresses
              )}
            </div>
          </Col>
        </Row>
      </Card>
      <br />
      <Row gutter={24}>
        {" "}
        <Col span={12}>
          {BuyComponent(
            provider,
            chainId,
            price,
            allowance,
            setDisplayModal,
            updateContractInfo,
            contractAddresses
          )}
        </Col>
        <Col span={12}>
          {SellComponent(
            provider,
            chainId,
            price,
            dowgoBalance,
            updateContractInfo,
            contractAddresses
          )}
        </Col>
      </Row>
    </div>
  );
}

export default DowgoContract;
