import { useState } from "react";

function Star({ filled, starIcon }: { filled: boolean; starIcon: string }) {
  return (
    <div className={`${filled ? "" : "opacity-30 border-dotted"}`}>
      {starIcon}
    </div>
  );
}

type StarRatingProps = {
  numOfStars: number;
  value: number;
  setValue: (value: number) => void;
  starIcon?: string;
};

export default function StarRating({
  numOfStars,
  value,
  setValue,
  starIcon = "⭐️",
}: StarRatingProps) {
  const [numStarsHovered, setNumStarsHovered] = useState(0);

  const handleClickStar = (index: number) => {
    const newNumOfStars = index + 1;
    setValue(newNumOfStars);
  };

  const handleHoverStar = (index: number) => {
    const newNumOfStars = index + 1;
    setNumStarsHovered(newNumOfStars);
  };

  const handleHoverOffStar = () => {
    setNumStarsHovered(0);
  };

  return (
    <div className="flex gap-1">
      {[...Array(numOfStars)].map((_, index) => {
        const starsFilledToDisplay = numStarsHovered || value;
        const isFilled = index < starsFilledToDisplay;
        return (
          <button
            key={index}
            className="starButton"
            onClick={() => handleClickStar(index)}
            onMouseEnter={() => handleHoverStar(index)}
            onMouseLeave={handleHoverOffStar}
          >
            <Star filled={isFilled} starIcon={starIcon} />
          </button>
        );
      })}
    </div>
  );
}
