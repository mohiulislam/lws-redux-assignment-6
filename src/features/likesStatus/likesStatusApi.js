import axios from "../../utils/axios";

export async function updateLikes(postId) {
  const { data } = await axios.get(`blogs/${postId}`);
  const currentLikes = data.likes;

  const { data: dataAfterUpdate } = await axios.patch(`/blogs/${postId}`, {
    likes: currentLikes + 1,
  });
  
  return dataAfterUpdate.likes;
}
