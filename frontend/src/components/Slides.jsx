import React from "react";
import { v4 as uuidv4 } from "uuid";

class Slides extends React.Component {
  render() {
    return this.props.data.src.map((city) => {
      const citySlide = `./images/${city}.jpg`;
      return (
        <div key={uuidv4()}>
          <div
            className="slideImg"
            style={{ backgroundImage: `url(${citySlide})` }}
          >
            <p className="tituloSlide">{city.replace(/-/g, " ")}</p>
          </div>
        </div>
      );
    });
  }
}

export default Slides;
