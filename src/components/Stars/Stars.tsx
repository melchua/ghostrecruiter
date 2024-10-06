import { useState } from "react";

function Star({ filled, starIcon }: { filled: boolean; starIcon: string }) {
  return (
    <div className={`${filled ? "" : "opacity-30 border-dotted"}`}>
      {starIcon}
    </div>
  );
}

export default function StarRating({
  numOfStars,
  value,
  setValue,
  starIcon = "⭐️",
}) {
  const [numStarsHovered, setNumStarsHovered] = useState(0);

  const handleClickStar = (index) => {
    const newNumOfStars = index + 1;
    setValue(newNumOfStars);
  };

  const handleHoverStar = (index) => {
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
