import axios from "axios";

const api = axios.create({
  // In DEV you can leave empty: /API /* will go through Vite Proxy to Backend.
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: { "Content-Type": "application/json" },
});

// Universal normalizers (to ensure 1:1 render stability)
const normalizeCamper = (c = {}) => ({
  _id: c._id ?? c.id ?? String(Math.random()),
  name: c.name ?? "Unnamed camper",
  description: c.description ?? "",
  images: Array.isArray(c.images) ? c.images : c.image ? [c.image] : [],
  formattedPrice:
    c.formattedPrice ?? c.priceFormatted ?? (c.price ? `${c.price} €` : null),
});

export async function getCampers(params = {}) {
  const { data } = await api.get("/api/campers", { params });
  // Backend can return an array or {Campers: [...], ...}
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.campers)
      ? data.campers
      : [];
  return list.map(normalizeCamper);
}

export async function getCamperById(id) {
  // /API/CAMPERS/: ID - use:
  try {
    const { data } = await api.get(`/api/campers/${id}`);
    return normalizeCamper(data);
  } catch {
    // Fallback: We take the list and look
    const all = await getCampers();
    return all.find((x) => String(x._id) === String(id)) ?? null;
  }
}

export async function getCategories() {
  const { data } = await api.get("/api/categories");
  return Array.isArray(data) ? data : [];
}

export async function getUsers() {
  const { data } = await api.get("/api/users");
  return Array.isArray(data) ? data : [];
}

export default api;
