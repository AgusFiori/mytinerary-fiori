import React, { useEffect, useState } from "react";
import "../styles/city.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Itinerary } from "./Itinerary";
import { v4 as uuidv4 } from "uuid";

const City = (props) => {
  const [city, setCity] = useState({});
  const [itineraries, setItineraries] = useState([]);
  const id = props.match.params.id;

  useEffect(() => {
    fetch(`http://localhost:4000/city/${id}`)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (data.success === true) {
          setCity(data.respuesta);
        } else {
          alert("Something went wrong! 🙁");
          window.location.pathname = "/cities";
        }
      })
      .catch(() => {
        console.log("error al cargar");
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:4000/itineraries/${id}`)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (data.success === true) {
          setItineraries(data.respuesta);
        }
      })
      .catch(() => {
        console.log("error al cargar");
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
                ? city.facts.map((element) => <li key={uuidv4()}>{element}</li>)
                : ""}
            </ul>
          </div>
        </div>
        <div className="itineraryContainer">
          {itineraries.length ? (
            itineraries.map((itinerary) => {
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

export default City;
