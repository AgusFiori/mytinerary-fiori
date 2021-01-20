import React from "react";
import "../styles/cities.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
// import axios from 'axios';

const Cities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/cities")
      .then((respuesta) => respuesta.json())
      .then((data) => setCities(data.respuesta));
  }, []);

  return (
    <div className="cities">
      <h1>Cities</h1>
      <h2 className="filter">
        <input type="text" placeholder="Search cities..." />
      </h2>
      <div className="citiesContainer">
        {cities.map(({ cityName, cityPic, _id }) => {
          return (
            <Link to={`/city/${_id}`} key={uuidv4()}>
              <div className="card">
                <div
                  className="cityImage"
                  style={{
                    backgroundImage: `url(${cityPic})`,
                  }}
                >
                  <div className="cityName">{cityName}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Cities;
