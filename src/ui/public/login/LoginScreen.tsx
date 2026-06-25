import {LoginViewModel} from "@/ui/public/login/LoginViewModel.ts"
import {Card, CardContent} from "@/components/ui/card.tsx"
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator} from "@/components/ui/field.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Trans, useTranslation} from "react-i18next"
import {RiErrorWarningFill} from "@remixicon/react"
import imgLogoFull from "@/assets/brand/img_logo_full.png"
import imgPattern from "@/assets/brand/pattern.png"
import icGoogle from "@/assets/icon/google.png"
import IcKakao from "@/assets/icon/kakao.svg?react"
import IcNaver from "@/assets/icon/naver.svg?react"
import {CrossfadeImage, NaverLogin, Seo} from "@ienlab/react-library"
import {type SubmitEvent} from "react"
import {Link, Navigate, useNavigate, useSearchParams} from "react-router"
import {Spinner} from "@/components/ui/spinner.tsx"
import {AnimatePresence, motion} from "motion/react"
import {toast} from "sonner"
import {userRepository} from "@/di/container.ts"
import {ClientHomeDestination} from "@/ui/client/home/ClientHomeDestination.ts"
import {Swap, SwapOff, SwapOn} from "@/components/ui/swap.tsx"
import KakaoLogin from "react-kakao-login"
import {PrivacyDestination} from "@/ui/public/privacy/PrivacyDestination.ts"
import {SignupDestination} from "@/ui/public/signup/SignupDestination.ts"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"

export default function LoginScreen() {
  const {t} = useTranslation()
  const isAuthenticated = AuthSessionViewModel.use.isAuthenticated()
  const user = AuthSessionViewModel.use.user()

  if (isAuthenticated && !user) {
    return <Navigate
      to={SignupDestination.root}
      replace
    />
  }

  return (
    <>
      <Seo title={`${t("strings:login")} - ${t("strings:app_name")}`}/>
      <LoginViewModel.Provider userRepository={userRepository}>
        <ScreenBody/>
      </LoginViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const kakaoApiKey: string = import.meta.env.VITE_KAKAO_API_KEY
  const {t} = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirect") ?? ClientHomeDestination.root
  const isLoading = LoginViewModel.use.isLoading()
  const uiState = LoginViewModel.use.uiState()
  const updateUiState = LoginViewModel.use.updateUiState()
  const login = LoginViewModel.use.login()
  const primGoogleLogin = LoginViewModel.use.googleLogin()
  const primNaverLogin = LoginViewModel.use.naverLogin()
  const primKakaoLogin = LoginViewModel.use.kakaoLogin()

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    login(
      (credential) => navigate(redirectTo),
      (errorKey) => toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18}/>})
    )
  }

  const googleLogin = () => {
    primGoogleLogin(
      credential => navigate(redirectTo),
      errorKey => toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18}/>})
    )
  }

  const naverLogin = (token: string) => {
    primNaverLogin(
      token,
      credential => navigate(redirectTo),
      errorKey => toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18}/>})
    )
  }

  const kakaoLogin = (token: string) => {
    primKakaoLogin(
      token,
      credential => navigate(redirectTo),
      errorKey => toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18}/>})
    )
  }

  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <motion.form
                layout
                className="p-6 md:p-8"
                onSubmit={handleSubmit}
              >
                <motion.div layout>
                  <FieldGroup className="gap-y-0">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <CrossfadeImage
                        src={imgLogoFull}
                        alt="Image"
                        className="w-1/2"
                      />
                    </div>

                    <Field className="mt-7">
                      <FieldLabel htmlFor="email">
                        {uiState.item.isSignup
                          ? t("strings:email_signup")
                          : t("strings:email")}
                      </FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        disabled={isLoading}
                        value={uiState.item.email}
                        onChange={e => updateUiState({email: e.target.value})}
                      />
                    </Field>

                    <Field className="mt-7">
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">
                          {uiState.item.isSignup
                            ? t("strings:password_signup")
                            : t("strings:password")}
                        </FieldLabel>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        disabled={isLoading}
                        value={uiState.item.password}
                        onChange={e => updateUiState({password: e.target.value})}
                      />
                    </Field>

                    <AnimatePresence initial={false}>
                      {uiState.item.isSignup && (
                        <motion.div
                          key="confirm_password"
                          layout
                          initial={{marginTop: 0, height: 0, opacity: 0}}
                          animate={{marginTop: 28, height: "auto", opacity: 1}}
                          exit={{marginTop: 0, height: 0, opacity: 0}}
                          transition={{
                            height: {duration: 0.28, ease: [0.16, 1, 0.3, 1]},
                            opacity: {duration: 0.2, ease: "easeOut"},
                            layout: {duration: 0.28, ease: [0.16, 1, 0.3, 1]},
                          }}
                          className="overflow-hidden origin-top"
                        >
                          <div>
                            <Field>
                              <div className="flex items-center">
                                <FieldLabel htmlFor="confirmPassword">
                                  {t("strings:password_confirm")}
                                </FieldLabel>
                              </div>
                              <Input
                                id="confirmPassword"
                                type="password"
                                required
                                disabled={isLoading}
                                value={uiState.item.confirmPassword}
                                onChange={e =>
                                  updateUiState({
                                    confirmPassword: e.target.value,
                                  })
                                }
                              />
                            </Field>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Field className="mt-7">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        <span className="inline-flex items-center">
                          <AnimatePresence initial={false}>
                            {isLoading ? (
                              <motion.span
                                key="spinner"
                                initial={{opacity: 0, width: 0}}
                                animate={{opacity: 1, width: 16}}
                                exit={{opacity: 0, width: 0}}
                                transition={{duration: 0.2}}
                                className="inline-flex items-center justify-center overflow-hidden"
                              >
                                <Spinner className="size-4"/>
                              </motion.span>
                            ) : null}
                          </AnimatePresence>

                          <span className={isLoading ? "ml-2" : ""}>
                            {t(
                              isLoading
                                ? "strings:signin.loging_in"
                                : "strings:login"
                            )}
                          </span>
                        </span>
                      </Button>
                    </Field>

                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mt-7">
                      {t("strings:signin.continue_with")}
                    </FieldSeparator>

                    <Field className="grid grid-cols-3 gap-4 mt-7">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={googleLogin}
                      >
                        <Swap swapped={isLoading}>
                          <SwapOn>
                            <Spinner className="size-4"/>
                          </SwapOn>
                          <SwapOff>
                            <img
                              src={icGoogle}
                              alt="google"
                              className="size-4"
                            />
                          </SwapOff>
                        </Swap>
                        <span className="sr-only">
                      {t("strings:signin.signin_with_google")}
                    </span>
                      </Button>

                      <NaverLogin
                        onToken={naverLogin}
                        clientId={import.meta.env.VITE_NAVER_CLIENT_ID}
                        callbackUrl={`${window.location.origin}/login`}
                        render={e => (
                          <Button
                            variant="default"
                            type="button"
                            onClick={e}
                            className="bg-naver-background text-naver-foreground hover:bg-naver-background/80"
                          >
                            <Swap swapped={isLoading}>
                              <SwapOn>
                                <Spinner className="size-4"/>
                              </SwapOn>
                              <SwapOff>
                                <IcNaver className="size-4"/>
                              </SwapOff>
                            </Swap>
                            <span className="sr-only">
                          {t("strings:signin.signin_with_naver")}
                        </span>
                          </Button>
                        )}
                      />

                      <KakaoLogin
                        token={kakaoApiKey}
                        onSuccess={response =>
                          kakaoLogin(response.response.access_token)
                        }
                        onFail={e =>
                          toast.error(t(e.error), {
                            icon: <RiErrorWarningFill size={18}/>,
                          })
                        }
                        render={e => (
                          <Button
                            variant="default"
                            type="button"
                            className="bg-kakao-background text-kakao-foreground hover:bg-kakao-foreground/80 dark:hover:bg-kakao-foreground/10"
                            onClick={e.onClick}
                          >
                            <Swap swapped={isLoading}>
                              <SwapOn>
                                <Spinner className="size-4"/>
                              </SwapOn>
                              <SwapOff>
                                <IcKakao className="size-4"/>
                              </SwapOff>
                            </Swap>
                            <span className="sr-only">
                          {t("strings:signin.signin_with_kakao")}
                        </span>
                          </Button>
                        )}
                      />
                    </Field>

                    <div className="mt-7">
                      <FieldDescription className="text-center">
                        {uiState.item.isSignup ? (
                          <>
                            {t("strings:signin.ask_account")}
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => updateUiState({isSignup: false})}
                            >
                              {t("strings:login")}
                            </Button>
                          </>
                        ) : (
                          <>
                            {t("strings:signin.ask_no_account")}
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => updateUiState({isSignup: true})}
                            >
                              {t("strings:signup.label")}
                            </Button>
                          </>
                        )}
                      </FieldDescription>
                    </div>
                  </FieldGroup>
                </motion.div>
              </motion.form>

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
                privacyLabel: t("strings:privacy_policy.label"),
              }}
              components={{
                termsLink: <a href="#"/>,
                privacyLink: <Link to={PrivacyDestination.root}/>,
              }}
            />
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}

