import React from "react";
import AppCarousel from "../../components/Carousel/app-carousel.component";

//@ts-ignore
import VideoBanner from "../../assets/video-banner/video-banner.mp4";

import "./home.styles.css";

function DowgoDApp() {
  return (
    <div className="app-container">
      <div className="app-video-container">
        <video
          width="100%"
          height="auto"
          autoPlay
          loop
          className="app-video-banner"
        >
          <source src={VideoBanner} type="video/mp4" />
        </video>
      </div>

      <div className="app-banner-container">
        <AppCarousel />
      </div>
    </div>
  );
}

export default DowgoDApp;
