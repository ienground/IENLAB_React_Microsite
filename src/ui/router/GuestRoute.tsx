import {Navigate, useSearchParams} from "react-router"
import {useTranslation} from "react-i18next"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"
import {ClientHomeDestination} from "@/ui/client/home/ClientHomeDestination.ts"
import type {ReactNode} from "react"

export function GuestRoute({children}: { children: ReactNode }) {
  const [searchParams] = useSearchParams()
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

  if (isAuthenticated && user) {
    const redirectParam = searchParams.get("redirect")
    const redirectTo = (redirectParam && redirectParam.startsWith("/") && !redirectParam.startsWith("//"))
      ? redirectParam
      : ClientHomeDestination.root
    return <Navigate to={redirectTo} replace />
  }

  return children
}
