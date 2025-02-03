import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating: React.FC<{
  rating: number;
  onRatingChange: (value: number) => void; 
}> = ({ rating, onRatingChange }) => {
  const handleClick = (value: number) => {
    onRatingChange(value); 
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          color={star <= rating ? "#ffc107" : "#e4e5e9"}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(star)} // Attach click handler
        />
      ))}
    </div>
  );
};

export default StarRating;
