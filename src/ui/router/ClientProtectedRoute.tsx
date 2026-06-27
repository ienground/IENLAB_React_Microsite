import { Navigate, useLocation } from "react-router"
import {useTranslation} from "react-i18next"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"
import {User} from "@/domain/model/User.ts"
import {SignupDestination} from "@/ui/public/signup/SignupDestination.ts"
import PrivateLayout from "@/ui/shared/layout/PrivateLayout.tsx"
import {LoginDestination} from "@/ui/public/login/LoginDestination.ts"

export function ClientProtectedRoute() {
  const location = useLocation()
  const isLoading = AuthSessionViewModel.use.isLoading()
  const isAuthenticated = AuthSessionViewModel.use.isAuthenticated()
  const isSigningOut = AuthSessionViewModel.use.isSigningOut()
  const user = AuthSessionViewModel.use.user()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">{t("strings:check_session")}</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    if (isSigningOut) {
      return <Navigate to="/" replace />
    }
    const redirectPath = location.pathname + location.search + location.hash
    const to = redirectPath !== "/"
      ? `${LoginDestination.root}?redirect=${encodeURIComponent(redirectPath)}`
      : LoginDestination.root
    return <Navigate to={to} replace />
  }

  if (!user) {
    const redirectPath = location.pathname + location.search + location.hash
    const to = `${SignupDestination.root}?redirect=${encodeURIComponent(redirectPath)}`
    return <Navigate to={to} replace />
  }

  const canAccessConsole = user.state === User.State.ACTIVE

  if (!canAccessConsole) {
    const redirectPath = location.pathname + location.search + location.hash
    const to = `${SignupDestination.finish}?redirect=${encodeURIComponent(redirectPath)}`
    return <Navigate to={to} replace />
  }

  return <PrivateLayout />
}