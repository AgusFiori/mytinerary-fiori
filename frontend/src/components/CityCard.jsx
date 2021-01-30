import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const CityCard = (cityCard) => {
  const { cityName, cityPic, _id } = cityCard.cityCard;
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
};
