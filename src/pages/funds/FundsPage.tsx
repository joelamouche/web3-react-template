//@ts-ignore
import VideoBanner from "../../assets/video-banner/video-without-logo.mp4";

import "../home/home.styles.css";
import FundsView from "../../components/FundsView";

function FundsPage() {
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
      <FundsView />
    </div>
  );
}

export default FundsPage;
