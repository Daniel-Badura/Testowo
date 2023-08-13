import React from "react";
import Helmet from "react-helmet";

const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Testwowo",
  description: "Test your skills",
  keywords: "test exams questions answers",
};

export default Meta;
