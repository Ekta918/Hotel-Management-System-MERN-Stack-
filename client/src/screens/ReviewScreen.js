import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rate, Input, Button, message, Card, Typography, Divider } from "antd";

const { Title, Text, Paragraph } = Typography;

function ReviewScreen() {
  const { roomid } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`/api/reviews/${roomid}`);
        setReviews(data);
      } catch (err) {
        message.error("Failed to load reviews");
      }
    };
    fetchReviews();
  }, [roomid]);

  const submitReview = async () => {
    console.log("Submitting review...");
  
    if (!currentUser) {
      message.error("Login required to submit review");
      return;
    }
  
    try {
      await axios.post("/api/reviews/add", {
        roomId: roomid,
        userId: currentUser._id,
        rating,
        comment,
      });
  
      setRating(0);
      setComment("");
      message.success("Review submitted");
  
      setTimeout(async () => {
        const { data } = await axios.get(`/api/reviews/${roomid}`);
        setReviews(data);
      }, 500);
    } catch (err) {
      console.error("Review submission error:", err.response?.data || err.message);
      message.error("Failed to submit review");
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Title level={2}>Room Reviews</Title>

      {reviews.length === 0 ? (
        <Text type="secondary">No reviews yet for this room.</Text>
      ) : (
        reviews.map((review, i) => (
          <Card key={i} className="mb-4 shadow rounded-xl">
            <div className="flex justify-between items-center">
              <Text strong>{review.userId.name}</Text>
              <Rate disabled defaultValue={review.rating} />
            </div>
            <Paragraph className="mt-2">{review.comment}</Paragraph>
          </Card>
        ))
      )}

      <Divider className="my-6" />

      <Card className="shadow-md rounded-xl p-4 bg-white">
        <Title level={4}>Leave a Review</Title>
        <Rate value={rating} onChange={setRating} className="mb-2" />
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts about the room..."
        />
        <Button
          type="primary"
          onClick={submitReview}
          className="mt-3 w-full"
          disabled={rating === 0 || comment.trim() === ""}
        >
          Submit Review
        </Button>
      </Card>
    </div>
  );
}

export default ReviewScreen;
