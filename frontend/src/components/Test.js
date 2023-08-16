import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { t } from "i18next";

const Test = ({ test }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const hover = isHovered ? "p-2" : "p-3";
  return (
    <>
      <Card
        className={`rounded highlight my-3 ${hover}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <Link className="link" to={`/tests/${test._id}`}>
          <Card.Img className="rounded" src={test.image} variant="top" />
        </Link>
        <Card.Body>
          <Link className="link" to={`/tests/${test._id}`}>
            <Card.Title className="text-center card-title" as="div">
              <strong className="fw-bold">{test.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="h4">
            {t("questions")}
            {" : "}
            {test.questions.length}
          </Card.Text>

          <Card.Text as="div">
            <Rating value={test.rating} text={`${test.numReviews}`}></Rating>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Test;
