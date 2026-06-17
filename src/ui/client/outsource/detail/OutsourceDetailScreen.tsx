import {useNavigate, useParams} from "react-router"
import {
  createOutsourceLogRepository,
  createOutsourceRequestRepository,
  createOutsourceRevisionRepository,
  outsourceRepository
} from "@/di/container.ts"
import {useEffect, useMemo} from "react"
import {Button} from "@/components/ui/button.tsx"
import {
  RiArrowLeftLine,
  RiEditFill,
  RiFileEditFill,
  RiHistoryFill,
  RiInfoCardFill,
} from "@remixicon/react"
import {ButtonGroup} from "@/components/ui/button-group.tsx"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {Localized, Seo, useDateTimeFormatters, useDurationFormatter} from "@ienlab/react-library"
import {Status, StatusIndicator, StatusLabel} from "@/components/ui/status.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Outsource} from "@/domain/model/Outsource.ts"
import {OutsourceDetailViewModel} from "@/ui/client/outsource/detail/OutsourceDetailViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"

export default function OutsourceDetailScreen() {
  const {itemId} = useParams<{ itemId: string }>()
  const logRepo = useMemo(() => createOutsourceLogRepository(itemId ?? ""), [itemId])
  const requestRepo = useMemo(() => createOutsourceRequestRepository(itemId ?? ""), [itemId])
  const revisionRepo = useMemo(() => createOutsourceRevisionRepository(itemId ?? ""), [itemId])
  const { t } = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceDetailViewModel.Provider
        id={itemId ?? ""}
        outsourceRepository={outsourceRepository}
        outsourceLogRepository={logRepo}
        outsourceRequestRepository={requestRepo}
        outsourceRevisionRepository={revisionRepo}
      >
        <ScreenBody/>
      </OutsourceDetailViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const init = OutsourceDetailViewModel.use.init()
  const onDisposed = OutsourceDetailViewModel.use.onDisposed()
  const infoState = OutsourceDetailViewModel.use.infoState()
  const workLogs = OutsourceDetailViewModel.use.workLogs()
  const workLogsInitialized = OutsourceDetailViewModel.use.workLogsInitialized()
  const infoRequests = OutsourceDetailViewModel.use.infoRequests()
  const infoRequestsInitialized = OutsourceDetailViewModel.use.infoRequestsInitialized()
  const revisionRequests = OutsourceDetailViewModel.use.revisionRequests()
  const revisionRequestsInitialized = OutsourceDetailViewModel.use.revisionRequestsInitialized()

  const navigate = useNavigate()
  const {t} = useTranslation()
  const {dateTimeFormat} = useDateTimeFormatters()
  const {minFormat} = useDurationFormatter()

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  return (
    <div className="h-full">
      <AnimatedContent initialized={infoState.isInitialized} className="flex flex-col gap-4">
        <div className="flex flex-row px-4 items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <RiArrowLeftLine/>
          </Button>
          <div className="flex flex-col grow">
            <div>{infoState.item ? Localized.get(infoState.item.title) : "-"}</div>
            <div className="font-mono text-xs text-muted-foreground">
              {infoState.item?.targetCompany ? Localized.get(infoState.item.targetCompany.name) : "-"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4">
          <div className="flex flex-col bg-muted rounded-4xl p-4">
            <div className="text-sm">{t("strings:outsource_manage.outsource.work_logs.latest.label")}</div>
            <div className="mt-4">
              {workLogs.length > 0 ? (
                <>
                  <h2 className="text-lg font-bold truncate">{workLogs[0].title}</h2>
                  <div className="text-sm text-muted-foreground">
                    {dateTimeFormat(workLogs[0].workDate.toDate())}
                  </div>
                </>
              ) : workLogsInitialized ? (
                <div className="text-sm text-muted-foreground">{t("strings:no_data")}</div>
              ) : null}
            </div>
          </div>
          <div
            className="bg-muted rounded-4xl p-4"
          >
            <div className="text-sm">{t("strings:outsource_manage.outsource.info_request.label")}</div>
            <div className="mt-4">
              <h2 className="text-3xl font-bold">-</h2>
              <div className="text-sm text-muted-foreground"></div>
            </div>
          </div>
          <div
            className="bg-muted rounded-4xl p-4"
          >
            <div className="text-sm">{t("strings:outsource_manage.outsource.revision_request.label")}</div>
            <div className="mt-4">
              <h2 className="text-3xl font-bold">-</h2>
              <div className="text-sm text-muted-foreground"></div>
            </div>
          </div>
        </div>
        <div className="grow grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 px-4">
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row items-center gap-x-2">
              <RiHistoryFill size={18}/>
              <div className="mr-auto text-sm">{t("strings:outsource_manage.outsource.work_logs.label")}</div>
              <Button
                variant="ghost" className="text-sm"
                onClick={() => navigate(ClientOutsourceDestination.path.log.list(infoState.item?.id ?? ""))}
              >{t("strings:view_all")}</Button>
            </div>
            <Separator/>
            <div className="flex flex-col gap-2">
              {workLogsInitialized && workLogs.length === 0 ? (
                <div className="text-sm text-muted-foreground py-8 text-center">{t("strings:no_data")}</div>
              ) : (
                workLogs.map(log => (
                  <div
                    key={log.id}
                    className="flex flex-col gap-1 bg-muted rounded-xl p-3 cursor-pointer"
                    onClick={() => navigate(ClientOutsourceDestination.path.log.detail(infoState.item?.id ?? "", log.id))}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <span className="font-medium text-sm truncate grow">{log.title}</span>
                      <Status variant={Outsource.WorkLog.State.getStatusColor(log.state)}>
                        <StatusIndicator/>
                        <StatusLabel>{Outsource.WorkLog.State.getLabel(t, log.state)}</StatusLabel>
                      </Status>
                    </div>
                    <div className="flex flex-row gap-3 text-xs text-muted-foreground">
                      <span>{dateTimeFormat(log.workDate.toDate())}</span>
                      <span>{minFormat(log.durationMinutes)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-x-2">
                <RiInfoCardFill size={18}/>
                <div className="mr-auto text-sm">{t("strings:outsource_manage.outsource.info_request.label")}</div>
                <Button
                  variant="ghost" className="text-sm"
                  onClick={() => navigate(ClientOutsourceDestination.path.request.list(infoState.item?.id ?? ""))}
                >{t("strings:view_all")}</Button>
              </div>
              <Separator/>
              <div className="flex flex-col gap-2">
                {infoRequestsInitialized && infoRequests.length === 0 ? (
                  <div className="text-sm text-muted-foreground py-8 text-center">{t("strings:no_data")}</div>
                ) : (
                  infoRequests.map(req => (
                    <div
                      key={req.id}
                      className="flex flex-col gap-1 bg-muted rounded-xl p-3 cursor-pointer"
                      onClick={() => navigate(ClientOutsourceDestination.path.request.detail(infoState.item?.id ?? "", req.id))}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-medium text-sm truncate grow">{Localized.get(req.title)}</span>
                        <Badge variant={Outsource.InfoRequest.State.getBadgeColor(req.state)}>
                          {Outsource.InfoRequest.State.getClientLabel(t, req.state)}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {dateTimeFormat(req.createAt.toDate())}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-x-2">
                <RiFileEditFill size={18}/>
                <div className="mr-auto text-sm">{t("strings:outsource_manage.outsource.revision_request.label")}</div>
                <Button
                  variant="ghost" className="text-sm"
                  onClick={() => navigate(ClientOutsourceDestination.path.revision.list(infoState.item?.id ?? ""))}
                >{t("strings:view_all")}</Button>
              </div>
              <Separator/>
              <div className="flex flex-col gap-2">
                {revisionRequestsInitialized && revisionRequests.length === 0 ? (
                  <div className="text-sm text-muted-foreground py-8 text-center">{t("strings:no_data")}</div>
                ) : (
                  revisionRequests.map(req => (
                    <div
                      key={req.id}
                      className="flex flex-col gap-1 bg-muted rounded-xl p-3 cursor-pointer"
                      onClick={() => navigate(ClientOutsourceDestination.path.revision.detail(infoState.item?.id ?? "", req.id))}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <span className="font-medium text-sm truncate grow">{req.title}</span>
                        <Status variant={Outsource.RevisionRequest.State.getStatusColor(req.state)}>
                          <StatusIndicator/>
                          <StatusLabel>{Outsource.RevisionRequest.State.getClientLabel(t, req.state)}</StatusLabel>
                        </Status>
                      </div>
                      <div className="flex flex-row gap-3 text-xs text-muted-foreground">
                        <span>{dateTimeFormat(req.createAt.toDate())}</span>
                        {req.amountDelta !== 0 && (
                          <span>{t("strings:money_format", {money: req.amountDelta})}</span>
                        )}
                        {req.dueDateDeltaDays !== 0 && (
                          <span>{t("strings:day_format", {day: req.dueDateDeltaDays})}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </div>
  )
}
