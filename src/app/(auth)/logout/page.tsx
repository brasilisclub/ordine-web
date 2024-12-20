"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    sessionStorage.removeItem("token");
    router.push("/login");
  }, [router]);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="flex items-center justify-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-lg font-medium">Carregando...</p>
      </div>
    </div>
  );
}
