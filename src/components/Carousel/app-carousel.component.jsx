//@ts-ignore
import React, { useRef } from "react";
import { Carousel, Button } from "antd";

//components import
import HomeMetrics from "../home-metrics/home-metrics.component";

//assets import
import DowgoLogo from "../../assets/header/dowgo-logo.png";
import VideoDowgoOne from "../../assets/video-banner/dowgo-one.mp4";

import "./app-carousel.styles.scss";

const AppCarousel = () => {
  const carouselRef = useRef();

  return (
    <div className="app-carousel-container">
      <Carousel
        ref={(ref) => {
          carouselRef.current = ref;
        }}
        effect="fade"
        dots={false}
      >
        <div key="0" className="carousel-one-container">
          <h1 className="carousel-banner-title"> ACT FOR THE PLANET </h1>
          <div className="carousel-dowgo-logo-container">
            <img
              src={DowgoLogo}
              alt="Dowgo Logo"
              className="carousel-dowgo-logo"
            />
          </div>
          <Button
            className="carousel-button-invest"
            onClick={() => {
              carouselRef.current.goTo(1);
            }}
          >
            INVEST
          </Button>
        </div>

        <div key="1" className="carousel-two-container">
          <h1 className="carousel-invest-title">
            CHOOSE YOUR INVESTMENT TOKEN
          </h1>

          <video
            width="auto"
            height="200px"
            autoPlay
            loop
            className="carousel-invest-dowgo-one"
          >
            <source src={VideoDowgoOne} type="video/mp4" />
          </video>

          <div className="carousel-invest-metrics">
            <HomeMetrics />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default AppCarousel;
