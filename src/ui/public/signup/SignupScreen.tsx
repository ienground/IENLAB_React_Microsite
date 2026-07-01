import {ImageUploadField, Localized, PhoneVerify, Seo, useDebouncedSearch} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {SectionHeader} from "@/components/custom/shared/SectionHeader.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Checkbox} from "@/components/ui/checkbox.tsx"
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/field.tsx"
import {Input} from "@/components/ui/input.tsx"
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckFill,
  RiCloseFill,
  RiErrorWarningFill,
  RiLogoutBoxLine
} from "@remixicon/react"
import {MagneticButton} from "@/components/motion/components.tsx"
import {Navigate, useNavigate} from "react-router"
import {SignupViewModel} from "@/ui/public/signup/SignupViewModel.ts"
import {AnimatePresence, motion} from "motion/react"
import {useEffect, useState} from "react"
import {ButtonGroup} from "@/components/ui/button-group.tsx"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox.tsx"
import {Company} from "@/domain/model/Company.ts"
import {InputGroup, InputGroupButton, InputGroupInput} from "@/components/ui/input-group.tsx"
import {PatternFormat} from "react-number-format"
import {Swap, SwapOff, SwapOn} from "@/components/ui/swap.tsx"
import {Spinner} from "@/components/ui/spinner.tsx"
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp.tsx"
import {REGEXP_ONLY_DIGITS} from "input-otp"
import {toast} from "sonner"
import i18n from "@/locales/i18n.ts"
import {UploadActionButton} from "@/components/custom/shared/Button.tsx"
import {AuthSessionViewModel} from "@/ui/shared/auth/useAuthSession.ts"
import {SignupDestination} from "@/ui/public/signup/SignupDestination.ts"
import {LoginDestination} from "@/ui/public/login/LoginDestination.ts"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx"
import {ScrollArea} from "@/components/ui/scroll-area.tsx"
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import {markdownComponents} from "@/components/custom/shared/MarkdownComponent.tsx"
import {Label} from "@/components/ui/label.tsx"

export default function SignupScreen() {
  const {t} = useTranslation()
  const isAuthenticated = AuthSessionViewModel.use.isAuthenticated()
  const fbUser = AuthSessionViewModel.use.fbUser()

  if (!isAuthenticated) {
    return <Navigate to={LoginDestination.root} replace />
  }

  const isPasswordUser = fbUser?.providerData.some(p => p.providerId === 'password')
  if (isPasswordUser && !fbUser?.emailVerified) {
    return <Navigate to={LoginDestination.root} replace />
  }

  return (
    <>
      <Seo title={`${t("strings:signup.label")} - ${t("strings:app_name")}`}/>
      <SignupViewModel.Provider>
        <ScreenBody/>
      </SignupViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const {t} = useTranslation()
  const signupUiState = SignupViewModel.use.signupUiState()

  const init = SignupViewModel.use.init()
  const onDisposed = SignupViewModel.use.onDisposed()
  const primalMoveStep = SignupViewModel.use.moveStep()
  const logout = AuthSessionViewModel.use.signOut()

  const [direction, setDirection] = useState(1)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const moveStep = (delta: number) => {
    setDirection(delta) // 1이면 앞으로, -1이면 뒤로
    primalMoveStep(delta)
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,   // 100% 대신 소폭 이동
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  }

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  return (
    <>
      <div className="w-full flex flex-col">
      <div className="px-4 sm:px-6 md:px-8"><Separator className="bg-foreground"/></div>

      <div className="site-section-tight site-grid">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader
            index={signupUiState.item.step}
            label={signupUiState.item.step === 0 ? t("strings:terms_of_service") : t("strings:signup.info")}
          />
        </aside>
        <div className="col-span-12 xl:col-span-10 relative">
          <AnimatePresence mode="wait" custom={direction}>
            {signupUiState.item.step === 0 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", damping: 30, stiffness: 250 }}
              >
                <StepTerms
                  onNext={() => moveStep(1)}
                  onLogout={() => setShowLogoutDialog(true)}
                />
              </motion.div>
            )}

            {signupUiState.item.step === 1 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", damping: 30, stiffness: 250 }}
              >
                <StepInfo
                  onBack={() => moveStep(-1)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("strings:signout.dialog_title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("strings:signout.dialog_desc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>{t("strings:cancel")}</Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await logout()
                } catch (e) {
                  toast.error(t("libs:unknown_error_occurred"), {icon: <RiErrorWarningFill size={18}/>})
                }
              }}
            >{t("strings:confirm")}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function StepTerms(props: {
  onNext: () => void
  onLogout: () => void
}) {
  const signupUiState = SignupViewModel.use.signupUiState()
  const updateSignupUiState = SignupViewModel.use.updateSignupUiState()
  const allRequiredAgreed = SignupViewModel.use.allRequiredAgreed()

  const {t} = useTranslation()

  const toggleAgreementId = (id: string) => {
    const ids = signupUiState.item.agreementIds
    const updated = ids.includes(id)
      ? ids.filter(i => i !== id)
      : [...ids, id]
    updateSignupUiState({ agreementIds: updated })
  }

  const requiredItems = signupUiState.agreementItems.filter(i => i.required)
  const optionalItems = signupUiState.agreementItems.filter(i => !i.required)
  const allAgreed = signupUiState.agreementItems.every(i => signupUiState.item.agreementIds.includes(i.id))

  const toggleAll = () => {
    if (allAgreed) {
      updateSignupUiState({ agreementIds: [] })
    } else {
      updateSignupUiState({ agreementIds: signupUiState.agreementItems.map(i => i.id) })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="large-text-title">{t("strings:signup.agree_terms.title")}</h1>
      <p className="text-muted-foreground">{t("strings:signup.agree_terms.desc")}</p>
      <div className="space-y-4 rounded-4xl border p-6">
        <div className="flex flex-row gap-x-4">
          <Checkbox
            id="agreed_toggle_all"
            checked={allAgreed}
            onCheckedChange={toggleAll}
          />
          <Label htmlFor="agreed_toggle_all" className="font-medium">{t("strings:signup.agree_terms.select_all")}</Label>
        </div>
        {requiredItems.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {t("strings:signup.agree_terms.required_agreements")}
            </p>
            {requiredItems.map(item => (
              <div className="flex flex-col gap-y-4">
                <ScrollArea className="w-full h-60 rounded-lg border px-4">
                  <div className="my-4">
                    <Markdown
                      components={markdownComponents}
                      remarkPlugins={[remarkGfm]}
                    >{Localized.get(item.content)}</Markdown>
                  </div>
                </ScrollArea>
                <div className="flex flex-row gap-x-4 items-center">
                  <Checkbox
                    id={item.id}
                    checked={signupUiState.item.agreementIds.includes(item.id)}
                    onCheckedChange={() => toggleAgreementId(item.id)}
                  />
                  <Label htmlFor={item.id}>{t("strings:signup.agree_terms.required_label")} {Localized.get(item.title)}</Label>
                </div>
              </div>
            ))}
          </div>
        )}

        {optionalItems.length > 0 && (
          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {t("strings:signup.agree_terms.optional_agreements")}
            </p>
            {optionalItems.map(item => (
              <div className="flex flex-col gap-y-4">
                <ScrollArea className="w-full h-60 rounded-lg border px-4">
                  <div className="my-4">
                    <Markdown
                      components={markdownComponents}
                      remarkPlugins={[remarkGfm]}
                    >{Localized.get(item.content)}</Markdown>
                  </div>
                </ScrollArea>
                <div className="flex flex-row gap-x-4 items-center">
                  <Checkbox
                    id={item.id}
                    checked={signupUiState.item.agreementIds.includes(item.id)}
                    onCheckedChange={() => toggleAgreementId(item.id)}
                  />
                  <Label htmlFor={item.id}>{t("strings:signup.agree_terms.optional_label")} {Localized.get(item.title)}</Label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ButtonGroup className="w-fit">
        <MagneticButton
          variant="outline"
          onClick={props.onLogout}
        >
          <RiLogoutBoxLine />
          {t("strings:signout.label")}
        </MagneticButton>
        <MagneticButton
          disabled={!allRequiredAgreed()}
          onClick={props.onNext}
        >
          <RiArrowRightLine />
          {t("strings:next")}
        </MagneticButton>
      </ButtonGroup>
    </div>
  )
}
function StepInfo(props: {
  onBack: () => void
}) {
  const uiState = SignupViewModel.use.userEditUiState()
  const companyInfoStateList = SignupViewModel.use.companyInfoStateList()

  const updateUiState = SignupViewModel.use.updateUserEditUiState()
  const invalid = SignupViewModel.use.invalid()
  const primalSave = SignupViewModel.use.save()
  const primalSendOtpCode = SignupViewModel.use.sendOtpCode()
  const primalVerifyOtpCode = SignupViewModel.use.verifyOtpCode()
  const loadNextCompanyPage = SignupViewModel.use.loadNextCompanyPage()
  const setCompanySearchKeyword = SignupViewModel.use.setCompanySearchKeyword()
  const clearCompanySearch = SignupViewModel.use.clearCompanySearch()

  const {t} = useTranslation()
  const [isProgress, setProgress] = useState(false)
  const otpRequestErrorMsg = PhoneVerify.Request.getMessage(t, uiState.item.otpRequestState)
  const otpResultErrorMsg = PhoneVerify.Result.getMessage(t, uiState.item.otpResultState)

  const [query, setQuery] = useState("")
  const [otpTimer, setOtpTimer] = useState<number | null>(null)

  const navigate = useNavigate()

  const save = () => {
    setProgress(true)
    primalSave(
      async (_id) => {
        navigate(SignupDestination.finish, { replace: true })
      },
      (err) => {
        setProgress(false)
        toast.error(t(err), {icon: <RiErrorWarningFill size={18}/>})
      }
    )
  }

  const sendOtpCode = () => {
    setOtpTimer(300)
    primalSendOtpCode(
      (result) => {
        if (result === PhoneVerify.Request.SUCCESS) {
          setOtpTimer(300)
        }
      },
      errorKey => toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18}/>})
    )
  }

  const verifyOtpCode = () => {
    primalVerifyOtpCode(
      (result) => {
        if (result === PhoneVerify.Result.VERIFIED) {
          setOtpTimer(null)
        }
      },
      errorKey => toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18}/>})
    )
  }

  useEffect(() => {
    if (otpTimer === null || otpTimer <= 0) return
    const id = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
    return () => clearTimeout(id)
  }, [otpTimer])

  useEffect(() => {
    const company = uiState.item.company
    if (!company) return

    setQuery(Localized.get(company.name))
  }, [uiState.item.company, i18n.resolvedLanguage])

  useDebouncedSearch(query, setCompanySearchKeyword, clearCompanySearch)

  return (
    <div className="flex flex-col gap-8">
      <h1 className="large-text-title">{t("strings:signup.enter_info.title")}</h1>
      <p className="text-muted-foreground">{t("strings:signup.enter_info.desc")}</p>

      <FieldSet>
        <ImageUploadField
          id="profile"
          label={t("strings:user.profile.label")}
          uploadHintText={t("strings:user.profile.hint")}
          descriptionText={t("strings:user.profile.desc")}
          value={uiState.item.profileUrl}
          onChange={item => updateUiState({ profileUrl: item })}
          width="100%"
          className="max-w-80"
          components={{
            Input,
            Field,
            FieldLabel,
            FieldDescription,
            Button: UploadActionButton,
            CloseIcon: RiCloseFill
          }}
        />
        <FieldLegend variant="legend">{t("strings:outsource_manage.user.personal.label")}</FieldLegend>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>{t("strings:outsource_manage.user.name.label")}</FieldLabel>
            <Input
              value={uiState.item.name}
              onChange={e => updateUiState({name: e.target.value})}
              placeholder={t("strings:input_name")}
            />
          </Field>
          <Field>
            <FieldLabel>{t("strings:outsource_manage.user.company.label")}</FieldLabel>
            <Combobox
              items={[...companyInfoStateList.itemList.values()]}
              itemToStringValue={(item: Company) => item.id}
            >
              <ComboboxInput
                placeholder={t("strings:company_placeholder")}
                value={query}
                onChange={e => setQuery(e.target.value)}
                showClear
              />
              <ComboboxContent>
                <ComboboxEmpty>{t("strings:list_end")}</ComboboxEmpty>
                <ComboboxList
                  onScroll={e => {
                    const target = e.currentTarget
                    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
                      loadNextCompanyPage()
                    }
                  }}
                >
                  {(item: Company) => (
                    <ComboboxItem
                      key={item.id}
                      value={item.id}
                      onClick={() => {
                        const hasCompany = uiState.item.companyRef !== null
                        updateUiState({
                          company: item,
                          ...(hasCompany
                            ? { tempCompanyRef: item.ref, tempCompany: item }
                            : { companyRef: item.ref }
                          ),
                        })
                        setQuery(Localized.get(item.name))
                      }}
                    >
                      {Localized.get(item.name)}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
          <Field>
            <FieldLabel>{t("strings:outsource_manage.user.phone.label")}</FieldLabel>
            <InputGroup>
              <PatternFormat
                value={uiState.item.phone}
                onChange={e => updateUiState({phone: e.target.value, otpRequestState: PhoneVerify.Request.IDLE})}
                type="tel"
                placeholder={t("strings:input_phone")}
                format="###-####-####"
                customInput={InputGroupInput}
              />
              <InputGroupButton
                disabled={!uiState.item.phone}
                onClick={sendOtpCode}
              >
                <Swap swapped={uiState.item.otpRequestState === PhoneVerify.Request.REQUESTING}>
                  <SwapOn><Spinner className="size-4"/></SwapOn>
                </Swap>
                {t("strings:user.profile.phone.send")}
              </InputGroupButton>
            </InputGroup>
            <AnimatePresence initial={false} mode="popLayout">
              {(uiState.item.otpRequestState === PhoneVerify.Request.SUCCESS) && <motion.div
                key="otp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-row w-full items-center gap-2"
              >
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  containerClassName="mr-auto"
                  value={uiState.item.otpCode}
                  onChange={value => updateUiState({otpCode: value})}
                  disabled={uiState.item.otpResultState === PhoneVerify.Result.VERIFIED}
                >
                  <InputOTPGroup>{Array.from({length: 6}).map((_item, index) => <InputOTPSlot index={index} />)}</InputOTPGroup>
                </InputOTP>
                {otpTimer !== null && uiState.item.otpResultState !== PhoneVerify.Result.VERIFIED && (
                  <span className={otpTimer === 0 ? "text-destructive text-sm" : "text-sm"}>{
                    otpTimer === 0 ?
                      t('strings:user.profile.phone.expired')
                      : `${String(Math.floor(otpTimer / 60)).padStart(2, "0")}:${String(otpTimer % 60).padStart(2, "0")}`}
                        </span>
                )}
                <Button
                  variant="default"
                  disabled={uiState.item.otpCode.length !== 6 || otpTimer === 0 || uiState.item.otpResultState === PhoneVerify.Result.REQUESTING || uiState.item.otpResultState === PhoneVerify.Result.VERIFIED}
                  onClick={verifyOtpCode}
                >
                  <Swap swapped={uiState.item.otpResultState === PhoneVerify.Result.REQUESTING}>
                    <SwapOn><Spinner className="size-4"/></SwapOn>
                    <SwapOff><RiCheckFill /></SwapOff>
                  </Swap>
                  {
                    uiState.item.otpResultState === PhoneVerify.Result.VERIFIED ? t("strings:user.profile.phone.verified") : t("strings:user.profile.phone.verify")
                  }
                </Button>
              </motion.div>}
              {otpRequestErrorMsg && <p className="text-destructive text-sm">{otpRequestErrorMsg}</p>}
              {otpResultErrorMsg && <p className="text-destructive text-sm">{otpResultErrorMsg}</p>}
            </AnimatePresence>
          </Field>
        </FieldGroup>
      </FieldSet>

      <ButtonGroup>
        <MagneticButton
          variant="outline"
          onClick={props.onBack}
        >
          <RiArrowLeftLine/>
          {t("strings:back")}
        </MagneticButton>
        <MagneticButton
          onClick={save}
          disabled={invalid()}
        >
          <Swap swapped={isProgress}>
            <SwapOn><Spinner className="size-4" /> </SwapOn>
            <SwapOff><RiCheckFill /></SwapOff>
          </Swap>
          {t("strings:signup.submit.label")}
        </MagneticButton>
      </ButtonGroup>
    </div>
  )
}
