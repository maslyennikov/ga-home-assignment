import React, { FC } from "react";
import "./styles.css";
import "../../styles.css";

type TagsProps = {
  tags: string[];
};

const Tags: FC<TagsProps> = ({ tags }) => (
  <div className="PageCard__Component">
    <div className="Tags__Aligner">
      <div className="Tags__Label">Tags</div>
      <div className={"Tags__Container"}>
        {tags.slice(0, 3).map((tag) => (
          <div className="Tags__Tag" key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Tags;
