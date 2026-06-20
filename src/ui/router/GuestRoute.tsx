import {Navigate, Outlet, useLocation} from "react-router"
import {useTranslation} from "react-i18next"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"
import {ClientHomeDestination} from "@/ui/client/home/ClientHomeDestination.ts"
import {SignupDestination} from "@/ui/public/signup/SignupDestination.ts"

export function GuestRoute() {
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
    return <Outlet />
  }

  return <Outlet />
}

