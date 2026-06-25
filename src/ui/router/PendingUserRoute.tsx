import {Navigate} from "react-router"
import {useTranslation} from "react-i18next"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"
import {User} from "@/domain/model/User.ts"
import {SignupDestination} from "@/ui/public/signup/SignupDestination.ts"
import {ClientHomeDestination} from "@/ui/client/home/ClientHomeDestination.ts"
import {LoginDestination} from "@/ui/public/login/LoginDestination.ts"
import type {ReactNode} from "react"

export function PendingUserRoute({children}: { children: ReactNode }) {
  const isLoading = AuthSessionViewModel.use.isLoading()
  const isAuthenticated = AuthSessionViewModel.use.isAuthenticated()
  const fbUser = AuthSessionViewModel.use.fbUser()
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
    return <Navigate to={LoginDestination.root} replace />
  }

  if (!user) {
    const isPasswordUser = fbUser?.providerData.some(p => p.providerId === 'password')
    if (isPasswordUser && !fbUser?.emailVerified) {
      return <Navigate to={LoginDestination.root} replace />
    }
    return <Navigate to={SignupDestination.root} replace />
  }

  if (user.state === User.State.ACTIVE) {
    return <Navigate to={ClientHomeDestination.root} replace />
  }

  return children
}
