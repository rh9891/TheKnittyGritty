import { Helmet } from "react-helmet";

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

const Meta = ({
  title = "The Knitty Gritty – Yarn and Threads for the Inquisitive Crafter",
  description = "Shop whimsical yarns for creative inspiration.",
  keywords = "yarn, knitting, crochet, fibers, handmade, knitty gritty",
}: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
