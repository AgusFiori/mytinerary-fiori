import React from "react";
import "../styles/cities.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const data = [
  {
    _id: 1,
    cityName: "Paris",
    cityPic:
      "https://transilien.com/sites/transilien/files/styles/manual_crop/public/2019-11/Arc%20de%20Triomphe.jpg?itok=SVq4PeII",
    descripcion: "Francia",
  },
  {
    _id: 2,
    cityName: "Singapur",
    cityPic:
      "https://www.ecestaticos.com/image/clipping/3b86fad7b3059474fad79627e897ea88/como-singapur-ha-conseguido-ser-uno-de-los-paises-mas-limpios-del-mundo.jpg",
    descripcion: "Singapur",
  },
  {
    _id: 3,
    cityName: "New York",
    cityPic:
      "https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg",
    descripcion: "USA",
  },
  {
    _id: 4,
    cityName: "Buenos Aires",
    cityPic:
      "https://digital.ihg.com/is/image/ihg/intercontinental-buenos-aires-5911903686-2x1",
    descripcion: "Argentina",
  },
];

const Cities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(data);
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
