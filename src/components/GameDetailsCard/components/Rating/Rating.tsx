import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as StarIcon } from "assets/icons/star.svg";
import "./styles.css";
import "../../styles.css";

type RatingProps = {
  value: number;
};

const ratingScale = [1, 2, 3, 4, 5];

const Rating: FC<RatingProps> = ({ value }) => (
  <div className="PageCard__Component">
    <div>
      <div className="Rating__Label">Rating</div>
      <div>
        {ratingScale.map((ratingIndex, index) => {
          const className = clsx({
            RatingStar: true,
            "RatingStar--active": ratingIndex <= value,
          });

          return <StarIcon className={className} key={index} />;
        })}
      </div>
    </div>
  </div>
);

export default Rating;
