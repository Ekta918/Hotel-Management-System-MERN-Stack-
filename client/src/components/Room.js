// src/components/Room.js
import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4 mt-2">
        <img
          src={room.imageurls[0]} // Display the first image
          className="smallimg"
          alt={room.name} // Alt text should be room name for accessibility
        />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count : {room.maxcount}</p>
          <p>Phone Number : {room.phonenumber}</p>
          <p>Type : {room.type}</p>
          <p>Amount : ₹{room.rentperday}</p>
        </b>
        <div style={{ float: "right" }}>
          {(fromdate && todate) && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <button className="btn btn-primary m-2">Book Now</button>
          </Link>
          )}
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url} // Use the url here
                  alt={`Slide ${index + 1}`} // Provide a unique alt description
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
