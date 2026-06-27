import {ImageUploadSortableField, type PageModeProps, Seo, useDateTimeFormatters} from "@ienlab/react-library"
import {Swap, SwapOff, SwapOn} from "@/components/ui/swap.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {useTranslation} from "react-i18next"
import {useNavigate, useParams} from "react-router"
import {useEffect, useState} from "react"
import {
  RiArrowLeftLine,
  RiCheckboxCircleFill,
  RiCloseFill,
  RiDeleteBinFill,
  RiDraftFill,
  RiErrorWarningFill,
  RiSaveFill
} from "@remixicon/react"
import {Button} from "@/components/ui/button.tsx"
import {ButtonGroup} from "@/components/ui/button-group.tsx"
import {Spinner} from "@/components/ui/spinner.tsx"
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/field.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Textarea} from "@/components/ui/textarea.tsx"
import {Card} from "@/components/ui/card.tsx"
import ReactRouterPrompt from "react-router-prompt"
import RouterPromptAlertDialog from "@/components/custom/shared/dialog/RouterPromptAlertDialog.tsx"
import DeleteAlertDialog from "@/components/custom/shared/dialog/DeleteAlertDialog.tsx"
import ForbiddenAlertDialog from "@/components/custom/shared/dialog/ForbiddenAlertDialog.tsx"
import {UploadActionButton} from "@/components/custom/shared/Button.tsx"
import {toast} from "sonner"
import {OutsourceRevisionEditViewModel} from "@/ui/client/outsource/revision/edit/OutsourceRevisionEditViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"
import {MaxValue} from "@/constant/MaxValue.ts"
import {Outsource} from "@/domain/model/Outsource.ts"
import NotFoundScreen from "@/ui/shared/error/NotFoundScreen.tsx"
import ClientRouteErrorScreen from "@/ui/shared/error/ClientRouteErrorScreen.tsx"

export default function OutsourceRevisionEditScreen(props: PageModeProps) {
  const { itemId, revisionId } = useParams<{ itemId: string, revisionId: string }>()

  if (!itemId || !revisionId) {
    return <ClientRouteErrorScreen />
  }

  const { t } = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceRevisionEditViewModel.Provider
        key={`${props.mode}:${itemId}:${revisionId}`}
        id={itemId ?? ""}
        revisionId={revisionId ?? ""}
        mode={props.mode}
      >
        <ScreenBody mode={props.mode} itemId={itemId ?? ""} />
      </OutsourceRevisionEditViewModel.Provider>
    </>
  )
}

function ScreenBody(props: PageModeProps & { itemId: string }) {
  const init = OutsourceRevisionEditViewModel.use.init()
  const onDisposed = OutsourceRevisionEditViewModel.use.onDisposed()
  const infoState = OutsourceRevisionEditViewModel.use.infoState()
  const uiState = OutsourceRevisionEditViewModel.use.uiState()
  const updateUiState = OutsourceRevisionEditViewModel.use.updateUiState()
  const invalid = OutsourceRevisionEditViewModel.use.invalid()
  const save = OutsourceRevisionEditViewModel.use.save()
  const del = OutsourceRevisionEditViewModel.use.del()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { dateTimeFormat } = useDateTimeFormatters()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showForbiddenDialog, setShowForbiddenDialog] = useState(false)
  const [isSaveProgress, setSaveProgress] = useState(false)
  const [isDeleteProgress, setDeleteProgress] = useState(false)

  const onSave = (state: Outsource.RevisionRequest.State) => {
    setSaveProgress(true)
    save(
      state,
      async (id) => {
        setSaveProgress(false)
        toast.success(t("strings:saved_successfully"), { icon: <RiCheckboxCircleFill size={18} /> })
        window.setTimeout(() => navigate(ClientOutsourceDestination.path.revision.list(props.itemId), { replace: true, state: {shouldRefresh: true} }), 300)
      },
      (err) => {
        setSaveProgress(false)
        toast.error(t(err), { icon: <RiErrorWarningFill size={18} /> })
      }
    )
  }

  const onDelete = () => {
    setShowDeleteDialog(false)
    setDeleteProgress(true)
    del(
      () => {
        setDeleteProgress(false)
        navigate(ClientOutsourceDestination.path.revision.list(props.itemId), { replace: true, state: { shouldRefresh: true } })
      },
      (err) => {
        setDeleteProgress(false)
        toast.error(t("strings:error_occurred", { error: err }), { icon: <RiErrorWarningFill size={18} /> })
      }
    )
  }

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  useEffect(() => {
    let timerId: number | undefined
    if (infoState.isInitialized && props.mode === "edit" && infoState.item?.state !== Outsource.RevisionRequest.State.DRAFT) {
      timerId = window.setTimeout(() => setShowForbiddenDialog(true), 500)
    }
    return () => {
      if (timerId) {
        window.clearTimeout(timerId)
      }
    }
  }, [infoState.isInitialized, infoState.item?.state, props.mode])

  return (
    <>
      <div className="h-full">
        <AnimatedContent
          status={(infoState.isInitialized && uiState.isInitialized) ? "content" : "loading"}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-row px-4 items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <RiArrowLeftLine />
            </Button>
            <div className="flex flex-col grow">
              <div>{infoState.item?.title}</div>
            </div>
            <ButtonGroup>
              {infoState.item?.state === Outsource.RevisionRequest.State.DRAFT && <>
                <Button
                  variant="outline"
                  size="default"
                  className="w-9 md:w-auto"
                  disabled={invalid()}
                  onClick={() => onSave(Outsource.RevisionRequest.State.DRAFT)}
                >
                  <Swap swapped={isSaveProgress}>
                    <SwapOn><Spinner className="size-4" /></SwapOn>
                    <SwapOff><RiDraftFill /></SwapOff>
                  </Swap>
                  <div className="hidden md:block">{t("strings:save_draft")}</div>
                </Button>
                <Button
                  variant="default"
                  size="default"
                  className="w-9 md:w-auto"
                  disabled={invalid()}
                  onClick={() => onSave(Outsource.RevisionRequest.State.SENT)}
                >
                  <Swap swapped={isSaveProgress}>
                    <SwapOn><Spinner className="size-4" /></SwapOn>
                    <SwapOff><RiSaveFill /></SwapOff>
                  </Swap>
                  <div className="hidden md:block">{t("strings:save")}</div>
                </Button>
                <Button
                  variant="destructive"
                  size="default"
                  className="w-9 md:w-auto"
                  disabled={props.mode === "create"}
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Swap swapped={isDeleteProgress}>
                    <SwapOn><Spinner className="size-4" /></SwapOn>
                    <SwapOff><RiDeleteBinFill /></SwapOff>
                  </Swap>
                  <div className="hidden md:block">{t("strings:delete")}</div>
                </Button>
              </>}
            </ButtonGroup>
          </div>

          {props.mode === "edit" && <div className="grid grid-cols-1 md:grid-cols-2 mx-4 bg-border rounded-lg border overflow-hidden">
            <div className="grow text-sm flex flex-row justify-between lg:justify-normal">
              <span className="p-2 font-bold w-24 bg-muted/50">{t("strings:create_date")}</span>
              <span className="p-2 bg-background grow">
                {infoState.item?.createAt ? dateTimeFormat(infoState.item.createAt.toDate()) : ""}
              </span>
            </div>
            <div className="grow text-sm flex flex-row justify-between lg:justify-normal">
              <span className="p-2 font-bold w-24 bg-muted/50">{t("strings:update_date")}</span>
              <span className="p-2 bg-background grow">
                {infoState.item?.updateAt ? dateTimeFormat(infoState.item.updateAt.toDate()) : ""}
              </span>
            </div>
          </div>}

          <div className="mx-4 flex flex-col gap-y-8">
            <FieldSet>
              <FieldLegend variant="legend">{t("strings:outsource_manage.outsource.revision_request.label")}</FieldLegend>
              <FieldGroup className="grid grid-cols-1 gap-4">
                <Field>
                  <FieldLabel>{t("strings:title")}</FieldLabel>
                  <Input
                    value={uiState.item.title}
                    onChange={e => updateUiState({ title: e.target.value })}
                    placeholder={t("strings:input_title")}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend variant="legend">{t("strings:outsource_manage.outsource.revision_request.content.label")}</FieldLegend>
              <Field>
                <Textarea
                  value={uiState.item.reason}
                  onChange={e => updateUiState({ reason: e.target.value })}
                  placeholder={t("strings:outsource_manage.outsource.revision_request.content.desc")}
                  className="resize-y min-h-32"
                />
              </Field>
            </FieldSet>
            <FieldSet className="w-full min-w-0">
              <FieldLegend variant="legend">{t("strings:outsource_manage.outsource.revision_request.images.label")}</FieldLegend>
              <ImageUploadSortableField
                id="images"
                label={t("strings:outsource_manage.outsource.revision_request.images.label")}
                descriptionText={t("strings:outsource_manage.outsource.revision_request.images.desc", { cnt: MaxValue.Outsource.RevisionRequest.IMAGES })}
                uploadHintText={t("strings:outsource_manage.outsource.revision_request.images.hint")}
                items={uiState.item.imageUrls}
                onChange={items => updateUiState({ imageUrls: items })}
                components={{
                  Input, Field, FieldLabel, FieldDescription, Card,
                  Button: UploadActionButton,
                  CloseIcon: RiCloseFill
                }}
              />
            </FieldSet>
            <div />
          </div>
        </AnimatedContent>
      </div>

      <ReactRouterPrompt when={uiState.item.isDirty}>
        {({ isActive, onCancel, onConfirm }: { isActive: boolean; onCancel: () => void; onConfirm: () => void }) => (
          <RouterPromptAlertDialog visible={isActive} onVisibleChange={() => onCancel()} onConfirm={onConfirm} />
        )}
      </ReactRouterPrompt>

      <DeleteAlertDialog visible={showDeleteDialog} onVisibleChange={setShowDeleteDialog} onConfirm={onDelete} />

      <ForbiddenAlertDialog
        visible={showForbiddenDialog}
        onAction={() => navigate(ClientOutsourceDestination.path.revision.list(props.itemId), { replace: true })}
      />
    </>
  )
}
