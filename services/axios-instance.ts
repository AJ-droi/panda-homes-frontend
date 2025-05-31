import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // 👇 Remove this because we're no longer using cookies
  // withCredentials: true,
});

// ✅ Read token from localStorage (or any other secure store)
const getToken = async (): Promise<string | null> => {
  return localStorage.getItem("access_token"); // Or your preferred storage method
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
