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

function DowgoContract(
  provider: providers.Web3Provider | undefined,
  userEthAddress: EthAddress,
  allowance: BigNumber,
  usdcBalance: BigNumber,
  setUSDCBalance: SetStateFunction<BigNumber>,
  dowgoBalance: BigNumber,
  setDowgoBalance: SetStateFunction<BigNumber>,
  setDisplayModal: SetStateFunction<boolean>,
  chainId: ChainId | undefined
) {
  const [price, setPrice] = React.useState<BigNumber>(BigNumber.from(0));
  const [targetRatio, setTargetRatio] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [collRange, setCollRange] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [totalSupply, setTotalSupply] = React.useState<BigNumber>(
    BigNumber.from(0)
  );

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
  async function updateDowgoBalance(_userEthAddress: EthAddress) {
    let contract: DowgoERC20 = new ethers.Contract(
      getDowgoEthAddress(chainId),
      DowgoERC20ABI,
      provider
    ) as DowgoERC20;
    chainId &&
      _userEthAddress !== "0x" &&
      setDowgoBalance(await contract.balanceOf(_userEthAddress));
  }
  async function updateUSDCBalance(_userEthAddress: EthAddress) {
    // USDC EthAddress
    let contract: ERC20 = new ethers.Contract(
      getUSDCEthAddress(chainId),
      ERC20_ABI,
      provider
    ) as ERC20;
    chainId &&
      _userEthAddress !== "0x" &&
      setUSDCBalance(await contract.balanceOf(_userEthAddress));
  }

  function updateBalances() {
    updateUSDCBalance(userEthAddress);
    updateDowgoBalance(userEthAddress);
  }

  useEffect(() => {
    if (provider && userEthAddress !== "0x" && chainId) {
      // Dowgo
      let contract: DowgoERC20 = new ethers.Contract(
        getDowgoEthAddress(chainId),
        DowgoERC20ABI,
        provider
      ) as DowgoERC20;
      updateBalances();
      updatePrice(contract);
      updateTargetRatio(contract);
      updateCollRange(contract);
      updateTotalSupply(contract);
    }
  }, [provider, userEthAddress]);
  return (
    <Card style={{ width: "80vw", marginLeft: "10vw", marginTop: "2vh" }}>
      <Card.Header>{`Dowgo (Price: ${
        Number(price) / Number(ONE_USDC_UNIT)
      } USDC/Dowgo)`}</Card.Header>
      <Card.Body>
        <Container>
          <Row>
            {" "}
            <Col>
              <div style={{ margin: "1.5em" }}>
                Dowgo Total Supply :{" "}
                {Number(totalSupply) / Number(ONE_DOWGO_UNIT)} DWG
              </div>
            </Col>
            <Col>
              <div style={{ margin: "1.5em" }}>
                Max Buy/Sell Amount :{" "}
                {Number(
                  totalSupply
                    .mul(targetRatio)
                    .mul(collRange)
                    .div(10 ** 8)
                ) / Number(ONE_DOWGO_UNIT)}{" "}
                DWG
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
                updateBalances
              )}
            </Col>
            <Col>
              {SellComponent(
                provider,
                chainId,
                price,
                dowgoBalance,
                updateBalances
              )}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default DowgoContract;
