import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookSquare,
  FaGithub,
  FaGooglePlusG,
  FaWhatsapp,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="9">
            <h5 className="title">MYtinerary</h5>
            <p>
              MyTinerary Travel is an online adventure planning service helping
              busy people plan awesome adventure trips.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <NavLink to="/login">Log in</NavLink>
              </li>
              <li className="list-unstyled">
                <NavLink to="/cities">Cities</NavLink>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="12">
            <div className="socialMediaTitle">
              <h5>Find us on social media:</h5>
            </div>
            <div className="socialMedia">
              <FaInstagram />
              <FaYoutube />
              <FaFacebookSquare />
              <FaGithub />
              <FaGooglePlusG />
              <FaWhatsapp />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Made with ♥ for:{" "}
          <a href="/"> Mindhub </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
