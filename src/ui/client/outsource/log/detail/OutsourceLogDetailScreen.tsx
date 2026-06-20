import {useNavigate, useParams} from "react-router"
import {useEffect, useMemo} from "react"
import {createOutsourceLogRepository} from "@/di/container.ts"
import {useTranslation} from "react-i18next"
import {CrossfadeImage, Seo, useDateTimeFormatters, useDurationFormatter} from "@ienlab/react-library"
import {OutsourceLogDetailViewModel} from "@/ui/client/outsource/log/detail/OutsourceLogDetailViewModel.ts"
import {RiArrowLeftLine} from "@remixicon/react"
import {Outsource} from "@/domain/model/Outsource.ts"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Status, StatusIndicator, StatusLabel} from "@/components/ui/status.tsx"
import {Field, FieldLegend, FieldSet} from "@/components/ui/field.tsx"
import {Carousel} from "motion-plus/react"

export default function OutsourceLogDetailScreen() {
  const {itemId, logId} = useParams<{ itemId: string, logId: string }>()
  const repository = useMemo(() => createOutsourceLogRepository(itemId ?? ""), [itemId])
  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceLogDetailViewModel.Provider
        id={itemId ?? ""}
        logId={logId ?? ""}
        logRepository={repository}
      >
        <ScreenBody />
      </OutsourceLogDetailViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const init = OutsourceLogDetailViewModel.use.init()
  const onDisposed = OutsourceLogDetailViewModel.use.onDisposed()
  const infoState = OutsourceLogDetailViewModel.use.infoState()

  const navigate = useNavigate()
  const {dateTimeFormat} = useDateTimeFormatters()
  const { minFormat } = useDurationFormatter()
  const {t} = useTranslation()

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
                    variant={Outsource.WorkLog.State.getStatusColor(infoState.item.state)}
                  >
                    <StatusIndicator/>
                    <StatusLabel>{Outsource.WorkLog.State.getLabel(t, infoState.item.state)}</StatusLabel>
                  </Status>
                }
              </span>
            </div>
            <div className="grow text-sm flex flex-row justify-between lg:justify-normal">
              <span className="p-2 font-bold w-24 bg-muted/50">{t("strings:outsource_manage.outsource.work_logs.duration")}</span>
              <span className="p-2 bg-background grow">
                {minFormat(infoState.item?.durationMinutes || 0)}
              </span>
            </div>
          </div>

          <div className="mx-4 flex flex-col gap-y-8">
            <FieldSet>
              <FieldLegend variant="legend">{t("strings:outsource_manage.outsource.revision_request.content.label")}</FieldLegend>
              <Field className="min-h-40">
                {infoState.item?.content || "-"}
              </Field>
            </FieldSet>
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
    </>
  )
}