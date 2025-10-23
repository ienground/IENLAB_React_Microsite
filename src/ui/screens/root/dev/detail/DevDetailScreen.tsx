import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {
  Alert,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image, Link,
  Navbar, Skeleton,
  Spacer
} from "@heroui/react";
import {
  AppStoreLogoIcon,
  CalendarCheckIcon, CalendarDotsIcon, CheckCircleIcon,
  FileTextIcon, GithubLogoIcon,
  GooglePlayLogoIcon,
  LinkSimpleIcon,
  ReceiptIcon,
  UserCircleIcon
} from "@phosphor-icons/react";
import {useEffect, useRef, useState} from "react";
import BottomToolbar, {type BottomToolbarItem} from "../../../../utils/components/BottomToolbar.tsx";
import useEmblaCarousel from "embla-carousel-react";
import {DevDetailInfoState, useDevDetailViewModel} from "./DevDetailViewModel.tsx";
import {useParams} from "react-router";
import {
  DevProjectCategoryToString,
  DevProjectStateToColor,
  DevProjectStateToString
} from "../../../../../data/project/DevProject.ts";
import {useDateTimeFormatters} from "../../../../utils/utils/DateTimeFormat.ts";
import {PlaceholderValue} from "../../../../../constant/PlaceholderValue.ts";
import {CSSTransition} from "react-transition-group";
import {getAppStoreLink, getGooglePlayLink} from "../../../../utils/utils/LinkHelper.ts";
import {useSummaryObserver} from "../../../../utils/utils/SummaryObserver.ts";
import {useScrollObserver} from "../../../../utils/utils/ScrollObserver.ts";

interface TopToolbarProps {
  infoState: DevDetailInfoState,
  visible: boolean;
  headerVisible: boolean;
}

export default function DevDetailScreen() {
  const { infoState, startListening, stopListening, setItemId } = useDevDetailViewModel();
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();
  const [headerVisible, setHeaderVisible] = useState<boolean>(true);
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
  const { dateFormat } = useDateTimeFormatters();
  const placeholderRef = useRef(null);
  const dataRef = useRef(null);

  useEffect(() => {
    if (id) setItemId(id);
    return () => setItemId(null);
  }, [id, setItemId]);

  useEffect(() => {
    startListening();

    return () => stopListening();
  }, [startListening, stopListening]);

  useEffect(() => {
    document.body.style.overflow = infoState.isInitialized ? "unset" : "hidden";
    return () => { document.body.style.overflow = "unset" };
  }, [infoState, infoState.isInitialized]);

  useSummaryObserver(setSummaryVisible);
  useScrollObserver(setHeaderVisible);

  return (
    <DefaultLayout toolbarOverlap toolbarVisible={headerVisible}>
      <Image
        src={infoState.item?.thumbnail}
        fallbackSrc="https://picsum.photos/150/150"
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
                src={infoState.item?.logo}
                fallbackSrc="https://picsum.photos/150/150"
                className="app-icon"
                style={{
                  width: "8rem",
                  height: "8rem"
                }}
              />
              <div className="category">
                {
                  infoState.isInitialized ? <>
                    {
                      infoState.item?.categories?.map((item) => (
                        <Chip radius="sm">{DevProjectCategoryToString(t, item)} </Chip>
                      )) ?? <></>
                    }
                  </> : <Skeleton className="rounded-lg">{PlaceholderValue.chipCategory}</Skeleton>
                }
              </div>
              <div className="title">
                <Skeleton
                  as="h1"
                  className="rounded-lg"
                  isLoaded={infoState.isInitialized}
                >
                  <h1>{infoState.isInitialized ? infoState.item?.title : PlaceholderValue.h1Title}</h1>
                </Skeleton>
                <Spacer style={{ flexGrow: 1 }} />
                <Skeleton
                  className="rounded-lg"
                  isLoaded={infoState.isInitialized}
                >
                  {
                    infoState.isInitialized ?
                      <div className="buttons">
                        {
                          infoState.item?.googlePlay && infoState.item?.googlePlay !== "" ?
                            <Button
                              size="lg"
                              isIconOnly
                              className="google-play-button"
                              as={Link}
                              href={getGooglePlayLink(infoState.item?.googlePlay)}
                            >
                              <GooglePlayLogoIcon size="24" weight="bold" />
                            </Button> : <></>
                        }
                        {
                          infoState.item?.appStore && infoState.item?.appStore !== "" ?
                            <Button
                              size="lg"
                              isIconOnly
                              className="app-store-button"
                              as={Link}
                              href={getAppStoreLink(infoState.item?.appStore)}
                            >
                              <AppStoreLogoIcon size="24" weight="bold" />
                            </Button> : <></>
                        }
                        {
                          infoState.item?.github && infoState.item?.github !== "" ?
                            <Button
                              size="lg"
                              isIconOnly
                              className="github-button"
                              as={Link}
                              href={infoState.item?.github}
                            >
                              <GithubLogoIcon size="24" weight="bold" />
                            </Button> : <></>
                        }
                        {
                          infoState.item?.link && infoState.item?.link !== "" ?
                            <Button
                              size="lg"
                              isIconOnly
                              color="primary"
                              as={Link}
                              href={infoState.item?.link}
                            >
                              <LinkSimpleIcon size="24" weight="bold" />
                            </Button> : <></>
                        }
                      </div>
                      : <div className="buttons">
                        <Button size="lg" isIconOnly color="primary" />
                        <Button size="lg" isIconOnly color="primary" />
                        <Button size="lg" isIconOnly color="primary" />
                        <Button size="lg" isIconOnly color="primary" />
                      </div>
                  }

                </Skeleton>
              </div>
              <Skeleton
                className="rounded-lg"
                isLoaded={infoState.isInitialized}
              >
                <div className="property">
                  <div className="item state">
                    <CheckCircleIcon
                      size={24} weight="bold"
                      style={{
                        transition: "color 0.3s ease-in-out"
                      }}
                      color={DevProjectStateToColor(infoState.item?.state)}
                    />
                    <div className="container">
                      <div className="title">{t("strings:state")}</div>
                      <div className="content">{DevProjectStateToString(t, infoState.item?.state)}</div>
                    </div>
                  </div>
                  <div className="item start-date">
                    <CalendarDotsIcon size={24} weight="bold" />
                    <div className="container">
                      <div className="title">{t("strings:start_date")}</div>
                      <div className="content">{dateFormat(infoState.item?.startAt?.toDate() ?? new Date())}</div>
                    </div>
                  </div>
                  {
                    infoState.item?.endAt ?
                      <div className="item end-date">
                        <CalendarCheckIcon size={24} weight="bold" />
                        <div className="container">
                          <div className="title">{t("strings:end_date")}</div>
                          <div className="content">{dateFormat(infoState.item?.endAt?.toDate() ?? new Date())}</div>
                        </div>
                      </div> : <></>
                  }
                  <div className="item developer-info">
                    <UserCircleIcon size={24} weight="bold" />
                    <div className="container">
                      <div className="title">{t("strings:developer")}</div>
                      <div className="content">{infoState.item?.developer}</div>
                    </div>
                  </div>
                </div>
              </Skeleton>
            </div>
          </SummaryCard>

          <div className="box">
            <CSSTransition
              in={!infoState.isInitialized}
              timeout={300}
              classNames="fade"
              nodeRef={placeholderRef}
              unmountOnExit
              appear
            >
              <div ref={placeholderRef} />
            </CSSTransition>
            <CSSTransition
              in={infoState.isInitialized}
              timeout={300}
              classNames="fade"
              nodeRef={dataRef}
              mountOnEnter
              appear
            >
              <div
                className="data"
                ref={dataRef}
              >
                <Divider />
                <div className="content">
                  <Card className="content-card anchor" id="overview">
                    <CardHeader className="header">
                      <FileTextIcon size={24} weight="bold" />
                      <div>{t("strings:estimate.overview")}</div>
                    </CardHeader>
                    <CardFooter className="footer">
                      {infoState.item?.summary}
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
                          {
                            infoState.item?.imageUrls?.map((url) => (
                              <Image radius="sm" className="slide-item" src={url} />
                            ))
                          }
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
                      {
                        infoState.item?.functions?.map((item, index) => (
                          <Alert
                            hideIconWrapper
                            radius="sm"
                            icon={<CheckCircleIcon size={24} weight="bold" /> }
                            color="success"
                            classNames={{
                              alertIcon: "text-success-500",
                              title: "text-success-500"
                            }}
                            title={item}
                            key={index}
                          />
                        ))
                      }
                    </CardFooter>
                  </Card>
                  <Card className="content-card anchor" id="techs">
                    <CardHeader className="header">
                      <FileTextIcon size={24} weight="bold" />
                      <div>{t("strings:tech_stacks")}</div>
                    </CardHeader>
                    <CardFooter className="footer techs">
                      {
                        infoState.item?.techs?.map((item, index) => (
                          <Chip radius="sm" key={index}>{item}</Chip>
                        ))
                      }
                    </CardFooter>
                  </Card>
                  <Spacer style={{ height: "50vh" }} />
                </div>
              </div>
            </CSSTransition>
          </div>
        </ContentWrapper>
        <TopToolBar
          infoState={infoState}
          visible={summaryVisible}
          headerVisible={headerVisible}
        />
        <BottomToolbar
          visible={infoState.isInitialized}
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
        gap: 0.5rem;
      }
    }
  }

  .data {
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
      
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      
    }
    
    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      
      & > h1 {
        font-size: xxx-large;
        font-weight: bold;
      }
      
      .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }
    }
    
    .property {
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      & > .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
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
    
    & > .buttons {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
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
      src={props.infoState.item?.logo}
      fallbackSrc={"https://picsum.photos/400/400"}
      style={{ width: "3rem", height: "3rem" }}
      radius="sm"
    />
    <h3>{props.infoState.item?.title}</h3>
    <Spacer style={{ flexGrow: 1 }} />
    <div className="buttons">
      {
        props.infoState.item?.googlePlay && props.infoState.item?.googlePlay !== "" ?
          <Button
            size="sm"
            isIconOnly
            className="google-play-button"
            as={Link}
            href={getGooglePlayLink(props.infoState.item?.googlePlay)}
          >
            <GooglePlayLogoIcon size="18" weight="bold" />
          </Button> : <></>
      }
      {
        props.infoState.item?.appStore && props.infoState.item?.appStore !== "" ?
          <Button
            size="sm"
            isIconOnly
            className="app-store-button"
            as={Link}
            href={getAppStoreLink(props.infoState.item?.appStore)}
          >
            <AppStoreLogoIcon size="18" weight="bold" />
          </Button> : <></>
      }
      {
        props.infoState.item?.github && props.infoState.item?.github !== "" ?
          <Button
            size="sm"
            isIconOnly
            className="github-button"
            as={Link}
            href={props.infoState.item?.github}
          >
            <GithubLogoIcon size="18" weight="bold" />
          </Button> : <></>
      }
      {
        props.infoState.item?.link && props.infoState.item?.link !== "" ?
          <Button
            size="sm"
            isIconOnly
            color="primary"
            as={Link}
            href={props.infoState.item?.link}
          >
            <LinkSimpleIcon size="18" weight="bold" />
          </Button> : <></>
      }
    </div>
  </TopToolBarWrapper>
);