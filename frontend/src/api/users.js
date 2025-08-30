import { api } from "./client";

export async function listUsers(params = {}) {
  const { data } = await api.get("/api/users", { params });
  return Array.isArray(data) ? data : [];
}

export async function registerUser(payload) {
  const { data } = await api.post("/api/users", payload);
  return data;
}
