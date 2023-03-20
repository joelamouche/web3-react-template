import { Col, Row } from "antd";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

interface FundDetailsProps {
  openFundDetails: boolean;
}
export function FundDetails(props: FundDetailsProps) {
  const { openFundDetails } = props;

  const { state } = useContext(AppContext);
  return (
    <div
      style={
        openFundDetails
          ? {
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid #303030",
            }
          : { display: "none" }
      }
    >
      <Row>
        <Col style={{ display: "flex", alignItems: "center" }} span={6}>
          <div className="fund-name">Funds Portfolio</div>
        </Col>
        <Col span={18}>
          <div className="fund-row-right">
            <button className="fund-button">Sell</button>
            <button className="fund-button">Buy</button>
          </div>
        </Col>
      </Row>
      <Row className="fund-details-table-header">
        <Col span={9}>Company name</Col>
        <Col span={5}>Acronym</Col>
        <Col span={5}>Industry</Col>
        <Col span={5}>Fund Ratio</Col>
        {/* <Col span={4}>Performance</Col> */}
      </Row>
      {state.stockPortfolio &&
        state.stockPortfolio.map((stock) => {
          return (
            <Row
              className="fund-details-table-line"
              key={`fund-detail-${stock.ticker}`}
            >
              <Col style={{ fontWeight: "600" }} span={9}>
                {stock.ticker}
              </Col>
              <Col span={5}>{stock.ticker}</Col>
              <Col span={5}>{stock.sector}</Col>
              <Col span={5}>{stock.balance}</Col>
              {/* <Col span={4}>{stock.ticker}</Col> */}
            </Row>
          );
        })}
    </div>
  );
}
