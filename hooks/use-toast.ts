import { useState } from "react"

interface ToastProps {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    const newToast = { title, description, variant }
    setToasts(prev => [...prev, newToast])
    
    // 3초 후 자동 제거
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t !== newToast))
    }, 3000)
  }

  return { toast, toasts }
} 