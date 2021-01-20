import React, { useEffect, useState } from "react";
import "../styles/city.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const City = (props) => {
  const [city, setCity] = useState({});
  useEffect(() => {
    const id = parseInt(props.match.params.id);
    fetch(`http://localhost:4000/city/${id}`)
      .then((respuesta) => respuesta.json())
      .then((data) => setCity(data.respuesta));
  }, []);
  return (
    <div className="cityContainer">
      <div className="cityHeader">
        <div
          className="hero"
          style={{
            backgroundImage: `url(${city.cityPic})`,
          }}
        >
          <span>{city.cityName}</span>
        </div>
      </div>
      <div className="belowImage">
        <div className="infoContainer">
          <div className="country">
            <h3>Country:</h3>
            <span
              className="countryName"
              style={{
                backgroundImage: `url(${city.flagUrl})`,
              }}
            >
              {city.country}
            </span>
          </div>
          <div className="ffacts">
            <h3>Fun facts:</h3>
            <ul>
              {city.facts
                ? city.facts.map((element) => <li key={element}>{element}</li>)
                : ""}
            </ul>
          </div>
        </div>
        <div className="itineraryContainer">
          <div className="noItineraries">
            <div className="message">
              <h2>No itineraries yet - be the first to make one !</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="return">
        <Link to="/cities">
          <Button color="primary" size="lg" block className="backBtn">
            Looking for other cities? Click Here!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default City;
