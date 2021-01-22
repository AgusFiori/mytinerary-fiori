import React from "react";
import styled from "styled-components";
import { CallToAction } from "./CallToAction.jsx";
import Carrusel from "./Carousel.jsx";
import "../styles/carousel.css";

const SectionContainer = styled.section`
  header {
    height: 30rem;
    background-image: url("./images/homepage/arc-de-triomph.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .imgContainer {
    padding: 1px;
    backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    height: 100px;
  }
  .carouselTitle {
    display: flex;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .strikeLeft {
    border-top: 2px solid black;
    width: 50%;
    height: 1px;
    margin-left: 3rem;
  }
  .carouselTitle > h2 {
    display: flex;
    justify-content: center;
    width: 80%;
    text-align: center;
  }
  .strikeRight {
    border-top: 2px solid black;
    width: 50%;
    height: 1px;
    margin-right: 3rem;
  }
`;

export const Section = () => {
  return (
    <SectionContainer>
      <header>
        <div className="imgContainer">
          <img
            className="headerLogo"
            src="./images/homepage/MyTinerary-Logo-c.png"
            alt="logo"
          />
        </div>
      </header>
      <CallToAction />
      <div className="carouselTitle">
        <div className="strikeLeft"></div>
        <h2>Popular Mytineraries</h2>
        <div className="strikeRight"></div>
      </div>
      <Carrusel />
    </SectionContainer>
  );
};
