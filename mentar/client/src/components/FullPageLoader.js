import React from "react";
import LoaderGif from "../assets/loader.gif";
function FullPageLoader({ loading }) {
  if (!loading) return null;

  return (
    <div className="loader-container">
      <div className="loader">
        <img src={LoaderGif} alt="loader image" />
      </div>
    </div>
  );
}

export default FullPageLoader;
