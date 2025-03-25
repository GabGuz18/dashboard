'use client'

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn, authLoading } = useContext(AuthContext);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if ( !isLoggedIn && !user ) {
      router.replace('/auth/login');
    }
  }, [user, authLoading, router]);
  
  if (authLoading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return children;

}