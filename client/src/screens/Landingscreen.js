import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Landingscreen() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h2 className="landing-title">HappyStay</h2>
        <h1 className="landing-subtitle">"There is only one boss. The Guest."</h1>
        <Link to="/home">
          <Button type="primary" size="large" className="landing-btn">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
