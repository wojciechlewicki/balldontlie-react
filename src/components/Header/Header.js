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
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.formInput}
              type="text"
              placeholder="Search for players..."
              value={search}
              onChange={handleChange}
            ></input>
          </form>
            <button className={styles.hamburger} onClick={handleToogleNav}><HamburgerIcon /></button>
          <nav className={`${styles.headerNav} ${navbarOpen ? styles.show : ""}`}>
            <ul className={styles.headerNavUl}>
              <li className={styles.headerNavLi}>
                <NavLink to="/players" onClick={handleToogleNav}>Players</NavLink>
              </li>
              <li className={styles.headerNavLi}>
                <NavLink to="/teams" onClick={handleToogleNav}>Teams</NavLink>
              </li>
              <li className={styles.headerNavLi}>
                <NavLink to="/games" onClick={handleToogleNav}>Games</NavLink>
              </li>
            </ul>
          </nav>
      </Wrapper>
    </header>
  );
};

export default Header;
