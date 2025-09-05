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
