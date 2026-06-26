import {useNavigate, useParams} from "react-router"
import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button.tsx"
import {
  RiArrowLeftLine,
  RiCheckboxCircleFill,
  RiDeleteBinFill,
  RiEditFill,
  RiErrorWarningFill,
  RiSendInsFill
} from "@remixicon/react"
import {ButtonGroup} from "@/components/ui/button-group.tsx"
import {useTranslation} from "react-i18next"
import {CrossfadeImage, Seo, useDateTimeFormatters} from "@ienlab/react-library"
import {Spinner} from "@/components/ui/spinner.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/field.tsx"
import DeleteAlertDialog from "@/components/custom/shared/dialog/DeleteAlertDialog.tsx"
import {toast} from "sonner"
import {Status, StatusIndicator, StatusLabel} from "@/components/ui/status.tsx"
import {Outsource} from "@/domain/model/Outsource.ts"
import {Swap, SwapOff, SwapOn} from "@/components/ui/swap.tsx"
import {Carousel} from "motion-plus/react"
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from "@/components/ui/stepper"
import {useIsMobile} from "@/hooks/use-mobile"
import type {Timestamp} from "firebase/firestore"
import {cn} from "@/lib/utils.ts"
import {
  OutsourceRevisionDetailViewModel
} from "@/ui/client/outsource/revision/detail/OutsourceRevisionDetailViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"

export default function OutsourceRevisionDetailScreen() {
  const {itemId, revisionId} = useParams<{ itemId: string, revisionId: string }>()

  if (!itemId || !revisionId) {
    // todo
    return <div>잘못된 접근입니다.</div>
  }

  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceRevisionDetailViewModel.Provider
        id={itemId}
        revisionId={revisionId}
      >
        <ScreenBody id={itemId}/>
      </OutsourceRevisionDetailViewModel.Provider>
    </>
  )
}

function ScreenBody(props: { id: string }) {
  const init = OutsourceRevisionDetailViewModel.use.init()
  const onDisposed = OutsourceRevisionDetailViewModel.use.onDisposed()
  const infoState = OutsourceRevisionDetailViewModel.use.infoState()
  const del = OutsourceRevisionDetailViewModel.use.del()
  const updateState = OutsourceRevisionDetailViewModel.use.updateState()

  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const {dateTimeFormat} = useDateTimeFormatters()
  const {t, i18n} = useTranslation()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isProgress, setProgress] = useState(false)

  const onDelete = () => {
    setShowDeleteDialog(false)
    setProgress(true)
    del(
      () => {
        setProgress(false)
        navigate(ClientOutsourceDestination.path.revision.list(props.id), {replace: true, state: {shouldRefresh: true}})
      },
      (err) => {
        setProgress(false)
        toast.error(t("strings:error_occurred", {error: err}), {icon: <RiErrorWarningFill size={18}/>})
      }
    )
  }

  const onUpdateState = (state: Outsource.RevisionRequest.State) => {
    setProgress(true)
    updateState(state)
      .then(() => {
        setProgress(false)
        toast.success(t("strings:saved_successfully"), {icon: <RiCheckboxCircleFill size={18}/>})
      })
      .catch(e => {
        setProgress(false)
        toast.error(t("strings:error_occurred", {error: e}), {icon: <RiErrorWarningFill size={18}/>})
      })
  }

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  return (
    <>
      <div className="h-full">
        <AnimatedContent
          initialized={infoState.isInitialized}
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
              <div>{infoState.item ? infoState.item.title : "-"}</div>
            </div>
            <ButtonGroup>
              {infoState.item?.state === Outsource.RevisionRequest.State.DRAFT && <>
                <Button
                  variant="secondary"
                  size="default"
                  className="w-9 md:w-auto"
                  onClick={() => onUpdateState(Outsource.RevisionRequest.State.SENT)}
                >
                  <Swap swapped={isProgress}>
                    <SwapOn><Spinner className="size-4"/></SwapOn>
                    <SwapOff><RiSendInsFill /></SwapOff>
                  </Swap>
                  <div className="hidden md:block">{t("strings:send")}</div>
                </Button>
                <Button
                  variant="default"
                  size="default"
                  className="w-9 md:w-auto"
                  onClick={() => infoState.item?.id && navigate(ClientOutsourceDestination.path.revision.edit(props.id, infoState.item.id))}
                >
                  <RiEditFill />
                  <div className="hidden md:block">{t("strings:edit")}</div>
                </Button>
                <Button
                  variant="destructive"
                  size="default"
                  className="w-9 md:w-auto"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Swap swapped={isProgress}>
                    <SwapOn><Spinner className="size-4"/></SwapOn>
                    <SwapOff><RiDeleteBinFill/></SwapOff>
                  </Swap>
                  <div className="hidden md:block">{t("strings:delete")}</div>
                </Button>
              </>}
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
            <div className="grow text-sm flex flex-row justify-between lg:justify-normal">
              <span className="p-2 font-bold w-24 bg-muted/50">{t("strings:outsource_manage.outsource.revision_request.state.label")}</span>
              <span className="p-2 bg-background grow">
                {infoState.item?.state != null &&
                  <Status
                    className="w-fit!"
                    variant={Outsource.RevisionRequest.State.getStatusColor(infoState.item.state)}
                  >
                    <StatusIndicator/>
                    <StatusLabel>{Outsource.RevisionRequest.State.getClientLabel(t, infoState.item.state)}</StatusLabel>
                  </Status>
                }
              </span>
            </div>
          </div>

          <div className="mx-4 flex flex-col gap-y-8">
            <FieldSet>
              <FieldLegend variant="legend">{t("strings:outsource_manage.outsource.revision_request.content.label")}</FieldLegend>
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>{t("strings:title")}</FieldLabel>
                  <FieldDescription>{infoState.item?.title || "-"}</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel>{t("strings:outsource_manage.outsource.revision_request.reason.label")}</FieldLabel>
                  <FieldDescription>{infoState.item?.reason || "-"}</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Stepper
              value={String(infoState.item?.state)}
              orientation={isMobile ? "vertical" : "horizontal"}
              nonInteractive
            >
              <StepperList>
                {Outsource.RevisionRequest.State.valuesNoDraft.map(item => {
                  const date = getStateDate(item, infoState.item)
                  return (
                    <StepperItem
                      key={item}
                      value={String(item)}
                    >
                      <StepperTrigger className={cn(isMobile ? "not-last:pb-6" : "")}>
                        <StepperIndicator/>
                        <div className="flex flex-col gap-1">
                          <StepperTitle>{Outsource.RevisionRequest.State.getAdminLabel(t, item)}</StepperTitle>
                          <StepperDescription className="min-w-40">{date ? dateTimeFormat(date) : "-"}</StepperDescription>
                        </div>
                      </StepperTrigger>
                      <StepperSeparator className={cn(isMobile ? "absolute inset-y-0 top-5 left-3.5 -z-10 -order-1 h-full -translate-x-1/2" : "")}/>
                    </StepperItem>
                  )
                })}
              </StepperList>
            </Stepper>
            <FieldSet>
              <FieldLegend variant="legend">{t("strings:outsource_manage.outsource.revision_request.images.label")}</FieldLegend>
              <Carousel
                loop={false}
                overflow
                items={infoState.item?.imageUrls?.map(item => (
                  <CrossfadeImage
                    key={item}
                    src={item}
                    className="h-120 rounded-2xl"
                    draggable={false}
                  />
                )) || []}
              />
            </FieldSet>
            <div/>
          </div>
        </AnimatedContent>
      </div>
      <DeleteAlertDialog
        visible={showDeleteDialog}
        onVisibleChange={setShowDeleteDialog}
        onConfirm={onDelete}
      />
    </>
  )
}

function getStateDate(state: Outsource.RevisionRequest.State, item: Outsource.RevisionRequest | null) {
  let result: Timestamp | null | undefined = null
  switch (state) {
    case Outsource.RevisionRequest.State.DRAFT:
      result = null
      break
    case Outsource.RevisionRequest.State.SENT:
      result = item?.sentAt
      break
    case Outsource.RevisionRequest.State.APPROVED:
      result = item?.approvedAt
      break
    case Outsource.RevisionRequest.State.REJECTED:
      result = item?.rejectedAt
      break
    case Outsource.RevisionRequest.State.APPLIED:
      result = item?.appliedAt
      break
  }

  return result ? result.toDate() : null
}