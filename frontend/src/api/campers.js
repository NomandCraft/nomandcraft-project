import { api } from "./client";

// Normalizer - so that the layout does not fall if there are no fields
const normalize = (c = {}) => ({
  _id: c._id ?? c.id,
  name: c.name ?? "Unnamed camper",
  description: c.description ?? "",
  images: Array.isArray(c.images) ? c.images : c.image ? [c.image] : [],
  formattedPrice:
    c.formattedPrice ?? (typeof c.price === "number" ? `${c.price} €` : null),
});

export async function listCampers(params = {}) {
  const { data } = await api.get("/api/campers", { params });
  const arr = Array.isArray(data)
    ? data
    : Array.isArray(data?.campers)
      ? data.campers
      : [];
  return arr.map(normalize);
}

export async function getCamper(id) {
  const { data } = await api.get(`/api/campers/${id}`);
  return normalize(data);
}

export async function createCamper(payload) {
  const { data } = await api.post("/api/campers", payload);
  return normalize(data);
}

export async function updateCamper(id, payload) {
  const { data } = await api.patch(`/api/campers/${id}`, payload);
  return normalize(data);
}

export async function deleteCamper(id) {
  const { data } = await api.delete(`/api/campers/${id}`);
  return data;
}
