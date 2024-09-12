//@ts-ignore
import VideoBanner from "../../assets/video-banner/video-banner.mp4";

import "./home.styles.scss";
import DowgoTradingInterface from "../../components/DowgoTradingView";

function Invest() {
  return (
    <div>
      <div className="app-container">
        <div className="app-video-container">
          <video
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
      <DowgoTradingInterface />
    </div>
  );
}

export default Invest;
