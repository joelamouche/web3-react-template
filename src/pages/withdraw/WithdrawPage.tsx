import React from "react";
import AppCarousel from "../../components/Carousel/app-carousel.component";

//@ts-ignore
import VideoBanner from "../../assets/video-banner/video-without-logo.mp4";

import "../home/home.styles.css";
import DowgoTradingInterface from "../../components/DowgoTradingView";
import WithdrawView from "../../components/WithdrawView";

function WithdrawPage() {
  return (
    <div>
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
      </div>
      <WithdrawView />
    </div>
  );
}

export default WithdrawPage;
