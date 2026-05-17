import {Carousel, Ticker, useCarousel, useTickerItem} from "motion-plus/react"
import Sample from "@/assets/brand/Page04_01_white.png"
// import Sample from "@/assets/brand/img_logo_typo.png"
import {motion, MotionConfig, useMotionValue, useScroll, useTransform} from "motion/react"
import {CrossfadeImage} from "@ienlab/react-library"
import {useTranslation} from "react-i18next"
import {useEffect, useRef, useState} from "react"
import {RiArrowDropDownLine} from "@remixicon/react"
import * as React from "react"
import {splitText} from "motion-plus"
import {animate, stagger} from "motion"
import {cn} from "@/lib/utils.ts";
import {HomeViewModel, type PortfolioInfoStateList} from "@/ui/public/home/HomeViewModel.ts";
import {Portfolio} from "@/domain/model/Portfolio.ts";

export default function HomeScreen() {
  const { t } = useTranslation()
  const init = HomeViewModel.use.init()
  const portfolioInfoStateList = HomeViewModel.use.portfolioInfoStateList()

  useEffect(() => {
    init()
  }, [])

  const [activeService, setActiveService] = useState<number | null>(null)
  const services: Service[] = [
    { name: "Branding" },
    { name: "Web Design" },
    { name: "Marketing" },
    { name: "UI/UX Design" },
    { name: "Development" },
    { name: "Motion Design" },
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
  const { scrollYProgress } = useScroll({
    target: horizontalScrollContainerRef,
    offset: ["start start", "end end"]
  })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  const items2 = [
    { id: 1, title: "One", color: "bg-orange-300" },
    { id: 2, title: "Two", color: "bg-pink-300" },
    { id: 3, title: "Three", color: "bg-emerald-300" },
    { id: 4, title: "Four", color: "bg-sky-300" },
  ]

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!splitTextContainerRef.current) return
      splitTextContainerRef.current.style.visibility = "visible"

      const { words } = splitText(splitTextContainerRef.current.querySelector("h1"))

      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
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
    <div className="w-full flex flex-col items-center overflow-x-clip"
    >
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
        <AutoplayProgress duration={3} />
      </Carousel>
      <section className="bg-red-500 w-full p-8">
        <div className="w-full bg-blue-500">
          <div className="grid grid-cols-12 gap-y-10 xl:gap-x-10">
            <aside className="col-span-12 xl:col-span-2">
              <SectionHeader index={1} label={t("strings:home.header.about")} />
            </aside>

            <div className="col-span-12 xl:col-span-10" ref={splitTextContainerRef}>
              <h1 className="max-w-400 text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[64px] md:text-[88px] lg:text-[112px] xl:text-[92px] 2xl:text-[108px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad autem consectetur dignissimos, dolores excepturi ipsa iste molestias quis reiciendis sunt.
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cumque fugiat quo voluptas voluptates. Ab animi at atque, delectus deserunt dolorem dolorum enim eos est fugiat hic id labore libero necessitatibus nostrum omnis perferendis placeat possimus quas quasi, quisquam rem similique tempora, ullam ut vitae voluptas? Dolores eveniet perferendis quis!
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae blanditiis cum deleniti dolores doloribus dolorum, earum facere fugit hic impedit in libero maxime molestiae molestias nulla perspiciatis placeat quibusdam quisquam recusandae suscipit tempora tenetur ullam voluptatibus voluptatum. Adipisci beatae et facilis quidem reiciendis? Ab aut dolorum harum molestiae perferendis.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="bg-yellow-200 w-full p-8 app-store">
        <SectionHeader index={2} label={t("strings:home.header.project")} />
        <ProjectFront infoStateList={portfolioInfoStateList} />
      </section>
      <section className="bg-green-500 w-full p-8">
        <SectionHeader index={3} label={t("strings:home.header.skills")} />
        <div ref={horizontalScrollContainerRef} className="h-[300vh] bg-amber-800">
          <div className="sticky top-0 flex h-screen items-center">
            <motion.div style={{ x }} className="flex gap-8">
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
        <SectionHeader index={4} label={t("strings:home.header.services")} />
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
        <SectionHeader index={5} label={t("strings:home.header.feedback")} />
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

function SectionHeader({ index, label }: { index: number, label: string }) {
  const indexFormatted = String(index).padStart(2, '0')
  const labelFormatted = label.toUpperCase()
  return (
    <p className="text-xl font-medium tracking-tight md:text-2xl">({indexFormatted}) {labelFormatted}</p>
  )
}

interface Service {
  name: string
}

function ScrollHighlightItem({service, index, isHighlighted, onHighlight}: { service: Service, index: number, isHighlighted: boolean, onHighlight: (index: number) => void }) {
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

function SkillItem({ header, children }: { header: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)

  return (
    <MotionConfig transition={{ duration: 0.3 }}>
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
            <span>{header}</span> <RiArrowDropDownLine />
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
        <hr />
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

function AutoplayProgress({ duration }: { duration: number }) {
  const { currentPage, nextPage } = useCarousel()
  const progress = useMotionValue(0)

  useEffect(() => {
    const animation = animate(progress, [0, 1], {
      duration,
      ease: "linear",
      onComplete: nextPage,
    })

    return () => animation.stop()
  }, [duration, nextPage, progress, currentPage])

  console.log(progress.get())

  return (
    <div className="w-30 h-1.5 bg-pink-400 rounded-4xl z-50 ">
      <motion.div
        className="w-full h-full bg-white origin-left rounded-4xl"
        style={{ scaleX: progress, willChange: "transform" }}
      />
    </div>
  )
}

function ProjectFront({infoStateList}: {infoStateList: PortfolioInfoStateList}) {
  const [openId, open] = useState<string | null>(null)
  const close = () => open(null)

  return (
    <>
      <ul className="flex flex-wrap content-start gap-5 p-0 m-0 list-none max-[990px]:gap-2.5">
        {infoStateList.itemList.map((card) => (
          <Card key={card.id} category={"hi"} open={() => open(card.id)} id={card.id} title={card.title.ko} />
        ))}
      </ul>
      {openId && <Item items={infoStateList.itemList} close={close} id={openId} />}
    </>
  )
}

function CardContent({
                       id,
                       title,
                       category,
                       open,
                       // top,
                       // bottom,
                       width = "100%",
                       // left,
                       theme,
  isOpen = false,
  children = <></>
                     }: CardProps & { isOpen?: boolean, children?: React.ReactNode }) {
  const titleTone =
    theme === "dark" ? "text-[#0f1115]" : "text-white"

  return (
    <motion.div
      className={cn(
        "relative mx-auto overflow-hidden rounded-[20px] bg-[#0b1011]",
        isOpen
          ? "w-auto h-auto max-w-[700px] pointer-events-none"
          : "w-full h-full pointer-events-auto"
      )}
      layoutId={`card-container-${id}`}
    >
      <motion.div
        className="relative flex h-[420px] flex-col justify-stretch overflow-hidden max-[990px]:h-[280px]"
        layoutId={`card-image-container-${id}`}
      >
        <motion.img
          className={cn(
            "absolute w-full",
            "max-[990px]:!top-auto",
            "max-[990px]:!bottom-[-10px]",
            "max-[990px]:!left-0",
            "max-[990px]:!right-0",
            "max-[990px]:min-w-[250px]",
            "max-[990px]:min-h-[300px]"
          )}
          src={`/photos/app-store/${id}.jpg`}
          alt=""
          style={{ width }}
          // style={{ top, bottom, width, left }}
          layoutId={`card-image-${id}`}
        />
      </motion.div>

      <motion.div
        className={cn(
          "absolute top-[15px] left-[15px] max-w-[300px]",
          "max-[990px]:invisible",
          titleTone
        )}
        layoutId={`title-container-${id}`}
        layout="position"
      >
        <span className="text-sm">{category}</span>
        <h2 className="mt-2 text-balance text-[32px] leading-[1.05] tracking-[-0.05em]">
          {title}
        </h2>
      </motion.div>
      {children}
    </motion.div>
  )
}

function Card({
                id,
                title,
                category,
                open,
                // top,
                // bottom,
                width = "100%",
                // left,
                theme,
              }: CardProps) {
  return (
    <li
      onClick={open}
      className={cn(
        "relative box-border list-none p-0 h-[420px]",
        "flex-[0_0_40%]",
        "[&:nth-child(4n+1)]:flex-[0_1_calc(60%-20px)]",
        "[&:nth-child(4n+4)]:flex-[0_1_calc(60%-20px)]",
        "max-[990px]:h-[280px]",
        "max-[990px]:flex-[0_1_calc(50%-5px)]",
        "max-[990px]:[&:nth-child(4n+1)]:flex-[0_1_calc(50%-5px)]",
        "max-[990px]:[&:nth-child(4n+4)]:flex-[0_1_calc(50%-5px)]",
        "cursor-pointer"
      )}
    >
      <CardContent id={id} title={title} category={category} open={open} width={width} theme={theme} />
      {/*<CardContent id={id} title={title} category={category} open={open} top={top} bottom={bottom} width={width} left={left} theme={theme} />*/}
    </li>
  )
}

function Item({ id, items, close }: { id: string, items: Portfolio[], close: VoidFunction }) {
  const {
    // category,
    title,
    // content,
    // top,
    // bottom,
    // theme,
    // width = "100%",
    // left,
  } = items.find((item) => item.id === id)!
  const titleTone = "text-[#0f1115]"
  const theme = "dark"
  const width = "100%"
  // const titleTone =
  //   theme === "dark" ? "text-[#0f1115]" : "text-white"

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        className="fixed inset-0 z-[1000000] bg-black/80"
        onClick={close}
      />
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[1000001] flex h-full w-full flex-col justify-center overflow-hidden py-10",
          "pointer-events-none",
          "max-[990px]:py-0"
        )}
      >
        {/*<CardContent id={id} title={title.ko} category={""} open={open} top={top} bottom={bottom} width={width} left={left} theme={theme} isOpen*/}
        <CardContent id={id} title={title.ko} category={""} open={open} width={width} theme={theme} isOpen
        children={
          <motion.div className="w-[90vw] max-w-[700px] p-[35px]">
            {"hi"}
            {/*{content}*/}
          </motion.div>
        }
        />
      </div>
    </>
  )
}

interface CardProps {
  id: string
  title: string
  category: string
  open: VoidFunction
  top?: number
  bottom?: number
  width?: string
  left?: number
  theme?: "dark" | "light"
}

interface Item {
  id: string
  category: string
  title: string
  content: React.ReactNode
  top?: number
  bottom?: number
  width?: string
  left?: number
  theme?: "dark" | "light"
}

const items: Item[] = [
  {
    id: "a",
    category: "Travel",
    title: "5 Inspiring Apps for Your Next Trip",
    content: (
      <>
        <p className="big">
          Love to travel? So do the makers of these five subscription
          apps. For a small monthly fee, they'll help you find the
          best deals on flights, hotels, and some other stuff we turn
          a blind eye to.
        </p>
        <p className="big">
          Plan your perfect itinerary with intelligent recommendations
          based on your interests, time, and credit history.
        </p>
      </>
    ),
    top: -300,
  },
  {
    id: "c",
    category: "How to",
    title: "Contemplate the Meaning of Life Twice a Day",
    content: (
      <>
        <p className="big">
          What is life? You can't spell "life" without "i". You also
          can't spell "life" without "l", "f", and "e". Worth thinking
          about.
        </p>
        <p className="big">
          The only way to find out more about life is to think about
          it. And the only way to think about it is twice daily using
          an app.
        </p>
        <p className="big">
          Apps? We got 'em. Therefore we got the meaning of life.
        </p>
      </>
    ),
    bottom: -50,
    theme: "dark",
    width: "110%",
    left: -20,
  },
  {
    id: "d",
    category: "Steps",
    title: "Urban Exploration Apps for the Vertically-Inclined",
    content: (
      <>
        <p className="big">
          Get off the beaten path. Find the best views, skywalks, and
          elevated gardens in your city.
        </p>
        <p className="big">
          Locked door? No problem! This app crowdsources the access
          code to every door in your city.
        </p>
      </>
    ),
    theme: "dark",
    width: "200%",
    left: -100,
  },
  {
    id: "b",
    category: "Hats",
    title: "Take Control of Your Hat Life With This Stunning New App",
    content: (
      <>
        <p className="big">
          Whether you're serious hat enthusiast, or just a filthy
          casual, this new app revolutionizes how you organize, care
          for, and expand your hat collection.
        </p>
        <p className="big">
          Stay up to date with the latest hat trends, get personalized
          hat care reminders, and use predictive analytics to discover
          the last place you left your hat.
        </p>
        <p className="big">
          Why follow the crowd when you can be the crowd?
        </p>
      </>
    ),
    bottom: -100,
  },
]
