import React from "react";
import Loader from "react-loader-spinner";
import "../styles/loader.css";

export const Loading = () => {
  return (
    <div className="loaderContainer">
      {/* <h1>Loading...</h1> */}
      <Loader type="TailSpin" color="#ffa600" height={80} width={80} />
    </div>
  );
};
