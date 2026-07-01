import {useTranslation} from "react-i18next"
import {useEffect, useMemo} from "react"
import {useNavigate} from "react-router"
import {Localized, Seo, useDateTimeFormatters, useDurationFormatter} from "@ienlab/react-library"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Status, StatusIndicator, StatusLabel} from "@/components/ui/status.tsx"
import {RiArrowRightLine} from "@remixicon/react"
import {Outsource} from "@/domain/model/Outsource.ts"
import {ClientHomeViewModel} from "@/ui/client/home/ClientHomeViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"
import {cn} from "@/lib/utils.ts"

export default function ClientHomeScreen() {
  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:app_name")}`}/>
      <ClientHomeViewModel.Provider>
        <ScreenBody/>
      </ClientHomeViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const init = ClientHomeViewModel.use.init()
  const onDisposed = ClientHomeViewModel.use.onDisposed()
  const userInfoState = ClientHomeViewModel.use.userInfoState()
  const recentOutsourceInfoStateList = ClientHomeViewModel.use.recentOutsourceInfoStateList()
  const workLogEntryInfoStateList = ClientHomeViewModel.use.workLogEntryInfoStateList()

  const navigate = useNavigate()
  const {t} = useTranslation()
  const {dateTimeFormat} = useDateTimeFormatters()
  const {minFormat} = useDurationFormatter()

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      return t('strings:client.greeting.morning')
    } else if (hour >= 12 && hour < 18) {
      return t('strings:client.greeting.lunch')
    } else {
      return t("strings:client.greeting.night")
    }
  }, [t])

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  return (
    <AnimatedContent status={userInfoState.isInitialized ? "content" : "loading"}>
      <div className="h-full overflow-y-auto">
        <div className="flex flex-col gap-6 p-4 md:p-6">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold">
              {t("strings:client.greeting.format", { name: userInfoState.item?.name || "-", greeting })}
            </div>
          </div>

          <AnimatedContent
            status={(recentOutsourceInfoStateList.isInitialized && workLogEntryInfoStateList.isInitialized) ? (recentOutsourceInfoStateList.itemList.length === 0 ? "empty" : "content") : "loading"}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="flex flex-row items-center justify-between mb-3">
                <div className="text-sm font-medium">{t("strings:client.recent_project")}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1"
                  onClick={() => navigate(ClientOutsourceDestination.root)}
                >
                  {t("strings:view_all")} <RiArrowRightLine className="size-3"/>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {recentOutsourceInfoStateList.itemList.map(item => {
                  const entry = workLogEntryInfoStateList.itemList.find(entry => entry.outsourceId === item.id)

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-2 rounded-4xl overflow-hidden"
                    >
                      <div
                        className="flex flex-col gap-2 rounded-md bg-muted p-4 cursor-pointer hover:bg-muted/80 transition-colors"
                        data-cursor="pointer"
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(ClientOutsourceDestination.path.detail(item.id))}
                        onKeyDown={e => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            navigate(ClientOutsourceDestination.path.detail(item.id))
                          }
                        }}
                      >
                        <div className="flex flex-row items-center gap-2">
                          <span className="font-bold text-xl truncate grow">{Localized.get(item.title)}</span>
                          <Badge className={cn(Outsource.Phase.getBadgeColor(item.phase))}>
                            {Outsource.Phase.getLabel(t, item.phase)}
                          </Badge>
                        </div>
                        {item.targetCompany && (
                          <div className="text-xs text-muted-foreground">
                            {Localized.get(item.targetCompany.name)}
                          </div>
                        )}
                        <div className="flex flex-row gap-4 mt-1">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] text-muted-foreground">{t("strings:outsource_manage.outsource.info_request.label")}</span>
                            <span className="text-sm font-medium tabular-nums">{item.infoRequest.sent}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] text-muted-foreground">{t("strings:outsource_manage.outsource.revision_request.label")}</span>
                            <span className="text-sm font-medium tabular-nums">{item.revisionRequest.sent}</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1">
                          {dateTimeFormat(item.createAt.toDate())}
                        </div>
                      </div>
                      {entry?.workLog ? (
                        <div
                          className="flex flex-col gap-2 bg-muted/80 rounded-md p-4 cursor-pointer hover:bg-muted transition-colors"
                          role="button"
                          tabIndex={0}
                          onClick={() => navigate(ClientOutsourceDestination.path.log.detail(entry.outsourceId, entry.workLog!.id))}
                          onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              navigate(ClientOutsourceDestination.path.log.detail(entry.outsourceId, entry.workLog!.id))
                            }
                          }}
                        >
                          <div className="flex flex-row items-center gap-2">
                            <span className="font-medium text-sm truncate grow">{entry.workLog.title}</span>
                            <Status variant={Outsource.WorkLog.State.getStatusColor(entry.workLog.state)}>
                              <StatusIndicator/>
                              <StatusLabel>{Outsource.WorkLog.State.getLabel(t, entry.workLog.state)}</StatusLabel>
                            </Status>
                          </div>
                          <div className="flex flex-row gap-3 text-xs text-muted-foreground">
                            <span>{dateTimeFormat(entry.workLog.workDate.toDate())}</span>
                            <span>{minFormat(entry.workLog.durationMinutes)}</span>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{entry.workLog.content}</div>
                        </div>
                      ) : (
                        <div
                          className="flex flex-col gap-2 bg-muted rounded-xl p-4 opacity-50"
                        >
                          <div className="text-xs text-muted-foreground py-2">{t("strings:outsource_manage.outsource.work_log.no_log")}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </AnimatedContent>
  )
}
