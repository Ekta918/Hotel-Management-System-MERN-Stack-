import React from "react";
import { Container } from "react-bootstrap";
import "./TermsAndConditions.css";

function TermsAndConditions() {
  return (
    <Container className="terms-container mt-5 mb-5">
      <h1 className="terms-title text-center mb-4">Terms & Conditions</h1>

      <p>
        By using our hotel booking platform, you agree to the following terms and conditions. Please read them carefully.
      </p>

      <h4>1. Booking & Payment</h4>
      <ul>
        <li>All bookings must be made using a valid payment method.</li>
        <li>Payments are processed securely through our payment gateway (Stripe).</li>
        <li>Bookings are confirmed only after successful payment.</li>
      </ul>

      <h4>2. Cancellations & Refunds</h4>
      <ul>
        <li>Free cancellation is available up to 48 hours before the check-in date.</li>
        <li>After that, cancellation charges may apply depending on room policy.</li>
        <li>Refunds, if applicable, will be processed within 5–7 business days.</li>
      </ul>

      <h4>3. User Responsibilities</h4>
      <ul>
        <li>You must provide accurate and current information when booking.</li>
        <li>Any misuse or false information may result in booking cancellation.</li>
        <li>Users are responsible for maintaining the confidentiality of their account.</li>
      </ul>

      <h4>4. Privacy</h4>
      <p>
        Your personal information is protected and used only for booking-related purposes. We do not share or sell your data.
      </p>

      <h4>5. Changes to Terms</h4>
      <p>
        We reserve the right to update these terms at any time. Continued use of our platform means you accept those changes.
      </p>

      <p className="text-muted mt-4">Last updated: April 12, 2025</p>
    </Container>
  );
}

export default TermsAndConditions;
