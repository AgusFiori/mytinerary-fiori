import React from "react";
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu.jsx";
import { NavLink, Link } from "react-router-dom";

const Nav = styled.nav`
  padding: 0 0 0.3rem 0;
  .logo {
    padding: 0.3rem 0 0 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    font-family: "Pacifico", cursive;
  }
  .userIcon {
    border-radius: 50%;
    border: 3px solid black;
    margin-right: 1rem;
  }
  .greeting {
    margin-left: 1rem;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <BurgerMenu />
      <div className="logo">
        <div className="logoC">
          <span id="greeting" className="greeting">
            <div className="logoGreet">
              <img
                className="userIcon"
                src="./user-icon-male.jpg"
                alt="logo"
                height="100px"
              />
              Welcome, <span>Guest</span> !
            </div>
            <div className="links">
              <NavLink to="/">
                <span className="link">Home</span>
              </NavLink>
              <NavLink to="/cities">
                <span className="link">Cities</span>
              </NavLink>
            </div>
          </span>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
