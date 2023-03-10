import React from "react";
import { Link } from "react-router-dom";
function RelatedPostCard({ relatedPost: { id, title, createdAt, tags ,image} }) {
  return (
    <div className="card">
      <Link to={`/post/${id}`}>
        <img
          src={image}
          className="card-image"
          alt=""
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/post/${id}`}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {title}
        </Link>
        <div className="mb-0 tags">
          {tags?.map((tag, index) => (
            <span className="mr-2" key={index}>
              {tag}
            </span>
          ))}
        </div>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}

export default RelatedPostCard;
