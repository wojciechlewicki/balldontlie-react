import styles from "./Footer.module.css";
import Wrapper from "../ui/Wrapper";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper className={styles.flexboxCenter}>
        <p>Copyright 2022 Wojciech Lewicki</p>
      </Wrapper>
    </footer>
  );
};

export default Footer;
