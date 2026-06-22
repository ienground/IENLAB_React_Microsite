import {useNavigate, useParams} from "react-router"
import {
  createOutsourceLogRepository,
  createOutsourceRequestRepository,
  createOutsourceRevisionRepository, estimateRepository,
  outsourceRepository
} from "@/di/container.ts"
import {type ReactNode, useCallback, useEffect, useMemo} from "react"
import {Button} from "@/components/ui/button.tsx"
import {RiArrowLeftLine, RiFileEditFill, RiHistoryFill, RiInfoCardFill,} from "@remixicon/react"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {Localized, Seo, useDateTimeFormatters, useDurationFormatter} from "@ienlab/react-library"
import {Status, StatusIndicator, StatusLabel} from "@/components/ui/status.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Outsource} from "@/domain/model/Outsource.ts"
import {OutsourceDetailViewModel} from "@/ui/client/outsource/detail/OutsourceDetailViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"
import {Portfolio} from "@/domain/model/Portfolio.ts"
import {cn} from "@/lib/utils.ts"
import type {Timestamp} from "firebase/firestore"

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
        estimateRepository={estimateRepository}
      >
        <ScreenBody/>
      </OutsourceDetailViewModel.Provider>
    </>
  )
}

function getStateDate(item: Outsource) {
  switch (item.state) {
    case Outsource.State.PAUSED: return item.pausedAt
    case Outsource.State.CANCELLED: return item.cancelledAt
    default: return null
  }
}

function getPhaseDate(item: Outsource) {
  switch (item.phase) {
    case Outsource.Phase.QUOTING: return item.quotedAt
    case Outsource.Phase.CONTRACT_PENDING: return item.contractedAt
    case Outsource.Phase.IN_PROGRESS: return item.startedAt
    case Outsource.Phase.WAITING_CLIENT: return item.waitingClientAt
    case Outsource.Phase.COMPLETED: return item.completedAt
    default: return null
  }
}

function ScreenBody() {
  const init = OutsourceDetailViewModel.use.init()
  const onDisposed = OutsourceDetailViewModel.use.onDisposed()
  const infoState = OutsourceDetailViewModel.use.infoState()
  const estimateInfoState = OutsourceDetailViewModel.use.estimateInfoState()
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

  const stateDate = infoState.item ? getStateDate(infoState.item) : null
  const phaseDate = infoState.item ? getPhaseDate(infoState.item) : null

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  const formatDate = useCallback((date: Timestamp | null) => {
    return date ? dateTimeFormat(date.toDate()) : ""
  }, [dateTimeFormat])

  const item = infoState.item

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
        <div className="mx-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <DetailCard label={t("strings:website_manage.portfolio.platform.label")}>
            <div className="flex flex-row flex-wrap gap-1">
              {item?.platforms.map(p => (
                <Badge
                  key={p}
                  className={cn(Portfolio.Platform.getBadgeColor(p))}
                >
                  {Portfolio.Platform.getLabel(t, p)}
                </Badge>
              ))}
              {(!item?.platforms || item.platforms.length === 0) && (
                <span className="text-sm text-muted-foreground">-</span>
              )}
            </div>
          </DetailCard>

          <DetailCard label={t("strings:outsource_manage.outsource.state.label")}>
            <div className="flex flex-row items-center gap-2">
              <Badge variant={Outsource.State.getBadgeColor(item?.state ?? Outsource.State.Default)}>
                {Outsource.State.getLabel(t, item?.state ?? Outsource.State.Default)}
              </Badge>
              <span className="text-sm text-muted-foreground">{formatDate(stateDate)}</span>
            </div>
          </DetailCard>

          <DetailCard label={t("strings:outsource_manage.outsource.phase.label")}>
            <div className="flex flex-row items-center gap-2">
              <Badge className={cn(Outsource.Phase.getBadgeColor(item?.phase ?? Outsource.Phase.Default))}>
                {Outsource.Phase.getLabel(t, item?.phase ?? Outsource.Phase.Default)}
              </Badge>
              <span className="text-sm text-muted-foreground">{formatDate(phaseDate)}</span>
            </div>
          </DetailCard>

          <DetailCard label={t("strings:outsource_manage.outsource.deadline.label")}>
            <span className="text-sm">{formatDate(item?.dueAt ?? null)}</span>
          </DetailCard>

          <DetailCard label={t("strings:outsource_manage.outsource.estimate.label")}>
            {estimateInfoState.item ? (
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm font-medium">{t("strings:money_format", {money: estimateInfoState.item?.totalAmount || estimateInfoState.item?.budget || 0, currency: "KRW"})}</span>
                {/*<Button*/}
                {/*  variant="ghost"*/}
                {/*  size="icon-sm"*/}
                {/*  onClick={() => item?.estimateRef && navigate(EstimateDestination.path.edit(item.estimateRef.id))}*/}
                {/*>*/}
                {/*  <RiExternalLinkLine/>*/}
                {/*</Button>*/}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">{t("strings:no_data")}</span>
            )}
          </DetailCard>
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
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(ClientOutsourceDestination.path.log.detail(infoState.item?.id ?? "", log.id))}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        navigate(ClientOutsourceDestination.path.log.detail(infoState.item?.id ?? "", log.id))
                      }
                    }}
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
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(ClientOutsourceDestination.path.request.edit(infoState.item?.id ?? "", req.id))}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          navigate(ClientOutsourceDestination.path.request.edit(infoState.item?.id ?? "", req.id))
                        }
                      }}
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
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(ClientOutsourceDestination.path.revision.detail(infoState.item?.id ?? "", req.id))}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          navigate(ClientOutsourceDestination.path.revision.detail(infoState.item?.id ?? "", req.id))
                        }
                      }}
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

function DetailCard({label, children}: { label: string, children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 bg-muted rounded-xl p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div>{children}</div>
    </div>
  )
}

