import { baseUrl } from "./url";

const BASE_URL = `${baseUrl}/pages`;

export async function fetchPageList() {
  try {
    const resp = await fetch(`${BASE_URL}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch Pages");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

export async function fetchPage(id: string) {
  try {
    const resp = await fetch(`${BASE_URL}/?id=${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch Page");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

// to create a new blog
export async function createPage(data: string) {
  try {
    const resp = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      throw new Error("Failed to create page");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
// to update a blog
export async function updatePage(id: string, data: string) {
  try {
    const resp = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      throw new Error("Failed to update page");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
