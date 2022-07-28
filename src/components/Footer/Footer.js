import classes from "./Footer.module.css";
import Wrapper from "../ui/Wrapper";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Wrapper>
        <div className={classes.flexbox}>
          <p>Copyright 2022 Wojciech Lewicki</p>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
