import axios from "../../utils/axios";

export async function getPosts() {
  const response = await axios.get("http://localhost:9000/blogs");
  return response.data;
}
