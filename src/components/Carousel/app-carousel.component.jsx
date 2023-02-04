//@ts-ignore
import React, { useRef } from "react";
import { Carousel, Button } from "antd";

//components import
import HomeMetrics from "../home-metrics/home-metrics.component";

//assets import
import DowgoLogo from "../../assets/header/dowgo-logo.png";

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
          <h1 className="carousel-banner-title"> Act for the Planet</h1>
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
             Buy DOWGO ONE
          </h1>
          <div className="carousel-invest-metrics">
            <HomeMetrics />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default AppCarousel;
