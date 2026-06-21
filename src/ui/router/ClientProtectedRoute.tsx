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
    return (
      <Navigate
        to={LoginDestination.root}
        replace
        state={{ from: location }}
      />
    )
  }

  if (!user) {
    return <Navigate to={SignupDestination.root} replace />
  }

  const canAccessConsole = user.state === User.State.ACTIVE

  if (!canAccessConsole) {
    return <Navigate to="/" replace />
  }

  return <PrivateLayout />
}