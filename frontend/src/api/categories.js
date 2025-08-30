import { api } from "./client";

export async function listCategories(params = {}) {
  const { data } = await api.get("/api/categories", { params });
  return Array.isArray(data) ? data : [];
}

export async function getCategory(id) {
  const { data } = await api.get(`/api/categories/${id}`);
  return data;
}

export async function createCategory(payload) {
  const { data } = await api.post("/api/categories", payload);
  return data;
}

export async function updateCategory(id, payload) {
  const { data } = await api.patch(`/api/categories/${id}`, payload);
  return data;
}

export async function deleteCategory(id) {
  const { data } = await api.delete(`/api/categories/${id}`);
  return data;
}
