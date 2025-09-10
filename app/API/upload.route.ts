import { baseUrl } from "./url";

const BASE_URL = `${baseUrl}/upload`;

export async function uploadFile(data: FormData) {
  try {
    const resp = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: data,
    });

    if (!resp.ok) {
      throw new Error("Failed to Upload File");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
