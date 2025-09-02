import { baseUrl } from "./url";

const BASE_URL = `${baseUrl}/blog`;

export async function fetchBlogList() {
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

export async function createBlog(data: FormData) {
  try {
    const resp = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: data,
    });

    if (!resp.ok) {
      throw new Error("Failed to create blog");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
