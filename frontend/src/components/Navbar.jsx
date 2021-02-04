import React, { useState } from "react";
import styled from "styled-components";
import BurgerMenu from "./BurgerMenu.jsx";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";

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
    width: 95%;
  }
`;

const Navbar = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  console.log(props);

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

  return (
    <Nav>
      {/* ## modal ## */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <form className="modal-login">
            <input
              className="modal-input username"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="modal-input password"
              type="password"
              name="password"
              placeholder="Password"
            />
            {/* <input type="submit" value="Submit" /> */}
            <button className="modal-login">Login</button>
          </form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary">Do Something</Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
      {/* ## modal end ## */}

      <div className="ost-multi-header">
        <BurgerMenu />
        <div className="logo">
          <div className="logoC">
            <span id="greeting" className="greeting">
              {/* <Link to="/login"> */}
              <div className="logoGreet" onClick={toggle}>
                <img
                  className="userIcon"
                  src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                  alt="logo"
                  height="100px"
                />
                <div className="greeting">
                  Welcome, <span>Guest</span> !
                </div>
              </div>
              {/* </Link> */}
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
