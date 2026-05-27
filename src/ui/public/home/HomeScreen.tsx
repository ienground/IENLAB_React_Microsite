import {Carousel, ScrambleText, Ticker, Typewriter, useCarousel} from "motion-plus/react"
import Sample from "@/assets/brand/Page04_01_white.png"
import {AnimatePresence, motion, MotionConfig, useMotionValue, useScroll, useSpring, useTransform} from "motion/react"
import {CrossfadeImage, Localized, useDateTimeFormatters} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"
import {useEffect, useRef, useState} from "react"
import {
  RiArrowDropDownLine,
  RiArrowRightUpLine,
  RiCloseLargeFill, RiCursorHand,
  RiGithubFill, RiPagesFill, RiPauseMiniFill, RiPlayFill
} from "@remixicon/react"
import * as React from "react"
import {splitText} from "motion-plus"
import {animate, delay, stagger, wrap} from "motion"
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
import ImgFront01 from "@/assets/image/front_01.png"
import ImgFront02 from "@/assets/image/front_02.png"
import ImgFront03 from "@/assets/image/front_03.png"
import ImgFrontForward from "@/assets/image/front_forward.png"

export default function HomeScreen() {
  return (
    <HomeViewModel.Provider portfolioRepository={portfolioRepository}>
      <ScreenBody/>
    </HomeViewModel.Provider>
  )
}

function ScreenBody() {
  const {t, i18n} = useTranslation()
  const init = HomeViewModel.use.init()
  const portfolioInfoStateList = HomeViewModel.use.portfolioInfoStateList()
  const navigate = useNavigate()

  useEffect(() => {
    init()
  }, [])

  // Section 1. Carousel
  const carouselItems = [
    {
      id: 1,
      title: "One",
      image: Sample,
      url: "asdf",
    },
    {
      id: 2,
      image: Sample,
      title: "Two",
      url: "",
    },
    {
      id: 3,
      title: "Three",
      image: Sample,
      url: "",
    },
  ]
  const [isScrambleHovered, setIsScrambleHovered] = useState(false)

  // Section 2. About
  const splitTextContainerRef = useRef<HTMLDivElement | null>(null)
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

  // Section 3. Project

  // Section 4. Skills
  const skillsHorizontalScrollContainerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: skillsHorizontalScrollContainerRef,
    offset: ["start start", "end end"]
  })
  const skillsX = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])
  const skillItems = [
    {id: 1, title: "One", color: "bg-orange-300"},
    {id: 2, title: "Two", color: "bg-pink-300"},
    {id: 3, title: "Three", color: "bg-emerald-300"},
    {id: 4, title: "Four", color: "bg-sky-300"},
  ]

  // Section 5. Services
  const [activeService, setActiveService] = useState<number | null>(null)
  const services: Service[] = [
    {name: "Branding"},
    {name: "Web Design"},
    {name: "Marketing"},
    {name: "UI/UX Design"},
    {name: "Development"},
    {name: "Motion Design"},
  ]

  // Section 6. Feedback
  const [index, setIndex] = useState(0)
  const roleTexts = [t('strings:home.intro.mobile_dev'), t('strings:home.intro.web_dev'), t('strings:home.intro.designer')]
  const isNameFirst = i18n.resolvedLanguage === "en"

  return (
    <div className="w-full flex flex-col items-center overflow-x-clip">
      <section className="relative">
        <Carousel
          align="center"
          gap={16}
          className="w-full max-w-350"
          overflow
          itemSize="fill"
          items={[
            <div
              key="extra-layered-slide"
              className={cn(
                "w-full h-screen overflow-hidden rounded-4xl border-border border-2 bg-muted flex flex-col ",
                "md:relative md:max-w-350 md:h-auto md:aspect-video md:block"
              )}
            >
              <div className={cn(
                "w-full h-[60svh]",
                "md:h-full"
              )}>
                <LayeredSlides
                  backgrounds={[ImgFront01, ImgFront02, ImgFront03]}
                  foreground={ImgFrontForward}
                />
              </div>


              <h2
                className={cn(
                  "flex flex-col items-start font-medium text-4xl leading-[0.92] tracking-[-0.06em] px-8",
                  "lg:text-5xl",
                  "xl:text-6xl",
                  "md:absolute md:left-2/5 md:top-1/2 md:-translate-1/2 md:px-0",
                )}
              >
                <span>{t('strings:home.intro.hello')}</span>

                {isNameFirst && <span className="mt-4">{t('strings:home.intro.ienground')}</span>}
                <div className="relative">
                  <span className="invisible block">{roleTexts.reduce((a, b) => (a.length > b.length ? a : b))}    ㅤ</span>
                  <Typewriter
                    as="div"
                    className="absolute inset-0"
                    cursorStyle={{ background: "var(--chart-3)", width: "3px" }}
                    onComplete={() => {
                      delay(() => setIndex(wrap(0, roleTexts.length, index + 1)), 1)
                    }}
                  >{roleTexts[index]}</Typewriter>
                </div>

                {!isNameFirst && <span className="mt-4">{t('strings:home.intro.ienground')}</span>}
              </h2>
            </div>,

            ...carouselItems.map((item) => (
              <div
                key={item.id}
                className="relative w-full max-w-350 h-screen md:h-auto md:aspect-video overflow-hidden rounded-4xl"
              >
                {/* background blur */}
                <img
                  src={item.image}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 z-0 h-full w-full scale-125 object-cover blur-3xl"
                />

                {/* optional dark overlay */}
                <div className="absolute inset-0 z-10 bg-black/15" />

                {/* original image */}
                <CrossfadeImage
                  draggable={false}
                  src={item.image}
                  alt={item.title}
                  className="relative z-20 w-full h-full object-contain md:object-cover"
                />

                {item.url.length > 0 && (
                  <Button
                    className={cn(
                      "absolute bottom-16 left-1/2 z-30 -translate-x-1/2",
                      "bg-primary-foreground/50 text-primary",
                      "hover:bg-primary-foreground"
                    )}
                    size="icon-lg"
                    onClick={() => navigate(item.url)}
                  >
                    <RiCursorHand />
                  </Button>
                )}
              </div>
            )),
          ]}
        >
          <AutoplayProgress
            duration={4}
            className="z-50 absolute bottom-4 left-1/2 -translate-x-1/2"
          />
        </Carousel>
      </section>
      <section className="w-full p-8">
        <div className="w-full">
          <div className="grid grid-cols-12 gap-y-10 xl:gap-x-10">
            <aside className="col-span-12 xl:col-span-2">
              <SectionHeader index={1} label={t("strings:home.about.header")}/>
            </aside>

            <div className="col-span-12 xl:col-span-10" ref={splitTextContainerRef}>
              <h1
                className="max-w-400 text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[64px] md:text-[88px] lg:text-[112px] xl:text-[92px] 2xl:text-[108px]"
              >{t("strings:home.about.leading_message")}</h1>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-12 gap-y-4 xl:mt-16 xl:gap-x-4">
            <div className="col-span-12 xl:col-span-4">
              <div className="w-full max-w-90">
                <div className="aspect-3/4 overflow-hidden rounded-4xl">
                  <CrossfadeImage
                    src={ImgProfile}
                    alt={t("strings:home.about.name")}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 space-y-0.5">
                  <p className="text-[18px] font-bold tracking-[-0.03em] md:text-[24px]">{t("strings:home.about.name")}</p>
                  <p className="text-[18px] tracking-[-0.03em] text-foreground/85 md:text-[20px]">©2024</p>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="max-w-130">
                <p className="text-[24px] leading-[1.22] tracking-[-0.04em] md:text-[30px] xl:text-[31px]">{t('strings:home.about.p1')}</p>
                <Button
                  className="mt-14 font-medium"
                >
                  {t("strings:home.about.see_more")}
                  <RiArrowRightUpLine />
                </Button>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="max-w-130">
                <p className="text-[24px] leading-[1.22] tracking-[-0.04em] md:text-[30px] xl:text-[31px]">{t('strings:home.about.p2')}</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="w-full p-8 flex flex-col gap-y-4">
        <SectionHeader index={2} label={t("strings:home.project.header")}/>
        <PortfolioSection infoStateList={portfolioInfoStateList}/>
      </section>
      <section className="bg-green-500 w-full p-8">
        <SectionHeader index={3} label={t("strings:home.skills.header")}/>
        <div ref={skillsHorizontalScrollContainerRef} className="h-[300vh] bg-amber-800">
          <div className="sticky top-0 flex h-screen items-center">
            <motion.div style={{x: skillsX}} className="flex gap-8">
              {skillItems.map((item) => (
                <article
                  key={item.id}
                  className={`flex h-[calc(100vh-32px)] w-[50vw] shrink-0 items-end rounded-3xl p-8 text-4xl font-semibold text-black ${item.color}`}
                >
                  {item.title}
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-cyan-200 w-full p-8 flex flex-col gap-y-4">
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
      <section className="bg-pink-200 w-full p-8 flex flex-col gap-y-4">
        <SectionHeader index={5} label={t("strings:home.feedback.header")}/>
        <div>
          <Ticker
            hoverFactor={0}
            overflow
            gap={16}
            items={carouselItems.map((item) => (
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

function AutoplayProgress({
                            duration,
                            className = "",
                          }: {
  duration: number
  className?: string
}) {
  const { currentPage, nextPage } = useCarousel()

  const progress = useMotionValue(0)
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"])

  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const nextPageRef = useRef(nextPage)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    nextPageRef.current = nextPage
  }, [nextPage])

  useEffect(() => {
    progress.set(0)
    setPaused(false)

    const animation = animate(progress, [0, 1], {
      duration,
      ease: "linear",
      onComplete: () => {
        nextPageRef.current()
      },
    })

    animationRef.current = animation

    return () => {
      animation.stop()
      animationRef.current = null
    }
  }, [duration, currentPage])

  const togglePaused = () => {
    const animation = animationRef.current
    if (!animation) return

    if (paused) {
      animation.play()
      setPaused(false)
    } else {
      animation.pause()
      setPaused(true)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-2 w-30 overflow-hidden rounded-4xl border border-light-muted bg-light-muted">
        <motion.div
          className="h-full rounded-4xl bg-light-muted-foreground"
          style={{ width: progressWidth, willChange: "width" }}
        />
      </div>

      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        onClick={togglePaused}
        className="shrink-0 rounded-full text-muted-foreground hover:text-foreground"
        aria-label={paused ? "자동재생 다시 시작" : "자동재생 일시정지"}
      >
        {paused ? <RiPlayFill size={16} /> : <RiPauseMiniFill size={16} />}
      </Button>
    </div>
  )
}

function PortfolioSection(props: { infoStateList: PortfolioInfoStateList }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const close = () => setOpenId(null)

  return (
    <>
      <ul className="m-0 flex list-none flex-wrap content-start gap-4 p-0">
        {props.infoStateList.itemList.map((item) => (
          <PortfolioItem
            key={item.id}
            id={item.id}
            item={item}
            setOpen={() => setOpenId(item.id)}
            isHidden={openId === item.id}
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

function PortfolioItemContent({
                                id,
                                item,
                                setOpen,
                                isOpen = false,
                                children = <></>,
                              }: PortfolioItemProps & {
  isOpen?: boolean
  children?: React.ReactNode
}) {
  const {t} = useTranslation()
  const navigate = useNavigate()

  return (
    <motion.div
      className={cn(
        "relative mx-auto overflow-hidden rounded-4xl bg-muted",
        isOpen
          ? "pointer-events-auto w-auto max-w-175"
          : "pointer-events-auto h-full w-full",
      )}
      layoutId={`card-container-${id}`}
    >
      <motion.div
        className={cn(
          "relative z-10 overflow-hidden",
          isOpen ? "h-80" : "h-full",
        )}
        layoutId={`card-image-container-${id}`}
      >
        <div className="relative h-full w-full">
          <motion.img
            className={cn(
              "block h-full w-full object-cover",
              isOpen
                ? "mask-[linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
              isOpen
                ? "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_52%,black_68%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.38)_92%,transparent_100%)]"
                : "",
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
                : "",
            )}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-black/45 via-black/15 to-transparent" />

        <motion.div
          className="absolute left-4 top-4 z-10 h-[calc(100%-32px)] w-[calc(100%-32px)] text-white"
          layoutId={`title-container-${id}`}
          layout="position"
        >
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

          <h2
            className={cn(
              "mt-2 w-[90%] break-keep text-pretty font-bold leading-[1.05] tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]",
              "text-5xl md:text-4xl",
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
                <Button onClick={setOpen} size="icon-lg" variant="ghost">
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
              <motion.div className="absolute bottom-0 right-0 flex flex-row items-end justify-between gap-x-2">
                <div className="flex flex-row items-center gap-x-2">
                  {item.googlePlayLink && (
                    <Button className="google-play-button" size="icon-lg" asChild>
                      <a
                        href={`https://play.google.com/store/apps/details?id=${item.googlePlayLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IcGooglePlay />
                      </a>
                    </Button>
                  )}

                  {item.appStoreLink && (
                    <Button className="app-store-button" size="icon-lg" asChild>
                      <a
                        href={`https://apps.apple.com/us/app/id${item.appStoreLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IcAppStore />
                      </a>
                    </Button>
                  )}

                  {item.webLink && (
                    <Button className="website-button" size="icon-lg" asChild>
                      <a href={item.webLink} target="_blank" rel="noopener noreferrer">
                        <RiPagesFill size={60} />
                      </a>
                    </Button>
                  )}

                  {item.githubLink && (
                    <Button className="github-button" size="icon-lg" asChild>
                      <a
                        href={`https://github.com/${item.githubLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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

      <motion.div className="relative z-0">{children}</motion.div>
    </motion.div>
  )
}

function PortfolioItem({
                         id,
                         item,
                         setOpen,
                         width = "100%",
                         theme,
                         isHidden = false,
                       }: PortfolioItemProps) {
  const maxTilt = 15
  const cardRef = useRef<HTMLLIElement>(null)
  const z = useSpring(0)
  const rotateX = useSpring(0)
  const rotateY = useSpring(0)

  const calculateTilt = (event: React.PointerEvent<HTMLLIElement>) => {
    if (!cardRef.current) return {rotateX: 0, rotateY: 0}

    const rect = cardRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const xPercent = x / rect.width
    const yPercent = y / rect.height

    return {
      rotateX: maxTilt * (0.5 - yPercent),
      rotateY: maxTilt * (xPercent - 0.5),
    }
  }

  const handleOpen = () => {
    rotateX.set(0)
    rotateY.set(0)
    z.set(0)
    setOpen()
  }

  return (
    <motion.li
      onClick={handleOpen}
      className={cn(
        "relative box-border h-100 list-none p-0",
        "flex-[1_1_100%]",
        "md:flex-[0_0_40%]",
        "md:nth-[4n+1]:flex-[0_1_calc(60%-16px)]",
        "md:nth-[4n+4]:flex-[0_1_calc(60%-16px)]",
        "cursor-pointer transition-opacity duration-200",
        isHidden && "pointer-events-none opacity-0",
      )}
      ref={cardRef}
      style={{
        z,
        rotateX,
        rotateY,
      }}
      transition={{type: "spring", stiffness: 200, damping: 20}}
      onPointerMove={(e) => {
        if (isHidden) return
        const tilt = calculateTilt(e)
        rotateX.set(tilt.rotateX)
        rotateY.set(tilt.rotateY)
      }}
      onPointerLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
        z.set(0)
      }}
      onPointerEnter={() => {
        if (isHidden) return
        z.set(-10)
      }}
    >
      <PortfolioItemContent
        id={id}
        item={item}
        setOpen={handleOpen}
        width={width}
        theme={theme}
        isHidden={isHidden}
      />
    </motion.li>
  )
}

function FloatingPortfolioItem({id, items, close}: { id: string, items: Portfolio[], close: VoidFunction }) {
  const {t} = useTranslation()
  const item = items.find((item) => item.id === id)!
  const {basicDateTimeFormat} = useDateTimeFormatters()

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
          "pointer-events-none fixed inset-x-0 top-0 z-1000001 flex h-full w-full flex-col justify-center overflow-hidden py-10",
          "max-[990px]:py-0",
        )}
      >
        <div className="pointer-events-auto mx-auto w-full max-w-200">
          <PortfolioItemContent id={id} item={item} setOpen={close} isOpen>
            <div
              className={cn(
                "grid w-full grid-cols-[20%_35%_45%] p-4",
                "max-md:grid-cols-1 max-md:gap-y-4",
              )}
            >
              <Field
                className={cn(
                  "h-full md:border-r md:pr-4",
                  "max-md:grid max-md:grid-cols-[120px_1fr]",
                )}
              >
                <FieldTitle>
                  <Badge variant="secondary" className="border border-border">
                    {basicDateTimeFormat(item.startAt.toDate(), "strings:datetime.month_year")} -{" "}
                    {item.endAt
                      ? basicDateTimeFormat(item.endAt.toDate(), "strings:datetime.month_year")
                      : ""}
                  </Badge>
                </FieldTitle>

                <FieldDescription>
                  <Badge variant={Portfolio.State.getBadgeColor(item.state)}>
                    {Portfolio.State.getLabel(t, item.state)}
                  </Badge>
                </FieldDescription>
              </Field>

              <Field
                className={cn(
                  "h-full md:border-r md:px-4",
                  "max-md:grid max-md:grid-cols-[120px_1fr] max-md:items-start",
                )}
              >
                <FieldTitle>{t("strings:home.project.role.label")}</FieldTitle>
                <FieldDescription className="break-keep text-pretty">{Localized.get(item.role)}</FieldDescription>
              </Field>

              <Field
                className={cn(
                  "flex h-full flex-col gap-y-2 md:pl-4",
                  "max-md:grid max-md:grid-cols-[120px_1fr] max-md:items-start",
                )}
              >
                <FieldTitle>
                  <div className="flex flex-wrap gap-2">
                    {item.platforms.map(platform => (
                      <Badge key={platform} className={Portfolio.Platform.getBadgeColor(platform)}>
                        <div data-icon="inline-start" className="mr-1">
                          {Portfolio.Platform.getIcon(platform, 12)}
                        </div>
                        <div>{Portfolio.Platform.getLabel(t, platform)}</div>
                      </Badge>
                    ))}
                  </div>
                </FieldTitle>

                <FieldDescription className="break-keep text-pretty">
                  {Localized.get(item.summary)}
                </FieldDescription>
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
  isHidden?: boolean
}

type LayeredSlidesProps = {
  backgrounds: string[]
  foreground: string
  interval?: number
}

function LayeredSlides({
                         backgrounds,
                         foreground,
                         interval = 300,
                       }: LayeredSlidesProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (backgrounds.length <= 1) return

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length)
    }, interval)

    return () => window.clearInterval(id)
  }, [backgrounds.length, interval])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        <img
          key={backgrounds[index]}
          src={backgrounds[index]}
          alt=""
          className="absolute inset-0 h-full w-full object-contain md:object-cover"
          draggable={false}
        />
      </div>

      {/* Foreground fixed image */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <img
          src={foreground}
          alt=""
          className="h-full w-full object-contain md:object-cover"
          draggable={false}
        />
      </div>
    </div>
  )
}