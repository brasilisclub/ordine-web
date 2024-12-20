"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

const Gate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if ((pathname === "/login" || pathname === "/signup") && token) {
      router.push("/");
      return;
    }
    if (!token && !(pathname === "/login" || pathname === "/signup")) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-lg font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Gate;
