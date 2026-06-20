import {Seo} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {SectionHeader} from "@/components/custom/shared/SectionHeader.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Checkbox} from "@/components/ui/checkbox.tsx"
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field.tsx"
import {Input} from "@/components/ui/input.tsx"
import {RiArrowLeftLine} from "@remixicon/react"
import {MagneticButton} from "@/components/motion/components.tsx"
import {useNavigate} from "react-router"
import {userRepository} from "@/di/container.ts"
import {SignupViewModel, type SignupDetails} from "@/ui/public/signup/SignupViewModel.ts"


export default function SignupScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:signin.signup")} - ${t("strings:app_name")}`} />
      <SignupViewModel.Provider userRepository={userRepository}>
        <ScreenBody />
      </SignupViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const uiState = SignupViewModel.use.uiState()
  const updateUiState = SignupViewModel.use.updateUiState()
  const updateItem = SignupViewModel.use.updateItem()
  const nextStep = SignupViewModel.use.nextStep()
  const prevStep = SignupViewModel.use.prevStep()

  return (
    <div className="w-full flex flex-col">
      <div className="px-8"><Separator className="bg-foreground" /></div>

      <div className="w-full grid grid-cols-12 gap-y-10 xl:gap-x-10 p-8">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader index={uiState.step} label={t(uiState.step === 1 ? "strings:signup.terms" : "strings:signup.info")} />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          {uiState.step === 1 && (
            <StepTerms
              agreedRequired={uiState.agreedRequired}
              agreedOptional={uiState.agreedOptional}
              onAgreedRequiredChange={checked => updateUiState({ agreedRequired: checked })}
              onAgreedOptionalChange={checked => updateUiState({ agreedOptional: checked })}
              onNext={nextStep}
            />
          )}
          {uiState.step === 2 && (
            <StepInfo
              item={uiState.item}
              onItemChange={updateItem}
              onSubmit={() => {}}
              onBack={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function StepTerms({ agreedRequired, agreedOptional, onAgreedRequiredChange, onAgreedOptionalChange, onNext }: {
  agreedRequired: boolean
  agreedOptional: boolean
  onAgreedRequiredChange: (checked: boolean) => void
  onAgreedOptionalChange: (checked: boolean) => void
  onNext: () => void
}) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-8">
      <div className="large-text-title">{t("strings:signup.agree_terms")}</div>
      <p className="text-muted-foreground">{t("strings:signup.agree_terms_desc")}</p>

      <div className="space-y-4 rounded-lg border p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox checked={agreedRequired} onCheckedChange={onAgreedRequiredChange} />
          <span className="text-sm">{t("strings:signup.agree_required")}</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox checked={agreedOptional} onCheckedChange={onAgreedOptionalChange} />
          <span className="text-sm">{t("strings:signup.agree_optional")}</span>
        </label>
      </div>

      <Button disabled={!agreedRequired} onClick={onNext}>
        {t("strings:next")}
      </Button>
    </div>
  )
}

function StepInfo({ item, onItemChange, onSubmit, onBack }: {
  item: SignupDetails
  onItemChange: (partial: Partial<SignupDetails>) => void
  onSubmit: () => void
  onBack: () => void
}) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-8">
      <div className="large-text-title">{t("strings:signup.enter_info")}</div>
      <p className="text-muted-foreground">{t("strings:signup.enter_info_desc")}</p>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">{t("strings:name")}</FieldLabel>
          <Input
            id="name"
            value={item.name}
            onChange={e => onItemChange({ name: e.target.value })}
            placeholder={t("strings:signup.name_placeholder")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">{t("strings:email")}</FieldLabel>
          <Input
            id="email"
            type="email"
            value={item.email}
            onChange={e => onItemChange({ email: e.target.value })}
            placeholder="m@example.com"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{t("strings:password")}</FieldLabel>
          <Input
            id="password"
            type="password"
            value={item.password}
            onChange={e => onItemChange({ password: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">{t("strings:signup.confirm_password")}</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            value={item.confirmPassword}
            onChange={e => onItemChange({ confirmPassword: e.target.value })}
          />
        </Field>
      </FieldGroup>

      <div className="flex gap-4">
        <MagneticButton variant="outline" onClick={onBack}>
          <RiArrowLeftLine />
          {t("strings:back")}
        </MagneticButton>
        <Button onClick={onSubmit}>
          {t("strings:signup.submit")}
        </Button>
      </div>
    </div>
  )
}
