
'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading && !user && pathname !== '/auth') {
      router.push('/auth');
    }
    if (!isUserLoading && user && pathname === '/auth') {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, pathname, router]);

  if (isUserLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-primary/10 rounded-full"></div>
        </div>
        <p className="mt-4 text-xs font-bold text-primary uppercase tracking-[0.2em] animate-pulse">
          Validando Credenciais IntegraLife...
        </p>
      </div>
    );
  }

  if (pathname === '/auth') {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
