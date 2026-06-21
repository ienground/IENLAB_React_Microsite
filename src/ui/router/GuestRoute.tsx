import {Navigate, useLocation} from "react-router"
import {useTranslation} from "react-i18next"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"
import {ClientHomeDestination} from "@/ui/client/home/ClientHomeDestination.ts"
import type {ReactNode} from "react"
import {SignupDestination} from "@/ui/public/signup/SignupDestination.ts"
import {LoginDestination} from "@/ui/public/login/LoginDestination.ts"

export function GuestRoute({children}: { children: ReactNode }) {
  const location = useLocation()
  const isLoading = AuthSessionViewModel.use.isLoading()
  const isAuthenticated = AuthSessionViewModel.use.isAuthenticated()
  const user = AuthSessionViewModel.use.user()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">{t("strings:check_session")}</p>
      </div>
    )
  }

  if (isAuthenticated) {
    if (user) {
      return <Navigate to={ClientHomeDestination.root} replace />
    }
    if (location.pathname !== SignupDestination.root) {
      return <Navigate to={SignupDestination.root} replace />
    }
  } else {
    if (location.pathname !== LoginDestination.root) {
      return <Navigate to={LoginDestination.root} replace />
    }
  }

  return children
}


