import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Navbar,
  Spacer
} from "@heroui/react";
import {
  ArrowUUpLeftIcon, CalendarCheckIcon, CalendarDotsIcon, CheckCircleIcon,
  FileTextIcon,
  GooglePlayLogoIcon,
  HourglassLowIcon,
  ReceiptIcon,
  UserCircleIcon
} from "@phosphor-icons/react";
import {useEffect, useState} from "react";
import BottomToolbar, {type BottomToolbarItem} from "../../../../utils/components/BottomToolbar.tsx";
import useEmblaCarousel from "embla-carousel-react";
import {useScrollMonitor} from "../../../../utils/utils/ScrollData.ts";

interface TopToolbarProps {
  visible: boolean;
  headerVisible: boolean;
}

export default function DevDetailScreen() {
  const { t } = useTranslation();
  const { scrollY, scrollDirection } = useScrollMonitor();
  const toolbarThreshold = 100;
  const [headerVisible, setHeaderVisible] = useState<boolean>(false);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("summary");
  const tabItems: BottomToolbarItem[] = [
    { key: "summary", icon: ReceiptIcon, label: t("strings:estimate.summary")},
    { key: "overview", icon: ReceiptIcon, label: t("strings:estimate.overview")},
    { key: "screenshots", icon: ReceiptIcon, label: t("strings:screenshots")},
    { key: "functions", icon: ReceiptIcon, label: t("strings:functions")},
    { key: "techs", icon: ReceiptIcon, label: t("strings:tech_stacks")},
  ];

  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  // Summary 추적
  useEffect(() => {
    const anchor = document.querySelector("#summary");
    if (!anchor) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setSummaryVisible(entry.isIntersecting);
        })
      },
      {
        rootMargin: "0px",
        threshold: [0]
      }
    );

    observer.observe(anchor);

    return () => {
      observer.unobserve(anchor);
    }
  }, []);

  useEffect(() => {
    setHeaderVisible(scrollDirection === "up" || scrollY < toolbarThreshold);
  }, [scrollY, scrollDirection]);

  return (
    <DefaultLayout toolbarOverlap toolbarVisible={headerVisible}>
      <Image
        src="https://picsum.photos/1920/1080"
        className="img-background"
        classNames={{
          img: "object-cover",
        }}
        style={{
          width: "100vw",
          aspectRatio: "32/9",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        }}
      />
      <CommonWrapper>
        <ContentWrapper>
          <SummaryCard className="anchor" id="summary">
            <div className="container">
              <Image
                src="https://picsum.photos/1000/1000"
                className="app-icon"
                style={{
                  width: "8rem",
                  height: "8rem"
                }}
              />
              <div className="category">
                <Chip radius="sm">웹 개발</Chip>
              </div>
              <div className="title">
                <h1>캘람</h1>
                <Spacer style={{ flexGrow: 1 }} />
                <div className="buttons">
                  <Button size="lg" isIconOnly color="primary">
                    <GooglePlayLogoIcon size="24" weight="bold" />
                  </Button>
                  <Button size="lg" isIconOnly color="primary">
                    <GooglePlayLogoIcon size="24" weight="bold" />
                  </Button>
                  <Button size="lg" isIconOnly color="primary">
                    <GooglePlayLogoIcon size="24" weight="bold" />
                  </Button>
                  <Button size="lg" isIconOnly color="primary">
                    <GooglePlayLogoIcon size="24" weight="bold" />
                  </Button>
                </div>
              </div>
              <div className="property">
                <div className="item state">
                  <CheckCircleIcon size={24} weight="bold" />
                  <div className="container">
                    <div className="title">{t("strings:state")}</div>
                    <div className="content">완료</div>
                  </div>
                </div>
                <div className="item start-date">
                  <CalendarDotsIcon size={24} weight="bold" />
                  <div className="container">
                    <div className="title">{t("strings:start_date")}</div>
                    <div className="content">완료</div>
                  </div>
                </div>
                <div className="item end-date">
                  <CalendarCheckIcon size={24} weight="bold" />
                  <div className="container">
                    <div className="title">{t("strings:end_date")}</div>
                    <div className="content">완료</div>
                  </div>
                </div>
                <div className="item developer-info">
                  <UserCircleIcon size={24} weight="bold" />
                  <div className="container">
                    <div className="title">{t("strings:developer")}</div>
                    <div className="content">완료</div>
                  </div>
                </div>
              </div>
            </div>
          </SummaryCard>
          <div className="data">
            <Divider />
            <div className="content">
              <Card className="content-card anchor" id="overview">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:estimate.overview")}</div>
                </CardHeader>
                <CardFooter className="footer">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis incidunt itaque non. Aliquid aperiam consectetur corporis doloremque ducimus eius enim eum excepturi, id incidunt itaque iure odio placeat provident quia soluta sunt tempora unde voluptate voluptates! Aliquam deleniti, dolore est illum ipsam, minus, necessitatibus non optio placeat possimus velit veritatis. Ab accusantium animi aut commodi consequuntur cumque deserunt dolor dolorem doloremque dolores eaque error exercitationem id laborum libero maxime, minus, modi nam nobis porro provident quasi quisquam quos voluptas voluptates. Assumenda at atque blanditiis commodi, corporis excepturi harum iusto laudantium obcaecati officia, pariatur praesentium provident qui quis quo ratione sint?
                </CardFooter>
              </Card>
              <Card className="content-card anchor" id="screenshots">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:screenshots")}</div>
                </CardHeader>
                <CardFooter className="footer slide">
                  <div className="slide" ref={emblaRef}>
                    <div className="container">
                      <Image radius="sm" className="slide-item" src="https://picsum.photos/1080/1920" />
                      <Image radius="sm" className="slide-item" src="https://picsum.photos/1080/1920" />
                      <Image radius="sm" className="slide-item" src="https://picsum.photos/1080/1920" />
                      <Image radius="sm" className="slide-item" src="https://picsum.photos/1080/1920" />
                      <Image radius="sm" className="slide-item" src="https://picsum.photos/1080/1920" />
                      <Image radius="sm" className="slide-item" src="https://picsum.photos/1080/1920" />
                      <Image radius="sm" className="slide-item" src="https://picsum.photos/1080/1920" />
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <Card className="content-card anchor" id="functions">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:functions")}</div>
                </CardHeader>
                <CardFooter className="footer">
                  <Alert
                    hideIconWrapper
                    radius="sm"
                    icon={<CheckCircleIcon size={24} weight="bold" /> }
                    color="success"
                    title={"Title"}
                    key={"0"}
                  />
                </CardFooter>
              </Card>
              <Card className="content-card anchor" id="techs">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:tech_stacks")}</div>
                </CardHeader>
                <CardFooter className="footer techs">
                  <Chip radius="sm">React</Chip>
                </CardFooter>
              </Card>
              <Spacer style={{ height: "50vh" }} />
            </div>
          </div>
        </ContentWrapper>
        <TopToolBar
          visible={!summaryVisible}
          headerVisible={headerVisible}
        />
        <BottomToolbar
          visible={true}
          selectedKey={selected}
          onSelectionChange={setSelected}
          tabItems={tabItems}
        />
      </CommonWrapper>
    </DefaultLayout>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .anchor {
    scroll-margin-top: 5rem;
  }
  
  .content-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    & > .header {
      padding: 1rem 1rem 0 1rem;
      
      display: flex;
      flex-direction: row;
      gap: 1rem;
      
      font-size: x-large;
      font-weight: bold;
    }
    
    & > .body {
      padding: 0 1rem;
    }
    
    & > .footer {
      padding: 0 1rem 1rem 1rem;

      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;

      color: ${'hsl(var(--heroui-foreground-500))'};
      
      &.slide {
        padding: 0 0 1rem 0;

        --slide-height: 20rem;
        --slide-spacing: 1rem;
        --slide-size: 20rem;

        & > .slide {
          width: 100%;

          & > .container {
            display: flex;
            touch-action: pan-y pinch-zoom;
            margin-left: ${'calc(var(--slide-spacing) * -1)'};

            & > div {
              transform: translate3d(0, 0, 0);
              flex: 0 0 ${'var(--slide-size)'};
              min-width: 0;
              padding-left: ${'var(--slide-spacing)'};

              &:first-child {
                margin-left: ${'var(--slide-spacing)'};
              }
            }
          }
        }
      }
      
      &.techs {
        display: flex;
        flex-direction: row;
      }
    }
  }

  & > .data {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & > .header {
      font-size: xx-large;
      font-weight: bold;
    }

    & > .content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

const SummaryCard = styled.div`
  
  & > .container {
    margin-top: -5rem;
    z-index: 500;

    position: relative;
    
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    & > .category {
      margin-top: 0.5rem;
      
    }
    
    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      
      & > h1 {
        font-size: xxx-large;
        font-weight: bold;
      }
      
      & > .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }
    }
    
    & > .property {
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      & > .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;

        & > .container {
          display: flex;
          flex-direction: column;

          & > .title {
            font-size: large;
            font-weight: bold;
          }

          & > .content {
            color: ${'hsl(var(--heroui-foreground-500))'};
          }
        }
      }
    }
  }
`;

const TopToolBarWrapper = styled(Navbar)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 950;
  
  display: flex;
  flex-direction: row;
  transform: translateY(calc(-100% - 4rem));

  background-color: color-mix(in oklab, ${"hsl(var(--heroui-background)"} / 1) 70%, transparent);
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out;
  
  --navbar-height: initial !important;
  
  & > header {
    max-width: calc(1440px + 2rem);
    padding: 0.5rem 1rem;
    
    & > h3 {
      font-size: x-large;
      font-weight: bold;
    }
  }
  
  &.visible {
    transform: translateY(0);
  }
  
  &.header-visible {
    top: 4rem;
  }
`;

const TopToolBar = (props: TopToolbarProps) => (
  <TopToolBarWrapper
    className={(props.visible ? "visible " : "") + (props.headerVisible ? "header-visible " : "")}
  >
    <Image
      src="https://picsum.photos/200/200"
      style={{ width: "3rem", height: "3rem" }}
      radius="sm"
    />
    <h3>캘람</h3>
    <Spacer style={{ flexGrow: 1 }} />
    <div className="buttons">
      <Button size="sm" isIconOnly color="primary">
        <GooglePlayLogoIcon size="18" weight="bold" />
      </Button>
    </div>
  </TopToolBarWrapper>
);