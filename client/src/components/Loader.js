import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  const [loading] = useState(true);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div style={{marginTop:'200px'}}>
    <div className="sweet-loading">
      <HashLoader
        color="#000"
        loading={loading}
        cssOverride={override} // Now correctly defined
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  );
}

export default Loader;
