import { useState } from "react";
import Wrapper from "../ui/Wrapper";
import { NavLink, useNavigate, createSearchParams } from "react-router-dom";

import {ReactComponent as HamburgerIcon} from "../../assets/hamburger-menu-icon.svg"
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToogleNav = () => {
    setNavbarOpen(prev => !prev)
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { string: search };
    navigate({ pathname: "/playersearch", search: `?${createSearchParams(params)}` });
  };

  return (
    <header className={styles.header}>
      <Wrapper className={styles.flexbox}>
          <NavLink className={styles.logo} to="/">
            NBAdata
          </NavLink>
          <form className={styles["input-div"]} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for players..."
              value={search}
              onChange={handleChange}
            ></input>
          </form>
            <button className={styles.hamburger} onClick={handleToogleNav}><HamburgerIcon /></button>
          <nav className={navbarOpen ? styles.show : ""}>
            <ul>
              <li>
                <NavLink to="/players" onClick={handleToogleNav}>Players</NavLink>
              </li>
              <li>
                <NavLink to="/teams" onClick={handleToogleNav}>Teams</NavLink>
              </li>
              <li>
                <NavLink to="/games" onClick={handleToogleNav}>Games</NavLink>
              </li>
            </ul>
          </nav>
      </Wrapper>
    </header>
  );
};

export default Header;
