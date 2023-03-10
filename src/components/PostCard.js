import React from "react";
import SavedTag from "./SavedTag";
import { Link } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
function PostCard({
  post: { id, title, description, image, likes, isSaved, createdAt, tags },
}) {
  return (
    <div className="lws-card">
      <Link to={`/post/${id}`}>
        <img src={image} className="lws-card-image" alt="" />
      </Link>
      <div className="p-4">
        <div className="lws-card-header">
          <p className="lws-publishedDate">{createdAt}</p>
          <p className="lws-likeCount">
            <FaRegThumbsUp className="inline" />
            {likes}
          </p>
        </div>
        <Link to={`/post/${id}`} className="lws-postTitle">
          {title}
        </Link>
        <div className="lws-tags">
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        {/* <!-- Show this element if post is saved --> */}
        {isSaved ? <SavedTag /> : null}
        {/* <!-- Show this element if post is saved Ends --> */}
      </div>
    </div>
  );
}

export default PostCard;
