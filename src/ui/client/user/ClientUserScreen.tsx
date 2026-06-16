import {useNavigate, useParams} from "react-router"
import {useEffect, useMemo, useRef, useState} from "react"
import {Spinner} from "@/components/ui/spinner.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {Button} from "@/components/ui/button.tsx"
import {
  RiArrowLeftLine,
  RiCheckboxCircleFill, RiCheckFill, RiCloseFill,
  RiDeleteBinFill,
  RiErrorWarningFill,
  RiSaveFill, RiSendInsFill, RiVerifiedBadgeFill,

} from "@remixicon/react"
import {ButtonGroup, ButtonGroupText} from "@/components/ui/button-group.tsx"
import {useTranslation} from "react-i18next"
import {
  ImageUploadField,
  Localized, PhoneVerify, Seo,
  useDateTimeFormatters, useDebouncedSearch,
} from "@ienlab/react-library"
import {Swap, SwapOff, SwapOn} from "@/components/ui/swap.tsx"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field.tsx"
import {Input} from "@/components/ui/input.tsx"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx"
import RouterPromptAlertDialog from "@/components/custom/shared/dialog/RouterPromptAlertDialog.tsx"
import DeleteAlertDialog from "@/components/custom/shared/dialog/DeleteAlertDialog.tsx"
import ReactRouterPrompt from "react-router-prompt"
import {toast} from "sonner"
import {User} from "@/domain/model/User.ts"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {Company} from "@/domain/model/Company.ts"
import {companyRepository, userRepository} from "@/di/container.ts"
import {PatternFormat} from "react-number-format"
import {UploadActionButton} from "@/components/custom/shared/Button.tsx"
import {ClientUserViewModel} from "@/ui/client/user/ClientUserViewModel.ts"
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp.tsx"
import {REGEXP_ONLY_DIGITS} from "input-otp"
import {AnimatePresence, motion} from "motion/react"
import {InputGroup, InputGroupButton, InputGroupInput} from "@/components/ui/input-group.tsx"

export default function ClientUserScreen() {
  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.user.label")} - ${t("strings:app_name")}`}/>
      <ClientUserViewModel.Provider
        userRepository={userRepository}
        companyRepository={companyRepository}
      >
        <ScreenBody/>
      </ClientUserViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const init = ClientUserViewModel.use.init()
  const onDisposed = ClientUserViewModel.use.onDisposed()
  const infoState = ClientUserViewModel.use.infoState()
  const uiState = ClientUserViewModel.use.uiState()
  const companyInfoStateList = ClientUserViewModel.use.companyInfoStateList()
  const updateUiState = ClientUserViewModel.use.updateUiState()
  const invalid = ClientUserViewModel.use.invalid()
  const save = ClientUserViewModel.use.save()
  const del = ClientUserViewModel.use.del()
  const sendOtpCode = ClientUserViewModel.use.sendOtpCode()
  const verifyOtpCode = ClientUserViewModel.use.verifyOtpCode()
  const loadNextCompanyPage = ClientUserViewModel.use.loadNextCompanyPage()
  const setCompanySearchKeyword = ClientUserViewModel.use.setCompanySearchKeyword()
  const clearCompanySearch = ClientUserViewModel.use.clearCompanySearch()

  const {t, i18n} = useTranslation()
  const navigate = useNavigate()
  const {dateTimeFormat} = useDateTimeFormatters()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isSaveProgress, setSaveProgress] = useState(false)
  const [isDeleteProgress, setDeleteProgress] = useState(false)
  const [query, setQuery] = useState("")
  const [otpTimer, setOtpTimer] = useState<number | null>(null)
  const prevEmailRef = useRef(uiState.item.email)

  const onSave = () => {
    setSaveProgress(true)
    const emailChanged = uiState.item.email !== prevEmailRef.current
    save(
      async (id) => {
        setSaveProgress(false)
        toast.success(t("strings:saved_successfully"), {icon: <RiCheckboxCircleFill size={18}/>})
        if (emailChanged) {
          prevEmailRef.current = uiState.item.email
          toast.success(t("strings:user.profile.phone.verification_email_sent"))
        }
      },
      (err) => {
        setSaveProgress(false)
        toast.error(t(err), {icon: <RiErrorWarningFill size={18}/>})
      }
    )
  }

  const onDelete = () => {
    setShowDeleteDialog(false)
    setDeleteProgress(true)
    del(
      () => {
        setDeleteProgress(false)
        // navigate(UserDestination.root, {replace: true, state: {shouldRefresh: true}})
      },
      (err) => {
        setDeleteProgress(false)
        toast.error(t("strings:error_occurred", {error: err}), {icon: <RiErrorWarningFill size={18}/>})
      }
    )
  }

  const onSendOtpCode = () => {
    setOtpTimer(300)
    sendOtpCode(
      () => {},
      errorKey => toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18}/>})
    )
  }

  const onVerifyOtpCode = () => {
    verifyOtpCode(
      (result) => {
        if (result === PhoneVerify.Result.VERIFIED) {
          setOtpTimer(null)
        }
      },
      errorKey => toast.error(t(errorKey), {icon: <RiErrorWarningFill size={18}/>})
    )
  }

  const otpRequestErrorMsg = PhoneVerify.Request.getMessage(t, uiState.item.otpRequestState)
  const otpResultErrorMsg = PhoneVerify.Result.getMessage(t, uiState.item.otpResultState)

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  useEffect(() => {
    if (uiState.isInitialized) {
      prevEmailRef.current = uiState.item.email
    }
  }, [uiState.isInitialized])

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
    <>
      <div className="h-full">
        <AnimatedContent
          initialized={infoState.isInitialized && uiState.isInitialized}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-row px-4 items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <RiArrowLeftLine/>
            </Button>
            <div className="flex flex-col grow" />
            <ButtonGroup>
              <Button
                variant="default"
                size="default"
                className="w-9 md:w-auto"
                disabled={invalid()}
                onClick={onSave}
              >
                <Swap swapped={isSaveProgress}>
                  <SwapOn><Spinner className="size-4"/></SwapOn>
                  <SwapOff><RiSaveFill/></SwapOff>
                </Swap>
                <div className="hidden md:block">{t("strings:save")}</div>
              </Button>
            </ButtonGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mx-4 bg-border rounded-lg border overflow-hidden">
            <div className="grow text-sm flex flex-row justify-between lg:justify-normal">
              <span className="p-2 font-bold w-24 bg-muted/50">{t("strings:create_date")}</span>
              <span className="p-2 bg-background grow">
                  {infoState.item ? dateTimeFormat(infoState.item?.createAt.toDate()) : ""}
                </span>
            </div>
            <div className="grow text-sm flex flex-row justify-between lg:justify-normal">
              <span className="p-2 font-bold w-24 bg-muted/50">{t("strings:update_date")}</span>
              <span className="p-2 bg-background grow">
                  {infoState.item ? dateTimeFormat(infoState.item.updateAt?.toDate()) : ""}
                </span>
            </div>
          </div>

          <div className="mx-4 flex flex-col gap-y-8">
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
                      <ComboboxList>
                        {(item: Company) => (
                          <ComboboxItem
                            key={item.id}
                            value={item.id}
                            onClick={() => {
                              updateUiState({
                                company: item,
                                companyRef: item.ref,
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
                      disabled={!uiState.item.phone || infoState.item?.phone === uiState.item.phone}
                      onClick={onSendOtpCode}
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
                        onClick={onVerifyOtpCode}
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
                <Field>
                  <FieldLabel>{t("strings:outsource_manage.user.email.label")}</FieldLabel>
                  <Input
                    value={uiState.item.email}
                    onChange={e => updateUiState({email: e.target.value})}
                    type="email"
                    placeholder={t("strings:input_email")}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <div/>
          </div>
        </AnimatedContent>
      </div>

      <ReactRouterPrompt when={uiState.item.isDirty}>
        {({isActive, onCancel, onConfirm}: { isActive: boolean; onCancel: () => void; onConfirm: () => void }) => (
          <RouterPromptAlertDialog
            visible={isActive}
            onVisibleChange={() => onCancel()}
            onConfirm={onConfirm}
          />
        )}
      </ReactRouterPrompt>

      <DeleteAlertDialog
        visible={showDeleteDialog}
        onVisibleChange={setShowDeleteDialog}
        onConfirm={onDelete}
      />
    </>
  )
}