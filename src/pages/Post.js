import React, { Fragment, useEffect } from "react";
import DetailedPost from "../components/DetailedPost";
import { HiHome } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import RelatedPostCard from "../components/RelatedPostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../features/post/postSlice";
import { fetchRelatedPosts } from "../features/relatedPosts/relatedPostsSlice";
import Loading from "../components/Loading";
function Post() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading, isError, error } = useSelector(
    (state) => state.post
  );
  const {
    relatedPosts,
    isLoading: isLoadingRelatedPost,
    isError: isErrorRelatedPost,
    Error: ErrorRelatedPost,
  } = useSelector((state) => state.relatedPosts);
  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [postId, dispatch]);

  useEffect(() => {
    if (post?.tags) {
      dispatch(fetchRelatedPosts({ postId, tags: post.tags }));
    }
  }, [dispatch, post?.tags, postId]);

  //handle post ui.

  let detailedPostContent = null;

  if (isLoading) {
    detailedPostContent = <Loading />;
  }
  if (!isLoading && isError) {
    detailedPostContent = <div>{error}</div>;
  }
  if (!isLoading && !isError && !post?.id) {
    detailedPostContent = <div>No post found!</div>;
  }

  if (!isLoading && !isError && post?.id) {
    detailedPostContent = <DetailedPost post={post || {}} />;
  }

  //handle relatedPosts ui.

  let relatedPostsContent = null;

  if (isLoadingRelatedPost && !isLoading && !isError && post?.id) {
    relatedPostsContent = <Loading />;
  }

  if (
    !isLoadingRelatedPost &&
    isErrorRelatedPost &&
    !isLoading &&
    !isError &&
    post?.id
  ) {
    relatedPostsContent = <div>{ErrorRelatedPost}</div>;
  }
  if (
    !isLoadingRelatedPost &&
    !isErrorRelatedPost &&
    !relatedPosts?.length &&
    !isLoading &&
    !isError &&
    post?.id > 0
  ) {
    relatedPostsContent = <div>No post found!</div>;
  }
  if (
    !isLoadingRelatedPost &&
    !isErrorRelatedPost &&
    relatedPosts?.length > 0 &&
    !isLoading &&
    !isError &&
    post?.id
  ) {
    relatedPostsContent = relatedPosts.map((relatedPost) => (
      <RelatedPostCard key={relatedPost.id} relatedPost={relatedPost} />
    ));
  }

  return (
    <Fragment>
      <div className="container mt-8">
        <Link
          to={"/"}
          className="inline-block text-gray-600 home-btn"
          id="lws-goHome"
        >
          <HiHome className="inline scale-125 mr-1" />
          Go Home
        </Link>
      </div>
      <section className="post-page-container">
        {detailedPostContent}
        <aside>
          <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
            Related Posts
          </h4>
          <div className="space-y-4 related-post-container">
            {relatedPostsContent}
          </div>
        </aside>
      </section>
    </Fragment>
  );
}

export default Post;
