import axios from "../../utils/axios";

export async function updateSaved(postId) {
  const { data } = await axios.get(`blogs/${postId}`);
  const currentSavedStatus = data.isSaved;
  const { data: dataAfterUpdate } = await axios.patch(`/blogs/${postId}`, {
    isSaved: !currentSavedStatus,
  });
  return dataAfterUpdate.isSaved;
}
