import { baseUrl } from "./url";

const BASE_URL = `${baseUrl}/element`;

export async function fetchElementList(service: string) {
  try {
    let resp = {};
    if (!service) {
      resp = await fetch(`${BASE_URL}`);
    } else {
      resp = await fetch(`${BASE_URL}/?service=${service}`);
    }
    if (!resp.ok) {
      throw new Error("Failed to fetch Elements");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

export async function createElement(data: string) {
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

export async function updateElement(id: string, data: string) {
  try {
    const resp = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      throw new Error("Failed to create Element");
    } else {
      return resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchElement(id: string) {
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
