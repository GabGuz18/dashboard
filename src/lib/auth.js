import axios from "axios";
import { jwtDecode } from "jwt-decode";


const api = axios.create({
  baseURL: 'http://localhost:8000/auth',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  config.withCredentials = true;

  return config;
});

export const login = async (user, password) => {
  try {
    const res = await api.post('/login', {
      user,
      password
    });

    const token = res.data.access_token;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (res.data.access_token) {
      const decodedToken = jwtDecode(res.data.access_token);
      console.log(decodedToken)
      const userInfo =  await getUserInfo();

      return {
        success: true,
        user: userInfo,
        expiresAt: decodedToken.exp * 1000,
      }
    }

    return { success: false, error: 'No token received' };

  } catch (err) {
    console.log(err);
    return { 
      success: false, 
      error: err.response.data.detail
    };
  }
};

export const register = async (user, email, password) => {
  try {
    const res = await api.post('/registro', {
      user,
      email,
      password
    });

    return { success: true, message: res.data.msg };

  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err.response.data.detail
    }
  }
};

export const getUserInfo = async () => {
  try {
    const res = await api.get('/usuario');
    console.log(res)
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return null;
    }
  }
};

export const isAuthenticated = async () => {
  const userInfo = await getUserInfo();
  return !!userInfo
}

export const logout = async () => {
  try {
    await api.post('/logout');
    delete api.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export default api;