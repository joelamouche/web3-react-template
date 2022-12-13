//@ts-ignore
import React from "react";
import { Card, Col, Row } from "antd";

//icon assets import
import { ReactComponent as AssetIcon } from "../../assets/metrics-banner/asset-icon.svg";
import { ReactComponent as TokenIcon } from "../../assets/metrics-banner/token-icon.svg";
import { ReactComponent as VolumeIcon } from "../../assets/metrics-banner/volume-icon.svg";
import { ReactComponent as IndexIcon } from "../../assets/metrics-banner/index-icon.svg";

import "./home-metrics.styles.css";

const HomeMetrics = () => {
  return (
    <div className="metrics-card-container">
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="Assets Under Management"
            bordered={false}
            className="metrics-card"
          >
            <div className="metrics-card-body-wrapper">
              <AssetIcon className="metrics-icon" />
              <h1 className="metrics-card-balance">2,000,000</h1>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Circulating Supply"
            bordered={false}
            className="metrics-card"
          >
            <div className="metrics-card-body-wrapper">
              <TokenIcon className="metrics-icon" />
              <h1 className="metrics-card-balance">500,000</h1>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="24h Volume" bordered={false} className="metrics-card">
            <div className="metrics-card-body-wrapper">
              <VolumeIcon className="metrics-icon" />
              <h1 className="metrics-card-balance">200,000</h1>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Sustainibility Index"
            bordered={false}
            className="metrics-card"
          >
            <div className="metrics-card-body-wrapper">
              <IndexIcon className="metrics-icon" />
              <h1 className="metrics-card-balance">82 / 100</h1>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomeMetrics;
