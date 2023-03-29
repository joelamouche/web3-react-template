import { Col, Row } from "antd";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

interface FundDetailsProps {
  openFundDetails: boolean;
}
export function FundDetails(props: FundDetailsProps) {
  const { openFundDetails } = props;

  const { state } = useContext(AppContext);
  const totalPortfolioAmount = state.stockPortfolio
    ? state.stockPortfolio.reduce((sum, currentStock) => {
        return sum + currentStock.price * currentStock.balance;
      }, 0)
    : 0;

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
            <Link to="../invest/sell">
              <button className="fund-button">Sell</button>
            </Link>
            <Link to="../invest/buy">
              <button className="fund-button">Buy</button>
            </Link>
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
          const prct =
            (100 * stock.balance * stock.price) / totalPortfolioAmount;
          return (
            <Row
              className="fund-details-table-line"
              key={`fund-detail-${stock.ticker}`}
            >
              <Col style={{ fontWeight: "600" }} span={9}>
                {stock.stockName}
              </Col>
              <Col span={5}>{stock.ticker}</Col>
              <Col span={5}>{stock.sector}</Col>
              <Col span={5}>{`${prct.toLocaleString(undefined,{maximumFractionDigits: 2})}%`}</Col>
              {/* <Col span={4}>{stock.ticker}</Col> */}
            </Row>
          );
        })}
    </div>
  );
}
