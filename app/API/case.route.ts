import { baseUrl } from "./url";

const BASE_URL = `${baseUrl}/case`;

export async function fetchCaseList(category: string) {
  try {
    let resp = {};
    if (!category) {
      resp = await fetch(`${BASE_URL}`);
    } else {
      resp = await fetch(`${BASE_URL}/?category=${category}`);
    }
    if (!resp.ok) {
      throw new Error("Failed to fetch Cases");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

export async function createCase(data: any) {
  console.log("Data", data);
  try {
    const resp = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      throw new Error("Failed to create element");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateCase(id: string, data: any) {
  try {
    const resp = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
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

export async function fetchCase(id: string) {
  try {
    const resp = await fetch(`${BASE_URL}/?id=${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch element");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}
