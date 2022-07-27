import Wrapper from "../ui/Wrapper";
import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <Wrapper>
        <div className={classes.flexbox}>
          <NavLink className={classes.logo} to="/">
            NBAdata
          </NavLink>
          <div className={classes['input-div']}>
            <input type="text" placeholder="Search for players..."></input>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/players">Players</NavLink>
              </li>
              <li>
                <NavLink to="/teams">Teams</NavLink>
              </li>
              <li>
                <NavLink to="/games">Games</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
