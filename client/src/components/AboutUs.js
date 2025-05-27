import React from "react";
import "./AboutUs.css"; // Make sure this CSS file is imported

function AboutUs() {
  return (
    <div className="about-us-container container mt-5 mb-5">
      <h1 className="about-us-title text-center">About Us</h1>
      <p className="about-us-subtitle text-center">
        Where comfort meets convenience.
      </p>

      <div className="about-us-content row mt-4">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Hotel"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <p>
              Welcome to <strong>HappyStay</strong>, your trusted platform
              for discovering and booking premium stays across India. Our
              mission is to simplify your travel experience by offering
              top-quality rooms, seamless bookings, and unbeatable deals.
            </p>
            <p>
              Whether you're planning a weekend getaway or a long vacation, we
              ensure you find the perfect room that fits your style and budget.
            </p>
            <p>
              Backed by passionate developers and supported by modern
              technology, we are committed to delivering an effortless and
              secure booking process from start to finish.
            </p>
            <p className="mt-4">
              <strong>Enjoy your stay with us!</strong> 🛏️✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
