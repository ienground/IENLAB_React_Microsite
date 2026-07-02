import {useNavigate, useParams} from "react-router"
import {useEffect} from "react"
import {useTranslation} from "react-i18next"
import {Seo, useDateTimeFormatters} from "@ienlab/react-library"
import {RiArrowLeftLine} from "@remixicon/react"
import {Separator} from "@/components/ui/separator.tsx"
import {SectionHeader} from "@/components/custom/shared/SectionHeader.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {AnimatedContent} from "@/components/custom/shared/AnimatedContent.tsx"
import NotFoundScreen from "@/ui/shared/error/NotFoundScreen.tsx"
import {NoticeDetailViewModel} from "@/ui/public/notice/detail/NoticeDetailViewModel.ts"
import {NoticeEditorContentRenderer} from "@/ui/public/notice/detail/NoticeEditorContentRenderer.tsx"
import dayjs from "dayjs"

export default function NoticeDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const {t} = useTranslation()

  if (!id) {
    return <NotFoundScreen />
  }

  return (
    <>
      <Seo title={`${t("strings:notice.label")} - ${t("strings:app_name")}`} description={t("strings:notice.desc")} />
      <NoticeDetailViewModel.Provider id={id}>
        <ScreenBody />
      </NoticeDetailViewModel.Provider>
    </>
  )
}

function ScreenBody() {
  const init = NoticeDetailViewModel.use.init()
  const onDisposed = NoticeDetailViewModel.use.onDisposed()
  const infoState = NoticeDetailViewModel.use.infoState()

  const {t} = useTranslation()
  const navigate = useNavigate()
  const {dateTimeFormat} = useDateTimeFormatters()

  useEffect(() => {
    init()
    return () => onDisposed()
  }, [init, onDisposed])

  const item = infoState.item

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="px-4 sm:px-6 md:px-8"><Separator className="bg-foreground" /></div>

      <div className="site-section-tight site-grid">
        <aside className="col-span-12 xl:col-span-2">
          <SectionHeader index={0} label={t("strings:notice.label")} />
        </aside>
        <div className="col-span-12 xl:col-span-10">
          <AnimatedContent
            status={infoState.isInitialized ? (item === null ? "empty" : "content") : "loading"}
            className="flex flex-col"
          >
            {item ? (
              <>
                <div className="flex flex-col gap-8">
                  <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <RiArrowLeftLine />
                  </Button>

                  <div className="flex flex-col gap-5">
                    <div className="flex flex-row flex-wrap items-center gap-3">
                      {infoState.category && <Badge variant="outline">{infoState.category}</Badge>}
                      <time className="text-sm text-muted-foreground" dateTime={item.createAt.toDate().toISOString()}>
                        {dateTimeFormat(item.createAt.toDate())}
                      </time>
                    </div>

                    <h1 className="large-text-title break-keep">{infoState.title}</h1>
                  </div>
                </div>

                <NoticeEditorContentRenderer
                  blocks={infoState.contentBlocks}
                  className="mt-12 md:mt-16"
                />
              </>
            ) : null}
          </AnimatedContent>
        </div>
      </div>
    </div>
  )
}
