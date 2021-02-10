import React, { useState } from "react";
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu.jsx";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";

const Nav = styled.nav`
  padding: 0 0 0.3rem 0;
  .logo {
    padding: 0.3rem 0 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    font-family: "Pacifico", cursive;
  }
  .userIcon {
    border-radius: 50%;
    margin-right: 1rem;
    background-position: center;
    background-size: cover;
    height: 8rem !important;
    width: 12rem !important;
  }
  .greeting {
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const Navbar = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  if (props.loggedUser) {
    var links = (
      <>
        <span
          className="link"
          onClick={() => props.logout()}
          style={{ cursor: "pointer" }}
        >
          Logout
        </span>
      </>
    );
  } else {
    var links = (
      <>
        <NavLink to="/login">
          <span className="link">Login</span>
        </NavLink>
        <NavLink to="/register">
          <span className="link">Register</span>
        </NavLink>
      </>
    );
  }

  if (props.loggedUser !== null) {
    var divStyle = {
      backgroundImage: "url(" + props.loggedUser.urlPic + ")",
      height: "100px",
      width: "100px",
    };
  } else {
    var divStyle = {
      backgroundImage:
        "url(" +
        "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" +
        ")",
      height: "100px",
      width: "100px",
    };
  }

  return (
    <Nav>
      <div className="ost-multi-header">
        <BurgerMenu />
        <div className="logo">
          <div className="logoC">
            <span id="greeting" className="greeting">
              <div className="logoGreet" onClick={toggle}>
                <div className="userIcon" style={divStyle}></div>
                <div className="greeting">
                  Welcome,{" "}
                  {props.loggedUser ? props.loggedUser.firstname : "Guest"} !
                </div>
              </div>
              <div className="links">
                <NavLink to="/">
                  <span className="link">Home</span>
                </NavLink>
                <NavLink to="/cities">
                  <span className="link">Cities</span>
                </NavLink>
                {links}
              </div>
            </span>
          </div>
        </div>
      </div>
    </Nav>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authR.loggedUser,
  };
};

const mapDispatchToProps = {
  logout: authActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
