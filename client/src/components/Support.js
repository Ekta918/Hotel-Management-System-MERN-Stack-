import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Support.css";

function Support() {
  return (
    <Container className="support-container mt-5 mb-5">
      <h1 className="support-title text-center mb-4">Support Center</h1>
      <p className="text-center text-muted mb-5">
        Need help? We're here for you 24/7. Browse the options below or reach out directly.
      </p>

      <Row className="g-4">
        <Col md={4}>
          <Card className="support-card h-100">
            <Card.Body>
              <Card.Title>📩 Email Support</Card.Title>
              <Card.Text>
                Send us an email and our team will respond within 24 hours.
              </Card.Text>
              <p className="text-primary fw-bold">support@hotelbooking.com</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="support-card h-100">
            <Card.Body>
              <Card.Title>📞 Call Us</Card.Title>
              <Card.Text>
                Speak directly with a customer support representative.
              </Card.Text>
              <p className="text-primary fw-bold">+91 98765 43210</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="support-card h-100">
            <Card.Body>
              <Card.Title>💬 Live Chat</Card.Title>
              <Card.Text>
                Chat with us instantly from 9 AM to 11 PM IST every day.
              </Card.Text>
              <p className="text-muted">Chat option coming soon!</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="faq-redirect text-center mt-5">
        <p className="mb-1">Have general questions?</p>
        <a href="/faq" className="btn btn-outline-primary">Visit our FAQ</a>
      </div>
    </Container>
  );
}

export default Support;
