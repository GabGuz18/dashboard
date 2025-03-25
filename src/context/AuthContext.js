'use client'

import axios from "axios";
import { ClockFading } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthLoading(true);
      axios.get('http://localhost:8000/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then( response => setUser(response.data))
        .catch( err => {
          console.log(err)
          logout();
        })
      }
    setAuthLoading(false)
  }, [])
  

  const login = async (username, password) => {
    try {
      console.log(username, password)

      setAuthLoading(true);
      const res = await axios.post('http://localhost:8000/auth/login', {
        username,
        password
      })
      console.log(res.data)
      localStorage.setItem('token', res.data.access_token);
      setUser(await getUserInfo());
      setAuthError(false);
      setIsLoggedIn(true);

      router.replace('/dashboard/reportes')

    } catch (err) {
      console.log(err)
      setAuthError(err.response.data.detail)
    } finally {
      setAuthLoading(false);
    }
  }

  const register = async (username, email, password) => {
    try {
      setAuthLoading(true)
      await axios.post('http://localhost:8000/auth/registro', {
        username,
        email,
        password
      })
      router.replace('/login?registered=true')
    } catch (err) {
      console.log(err)
      setAuthError(err.response.data.detail)
    } finally {
      setAuthLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/auth/login')
  }

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; 
    try {
      setAuthLoading(true)
      const res = await axios.get('http://localhost:8000/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (err) {
      console.log(err)
      logout();
      return;
    } finally {
      setAuthLoading(false);
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
      { children }
    </AuthContext.Provider>   
  )

}