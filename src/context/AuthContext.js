'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
          setIsLoggedIn(true);
        } catch (err) {
          console.log(err);
          logout();
        } finally {
          setAuthLoading(false);
        }
      } else {
        setAuthLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);

  const login = async (username, password) => {
    try {
      setAuthLoading(true);
      const res = await axios.post('http://localhost:8000/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.access_token);
      const userInfo = await getUserInfo();
      setUser(userInfo);
      setAuthError(null);
      setIsLoggedIn(true);
      router.replace('/dashboard/reportes');
    } catch (err) {
      console.log(err);
      setAuthError(err.response?.data?.detail || 'Login failed');
    } finally {
      setAuthLoading(false);
    }
  }

  const register = async (username, email, password) => {
    try {
      setAuthLoading(true);
      await axios.post('http://localhost:8000/auth/registro', {
        username,
        email,
        password
      });
      router.replace('/auth/login?registered=true');
    } catch (err) {
      console.log(err);
      setAuthError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setAuthLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/auth/login');
  }

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null; 
    try {
      const res = await axios.get('http://localhost:8000/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      console.log(err);
      logout();
      return null;
    }
  }

  const values = {
    user,
    isLoggedIn, 
    authError,
    authLoading,
    login,
    register,
    logout,
    getUserInfo
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>   
  )
}