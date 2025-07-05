"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Languages, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-t md:hidden z-50">
      <div className="container mx-auto h-full">
        <div className="flex justify-around items-center h-full">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-2 rounded-lg",
              pathname === "/" ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
            )}
          >
            <Languages className="h-6 w-6" />
            <span className="text-xs font-medium">번역하기</span>
          </Link>
          <Link
            href="/saved"
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-2 rounded-lg",
              pathname === "/saved" ? "text-green-600" : "text-gray-500 hover:text-green-600"
            )}
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-xs font-medium">저장된 문장</span>
          </Link>
        </div>
      </div>
    </nav>
  )
} 