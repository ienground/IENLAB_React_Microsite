import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"
import {useEffect} from "react"

export default function AuthSessionInitializer() {
  const initialize = AuthSessionViewModel.use.initialize()

  useEffect(() => {
    return initialize()
  }, [initialize])

  return null
}