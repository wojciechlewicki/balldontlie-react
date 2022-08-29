import styles from "./Home.module.css";
import Wrapper from "../components/ui/Wrapper";

import LandingPageImg from "../assets/landing_page.jpg";

const Home = () => {
  return (
    <div className={styles.imageWrapper}>
      <img className={styles.imageWrapperImg} src={LandingPageImg} alt="NBA game" />
      <div className="outer-wrapper outer-wrapper--maxh">
        <Wrapper className={styles.h1Home}>
          <h1>Get NBA data<br/>from seasons 1979<br/>to current ones</h1>
          <h1>Players, teams,<br/>games and more</h1>
        </Wrapper>
      </div>
    </div>
  );
};

export default Home;
