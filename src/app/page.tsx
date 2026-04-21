
"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const companyId = searchParams.get("companyId")
    if (companyId) {
      console.log("IntegraLife: Acesso via empresa parceira:", companyId)
    }
    router.replace("/dashboard")
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="relative">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <div className="absolute inset-0 w-10 h-10 border-4 border-primary/10 rounded-full"></div>
      </div>
      <p className="mt-4 text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">
        INTEGRALIFE_CORE_INITIALIZING
      </p>
    </div>
  )
}
