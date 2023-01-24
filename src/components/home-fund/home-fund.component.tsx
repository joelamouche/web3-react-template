//@ts-ignore
import React from "react";
import { Table } from "antd";

//funds table objects
import columnsFund from "../../objects/dowgo-funds/fund-columns";
import dataFund from "../../objects/dowgo-funds/fund-data";
import columnsStock from "../../objects/dowgo-stocks/stocks-columns/stocks-columns";
import dataAlphaStocks from "../../objects/dowgo-stocks/alpha/alpha-stocks";

import "./home-fund.styles.scss";

const HomeFund = () => {
  const expandedRowRender = () => {
    return (
      <Table
        className="stock-table"
        columns={columnsStock}
        dataSource={dataAlphaStocks}
        pagination={false}
      />
    );
  };

  return (
    <div className="home-fund-container">
      <h1 className="home-fund-title">DISCOVER DOWGO FUNDS </h1>
      <Table
        className="fund-table"
        columns={columnsFund}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={dataFund}
        pagination={false}
        size="middle"
      />
    </div>
  );
};

export default HomeFund;
