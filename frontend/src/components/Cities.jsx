import React from "react";
import { useState, useEffect } from "react";

const Cities = () => {
  const [ciudades, setCiudades] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api")
      .then((response) => response.json())
      .then((data) => {
        setCiudades(data.ciudades);
        console.log(data);
      });
  }, []);
  return (
    <div className="cities">
      <h1>Componente Cities</h1>
    </div>
  );
};

export default Cities;
