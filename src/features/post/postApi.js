import axios from "../../utils/axios";

export async function getPost(id) {
  const response = await axios.get(`/blogs/${id}`);
  return response.data;
}
