"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CollapsibleHintProps {
  hint: string
}

export function CollapsibleHint({ hint }: CollapsibleHintProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10">
      <Button
        variant="ghost"
        className="w-full justify-between px-4 py-3 text-sm font-medium"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Hide Hint" : "Show Hint"}
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>
      <div
        className={`grid transition-all duration-200 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm text-muted-foreground">{hint}</p>
        </div>
      </div>
    </div>
  )
}
