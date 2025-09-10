import { baseUrl } from "./url";

// to fetch all the blogs
const BASE_URL = `${baseUrl}/blog`;
export async function fetchBlogList() {
  console.log("baseUrl", baseUrl);

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

export async function fetchBlog(id: string) {
  try {
    const resp = await fetch(`${BASE_URL}/?id=${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch Blog");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

// to create a new blog
export async function createBlog(data: any) {
  try {
    const resp = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
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
// to update a blog
export async function updateBlog(id: string, data: any) {
  try {
    const resp = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      throw new Error("Failed to update blog");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
