import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-us-container container mt-5 mb-5">
      <h1 className="contact-us-title text-center">Contact Us</h1>
      <p className="contact-us-subtitle text-center">
        We'd love to hear from you!
      </p>

      <div className="row mt-4">
        <div className="col-md-6">
          <form className="contact-form">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="you@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="5" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className="contact-info">
            <h5>Reach Us</h5>
            <p><strong>Email:</strong> support@hotelbooking.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 123, Hotel Street, Mumbai, India</p>
            <p><strong>Working Hours:</strong> 9:00 AM – 8:00 PM (Mon – Sat)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
