const BASE_URL = `http://localhost:5000/api/`;

export async function fetchBlogList() {
  console.log(BASE_URL);
  try {
    const resp = await fetch(`${BASE_URL}blog`, {
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
