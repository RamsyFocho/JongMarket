"use client";

import { useEffect, useState } from 'react';
import LoadingScreen from "@/components/loading-screen";
export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);
  return loading ? <LoadingScreen /> : <>{children}</>;
}