import classes from "./Home.module.css";

import LandingPageImg from "../assets/landing_page.jpg";

const Home = () => {
  return (
    <div className={classes.imageWrapper}>
      <img src={LandingPageImg} alt="NBA game" />
    </div>
  );
};

export default Home;
