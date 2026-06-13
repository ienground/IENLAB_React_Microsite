import {Button} from "@/components/ui/button.tsx"
import type {ButtonHTMLAttributes} from "react"

export function UploadActionButton({children, className, type = "button", ...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      type={type}
      variant="secondary"
      size="icon"
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}