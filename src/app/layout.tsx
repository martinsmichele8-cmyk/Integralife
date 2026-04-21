'use client';

import * as React from 'react';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/main-nav';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Share2, CheckCircle2 } from "lucide-react";
import { dictionaries, type Language } from '@/lib/i18n/dictionary';
import { useToast } from "@/hooks/use-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { toast } = useToast();
  const isAuthPage = pathname === '/auth';
  const isLandingPage = pathname === '/';

  const [lang, setLang] = React.useState<Language>('pt');
  const [isCopied, setIsCopied] = React.useState(false);
  const dict = dictionaries[lang];

  const handleShareApp = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin);
      setIsCopied(true);
      toast({
        title: "Link Copiado",
        description: "O link de acesso ao IntegraLife Hub foi copiado para sua área de transferência.",
      });
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <title>{dict.app_title} | Hub Operacional</title>
      </head>
      <body className="font-body antialiased selection:bg-accent/30 selection:text-primary overflow-hidden">
        <FirebaseClientProvider>
          <AuthGuard>
            {isAuthPage || isLandingPage ? (
              <main className="min-h-screen bg-white">
                {children}
                <Toaster />
              </main>
            ) : (
              <SidebarProvider>
                <AppSidebar lang={lang} />
                <SidebarInset className="bg-slate-50">
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 bg-white sticky top-0 z-10 shadow-sm border-slate-100">
                    <SidebarTrigger className="-ml-2 text-primary hover:bg-slate-50 transition-colors" />
                    <div className="flex-1 px-6">
                      <div className="flex items-center gap-3">
                        <h1 className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">{dict.app_title} Hub</h1>
                        <Badge variant="outline" className="text-[8px] h-4 font-black border-slate-200 text-slate-400">V2.5.0</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleShareApp}
                        className="h-9 px-4 border-slate-200 text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-slate-50"
                      >
                        {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-accent" />}
                        {isCopied ? "Link Copiado" : "Compartilhar Acesso"}
                      </Button>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:flex">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        {dict.status.online}
                      </div>
                      <div className="border-l pl-4">
                        <Select value={lang} onValueChange={(v) => setLang(v as Language)}>
                          <SelectTrigger className="w-[80px] h-8 text-[10px] font-black uppercase border-none bg-slate-50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt">PT</SelectItem>
                            <SelectItem value="en">EN</SelectItem>
                            <SelectItem value="es">ES</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </header>
                  <main className="flex-1 overflow-hidden">
                    {children}
                  </main>
                </SidebarInset>
                <Toaster />
              </SidebarProvider>
            )}
          </AuthGuard>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}