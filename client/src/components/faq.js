// Faq.js
import React from "react";
import { Accordion, Container } from "react-bootstrap";
import "./Faq.css";

function Faq() {
  return (
    <Container className="faq-container mt-5 mb-5">
      <h1 className="faq-title text-center mb-4">Frequently Asked Questions</h1>
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How do I book a room?</Accordion.Header>
          <Accordion.Body>
            Simply select your dates, browse available rooms, and click "Book Now". You'll be guided through the rest!
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Can I cancel or modify my booking?</Accordion.Header>
          <Accordion.Body>
            Yes! Visit the "My Bookings" section to cancel or edit your booking. Policies vary by room.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Is payment secure?</Accordion.Header>
          <Accordion.Body>
            Absolutely! We use Stripe for secure and encrypted online payments.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Do I need to create an account?</Accordion.Header>
          <Accordion.Body>
            Yes, creating an account helps manage bookings and receive updates more easily.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>What if I face issues while booking?</Accordion.Header>
          <Accordion.Body>
            Contact our support team via the "Contact Us" page — we’re here to help!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default Faq;
