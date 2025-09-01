import { baseUrl } from "./url";

const BASE_URL = `${baseUrl}/blog`;

export async function fetchBlogList() {
  console.log(BASE_URL);
  try {
    const resp = await fetch(`${BASE_URL}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch Blogs");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}
