import React, { useRef, useState } from "react";
import Card from "./Card";
import classes from "./CardSlider.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default React.memo(function CardSlider(props) {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div
      className={classes.flexc}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{props.title}</h1>
      <div className={classes.wrapper}>
        <div
          className={`${classes.sliderD} ${classes.left} ${
            !showControls ? "classes.none" : ""
          }`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>

        <div className={classes.slider} ref={listRef}>
          {props.data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={` ${classes.sliderD} ${classes.right} ${
            !showControls ? classes.none : ""
          }`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </div>
  );
});
