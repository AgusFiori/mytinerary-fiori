import React, { useEffect, useState } from "react";
import "../styles/city.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Itinerary } from "./Itinerary";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";

const City = (props) => {
  const [ciudad, setCiudad] = useState({});
  const id = props.match.params.id;

  useEffect(() => {
    const ciudad = props.ciudad.filter((ciudad) => {
      return ciudad._id === id;
    });
    setCiudad(ciudad[0]);
    props.getItineraries(id);
  }, [id]);

  console.log(props.ciudad);

  return (
    <div className="cityContainer">
      <div className="cityHeader">
        <div
          className="hero"
          style={{
            backgroundImage: `url(${ciudad.cityPic})`,
          }}
        >
          <span>{ciudad.cityName}</span>
        </div>
      </div>
      <div className="belowImage">
        <div className="infoContainer">
          <div className="country">
            <h3>Country:</h3>
            <span
              className="countryName"
              style={{
                backgroundImage: `url(${ciudad.flagUrl})`,
              }}
            >
              {ciudad.country}
            </span>
          </div>
          <div className="ffacts">
            <h3>Fun facts:</h3>
            <ul>
              {ciudad.facts
                ? ciudad.facts.map((element) => (
                    <li key={uuidv4()}>{element}</li>
                  ))
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
    ciudad: state.cityR.cities,
  };
};

const mapDispatchToProps = {
  getItineraries: itinerariesActions.getItineraries,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
