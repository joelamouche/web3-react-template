//@ts-ignore
import VideoBanner from "../../assets/video-banner/video-without-logo.mp4";

import "../home/home.styles.scss";
import MyPortfolioView from "../../components/MyPortfolioView";

function MyPortfolioPage() {
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
      <MyPortfolioView />
    </div>
  );
}

export default MyPortfolioPage;
