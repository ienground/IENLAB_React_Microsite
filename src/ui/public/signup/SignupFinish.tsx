import {useTranslation} from "react-i18next"
import {Seo} from "@ienlab/react-library"
import {RiCheckboxCircleFill} from "@remixicon/react"
import {Button} from "@/components/ui/button.tsx"
import {useNavigate} from "react-router"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"

export default function SignupFinish() {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const signOut = AuthSessionViewModel.use.signOut()

  const handleLogout = async () => {
    await signOut()
    navigate("/")
  }

  return (
    <>
      <Seo title={`${t("strings:signup.finish.label")} - ${t("strings:app_name")}`}/>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
        <RiCheckboxCircleFill size={64} className="text-primary" />
        <div className="inline-flex flex-col space-y-6">
          <h1 className="large-text-title whitespace-nowrap">{t("strings:signup.finish.title")}</h1>
          <p className="content-description w-min min-w-full">{t("strings:signup.finish.desc")}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          {t("strings:signout.label")}
        </Button>
      </div>
    </>
  )
}
