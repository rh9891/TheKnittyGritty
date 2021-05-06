import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="description" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "The Knitty Gritty",
  description:
    "Selling fine yarn and purls of wisdom for your next knitting or crochet project.",
  keywords: "yarn, crochet, knitting, knit, wool, needle, weave, pattern",
};

export default Meta;
