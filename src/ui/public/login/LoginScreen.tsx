import {LoginViewModel} from "@/ui/public/login/LoginViewModel.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trans, useTranslation} from "react-i18next";
import {RiAppleFill, RiErrorWarningFill} from "@remixicon/react";
import imgLogoFull from "@/assets/brand/img_logo_full.png"
import imgPattern from "@/assets/brand/pattern.png"
import icGoogle from "@/assets/icon/google.png"
import IcKakao from "@/assets/icon/kakao.svg?react"
import IcNaver from "@/assets/icon/naver.svg?react"
import {CrossfadeImage, Seo} from "@ienlab/react-library";
import {type SubmitEvent, useState} from "react";
import {useNavigate} from "react-router";
import {Spinner} from "@/components/ui/spinner.tsx";
import { AnimatePresence, motion } from "motion/react";
import {toast} from "sonner";
import {userRepository} from "@/di/container.ts";
import {ClientHomeDestination} from "@/ui/client/home/ClientHomeDestination.ts"

export default function LoginScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:login")} - ${t("strings:app_name")}`} />
      <LoginViewModel.Provider userRepository={userRepository}>
        <ScreenBody />
      </LoginViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const uiState = LoginViewModel.use.uiState()
  const updateUiState = LoginViewModel.use.updateUiState()
  const login = LoginViewModel.use.login()
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    login(
      (credential) => {
        setLoading(false)
        navigate(ClientHomeDestination.root)
      },
      (errorKey) => {
        setLoading(false)

        toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18} />})
      }
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <CrossfadeImage
                      src={imgLogoFull}
                      alt="Image"
                      className="w-1/2"
                    />
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email">{t("strings:email")}</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={uiState.item.email}
                      onChange={e => updateUiState({ email: e.target.value })}
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">{t("strings:password")}</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        {t("strings:signin.forgot_password")}
                      </a>
                    </div>
                    <Input
                      id="password" type="password"
                      required
                      value={uiState.item.password}
                      onChange={e => updateUiState({ password: e.target.value })}
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isLoading}>
                      <span className="inline-flex items-center">
                        <AnimatePresence initial={false}>
                          {isLoading ? (
                            <motion.span
                              key="spinner"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 16 }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className="inline-flex items-center justify-center overflow-hidden"
                            >
                              <Spinner className="size-4" />
                            </motion.span>
                          ) : null}
                        </AnimatePresence>

                        <span className={isLoading ? "ml-2" : ""}>
                          {t(isLoading ? "strings:signin.loging_in" : "strings:login")}
                        </span>
                      </span>
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    {t("strings:signin.continue_with")}
                  </FieldSeparator>
                  <Field className="grid grid-cols-4 gap-4">
                    <Button variant="outline" type="button">
                      <img src={icGoogle} alt="google" className="size-4" />
                      <span className="sr-only">{t("strings:signin.signin_with_google")}</span>
                    </Button>
                    <Button variant="default" type="button" className="bg-foreground text-background">
                      <RiAppleFill size={24} />
                      <span className="sr-only">{t("strings:signin.signin_with_apple")}</span>
                    </Button>
                    <Button variant="default" type="button" className="bg-naver-background text-naver-foreground">
                      <IcNaver className="size-4" />
                      <span className="sr-only">{t("strings:signin.signin_with_naver")}</span>
                    </Button>
                    <Button variant="default" type="button" className="bg-kakao-background text-kakao-foreground">
                      <IcKakao className="size-4" />
                      <span className="sr-only">{t("strings:signin.signin_with_kakao")}</span>
                    </Button>
                  </Field>
                  <FieldDescription className="text-center">
                    {t("strings:signin.ask_no_account")} <a href="#">{t("strings:signin.signup")}</a>
                  </FieldDescription>
                </FieldGroup>
              </form>
              <div className="relative hidden bg-muted md:block">
                <CrossfadeImage
                  src={imgPattern}
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            <Trans
              i18nKey="strings:signin.agreement"
              values={{
                termsLabel: t("strings:terms_of_service"),
                privacyLabel: t("strings:privacy_policy.label")
              }}
              components={{
                termsLink: <a href="#" />,
                privacyLink: <a href="#" />
              }}
            />
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}