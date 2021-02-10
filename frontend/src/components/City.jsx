import React, { useEffect } from "react";
import "../styles/city.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import Itinerary from "./Itinerary";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import citiesActions from "../redux/actions/citiesActions";

const City = (props) => {
  const id = props.match.params.id;
  const { country, cityPic, cityName, flagUrl, facts } = props.city;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await props.getItineraries(id);
    await props.getCity(id);
  }

  return (
    <div className="cityContainer">
      <div className="cityHeader">
        <div
          className="hero"
          style={{
            backgroundImage: `url(${cityPic})`,
          }}
        >
          <span>{cityName}</span>
        </div>
      </div>
      <div className="belowImage">
        <div className="infoContainer">
          <div className="country">
            <h3>Country:</h3>
            <span
              className="countryName"
              style={{
                backgroundImage: `url(${flagUrl})`,
              }}
            >
              {country}
            </span>
          </div>
          <div className="ffacts">
            <h3>Fun facts:</h3>
            <ul>
              {facts
                ? facts.map((element) => <li key={uuidv4()}>{element}</li>)
                : ""}
            </ul>
          </div>
        </div>
        <div className="itineraryContainer">
          {props.allItineraries.length ? (
            props.allItineraries.map((itinerary) => {
              return <Itinerary key={uuidv4()} itinerary={itinerary} />;
            })
          ) : (
            <div className="noItineraries">
              <div className="message">
                <h2>No itineraries yet - be the first to make one !</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="return">
        <Link to="/cities">
          <Button color="primary" size="lg" block className="backBtn">
            Looking for another city? Click Here!
          </Button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allItineraries: state.itineraryR.itineraries,
    cities: state.cityR.cities,
    city: state.cityR.city,
  };
};

const mapDispatchToProps = {
  getItineraries: itinerariesActions.getItineraries,
  getCity: citiesActions.getCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
