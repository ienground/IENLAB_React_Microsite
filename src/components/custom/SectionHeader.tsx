import {cn} from "@/lib/utils.ts"
import * as React from "react"

export function SectionHeader({index, label, selected = true, className = "", onClick = () => {}}: { index: number, label: string, selected?: boolean, className?: string, onClick?: () => void }) {
  const indexFormatted = String(index).padStart(2, '0')
  const labelFormatted = label.toUpperCase()
  return (
    <p
      className={cn(
        "font-jb-mono text-xl tracking-wider pl-11.5 -indent-11.5 md:text-[14px] text-pretty break-keep",
        selected ? "text-foreground" : "text-muted-foreground",
        className
      )}
      onClick={onClick}
    >({indexFormatted}) {labelFormatted}</p>
  )
}