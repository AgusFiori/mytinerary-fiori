import React from "react";
// import Loader from "react-loader-spinner";
import "../styles/loader.css";

export const Loading = () => {
  return (
    <div className="loaderContainer">
      <h1>Loading...</h1>
      {/* <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={1500} //1.5 secs
      /> */}
    </div>
  );
};
