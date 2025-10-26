import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Navbar,
  Popover, PopoverContent,
  PopoverTrigger,
  Skeleton,
  Spacer
} from "@heroui/react";
import {useParams} from "react-router";
import {NoticeDetailInfoState, useNoticeDetailViewModel} from "./NoticeDetailViewModel.ts";
import styled from "styled-components";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {
  CalendarDotsIcon, ExportIcon, LinkSimpleIcon, PushPinIcon
} from "@phosphor-icons/react";
import {PlaceholderValue} from "../../../../../constant/PlaceholderValue.ts";
import useEmblaCarousel from "embla-carousel-react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown';
import {useDateTimeFormatters} from "../../../../utils/utils/DateTimeFormat.ts";
import handleShare from "../../../../utils/utils/ShareUtil.ts";
import {useSummaryObserver} from "../../../../utils/utils/SummaryObserver.ts";
import {useScrollObserver} from "../../../../utils/utils/ScrollObserver.ts";

interface TopToolbarProps {
  infoState: NoticeDetailInfoState,
  visible: boolean;
  headerVisible: boolean;
}

export default function NoticeDetailScreen() {
  const { infoState, startListening, stopListening, setItemId } = useNoticeDetailViewModel();
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();
  const { dateTimeFormat } = useDateTimeFormatters();
  const [headerVisible, setHeaderVisible] = useState<boolean>(true);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(false);
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

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
        src={infoState.item?.imageUrls && infoState.item?.imageUrls?.length > 0 ? infoState.item?.imageUrls[0] : ""}
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
          <SummaryCard id="summary">
            <div className="container">
              <div className="category">
                <Skeleton className="rounded-lg" isLoaded={infoState.isInitialized}>
                  <Chip radius="sm">{infoState.item?.category?.labelKor ?? PlaceholderValue.chipCategory}</Chip>
                </Skeleton>
              </div>
              <div className="title">
                <Skeleton className="rounded-lg" as="h1" isLoaded={infoState.isInitialized}>
                  <h1>
                    {
                      infoState.item?.fixed ? <PushPinIcon size={36} weight="fill" color="hsl(var(--heroui-danger-600) / 1)" /> : <></>
                    }

                    {infoState.item?.title ?? PlaceholderValue.h1Title}
                  </h1>
                </Skeleton>
                <Spacer style={{ flexGrow: 1 }} />
                <div className="buttons">
                  <Button
                    size="lg" isIconOnly color="primary"
                    onPress={() => handleShare({ title: document.title, url: window.location.href, text: document.title })}
                  >
                    <ExportIcon size="24" weight="bold" />
                  </Button>
                  <Popover
                    placement="left"
                    onOpenChange={() => navigator.clipboard.writeText(window.location.href)}
                  >
                    <PopoverTrigger>
                      <Button
                        size="lg" isIconOnly color="secondary"
                      >
                        <LinkSimpleIcon size="24" weight="bold" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">{t("strings:copied_title")}</div>
                        <div className="text-tiny">{t("strings:copied_desc")}</div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="date">
                <CalendarDotsIcon size="18" weight="bold" />
                <Skeleton className="rounded-lg" isLoaded={infoState.isInitialized}>{dateTimeFormat(infoState.item?.createAt?.toDate() ?? new Date())}</Skeleton>
              </div>
            </div>
          </SummaryCard>
          <div className="data">
            {
              infoState.item?.imageUrls && infoState.item?.imageUrls?.length !== 0 ? (
                <Card className="content-card" id="screenshots">
                  <CardBody className="body slide">
                    <div className="slide" ref={emblaRef}>
                      <div className="container">
                        {
                          infoState.item?.imageUrls?.map((url) => (
                            <Image radius="sm" className="slide-item" src={url} />
                          ))
                        }
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ) : <></>
            }

            <div className="content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
              >
                {infoState.item?.content}
              </ReactMarkdown>
            </div>
          </div>
        </ContentWrapper>
        <TopToolBar
          infoState={infoState}
          visible={summaryVisible}
          headerVisible={headerVisible}
        />
      </CommonWrapper>
    </DefaultLayout>

  );
}

const ContentWrapper = styled.div`
  .content-card {
    display: flex;
    flex-direction: column;
    gap: 1rem; 
    
    & > .body {
      padding: 1rem;

      &.slide {
        padding: 1rem 0 1rem 0;
        
        --slide-height: 20rem;
        --slide-spacing: 1rem;
        --slide-size: 20rem;

        & > .slide {
          width: 100%;
          overflow: hidden;

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
    }
  }
  
  & > .data {
    margin-top: 1rem;
    
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const SummaryCard = styled.div`
  & > .container {
    margin-top: -1rem;
    z-index: 500;

    position: relative;
    
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    & > .category {
      display: flex;
      flex-direction: row;
    }
    
    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      
      h1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        
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
    
    & > .date {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;

      color: ${'hsl(var(--heroui-default-500))'};
      font-size: small;;
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
    
    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      
      & > h3 {
        font-size: x-large;
        font-weight: bold;
      }
      
      & > .sub-info {
        margin-left: 1rem;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        
        & > .date {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          
          color: ${'hsl(var(--heroui-default-500))'};
          font-size: small;;
        }
      }
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

const TopToolBar = (props: TopToolbarProps) => {
  const { t } = useTranslation();
  const { dateTimeFormat } = useDateTimeFormatters();

  return (
    <TopToolBarWrapper
      className={(props.visible ? "visible " : "") + (props.headerVisible ? "header-visible " : "")}
    >
      <div className="title">
        {
          props.infoState.item?.fixed ? <PushPinIcon size={24} weight="fill" color="hsl(var(--heroui-danger-600) / 1)" /> : <></>
        }
        <h3>{props.infoState.item?.title}</h3>
        <div className="sub-info">
          <Chip radius="sm">{props.infoState.item?.category?.labelKor}</Chip>
          <div className="date">
            <CalendarDotsIcon size="18" weight="bold" />
            {dateTimeFormat(props.infoState.item?.createAt?.toDate() ?? new Date())}
          </div>
        </div>
      </div>
      <Spacer style={{ flexGrow: 1 }} />
      <div className="buttons">
        <Button
          size="sm" isIconOnly color="primary"
          onPress={() => handleShare({ title: document.title, url: window.location.href, text: document.title })}
        >
          <ExportIcon size="18" weight="bold" />
        </Button>
        <Popover
          placement="bottom"
          onOpenChange={() => navigator.clipboard.writeText(window.location.href)}
        >
          <PopoverTrigger>
            <Button
              size="sm" isIconOnly color="secondary"
            >
              <LinkSimpleIcon size="18" weight="bold" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">{t("strings:copied_title")}</div>
              <div className="text-tiny">{t("strings:copied_desc")}</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </TopToolBarWrapper>
  );
}