import {useTranslation} from "react-i18next"
import {useMemo} from "react"
import {getRouter} from "@/ui/router/getRouter.tsx"
import {RouterProvider} from "react-router"

export default function Router() {
  const { t, i18n } = useTranslation()

  const router = useMemo(() => getRouter(t), [t, i18n.language])

  return <RouterProvider router={router} />
}