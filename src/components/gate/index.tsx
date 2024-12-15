'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Gate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if ((pathname === '/login' || pathname === '/register') && token) {
      router.push('/');
      return;
    }

    if (!token && !(pathname === '/login' || pathname === '/register')) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default Gate;


