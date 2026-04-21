
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ShieldCheck,
  LogOut,
  PieChart,
  Briefcase,
  TrendingUp,
  Wallet,
  Calculator,
  BrainCircuit,
  ArrowRightLeft,
  TableProperties,
  Zap,
  ShieldAlert,
  GitMerge,
  Target,
  LineChart,
  Video,
  LayoutGrid
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"
import { dictionaries, type Language } from "@/lib/i18n/dictionary"

interface AppSidebarProps {
  lang?: Language
}

export function AppSidebar({ lang = 'pt' }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const auth = useAuth()
  const db = useFirestore()
  const dict = dictionaries[lang];

  const userProfileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null
    return doc(db, "user_profiles", user.uid)
  }, [db, user?.uid])
  const { data: profile } = useDoc(userProfileRef)

  const handleLogout = async () => {
    await auth.signOut()
    router.push("/auth")
  }

  const getSectors = () => {
    const isSupportEmail = user?.email?.toLowerCase() === 'martinsmichele8@gmail.com'
    const isAdminOrSupport = profile?.role === "Admin" || profile?.role === "Support" || isSupportEmail
    const isManager = profile?.role === "Manager" || isAdminOrSupport
    
    return [
      {
        label: "CRM",
        items: [
          { title: dict.menu.dashboard, url: "/dashboard", icon: PieChart, visible: true },
          { title: dict.menu.insights, url: "/insights", icon: LineChart, visible: true },
          { title: dict.menu.crm, url: "/crm", icon: Target, visible: isManager },
          { title: dict.menu.reimbursement, url: "/claims", icon: ArrowRightLeft, visible: true },
        ]
      },
      {
        label: "CORE OPERATIONS",
        items: [
          { title: dict.menu.billing, url: "/faturamento", icon: Wallet, visible: isManager },
          { title: dict.menu.underwriting, url: "/underwriting", icon: Calculator, visible: isManager },
          { title: dict.menu.team, url: "/team", icon: LayoutGrid, visible: isManager },
        ]
      },
      {
        label: "COLLABORATION",
        items: [
          { title: dict.menu.assistant, url: "/assistant", icon: BrainCircuit, visible: true },
          { title: dict.menu.meeting, url: "/meeting", icon: Video, visible: true },
        ]
      },
      {
        label: "ADMINISTRATION",
        items: [
          { title: dict.menu.settings, url: "/settings", icon: ShieldAlert, visible: isAdminOrSupport },
          { title: dict.menu.team, url: "/hierarchy", icon: GitMerge, visible: isAdminOrSupport },
          { title: dict.menu.dashboard, url: "/clients", icon: Zap, visible: isAdminOrSupport },
        ]
      }
    ].map(group => ({
      ...group,
      items: group.items.filter(item => item.visible)
    })).filter(group => group.items.length > 0)
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="h-24 flex items-center px-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg shrink-0">
             <ShieldCheck className="w-7 h-7 text-primary" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-black text-white text-xl uppercase tracking-tighter leading-none text-nowrap">IntegraLife</span>
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-2">Rubia / XMOV</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-0 pt-8">
        {getSectors().map((group) => (
          <SidebarGroup key={group.label} className="mb-4">
            <SidebarGroupLabel className="px-10 text-[10px] font-black uppercase text-white/40 tracking-[0.3em] mb-2 group-data-[collapsible=icon]:hidden border-b border-white/5 pb-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu className="gap-0.5">
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "h-12 px-10 rounded-none transition-all hover:bg-white/5 text-white/60 border-l-4 border-transparent",
                      pathname === item.url && "bg-white/10 text-accent border-accent font-bold"
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-5">
                      <item.icon className={cn("w-4 h-4", pathname === item.url ? "text-accent" : "text-white/30")} />
                      <span className="text-[10px] uppercase tracking-[0.1em] font-bold group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-8 border-t border-white/5 bg-black/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="h-10 px-0 text-white/40 hover:text-white group">
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest font-black group-data-[collapsible=icon]:hidden">Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-4">
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                 <img src={`https://picsum.photos/seed/${user?.uid || 'user'}/40/40`} alt="User" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col min-w-0">
                 <span className="text-[10px] font-black text-white truncate uppercase">{profile?.firstName || user?.email?.split('@')[0]}</span>
                 <span className="text-[8px] font-black text-accent uppercase tracking-[0.2em]">{profile?.role || "USER"}</span>
               </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
