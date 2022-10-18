import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { BigNumber, ethers, providers } from "ethers";
import { EthAddress, ChainId, SetStateFunction } from "../../types/types";
import { DowgoERC20 } from "../../types/DowgoERC20";
import { DowgoERC20ABI } from "../../constants/DowgoERC20ABI";
import { ONE_DOWGO_UNIT, ONE_USDC_UNIT } from "../../constants";
import { ERC20 } from "../../types/ERC20";
import { ERC20_ABI } from "../../constants/ERC20ABI";
import { BuyComponent } from "./BuyComponent";
import { SellComponent } from "./SellComponent";
import {
  getDowgoEthAddress,
  getUSDCEthAddress,
} from "../../constants/contractAddresses";
import { WithdrawComponent } from "./WithdrawComponent";

const margin = "0.5em";

function DowgoContract(
  provider: providers.Web3Provider | undefined,
  userEthAddress: EthAddress,
  allowance: BigNumber,
  usdcBalance: BigNumber,
  setUSDCBalance: SetStateFunction<BigNumber>,
  dowgoBalance: BigNumber,
  setDowgoBalance: SetStateFunction<BigNumber>,
  setDisplayModal: SetStateFunction<boolean>,
  chainId: ChainId | undefined,
  price: BigNumber,
  setPrice: SetStateFunction<BigNumber>
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
  const [usdcBalanceOnContract, setUsdcBalanceOnContract] =
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
    // USDC EthAddress
    let contract: ERC20 = new ethers.Contract(
      getUSDCEthAddress(_chainId),
      ERC20_ABI,
      provider
    ) as ERC20;
    chainId &&
      _userEthAddress !== "0x" &&
      setUSDCBalance(await contract.balanceOf(_userEthAddress));
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

  function updateContractInfo(_chainId: ChainId) {
    let contract: DowgoERC20 = new ethers.Contract(
      getDowgoEthAddress(_chainId),
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

  useEffect(() => {
    if (provider && userEthAddress !== "0x" && chainId) {
      updateContractInfo(chainId);
    }
  }, [provider, userEthAddress, chainId]);
  return (
    <Card style={{ width: "80vw", marginLeft: "10vw", marginTop: "2vh" }}>
      <Card.Header>
        <div>{`Dowgo Alpha Contract`}</div>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            {" "}
            <Col>
              <div style={{ margin }}>{`Price: ${
                Number(price) / Number(ONE_USDC_UNIT)
              } USDC/Dowgo`}</div>
              <div style={{ margin }}>{`Contract Address : ${getDowgoEthAddress(
                chainId
              )}`}</div>
              <div style={{ margin }}>
                {`Dowgo Total Supply : 
                ${Number(totalSupply) / Number(ONE_DOWGO_UNIT)} DWG = ${(
                  (Number(totalSupply) * Number(price)) /
                  Number(ONE_DOWGO_UNIT) /
                  Number(ONE_USDC_UNIT)
                ).toFixed(2)} USD`}
              </div>
              <div style={{ margin }}>
                {`Max Buy/Sell Amount : ${
                  Number(
                    totalSupply
                      .mul(targetRatio)
                      .mul(collRange)
                      .div(10 ** 8)
                  ) / Number(ONE_DOWGO_UNIT)
                } DWG`}
              </div>
              <div style={{ margin }}>
                {`User USDC Balance on the Contract : ${(
                  Number(usdcBalanceOnContract) / Number(ONE_USDC_UNIT)
                ).toFixed(2)} USDC`}
              </div>
              <div style={{ margin }}>
                {WithdrawComponent(
                  provider,
                  chainId,
                  usdcBalanceOnContract,
                  updateContractInfo
                )}
              </div>
            </Col>
          </Row>
          <Row>
            {" "}
            <Col>
              {BuyComponent(
                provider,
                chainId,
                price,
                allowance,
                setDisplayModal,
                updateContractInfo
              )}
            </Col>
            <Col>
              {SellComponent(
                provider,
                chainId,
                price,
                dowgoBalance,
                updateContractInfo
              )}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default DowgoContract;
