import {useTranslation} from "react-i18next"
import {useLocation, useNavigate} from "react-router"
import {useMemo, useState} from "react"
import {DataTable, Localized, Seo, useDebouncedSearch, useListScreenLifecycle} from "@ienlab/react-library"
import {Swap, SwapOff, SwapOn} from "@/components/ui/swap.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import type {ColumnDef, RowSelectionState} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox.tsx"
import {RiDeleteBinFill, RiSearchLine} from "@remixicon/react"
import {Badge} from "@/components/ui/badge.tsx"
import {ButtonGroup} from "@/components/ui/button-group.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Spinner} from "@/components/ui/spinner.tsx"
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import {motion} from "motion/react"
import {Outsource} from "@/domain/model/Outsource.ts"
import {cn} from "@/lib/utils.ts"
import {OutsourceListViewModel} from "@/ui/client/outsource/list/OutsourceListViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"

export default function OutsourceListScreen() {
  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceListViewModel.Provider>
        <ScreenBody/>
      </OutsourceListViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const init = OutsourceListViewModel.use.init()
  const onDisposed = OutsourceListViewModel.use.onDisposed()
  const refresh = OutsourceListViewModel.use.refresh()
  const infoStateList = OutsourceListViewModel.use.outsourceInfoStateList()
  const companyInfoState = OutsourceListViewModel.use.companyInfoState()
  const loadNextPage = OutsourceListViewModel.use.loadNextPage()
  const setSearchKeyword = OutsourceListViewModel.use.setSearchKeyword()
  const clearSearch = OutsourceListViewModel.use.clearSearch()

  const {t} = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleteProgress, setDeleteProgress] = useState(false)
  const [query, setQuery] = useState("")

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const columns: ColumnDef<Outsource>[] = useMemo(() => [
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
      accessorFn: row => Localized.get(row.title)
    },
    {
      header: t("strings:outsource_manage.company.label"),
      accessorFn: row => row.targetCompany ? Localized.get(row.targetCompany.name) : "-"
    },
    {
      header: t("strings:outsource_manage.outsource.state.label"),
      cell: ({row}) => (
        <Badge variant={Outsource.State.getBadgeColor(row.original.state)}>{Outsource.State.getLabel(t, row.original.state)}</Badge>
      )
    },
    {
      header: t("strings:outsource_manage.outsource.phase.label"),
      cell: ({row}) => (
        <Badge className={cn(Outsource.Phase.getBadgeColor(row.original.phase))}>{Outsource.Phase.getLabel(t, row.original.phase)}</Badge>
      )
    },
  ], [t])

  useListScreenLifecycle({location, navigate, init, refresh, onDisposed})
  useDebouncedSearch(query, setSearchKeyword, clearSearch)

  return (
    <>
      <div className="h-full">
        <div className="flex flex-row px-4 items-center gap-4">
          <div className="flex flex-col grow">
            <div>{t("strings:outsource_manage.outsource.label")}</div>
            <div className="text-xs text-muted-foreground">{t("strings:content_count", {cnt: companyInfoState.item?.outsource ?? 0})}</div>
          </div>
          <ButtonGroup>
            <Button
              variant="destructive"
              size="default"
              className="w-9 md:w-auto"
              disabled={!Object.values(rowSelection).some(Boolean)}
              onClick={() => setShowDeleteDialog(true)}
            >
              <Swap swapped={isDeleteProgress}>
                <SwapOn><Spinner className="size-4"/></SwapOn>
                <SwapOff><RiDeleteBinFill/></SwapOff>
              </Swap>
              <div className="hidden md:block">{t("strings:delete")}</div>
            </Button>
          </ButtonGroup>
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
              onClick={item => navigate(ClientOutsourceDestination.path.detail(item.id))}
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