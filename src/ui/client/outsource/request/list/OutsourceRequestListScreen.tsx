import {createOutsourceRequestRepository} from "@/di/container.ts"
import {useTranslation} from "react-i18next"
import {useNavigate, useParams} from "react-router"
import {useMemo, useState} from "react"
import {
  DataTable,
  Localized, Seo,
  useDateTimeFormatters, useDebouncedSearch,
  useListScreenLifecycle
} from "@ienlab/react-library"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import type {ColumnDef, RowSelectionState} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox.tsx"
import {
  RiSearchLine
} from "@remixicon/react"
import {Badge} from "@/components/ui/badge.tsx"
import {Spinner} from "@/components/ui/spinner.tsx"
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import {motion} from "motion/react"
import {Outsource} from "@/domain/model/Outsource.ts"
import {OutsourceRequestListViewModel} from "@/ui/client/outsource/request/list/OutsourceRequestListViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"

export default function OutsourceRequestListScreen() {
  const {itemId} = useParams<{ itemId: string }>()
  const repository = useMemo(() => createOutsourceRequestRepository(itemId ?? ""), [itemId])
  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceRequestListViewModel.Provider
        id={itemId ?? ""}
        outsourceRequestRepository={repository}
      >
        <ScreenBody itemId={itemId ?? ""}/>
      </OutsourceRequestListViewModel.Provider>
    </>
  )
}

function ScreenBody(props: { itemId: string }) {
  const init = OutsourceRequestListViewModel.use.init()
  const onDisposed = OutsourceRequestListViewModel.use.onDisposed()
  const refresh = OutsourceRequestListViewModel.use.refresh()
  const infoStateList = OutsourceRequestListViewModel.use.requestInfoStateList()
  const loadNextPage = OutsourceRequestListViewModel.use.loadNextPage()
  const setSearchKeyword = OutsourceRequestListViewModel.use.setSearchKeyword()
  const clearSearch = OutsourceRequestListViewModel.use.clearSearch()

  const {t} = useTranslation()
  const navigate = useNavigate()
  const {dateTimeFormat} = useDateTimeFormatters()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleteProgress, setDeleteProgress] = useState(false)
  const [query, setQuery] = useState("")

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const columns: ColumnDef<Outsource.InfoRequest>[] = useMemo(() => [
    {
      id: "select",
      header: ({table}) => (
        <Checkbox
          checked={table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={value => table.toggleAllRowsSelected(!!value)}
          aria-label="select all"
        />
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          onClick={e => e.stopPropagation()}
        />
      ),
      meta: {className: "w-9"}
    },
    {
      header: t("strings:title"),
      accessorFn: row => Localized.get(row.title),
      meta: {className: "min-w-40"}
    },
    {
      header: t("strings:outsource_manage.outsource.info_request.type.label"),
      cell: ({row}) => (
        <Badge variant={Outsource.InfoRequest.Type.getBadgeColor(row.original.type)}>
          {Outsource.InfoRequest.Type.getLabel(t, row.original.type)}
        </Badge>
      )
    },
    {
      header: t("strings:outsource_manage.outsource.info_request.state.label"),
      cell: ({row}) => (
        <Badge variant={Outsource.InfoRequest.State.getBadgeColor(row.original.state)}>{Outsource.InfoRequest.State.getClientLabel(t, row.original.state)}</Badge>
      )
    },
    {
      header: t("strings:outsource_manage.outsource.info_request.deadline.label"),
      accessorFn: row => dateTimeFormat(row.expireAt.toDate())
    }
  ], [t])

  useListScreenLifecycle({location, navigate, init, refresh, onDisposed})
  useDebouncedSearch(query, setSearchKeyword, clearSearch)

  return (
    <>
      <div className="h-full">
        <div className="flex flex-row px-4 items-center gap-4">
          <div className="flex flex-col grow">
            <div>{t("strings:outsource_manage.outsource.info_request.label")}</div>
            {/*todo*/}
            <div className="text-xs text-muted-foreground">{t("strings:content_count", {cnt: 3})}</div>
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
        <AnimatedContent initialized={infoStateList.isInitialized}>
          <div className="overflow-hidden m-4 rounded-lg border">
            <DataTable
              data={[...infoStateList.itemList.values()]}
              columns={columns}
              selectionState={[rowSelection, setRowSelection]}
              getRowId={row => row.id}
              onClick={item => navigate(ClientOutsourceDestination.path.request.detail(props.itemId, item.id))}
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