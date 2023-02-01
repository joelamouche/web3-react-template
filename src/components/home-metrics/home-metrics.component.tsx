//@ts-ignore
import React from "react";
import { Card, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";

//icon assets import
import { ReactComponent as AssetIcon } from "../../assets/metrics-banner/asset-icon.svg";
import { ReactComponent as VolumeIcon } from "../../assets/metrics-banner/volume-icon.svg";
import { ReactComponent as IndexIcon } from "../../assets/metrics-banner/index-icon.svg";

import DanimerLogo from "../../assets/metrics-banner/danimer-logo.png";
import JohnsonLogo from "../../assets/metrics-banner/johnson-logo.png";
import BadgerLogo from "../../assets/metrics-banner/badger-logo.png";

import "./home-metrics.styles.scss";

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
            title="Top 3 Holdings"
            bordered={false}
            className="metrics-card"
          >
            <div className="metrics-header-wrapper">
              <Button className="metrics-button-funds">
                <Link to="/dowgo-funds" className="metrics-link-dowgo-funds">
                  Discover
                </Link>
              </Button>
              <div className="metrics-card-body-wrapper">
                <Col span={8}>
                  <div className="metrics-body-danimer">
                    <img
                      src={DanimerLogo}
                      alt="Danimer Logo"
                      className="metrics-holding-logo"
                    />
                    <h1 className="metrics-holding-title">
                      Danimer Scientific
                    </h1>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="metrics-body-johnson">
                    <img
                      src={JohnsonLogo}
                      alt="Johnson Logo"
                      className="metrics-holding-logo"
                    />
                    <h1 className="metrics-holding-title">Johnson Controls</h1>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="metrics-body-badger">
                    <img
                      src={BadgerLogo}
                      alt="Badger Logo"
                      className="metrics-holding-logo"
                    />
                    <h1 className="metrics-holding-title">Badger Meter</h1>
                  </div>
                </Col>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Current Performance"
            bordered={false}
            className="metrics-card"
          >
            <div className="metrics-card-body-wrapper">
              <VolumeIcon className="metrics-icon" />
              <h1 className="metrics-card-balance">+14%</h1>
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
