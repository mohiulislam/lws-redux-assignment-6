import axios from "../../utils/axios";

export const getRelatedPosts = async ({ tags, postId }) => {
  let queryString =
    tags.map((tag) => `tags_like=${tag}`).join("&") + `&id_ne=${postId}`;
  const response = await axios(`/blogs?${queryString}`);
  return response.data;
};
