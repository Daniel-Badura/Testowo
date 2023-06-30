import React from "react";
// import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  return (
    <>
      <div className="rating">
        <span>
          <i
            style={{ color }}
            className={
              value >= 0.9
                ? "fas fa-star"
                : value >= 0.5 && value <= 0.9
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 1.9
                ? "fas fa-star"
                : value >= 1.5 && value <= 1.9
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 2.9
                ? "fas fa-star"
                : value >= 2.5 && value <= 2.9
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 3.9
                ? "fas fa-star"
                : value >= 3.5 && value <= 3.9
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 4.9
                ? "fas fa-star"
                : value >= 4.5 && value <= 4.9
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span> {text ? text : ""} </span>
      </div>
    </>
  );
};
Rating.defaultProps = {
  color: "gold",
};

export default Rating;
