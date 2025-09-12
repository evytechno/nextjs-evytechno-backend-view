import { baseUrl } from "./url";
const BASE_URL = `${baseUrl}/services`;

export async function fetchServiceList() {
  try {
    const resp = await fetch(`${BASE_URL}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch Services");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

export async function fetchService(id: string) {
  try {
    const resp = await fetch(`${BASE_URL}/?id=${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch Service");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

export async function createService(data: string) {
  try {
    const resp = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      throw new Error("Failed to create Service");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
// to update a blog
export async function updateService(id: string, data: string) {
  try {
    const resp = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      throw new Error("Failed to update service");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
