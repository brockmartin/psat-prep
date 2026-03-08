"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  // Only show on lesson/topic pages (long content)
  const isLongContentPage =
    /^\/week\/\d+\/[^/]+$/.test(pathname) || /^\/strategies/.test(pathname)

  useEffect(() => {
    if (!isLongContentPage) {
      setVisible(false)
      return
    }

    function handleScroll() {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLongContentPage])

  if (!visible) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-20 right-6 z-40 h-10 w-10 rounded-full shadow-lg transition-opacity"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
