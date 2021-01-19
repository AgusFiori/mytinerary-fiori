import React, { useEffect, useState } from "react";
import "../styles/city.css";

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

const City = (props) => {
  const [city, setCity] = useState({});
  useEffect(() => {
    const id = parseInt(props.match.params.city);
    data.map((element) => {
      if (id === element._id) {
        setCity(element);
      }
    });
  });
  return (
    <div className="cityContainer">
      <h1>{city.cityName}</h1>
      <div className="cityImgContainer">
        <img src={city.cityPic} alt="city" />
      </div>
      <div className="itineraryContainer">
        <div className="noItineraries">
          <div className="message"></div>
        </div>
      </div>
    </div>
  );
};

export default City;
