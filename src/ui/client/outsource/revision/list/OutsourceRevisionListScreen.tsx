import {
  createOutsourceRevisionRepository
} from "@/di/container.ts"
import {useTranslation} from "react-i18next"
import {useNavigate, useParams} from "react-router"
import {useMemo, useState} from "react"
import {
  DataTable,
  Seo,
  useDateTimeFormatters, useDebouncedSearch,
  useListScreenLifecycle
} from "@ienlab/react-library"
import {Swap, SwapOff, SwapOn} from "@/components/ui/swap.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import type {ColumnDef, RowSelectionState} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox.tsx"
import {
  RiCheckboxCircleFill,
  RiDeleteBinFill, RiErrorWarningFill, RiSearchLine
} from "@remixicon/react"
import {toast} from "sonner"
import {ButtonGroup} from "@/components/ui/button-group.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Spinner} from "@/components/ui/spinner.tsx"
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import {motion} from "motion/react"
import DeleteAlertDialog from "@/components/custom/shared/dialog/DeleteAlertDialog.tsx"
import {Outsource} from "@/domain/model/Outsource.ts"
import {Status, StatusIndicator, StatusLabel} from "@/components/ui/status"
import {OutsourceRevisionListViewModel} from "@/ui/client/outsource/revision/list/OutsourceRevisionListViewModel.ts"
import {ClientOutsourceDestination} from "@/ui/client/outsource/ClientOutsourceDestination.ts"

export default function OutsourceRevisionListScreen() {
  const {itemId} = useParams<{ itemId: string }>()
  const repository = useMemo(() => createOutsourceRevisionRepository(itemId ?? ""), [itemId])
  const {t} = useTranslation()
  return (
    <>
      <Seo title={`${t("strings:outsource_manage.outsource.label")} - ${t("strings:app_name")}`}/>
      <OutsourceRevisionListViewModel.Provider
        id={itemId ?? ""}
        revisionRepository={repository}
      >
        <ScreenBody itemId={itemId ?? ""}/>
      </OutsourceRevisionListViewModel.Provider>
    </>
  )
}

function ScreenBody(props: { itemId: string }) {
  const init = OutsourceRevisionListViewModel.use.init()
  const onDisposed = OutsourceRevisionListViewModel.use.onDisposed()
  const refresh = OutsourceRevisionListViewModel.use.refresh()
  const infoStateList = OutsourceRevisionListViewModel.use.requestInfoStateList()
  const loadNextPage = OutsourceRevisionListViewModel.use.loadNextPage()
  const deleteItems = OutsourceRevisionListViewModel.use.deleteItems()
  const setSearchKeyword = OutsourceRevisionListViewModel.use.setSearchKeyword()
  const clearSearch = OutsourceRevisionListViewModel.use.clearSearch()

  const {t} = useTranslation()
  const navigate = useNavigate()
  const {dateTimeFormat} = useDateTimeFormatters()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleteProgress, setDeleteProgress] = useState(false)
  const [query, setQuery] = useState("")

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const columns: ColumnDef<Outsource.RevisionRequest>[] = useMemo(() => [
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
      accessorFn: row => row.title,
      meta: {className: "min-w-40"}
    },
    {
      header: t("strings:outsource_manage.outsource.revision_request.state.label"),
      cell: ({row}) => (
        <Status variant={Outsource.RevisionRequest.State.getStatusColor(row.original.state)}>
          <StatusIndicator/>
          <StatusLabel>{Outsource.RevisionRequest.State.getClientLabel(t, row.original.state)}</StatusLabel>
        </Status>
      ),
      meta: {className: "w-40"}
    },
    {
      header: t("strings:outsource_manage.outsource.revision_request.sent_date.label"),
      accessorFn: row => row.sentAt ? dateTimeFormat(row.sentAt.toDate()) : "-"
    },
    {
      header: t("strings:outsource_manage.outsource.revision_request.amount_delta.label"),
      accessorFn: row => t("strings:money_format", {money: row.amountDelta, currency: "KRW"})
    },
    {
      header: t("strings:outsource_manage.outsource.revision_request.due_date_delta.label"),
      accessorFn: row => t("strings:day_format", {day: row.dueDateDeltaDays})
    }
  ], [t])

  const onDelete = async () => {
    setShowDeleteDialog(false)
    setDeleteProgress(true)
    await deleteItems(
      Object.keys(rowSelection).filter((key) => rowSelection[key]),
      () => {
        setDeleteProgress(false)
        toast.success(t("strings:delete_successfully"), {icon: <RiCheckboxCircleFill size={18}/>})
      },
      (errorKey) => {
        setDeleteProgress(false)
        toast.error(t("strings:error_occurred", {error: errorKey}), {icon: <RiErrorWarningFill size={18}/>})
      }
    )
  }

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
              onClick={item => navigate(ClientOutsourceDestination.path.revision.detail(props.itemId, item.id))}
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
      <DeleteAlertDialog
        visible={showDeleteDialog}
        onVisibleChange={setShowDeleteDialog}
        onConfirm={onDelete}
      />
    </>
  )
}