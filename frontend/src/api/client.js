import axios from "axios";

// In DEV you can leave an empty Baseurl - /API /* will go through Vite Proxy.
// In prod specify VITE_API_URL in .env.production
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: { "Content-Type": "application/json" },
});

// interceptors (optional: tokens, logistics)
api.interceptors.response.use(
  (r) => r,
  (e) => {
    console.error(
      "API error:",
      e?.response?.status,
      e?.response?.data || e.message,
    );
    return Promise.reject(e);
  },
);
