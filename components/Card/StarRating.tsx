import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span
        key={i}
        className={`text-sm ${
          i <= rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default StarRating;