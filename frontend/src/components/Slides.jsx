import React from "react";

class Slides extends React.Component {
  render() {
    return this.props.data.src.map((city) => {
      const citySlide = `./images/${city}.jpg`;
      return (
        <>
          <div
            className="slideImg"
            style={{ backgroundImage: `url(${citySlide})` }}
          >
            <p key={city} className="tituloSlide">
              {city.replace(/-/g, " ")}
            </p>
          </div>
        </>
      );
    });
  }
}

export default Slides;
