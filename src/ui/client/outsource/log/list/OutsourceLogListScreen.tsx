import {useTranslation} from "react-i18next"
import {useNavigate, useParams} from "react-router"
import {useMemo, useState} from "react"
import {
  DataTable,
  Seo,
  useDateTimeFormatters,
  useDebouncedSearch,
  useDurationFormatter,
  useListScreenLifecycle
} from "@ienlab/react-library"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import type {ColumnDef, RowSelectionState} from "@tanstack/react-table"
import {RiSearchLine} from "@remixicon/react"
import {Spinner} from "@/components/ui/spinner.tsx"
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import {motion} from "motion/react"
import {Outsource} from "@/domain/model/Outsource.ts"
import {Status, StatusIndicator, StatusLabel} from "@/components/ui/status.tsx"
import {OutsourceLogListViewModel} from "@/ui/client/outsource/log/list/OutsourceLogListViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"
import {container} from "@/di/container.ts"
import ClientRouteErrorScreen from "@/ui/shared/error/ClientRouteErrorScreen.tsx"

export default function OutsourceLogListScreen() {
  const {itemId} = useParams<{ itemId: string }>()

  if (!itemId) {
    return <ClientRouteErrorScreen />
  }

  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceLogListViewModel.Provider
        id={itemId}
      >
        <ScreenBody itemId={itemId}/>
      </OutsourceLogListViewModel.Provider>
    </>
  )
}

function ScreenBody(props: { itemId: string }) {
  const init = OutsourceLogListViewModel.use.init()
  const onDisposed = OutsourceLogListViewModel.use.onDisposed()
  const refresh = OutsourceLogListViewModel.use.refresh()
  const infoStateList = OutsourceLogListViewModel.use.logInfoStateList()
  const infoState = OutsourceLogListViewModel.use.infoState()
  const loadNextPage = OutsourceLogListViewModel.use.loadNextPage()
  const setSearchKeyword = OutsourceLogListViewModel.use.setSearchKeyword()
  const clearSearch = OutsourceLogListViewModel.use.clearSearch()

  const {t} = useTranslation()
  const navigate = useNavigate()
  const {dateTimeFormat} = useDateTimeFormatters()
  const {minFormat} = useDurationFormatter()
  const [query, setQuery] = useState("")

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const columns: ColumnDef<Outsource.WorkLog>[] = useMemo(() => [
    {
      header: t("strings:title"),
      accessorFn: row => row.title,
      meta: {className: "min-w-40"}
    },
    {
      header: t("strings:outsource_manage.outsource.work_logs.date"),
      accessorFn: row => dateTimeFormat(row.workDate.toDate())
    },
    {
      header: t("strings:outsource_manage.outsource.work_logs.duration"),
      accessorFn: row => minFormat(row.durationMinutes)
    },
    {
      header: t("strings:outsource_manage.outsource.work_logs.state.label"),
      cell: ({row}) => (
        <Status variant={Outsource.WorkLog.State.getStatusColor(row.original.state)}>
          <StatusIndicator/>
          <StatusLabel>{Outsource.WorkLog.State.getLabel(t, row.original.state)}</StatusLabel>
        </Status>
      )
    }
  ], [t])

  useListScreenLifecycle({location, navigate, init, refresh, onDisposed})
  useDebouncedSearch(query, setSearchKeyword, clearSearch)

  return (
    <>
      <div className="h-full">
        <div className="flex flex-row px-4 items-center gap-4">
          <div className="flex flex-col grow">
            <div>{t("strings:outsource_manage.outsource.work_logs.label")}</div>
            <div className="text-xs text-muted-foreground">{t("strings:content_count", {cnt: infoState.item?.workLog ?? 0})}</div>
          </div>
          <InputGroup className="max-w-2/5 md:max-w-1/4">
            <InputGroupInput
              placeholder={t("strings:search_placeholder")}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <RiSearchLine className="text-muted-foreground"/>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <AnimatedContent
          status={infoStateList.isInitialized ? (infoStateList.itemList.size === 0 ? "empty" : "content") : "loading"}
        >
          <div className="overflow-hidden m-4 rounded-lg border">
            <DataTable
              data={[...infoStateList.itemList.values()]}
              columns={columns}
              selectionState={[rowSelection, setRowSelection]}
              getRowId={row => row.id}
              onClick={item => navigate(ClientOutsourceDestination.path.log.detail(props.itemId, item.id))}
              components={{Table, TableHeader, TableBody, TableRow, TableHead, TableCell}}
            />
          </div>
          {infoStateList.hasMore ? (
            <motion.div
              className="w-full flex flex-row items-center justify-center"
              onViewportEnter={loadNextPage}
            >
              <Spinner className="size-9"/>
            </motion.div>
          ) : <div className="w-full text-center text-sm text-muted-foreground">{t("strings:list_end")}</div>}
        </AnimatedContent>
      </div>
    </>
  )
}