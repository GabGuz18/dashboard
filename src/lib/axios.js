const { useAuthContext } = require("@/context/auth");
const { default: axios } = require("axios");


const API = axios.create({
  baseURL: 'http://localhost:8000/api'
});

API.interceptors.request.use(
  (config) => {
    const token = useAuthContext.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default API