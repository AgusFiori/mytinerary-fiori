import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../styles/BurgerMenu.css";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUserCircle,
  FaCity,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

class BurgerMenu extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu width="250px" right>
        <div className="sideBarTitle">
          <h2>Menu</h2>
        </div>
        <NavLink to="/">
          <p id="home" className="menu-item" href="/">
            <div className="iconMenu">
              <FaHome />
            </div>
            <div className="optionMenu">Home</div>
          </p>
        </NavLink>
        <NavLink to="/cities">
          <p id="cities" className="menu-item">
            <div className="iconMenu">
              <FaCity />
            </div>
            <div className="optionMenu">Cities</div>
          </p>
        </NavLink>
        <NavLink to="/about">
          <p id="about" className="menu-item" href="/about">
            <div className="iconMenu">
              <FaInfoCircle />
            </div>
            <div className="optionMenu">About</div>
          </p>
        </NavLink>
        <NavLink to="/contact">
          <p id="contact" className="menu-item">
            <div className="iconMenu">
              <FaEnvelope />
            </div>
            <div className="optionMenu">Contact</div>
          </p>
        </NavLink>
        <NavLink to="/login">
          <p id="contact" className="menu-item">
            <div className="iconMenu">
              <FaUserCircle />
            </div>
            <div className="optionMenu">Log In</div>
          </p>
        </NavLink>
      </Menu>
    );
  }
}

export default BurgerMenu;
