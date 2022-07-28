import classes from "./Home.module.css";

import LandingPageImg from "../assets/landing_page.jpg";

const Home = () => {
  return (
    <main className={classes.main}>
      <div className={classes.imageWrapper}>
        <img src={LandingPageImg} alt="NBA game" />
      </div>
    </main>
  );
};

export default Home;
