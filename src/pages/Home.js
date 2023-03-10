import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { filter, sort } from "../features/filter/filterSlice";
import { fetchPosts } from "../features/posts/postsSlice";

function Home() {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, error } = useSelector(
    (state) => state.posts
  );

  const { filterBy, sortBy } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSortChange = (event) => {
    dispatch(sort(event.target.value));
  };

  const handleFilterChange = (event) => {
    dispatch(filter(event.target.value));
  };

  //handle posts showing.
  
  let postsContent = null;

  if (isLoading) {
    postsContent = <Loading />;
  }
  if (!isLoading && isError) {
    postsContent = <div>{error}</div>;
  }
  if (!isLoading && !isError && !posts.length > 0) {
    postsContent = <div>No post found!</div>;
  }

  if (!isLoading && !isError && posts.length > 0) {
    postsContent = [...posts]
      .filter((post) => (filterBy === "saved" ? post.isSaved : true))
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "mostLiked":
            return b.likes - a.likes;
          default:
            return 0;
        }
      })
      .map((post) => <PostCard key={post.id} post={post} />);
  }

  return (
    <section className="wrapper">
      <aside>
        <div className="sidebar-items">
          <div className="sidebar-content">
            <h4>Sort</h4>
            <select
              name="sort"
              id="lws-sort"
              className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
              onChange={handleSortChange}
              value={sortBy}
            >
              <option value="default">Default</option>
              <option value="newest">Newest</option>
              <option value="mostLiked">Most Liked</option>
            </select>
          </div>
          <div className="sidebar-content">
            <h4>Filter</h4>
            <div className="radio-group">
              <div>
                <input
                  defaultChecked={filterBy === "all"}
                  type="radio"
                  name="filter"
                  id="lws-all"
                  className="radio"
                  value="all"
                  onChange={handleFilterChange}
                />
                <label htmlFor="lws-all">All</label>
              </div>
              <div>
                <input
                  value="saved"
                  type="radio"
                  name="filter"
                  id="lws-saved"
                  className="radio"
                  onChange={handleFilterChange}
                  checked={filterBy === "saved"}
                />
                <label htmlFor="lws-saved">Saved</label>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="post-container" id="lws-postContainer">
        {postsContent}
      </main>
    </section>
  );
}

export default Home;
