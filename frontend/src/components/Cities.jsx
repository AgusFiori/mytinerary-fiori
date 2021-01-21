import React from "react";
import "../styles/cities.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
// import axios from 'axios';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/cities")
      .then((respuesta) => respuesta.json())
      .then((data) => setCities(data.respuesta));
  }, []);

  useEffect(() => {
    if (document.getElementById("filter").value === "") {
      setFilteredCities(
        cities.sort((a, b) =>
          a.cityName > b.cityName ? 1 : b.cityName > a.cityName ? -1 : 0
        )
      );
    }
  }, [cities]);

  function filter(e) {
    let input = e.target.value.trim();
    const filtered = cities.filter(
      (cities) =>
        cities.cityName.toLowerCase().indexOf(input.toLowerCase()) === 0
    );
    setFilteredCities(filtered);
  }

  // console.log(filteredCities);

  if (filteredCities.length > 0) {
    return (
      <div className="cities">
        <h1>Cities</h1>
        <h2 className="filter">
          <input
            type="text"
            placeholder="Search cities..."
            name="filter"
            id="filter"
            onChange={filter}
            autoComplete="off"
          />
        </h2>
        <div className="citiesContainer">
          {filteredCities.map(({ cityName, cityPic, _id }) => {
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
  } else {
    return (
      <div className="cities">
        <h1>Cities</h1>
        <h2 className="filter">
          <input
            type="text"
            placeholder="Search cities..."
            name="filter"
            id="filter"
            onChange={filter}
            autoComplete="off"
          />
        </h2>
        <div className="noCities">
          <div className="noCitiesMsg">
            <h5>
              Looks like there are no itineraries for the city you're looking
              for...
            </h5>
            <h6>Try another one !</h6>
          </div>
        </div>
      </div>
    );
  }
};

export default Cities;
