import { FC, useEffect, useState } from "react";

import "./Loader.css";

const Loader: FC = () => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 30);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className={`rollout ${animate ? "animate" : ""}`}>
        <img
          src="/images/yarn-loader.svg"
          className={`yarn ${animate ? "animate" : ""}`}
          alt="Yarn"
        />
      </div>
    </div>
  );
};

export default Loader;
