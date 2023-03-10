import React from "react";
import { BsBookmark } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikes } from "../features/likesStatus/likesStatusSlice";
import { fetchSaved } from "../features/savedStatus/savedStatusSlice";

function DetailedPost({
  post: { id, title, description, image, createdAt, tags },
}) {
  const { likes } = useSelector((state) => state.likes);
  const { isSaved } = useSelector((state) => state.saved);
  const dispatch = useDispatch();
  function handleLikes() {
    dispatch(fetchLikes(id));
  }
  function handleSaved() {
    dispatch(fetchSaved(id));
  }

  return (
    <main className="post">
      <img
        src={image}
        alt="github"
        className="w-full rounded-md"
        id="lws-megaThumb"
      />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>
        <div className="tags" id="lws-singleTags">
          {tags?.map((tag, index) => (
            <span className="mr-2" key={index}>
              {tag}
            </span>
          ))}
        </div>
        <p className="lws-publishedDate">{createdAt}</p>
        <div className="btn-group">
          <button
            onClick={handleLikes}
            className="like-btn"
            id="lws-singleLinks"
          >
            <FaRegThumbsUp className="inline" />
            {likes}
          </button>
          <button
            onClick={handleSaved}
            className={` ${isSaved ? "active" : "null"} save-btn`}
            id="lws-singleSavedBtn"
          >
            <BsBookmark className="inline" /> {isSaved ? "Saved" : "Save"}
          </button>
        </div>
        <div className="mt-6">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}

export default DetailedPost;
