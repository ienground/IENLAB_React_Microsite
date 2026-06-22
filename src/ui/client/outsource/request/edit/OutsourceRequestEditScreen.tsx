import {
  ImageUploadSortableField,
  Localized,
  type PageModeProps,
  Seo,
  useDateTimeFormatters
} from "@ienlab/react-library"
import {Swap, SwapOff, SwapOn} from "@/components/ui/swap.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {useTranslation} from "react-i18next"
import {useNavigate, useParams} from "react-router"
import {useEffect, useMemo, useState} from "react"
import {
  RiArrowLeftLine,
  RiCheckboxCircleFill,
  RiCloseFill,
  RiErrorWarningFill,
  RiLockFill,
  RiSaveFill
} from "@remixicon/react"
import {Button} from "@/components/ui/button.tsx"
import {ButtonGroup} from "@/components/ui/button-group.tsx"
import {Spinner} from "@/components/ui/spinner.tsx"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from "@/components/ui/field.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Card} from "@/components/ui/card.tsx"
import ReactRouterPrompt from "react-router-prompt"
import RouterPromptAlertDialog from "@/components/custom/shared/dialog/RouterPromptAlertDialog.tsx"
import DeleteAlertDialog from "@/components/custom/shared/dialog/DeleteAlertDialog.tsx"
import ForbiddenAlertDialog from "@/components/custom/shared/dialog/ForbiddenAlertDialog.tsx"
import {createOutsourceRequestRepository} from "@/di/container.ts"
import {toast} from "sonner"
import {Outsource} from "@/domain/model/Outsource.ts"
import {OutsourceRequestEditViewModel} from "@/ui/client/outsource/request/edit/OutsourceRequestEditViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"
import {Badge} from "@/components/ui/badge.tsx"
import {UploadActionButton} from "@/components/custom/shared/Button.tsx"
import {OutsourceRequestEditDetails} from "@/domain/model/OutsourceRequestEditDetails.ts"
import {InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea} from "@/components/ui/input-group.tsx"

export default function OutsourceRequestEditScreen(props: PageModeProps) {
  const {itemId, requestId} = useParams<{ itemId: string, requestId: string }>()
  const repository = useMemo(() => createOutsourceRequestRepository(itemId ?? ""), [itemId])
  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceRequestEditViewModel.Provider
        key={`${props.mode}:${itemId}:${requestId}`}
        id={itemId ?? ""}
        requestId={requestId ?? ""}
        mode={props.mode}
        outsourceRequestRepository={repository}
      >
        <ScreenBody
          mode={props.mode}
          itemId={itemId ?? ""}
        />
      </OutsourceRequestEditViewModel.Provider>
    </>
  )
}

function ScreenBody(props: PageModeProps & { itemId: string }) {
  const init = OutsourceRequestEditViewModel.use.init()
  const onDisposed = OutsourceRequestEditViewModel.use.onDisposed()
  const infoState = OutsourceRequestEditViewModel.use.infoState()
  const uiState = OutsourceRequestEditViewModel.use.uiState()
  const updateUiState = OutsourceRequestEditViewModel.use.updateUiState()
  const invalid = OutsourceRequestEditViewModel.use.invalid()
  const save = OutsourceRequestEditViewModel.use.save()
  const del = OutsourceRequestEditViewModel.use.del()

  const {t} = useTranslation()
  const navigate = useNavigate()
  const {dateTimeFormat} = useDateTimeFormatters()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showForbiddenDialog, setShowForbiddenDialog] = useState(false)
  const [isSaveProgress, setSaveProgress] = useState(false)
  const [isDeleteProgress, setDeleteProgress] = useState(false)
  const readOnly = useMemo(() => infoState.item?.state === Outsource.InfoRequest.State.DRAFT || infoState.item?.state === Outsource.InfoRequest.State.RECEIVED, [infoState.item])

  const onSave = (state: Outsource.InfoRequest.State) => {
    setSaveProgress(true)
    save(
      state,
      () => {
        setSaveProgress(false)
        toast.success(t("strings:saved_successfully"), {icon: <RiCheckboxCircleFill size={18}/>})
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
        navigate(ClientOutsourceDestination.path.request.list(props.itemId), {
          replace: true,
          state: {shouldRefresh: true}
        })
      },
      (err) => {
        setDeleteProgress(false)
        toast.error(t("strings:error_occurred", {error: err}), {icon: <RiErrorWarningFill size={18}/>})
      }
    )
  }

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  useEffect(() => {
    if (infoState.isInitialized && props.mode === "edit" && infoState.item?.state === Outsource.InfoRequest.State.DRAFT) {
      setShowForbiddenDialog(true)
    }
  }, [infoState.isInitialized, infoState.item?.state, props.mode])

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
            <div className="flex flex-col grow">
              <div>{infoState.item ? Localized.get(infoState.item.title) : "-"}</div>
            </div>
            <ButtonGroup>
              {!readOnly && <>
                <Button
                  variant="default"
                  size="default"
                  className="w-9 md:w-auto"
                  disabled={invalid()}
                  onClick={() => onSave(Outsource.InfoRequest.State.RECEIVED)}
                >
                  <Swap swapped={isSaveProgress}>
                    <SwapOn><Spinner className="size-4"/></SwapOn>
                    <SwapOff><RiSaveFill/></SwapOff>
                  </Swap>
                  <div className="hidden md:block">{t("strings:save")}</div>
                </Button>
              </>}
            </ButtonGroup>
          </div>

          {props.mode === "edit" &&
            <div className="grid grid-cols-1 md:grid-cols-2 mx-4 bg-border rounded-lg border overflow-hidden">
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
              <div className="grow text-sm flex flex-row justify-between lg:justify-normal">
                <span className="p-2 font-bold w-24 bg-muted/50">{t("strings:outsource_manage.outsource.info_request.deadline.label")}</span>
                <span className="p-2 bg-background grow">
                {infoState.item?.expireAt ? dateTimeFormat(infoState.item.expireAt.toDate()) : "-"}
              </span>
              </div>
              <div className="grow text-sm flex flex-row justify-between lg:justify-normal">
                <span className="p-2 font-bold w-24 bg-muted/50">{t("strings:outsource_manage.outsource.info_request.state.label")}</span>
                <span className="p-2 bg-background grow">
                {infoState.item?.state != null &&
                  <Badge
                    variant={Outsource.InfoRequest.State.getBadgeColor(infoState.item.state)}
                    className="w-fit!"
                  >
                    {Outsource.InfoRequest.State.getClientLabel(t, infoState.item.state)}
                  </Badge>
                }
              </span>
              </div>
            </div>}

          <div className="mx-4 flex flex-col gap-y-8">
            <FieldSet>
              <FieldLegend variant="legend">{t("strings:outsource_manage.outsource.info_request.desc.label")}</FieldLegend>
              <FieldContent>{infoState.item?.reason ? Localized.get(infoState.item.reason) : "-"}</FieldContent>
            </FieldSet>

            {uiState.item.type === Outsource.InfoRequest.Type.TEXT ? (
              <FieldSet>
                <FieldLegend variant="legend">{t("strings:outsource_manage.outsource.info_request.text_items.label")}</FieldLegend>
                {uiState.item.textItems.map((item, index) => (
                  <div className="flex flex-row gap-4">
                    <FieldGroup className="grid grid-cols-1 gap-4 w-full">
                      <Field>
                        <FieldLabel>{Localized.get(item.label)}</FieldLabel>
                        <div className="flex flex-row items-center gap-2">
                          <InputGroup>
                            <InputGroupTextarea
                              className="grow"
                              value={readOnly && item.secure ? t("strings:encrypted") : item.value}
                              onChange={e => {
                                if (readOnly && item.secure) return
                                const items = [...uiState.item.textItems]
                                items[index] = new Outsource.InfoRequest.TextItem({
                                  ...items[index],
                                  value: e.target.value
                                })
                                updateUiState({textItems: items})
                              }}
                              placeholder={t("strings:input_text")}
                              maxLength={item.maxLength ?? undefined}
                              disabled={readOnly}
                            />
                            {readOnly && item.secure
                              ? <InputGroupAddon align="block-end">
                                  <InputGroupText>{t("strings:encrypted")}</InputGroupText>
                                </InputGroupAddon>
                              : <InputGroupAddon align="block-end">
                                  <InputGroupText>{uiState.item.textItems[index].value.length}/{uiState.item.textItems[index].maxLength}</InputGroupText>
                                </InputGroupAddon>
                            }

                          </InputGroup>
                          {item.secure && <RiLockFill className="text-muted-foreground shrink-0"/>}
                        </div>
                      </Field>
                    </FieldGroup>
                  </div>
                ))}
              </FieldSet>
            ) : uiState.item.media && (
              uiState.item.media.allowedType === Outsource.InfoRequest.Media.Type.IMAGE ? <ImageUploadSortableField
                id="media-files"
                disabled={readOnly}
                label={t("strings:type.outsource.info_request.media.type.image.label")}
                uploadHintText={t("strings:outsource_manage.outsource.info_request.media.upload_hint")}
                descriptionText={[
                  infoState.item?.media?.maxCount && t("strings:outsource_manage.outsource.info_request.media.desc.count", { size: infoState.item.media.maxCount }),
                  infoState.item?.media?.maxFileSize && t("strings:outsource_manage.outsource.info_request.media.desc.size", { size: infoState.item.media.maxFileSize }),
                  infoState.item?.media?.aspectRatio && t("strings:outsource_manage.outsource.info_request.media.desc.ratio", { size: infoState.item.media.aspectRatio }),
                  infoState.item?.media?.sizeConstraint && t("strings:outsource_manage.outsource.info_request.media.desc.wh", { size: infoState.item.media.sizeConstraint }),
                ].filter(Boolean).join(", ")}
                items={uiState.item.media.files.map(f => f.image)}
                maxCount={uiState.item.media.maxCount}
                maxFileSizeMB={uiState.item.media?.maxFileSize ? uiState.item.media.maxFileSize : undefined}
                aspectRatio={uiState.item.media?.aspectRatio ? uiState.item.media.aspectRatio.replace(":", "/") : undefined}
                maxSize={uiState.item.media?.sizeConstraint ? uiState.item.media.sizeConstraint : undefined}
                cardHeight="400px"
                onChange={items => {
                  if (uiState.item.media) {
                    const currentFiles = uiState.item.media.files
                    const newFiles = items.map(img => {
                      const existing = currentFiles.find(f => f.image.url === img.url)
                      return existing
                        ? new OutsourceRequestEditDetails.Media.UploadedFile({...existing, image: img})
                        : new OutsourceRequestEditDetails.Media.UploadedFile({image: img})
                    })
                    updateUiState({
                      media: new OutsourceRequestEditDetails.Media({...uiState.item.media, files: newFiles})
                    })
                  }
                }}
                components={{
                  Input,
                  Field,
                  FieldLabel,
                  FieldDescription,
                  Card,
                  Button: UploadActionButton,
                  CloseIcon: RiCloseFill,
                }}
              /> : <></>
            )}
          </div>
        </AnimatedContent>
      </div>

      <ReactRouterPrompt when={uiState.item.isDirty}>
        {({isActive, onCancel, onConfirm}) => (
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

      <ForbiddenAlertDialog
        visible={showForbiddenDialog}
        onAction={() => navigate(ClientOutsourceDestination.path.request.list(props.itemId), {replace: true})}
      />
    </>
  )
}
