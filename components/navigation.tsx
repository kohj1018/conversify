"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Languages, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Languages className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">영어 학습</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant={pathname === "/" ? "default" : "ghost"}
              className={cn("gap-2", pathname === "/" && "bg-blue-600 hover:bg-blue-700")}
            >
              <Link href="/">
                <Languages className="h-4 w-4" />
                번역하기
              </Link>
            </Button>

            <Button
              asChild
              variant={pathname === "/saved" ? "default" : "ghost"}
              className={cn("gap-2", pathname === "/saved" && "bg-green-600 hover:bg-green-700")}
            >
              <Link href="/saved">
                <BookOpen className="h-4 w-4" />
                저장된 문장
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
