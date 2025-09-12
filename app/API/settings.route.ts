import { baseUrl } from "./url";

const BASE_URL = `${baseUrl}/settings`;

export async function fetchSettings() {
  try {
    const resp = await fetch(`${BASE_URL}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch Settings");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

export async function updateSettings(id: string, data: string) {
  try {
    const resp = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      throw new Error("Failed to update Settings");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
