import React from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Call = styled.div`
  background-color: #c9f2e3;
  margin: 3rem 20vw;
  border-radius: 18px;
  height: 20rem;
  font-family: "Roboto", sans-serif;

  .searchContainer {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    z-index: 2;
  }

  .searchBar {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: 75%;
  }

  input {
    box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.5);
    width: 100%;
    border-radius: 5px;
    border: none;
    font-size: 24px;
    padding: 0.5rem 1rem;
    outline: none;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  span {
    font-size: 28px;
    margin-bottom: 0.8rem;
    margin-left: 0.5rem;
    font-weight: 900;
  }

  img {
    position: absolute;
    height: 17rem !important;
    right: 0;
    bottom: 0;
  }
  .inputCity {
    display: flex;
  }
  .searchIcon {
    background-color: white;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.5);
  }
`;

export const CallToAction = () => {
  return (
    <Call>
      <div className="searchContainer">
        <div className="searchBar">
          <span>Make the most out of your day</span>
          <div className="inputCity">
            <Link to="/cities">
              <Button color="primary" className="shadow" size="lg" block>
                Browse itineraries
              </Button>
            </Link>
          </div>
        </div>

        <img
          className="monigotes"
          src="https://static.tacdn.com/img2/brand/feed/home_hero_got_illustration.svg"
          alt=""
        />
      </div>
    </Call>
  );
};
