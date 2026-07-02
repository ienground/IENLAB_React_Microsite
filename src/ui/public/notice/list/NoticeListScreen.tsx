import {Seo, useDateTimeFormatters} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"
import {Separator} from "@/components/ui/separator.tsx"
import {SectionHeader} from "@/components/custom/shared/SectionHeader.tsx"
import {NoticeListViewModel} from "@/ui/public/notice/list/NoticeListViewModel.ts"
import {useEffect} from "react"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import {motion, type Variants} from "motion/react"
import {Spinner} from "@/components/ui/spinner.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {RiArrowRightUpLine} from "@remixicon/react"
import {useNavigate} from "react-router"
import {NoticeDestination} from "@/ui/public/notice/NoticeDestination.ts"
import type {NoticeListItemState} from "@/ui/public/notice/list/NoticeListViewModel.ts"
import {MotionButton} from "@/components/motion/components.tsx"

const listVariants: Variants = {
  show: {
    transition: {
      staggerChildren: 0.045,
    },
  },
}

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
}

export default function NoticeListScreen() {
  const { t } = useTranslation()
  return (
    <>
      <Seo
        title={`${t("strings:notice.label")} - ${t("strings:app_name")}`}
        description={t("strings:notice.desc")}
      />
      <NoticeListViewModel.Provider>
        <ScreenBody />
      </NoticeListViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const init = NoticeListViewModel.use.init()
  const onDisposed = NoticeListViewModel.use.onDisposed()
  const loadNextPage = NoticeListViewModel.use.loadNextPage()
  const noticeInfoStateList = NoticeListViewModel.use.contentInfoStateList()

  const {t} = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  const notices = [...noticeInfoStateList.itemList.values()]
  const status = noticeInfoStateList.isInitialized
    ? (notices.length === 0 ? "empty" : "content")
    : "loading"

  return (
    <div className="w-full flex flex-col">
      <div className="px-4 sm:px-6 md:px-8"><Separator className="bg-foreground"/></div>

      <div className="site-section-tight site-grid">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader index={0} label={t("strings:notice.label")} />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="large-text-title">{t("strings:notice.label")}</h1>
            <p className="content-description">{t("strings:notice.desc")}</p>
          </div>

          <AnimatedContent status={status} className="mt-12 md:mt-16">
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col border-y border-foreground"
            >
              {notices.map((item, index) => (
                <NoticeRow
                  key={item.item.id}
                  item={item}
                  index={index}
                  onClick={() => navigate(NoticeDestination.path.detail(item.item.id))}
                />
              ))}
            </motion.div>

            {noticeInfoStateList.hasMore ? (
              <LoadingSpinner key={notices.length} onInView={loadNextPage} />
            ) : (
              <div className="w-full py-10 text-center text-sm text-muted-foreground">
                {t("strings:notice.list_end")}
              </div>
            )}
          </AnimatedContent>
        </div>
      </div>
    </div>
  )
}

function NoticeRow(props: {
  item: NoticeListItemState
  index: number
  onClick: () => void
}) {
  const {dateTimeFormatShort} = useDateTimeFormatters()

  return (
    <motion.div
      variants={rowVariants}
      onClick={props.onClick}
      className="group grid w-full grid-cols-12 gap-y-4 border-b border-border py-6 text-left transition-colors last:border-b-0 hover:bg-muted/45 md:gap-x-6 md:px-4 md:py-8"
    >
      <div className="col-span-12 flex items-center gap-3 text-sm text-muted-foreground md:col-span-3">
        <span className="font-jb-mono tabular-nums">{String(props.index + 1).padStart(2, "0")}</span>
        {props.item.category && <Badge variant="outline">{props.item.category}</Badge>}
      </div>

      <div className="col-span-11 flex min-w-0 flex-col gap-3 md:col-span-8">
        <h2 className="text-xl font-medium leading-tight md:text-2xl">{props.item.title}</h2>
        {props.item.summary && (
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground md:text-base">
            {props.item.summary}
          </p>
        )}
        <time className="text-xs text-muted-foreground" dateTime={props.item.item.updateAt.toDate().toISOString()}>
          {dateTimeFormatShort(props.item.item.updateAt.toDate())}
        </time>
      </div>

      <div className="col-span-1 flex justify-end">
        <MotionButton
          variant="ghost"
          size="icon"
          className="group-hover:-translate-y-1 group-hover:translate-x-1"
        >
          <RiArrowRightUpLine className="size-5 transition-transform" />
        </MotionButton>
      </div>
    </motion.div>
  )
}

function LoadingSpinner(props: {
  onInView: () => void
}) {
  return (
    <motion.div
      className="w-full flex flex-row items-center justify-center py-10"
      onViewportEnter={props.onInView}
    >
      <Spinner className="size-9"/>
    </motion.div>
  )
}
