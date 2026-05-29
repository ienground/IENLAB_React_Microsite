import {cn} from "@/lib/utils.ts"
import * as React from "react"

export function SectionHeader({index, label, selected = true, className = "", onClick}: { index: number, label: string, selected?: boolean, className?: string, onClick?: () => void }) {
  const indexFormatted = String(index).padStart(2, '0')
  const labelFormatted = label.toUpperCase()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <p
      className={cn(
        "font-jb-mono text-xl tracking-wider pl-11.5 -indent-11.5 md:text-[14px] text-pretty break-keep",
        selected ? "text-foreground" : "text-muted-foreground",
        className
      )}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >({indexFormatted}) {labelFormatted}</p>
  )
}