import React from "react";
import AppCarousel from "../../components/Carousel/app-carousel.component";

//@ts-ignore
import VideoBanner from "../../assets/video-banner/video-banner.mp4";

import "./home.styles.css";
import DowgoTradingInterface from "../../components/DowgoTradingView/DowgoTradingInterface";

function Invest() {
  return (
    <div className="app-container">
      <div className="app-video-container">
        <video
          //   object-position="-10% 0"
          width="100%"
          height="100%"
          autoPlay
          loop
          muted
          playsInline
          className="app-video-banner"
        >
          <source src={VideoBanner} type="video/mp4" />
        </video>
      </div>
      <DowgoTradingInterface />
      {/* <div className="app-banner-container">
        <DowgoTradingInterface/>
      </div> */}
    </div>
  );
}

export default Invest;
