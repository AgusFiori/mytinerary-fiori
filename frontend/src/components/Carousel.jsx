import React from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import Slides from "./Slides.jsx";
import "../styles/carousel.css";

const items = [
  {
    src: ["Singapore", "Bangkok", "Ha-Long-Bay", "Kuala-Lumpur"],
  },
  {
    src: ["Buenos-Aires", "Rome", "London", "New-York"],
  },
  {
    src: ["Paris", "Moscow", "Tokyo", "Dubai"],
  },
];

const Carrusel = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="slider">
          <Slides data={item} />
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Carrusel;
