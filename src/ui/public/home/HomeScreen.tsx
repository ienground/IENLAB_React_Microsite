import {Carousel, Ticker, useCarousel} from "motion-plus/react"
import Sample from "@/assets/brand/Page04_01_white.png"
// import Sample from "@/assets/brand/img_logo_typo.png"
import {AnimatePresence, motion, MotionConfig, useMotionValue, useScroll, useTransform} from "motion/react"
import {CrossfadeImage, Localized, useDateTimeFormatters} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"
import {useEffect, useRef, useState} from "react"
import {
  RiArrowDropDownLine,
  RiArrowRightUpLine,
  RiCloseLargeFill,
  RiGithubFill, RiPagesFill
} from "@remixicon/react"
import * as React from "react"
import {splitText} from "motion-plus"
import {animate, stagger} from "motion"
import {cn} from "@/lib/utils.ts"
import {HomeViewModel, type PortfolioInfoStateList} from "@/ui/public/home/HomeViewModel.ts"
import {Portfolio} from "@/domain/model/Portfolio.tsx"
import {portfolioRepository} from "@/di/container.ts"
import {Badge} from "@/components/ui/badge.tsx"
import {Button} from "@/components/ui/button.tsx"
import IcAppStore from "@/assets/icon/app_store.svg?react"
import IcGooglePlay from "@/assets/icon/google_play.svg?react"
import {useNavigate} from "react-router"
import {Field, FieldDescription, FieldTitle} from "@/components/ui/field"
import ImgProfile from "@/assets/image/ienground_profile_2024.jpg"

export default function HomeScreen() {
  return (
    <HomeViewModel.Provider portfolioRepository={portfolioRepository}>
      <ScreenBody/>
    </HomeViewModel.Provider>
  )
}

function ScreenBody() {
  const {t} = useTranslation()
  const init = HomeViewModel.use.init()
  const portfolioInfoStateList = HomeViewModel.use.portfolioInfoStateList()

  useEffect(() => {
    init()
  }, [])

  const [activeService, setActiveService] = useState<number | null>(null)
  const services: Service[] = [
    {name: "Branding"},
    {name: "Web Design"},
    {name: "Marketing"},
    {name: "UI/UX Design"},
    {name: "Development"},
    {name: "Motion Design"},
  ]

  const items = [
    {
      id: 1,
      title: "One",
      image: Sample,
    },
    {
      id: 2,
      image: Sample,
      title: "Two",
    },
    {
      id: 3,
      title: "Three",
      image: Sample,
    },
  ]
  const splitTextContainerRef = useRef<HTMLDivElement | null>(null)
  const horizontalScrollContainerRef = useRef<HTMLDivElement | null>(null)
  const {scrollYProgress} = useScroll({
    target: horizontalScrollContainerRef,
    offset: ["start start", "end end"]
  })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  const items2 = [
    {id: 1, title: "One", color: "bg-orange-300"},
    {id: 2, title: "Two", color: "bg-pink-300"},
    {id: 3, title: "Three", color: "bg-emerald-300"},
    {id: 4, title: "Four", color: "bg-sky-300"},
  ]

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!splitTextContainerRef.current) return
      splitTextContainerRef.current.style.visibility = "visible"

      const {words} = splitText(splitTextContainerRef.current.querySelector("h1"))

      animate(
        words,
        {opacity: [0, 1], y: [10, 0]},
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        }
      )
    })
  }, [])

  return (
    <div className="w-full flex flex-col items-center overflow-x-clip">
      <Carousel
        align="center"
        gap={16}
        className="w-350 bg-amber-200"
        overflow
        itemSize="fill"
        items={items.map(item => (
          <div
            key={item.id}
            className="w-350 rounded-4xl overflow-hidden"
          >
            <CrossfadeImage
              draggable={false}
              src={item.image}
              alt={item.title}
            />
          </div>
        ))}
      >
        <AutoplayProgress duration={3}/>
      </Carousel>
      <section className="bg-red-500 w-full p-8">
        <div className="w-full bg-blue-500">
          <div className="grid grid-cols-12 gap-y-10 xl:gap-x-10">
            <aside className="col-span-12 xl:col-span-2">
              <SectionHeader index={1} label={t("strings:home.about.header")}/>
            </aside>

            <div className="col-span-12 xl:col-span-10" ref={splitTextContainerRef}>
              <h1
                className="max-w-400 text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[64px] md:text-[88px] lg:text-[112px] xl:text-[92px] 2xl:text-[108px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad autem consectetur dignissimos, dolores
                excepturi ipsa iste molestias quis reiciendis sunt.
              </h1>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-y-10 xl:mt-24 xl:gap-x-10">
            <div className="col-span-12 xl:col-span-4">
              <div className="w-full max-w-90">
                <div className="aspect-3/4 overflow-hidden rounded-lg bg-black">
                  <img
                    src={Sample}
                    alt="lorem1"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 space-y-0.5">
                  <p className="text-[18px] font-medium tracking-[-0.03em] md:text-[20px]">
                    Lorem.
                  </p>
                  <p className="text-[18px] tracking-[-0.03em] text-black/85 md:text-[20px]">
                    ©2024
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="max-w-130">
                <p className="text-[24px] leading-[1.22] tracking-[-0.04em] md:text-[30px] xl:text-[31px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cumque fugiat quo voluptas voluptates.
                  Ab animi at atque, delectus deserunt dolorem dolorum enim eos est fugiat hic id labore libero
                  necessitatibus nostrum omnis perferendis placeat possimus quas quasi, quisquam rem similique tempora,
                  ullam ut vitae voluptas? Dolores eveniet perferendis quis!
                </p>

                <a
                  href="#"
                  className="mt-14 inline-flex items-center gap-3 bg-black px-3 py-1.5 text-[16px] font-medium tracking-[-0.03em] text-white transition hover:bg-black/85 md:text-[18px]"
                >
                  <span>Lorem.</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="max-w-130">
                <p className="text-[24px] leading-[1.22] tracking-[-0.04em] md:text-[30px] xl:text-[31px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae blanditiis cum deleniti
                  dolores doloribus dolorum, earum facere fugit hic impedit in libero maxime molestiae molestias nulla
                  perspiciatis placeat quibusdam quisquam recusandae suscipit tempora tenetur ullam voluptatibus
                  voluptatum. Adipisci beatae et facilis quidem reiciendis? Ab aut dolorum harum molestiae perferendis.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="bg-yellow-200 w-full p-8 app-store">
        <SectionHeader index={2} label={t("strings:home.project.header")}/>
        <PortfolioSection infoStateList={portfolioInfoStateList}/>
      </section>
      <section className="bg-green-500 w-full p-8">
        <SectionHeader index={3} label={t("strings:home.skills.header")}/>
        <div ref={horizontalScrollContainerRef} className="h-[300vh] bg-amber-800">
          <div className="sticky top-0 flex h-screen items-center">
            <motion.div style={{x}} className="flex gap-8">
              {items2.map((item) => (
                <article
                  key={item.id}
                  className={`flex h-[calc(100vh-64px)] w-[50vw] shrink-0 items-end rounded-3xl p-8 text-4xl font-semibold text-black ${item.color}`}
                >
                  {item.title}
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-cyan-200 w-full p-8">
        <SectionHeader index={4} label={t("strings:home.services.header")}/>
        <div className="flex">
          <ul className="m-0 flex flex-col gap-5 p-0 list-none">
            {services.map((service, index) => (
              <ScrollHighlightItem
                key={service.name}
                service={service}
                index={index}
                isHighlighted={activeService === index}
                onHighlight={() => setActiveService(index)}
              />
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-pink-200 w-full p-8">
        <SectionHeader index={5} label={t("strings:home.feedback.header")}/>
        <div>
          <Ticker
            hoverFactor={0}
            overflow
            gap={16}
            items={items.map((item) => (
              <div
                key={item.id}
                className="w-350 rounded-4xl overflow-hidden"
              >
                <CrossfadeImage
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                />
              </div>
            ))}
          />
        </div>
      </section>
      {/*<StyleSheet />*/}
    </div>
  )
}

function SectionHeader({index, label}: { index: number, label: string }) {
  const indexFormatted = String(index).padStart(2, '0')
  const labelFormatted = label.toUpperCase()
  return (
    <p className="text-xl font-medium tracking-tight md:text-2xl">({indexFormatted}) {labelFormatted}</p>
  )
}

interface Service {
  name: string
}

function ScrollHighlightItem({service, index, isHighlighted, onHighlight}: {
  service: Service,
  index: number,
  isHighlighted: boolean,
  onHighlight: (index: number) => void
}) {
  return (
    <motion.li
      className="whitespace-nowrap text-[clamp(2rem,8vw,6rem)] leading-[0.9] font-bold uppercase will-change-[opacity]"
      initial={false}
      animate={{
        opacity: isHighlighted ? 1 : 0.3,
        scale: isHighlighted ? 1.02 : 1,
      }}
      transition={{
        duration: 0.1,
        ease: "linear",
      }}
      onViewportEnter={() => onHighlight(index)}
      viewport={{
        margin: "-28% 0px -68% 0px",
        amount: "some",
      }}
    >
      {service.name}
    </motion.li>
  )
}

function SkillItem({header, children}: { header: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)

  return (
    <MotionConfig transition={{duration: 0.3}}>
      <motion.section
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <h3>
          <motion.button
            // id={id + "-button"}
            aria-expanded={isOpen}
            // aria-controls={id}
            onClick={() => setIsOpen(!isOpen)}
            onFocus={onlyKeyboardFocus(() => setHasFocus(true))}
            onBlur={() => setHasFocus(false)}
          >
            <span>{header}</span> <RiArrowDropDownLine/>
            {hasFocus && (
              <motion.div
                layoutId="focus-ring"
                className="focus-ring"
              />
            )}
          </motion.button>
        </h3>
        <motion.div
          variants={{
            open: {
              height: "auto",
              maskImage:
                "linear-gradient(to bottom, black 100%, transparent 100%)",
            },
            closed: {
              height: 0,
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 100%)",
            },
          }}
          className="accordion-content"
        >
          <motion.div
            variants={{
              open: {
                filter: "blur(0px)",
                opacity: 1,
              },
              closed: {
                filter: "blur(2px)",
                opacity: 0,
              },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
        <hr/>
      </motion.section>
    </MotionConfig>
  )
}

function onlyKeyboardFocus(callback: () => void) {
  return (e: React.FocusEvent<HTMLButtonElement>) => {
    if (e.type === "focus" && e.target.matches(":focus-visible")) {
      callback()
    }
  }
}

function AutoplayProgress({duration}: { duration: number }) {
  const {currentPage, nextPage} = useCarousel()
  const progress = useMotionValue(0)

  useEffect(() => {
    const animation = animate(progress, [0, 1], {
      duration,
      ease: "linear",
      onComplete: nextPage,
    })

    return () => animation.stop()
  }, [duration, nextPage, progress, currentPage])

  return (
    <div className="w-30 h-1.5 bg-pink-400 rounded-4xl z-50 ">
      <motion.div
        className="w-full h-full bg-white origin-left rounded-4xl"
        style={{scaleX: progress, willChange: "transform"}}
      />
    </div>
  )
}

function PortfolioSection(props: { infoStateList: PortfolioInfoStateList }) {
  const [openId, open] = useState<string | null>(null)
  const close = () => open(null)

  return (
    <>
      <ul className="flex flex-wrap content-start gap-4 p-0 m-0 list-none">
        {props.infoStateList.itemList.map((item) => (
          <PortfolioItem
            key={item.id}
            item={item}
            setOpen={() => open(item.id)}
            id={item.id}
          />
        ))}
      </ul>

      <AnimatePresence initial={false} mode="wait">
        {openId ? (
          <FloatingPortfolioItem
            key={openId}
            items={props.infoStateList.itemList}
            close={close}
            id={openId}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

function PortfolioItemContent({id, item, setOpen, isOpen = false, children = <></>}: PortfolioItemProps & {
  isOpen?: boolean
  children?: React.ReactNode
}) {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const { basicDateTimeFormat } = useDateTimeFormatters()

  return (
    <motion.div
      className={cn(
        "relative mx-auto overflow-hidden rounded-4xl bg-muted",
        isOpen
          ? "pointer-events-auto w-auto max-w-175"
          : "pointer-events-auto h-full w-full"
      )}
      layoutId={`card-container-${id}`}
    >
      <motion.div
        className={cn(
          "relative z-10 overflow-hidden",
          isOpen ? "h-80" : "h-full"
        )}
        layoutId={`card-image-container-${id}`}
      >
        <div className="relative h-full w-full">
          <motion.img
            // className="block h-full w-full object-cover"
            className={cn(
              "block h-full w-full object-cover",
              isOpen
                ? "mask-[linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
              isOpen
                ? "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : ""
            )}
            src={Localized.get(item.thumbnail)}
            alt=""
            layoutId={`card-image-${id}`}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 dark:bg-black/15",
              isOpen
                ? "mask-[linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
              isOpen
                ? "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : ""
            )}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/45 via-black/15 to-transparent" />

        <motion.div
          className="absolute left-4 top-4 z-10 h-[calc(100%-32px)] w-[calc(100%-32px)] text-white"
          layoutId={`title-container-${id}`}
          layout="position"
        >
          {/*카테고리*/}
          <div className="flex flex-wrap gap-1">
            {item.categories.map((category) => (
              <Badge
                key={category}
                className={Portfolio.Category.getBadgeColor(category)}
              >
                {Portfolio.Category.getLabel(t, category)}
              </Badge>
            ))}
          </div>

          {/*제목*/}
          <h2
            className={cn(
              "w-[90%] mt-2 text-pretty break-keep leading-[1.05] tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]",
              "text-5xl md:text-4xl font-bold"
            )}
          >
            {Localized.get(item.title)}
          </h2>

          <AnimatePresence>
            {!isOpen && (
              <motion.div className="mt-2 flex flex-row items-center gap-1">
                {item.platforms.map((platform) => (
                  <span key={platform}>
                    {Portfolio.Platform.getIcon(platform, 18)}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div className="absolute right-0 top-0 flex flex-col">
                <Button
                  onClick={setOpen}
                  size="icon-lg"
                  variant="ghost"
                >
                  <RiCloseLargeFill />
                </Button>
                <Button
                  onClick={() => navigate("")}
                  size="icon-lg"
                  className={cn(
                    "bg-gray-100 text-gray-700 hover:bg-gray-300 hover:text-gray-900",
                    "dark:bg-gray-400 dark:text-gray-100 dark:hover:bg-gray-500 dark:hover:text-gray-900",
                  )}
                >
                  <RiArrowRightUpLine />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute bottom-0 right-0 flex flex-row items-end justify-between gap-x-2"
              >
                <div className="flex flex-row items-center gap-x-2">
                  {item.googlePlayLink && (
                    <Button
                      className="google-play-button"
                      size="icon-lg"
                      asChild
                    >
                      <a href={`https://play.google.com/store/apps/details?id=${item.googlePlayLink}`}>
                        <IcGooglePlay />
                      </a>
                    </Button>
                  )}

                  {item.appStoreLink && (
                    <Button
                      className="app-store-button"
                      size="icon-lg"
                      asChild
                    >
                      <a href={`https://apps.apple.com/us/app/id${item.googlePlayLink}`}>
                        <IcAppStore />
                      </a>
                    </Button>
                  )}

                  {item.webLink && (
                    <Button
                      className="website-button"
                      size="icon-lg"
                    >
                      <a href={item.webLink}>
                        <RiPagesFill size={60} />
                      </a>
                    </Button>
                  )}

                  {item.githubLink && (
                    <Button
                      className="github-button"
                      size="icon-lg"
                    >
                      <a href={`https://github.com/${item.githubLink}`}>
                        <RiGithubFill size={60} />
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div className="relative z-0">
        {children}
      </motion.div>
    </motion.div>
  )
}

function PortfolioItem({id, item, setOpen, width = "100%", theme}: PortfolioItemProps) {
  return (
    <li
      onClick={setOpen}
      className={cn(
        "relative box-border list-none p-0 h-100",
        "flex-[1_1_100%]",
        "md:flex-[0_0_40%]",
        "md:nth-[4n+1]:flex-[0_1_calc(60%-16px)]",
        "md:nth-[4n+4]:flex-[0_1_calc(60%-16px)]",
        "cursor-pointer"
      )}
    >
      <PortfolioItemContent
        id={id}
        item={item}
        setOpen={setOpen}
        width={width}
        theme={theme}
      />
    </li>
  )
}

function FloatingPortfolioItem({id, items, close}: { id: string, items: Portfolio[], close: VoidFunction }) {
  const {t} = useTranslation()
  const item = items.find((item) => item.id === id)!
  const { basicDateTimeFormat } = useDateTimeFormatters()

  return (
    <>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.2, delay: 0.1}}
        className="fixed inset-0 z-1000000 bg-black/80"
        onClick={close}
      />

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-1000001 flex h-full w-full flex-col justify-center overflow-hidden py-10",
          "pointer-events-none",
          "max-[990px]:py-0"
        )}
      >
        <div className="pointer-events-auto mx-auto w-full max-w-200">
          <PortfolioItemContent
            id={id}
            item={item}
            setOpen={close}
            isOpen
          >
            <div className={cn(
              "w-full p-4 grid grid-cols-[20%_35%_45%]",
              "max-md:grid-cols-1 max-md:gap-y-4"
            )}>
              <Field className={cn(
                "h-full md:border-r md:pr-4",
                "max-md:grid max-md:grid-cols-[120px_1fr]"
              )}>
                <FieldTitle>
                  <Badge variant="secondary" className="border-border border">
                    {basicDateTimeFormat(item.startAt.toDate(), "strings:datetime.month_year")} - {item.endAt ? basicDateTimeFormat(item.endAt.toDate(), "strings:datetime.month_year") : ""}
                  </Badge>
                </FieldTitle>
                <FieldDescription>
                  <Badge variant={Portfolio.State.getBadgeColor(item.state)}>
                    {Portfolio.State.getLabel(t, item.state)}
                  </Badge>
                </FieldDescription>
              </Field>
              <Field className={cn(
                "h-full md:border-r md:px-4",
                "max-md:grid max-md:grid-cols-[120px_1fr] max-md:items-start"
              )}>
                <FieldTitle>{t("strings:home.project.role.label")}</FieldTitle>
                <FieldDescription className="text-pretty break-keep">{Localized.get(item.role)}</FieldDescription>
              </Field>
              <Field className={cn(
                "h-full md:pl-4 flex flex-col gap-y-2",
                "max-md:grid max-md:grid-cols-[120px_1fr] max-md:items-start"
              )}>
                <FieldTitle>
                  <div className="flex flex-wrap gap-2">
                    {item.platforms.map(platform => (
                      <Badge className={Portfolio.Platform.getBadgeColor(platform)}>
                        <div data-icon="inline-start" className="mr-1">{Portfolio.Platform.getIcon(platform, 12)}</div>
                        <div className="">{Portfolio.Platform.getLabel(t, platform)}</div>
                      </Badge>
                    ))}
                  </div>
                </FieldTitle>
                <FieldDescription className="text-pretty break-keep">{Localized.get(item.summary)}</FieldDescription>
              </Field>
            </div>
          </PortfolioItemContent>
        </div>
      </div>
    </>
  )
}

interface PortfolioItemProps {
  id: string
  item: Portfolio
  setOpen: VoidFunction
  top?: number
  bottom?: number
  width?: string
  left?: number
  theme?: "dark" | "light"
}

interface Item {
  id: string
  category: string
  content: React.ReactNode
  top?: number
  bottom?: number
  left?: number
}