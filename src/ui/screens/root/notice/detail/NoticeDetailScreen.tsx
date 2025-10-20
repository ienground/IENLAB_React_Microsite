import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {useTranslation} from "react-i18next";
import {useScrollMonitor} from "../../../../utils/utils/ScrollData.ts";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Skeleton, Spacer} from "@heroui/react";
import {useParams, useSearchParams} from "react-router";
import {useNoticeDetailViewModel} from "./NoticeDetailViewModel.ts";
import styled from "styled-components";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {
  CalendarCheckIcon,
  CalendarDotsIcon,
  CheckCircleIcon, FileTextIcon,
  GooglePlayLogoIcon, PushPinIcon,
  UserCircleIcon
} from "@phosphor-icons/react";
import {PlaceholderValue} from "../../../../../constant/PlaceholderValue.ts";
import useEmblaCarousel from "embla-carousel-react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown';
import {useDateTimeFormatters} from "../../../../utils/utils/DateTimeFormat.ts";

export default function NoticeDetailScreen() {
  const { infoState, startListening, stopListening, setItemId } = useNoticeDetailViewModel();
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();
  const { dateTimeFormat } = useDateTimeFormatters();
  const { scrollY, scrollDirection } = useScrollMonitor();
  const toolbarThreshold = 100;
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
    setHeaderVisible(scrollDirection === "up" || scrollY < toolbarThreshold);
  }, [scrollY, scrollDirection]);

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
                  <Button size="lg" isIconOnly color="primary">
                    <GooglePlayLogoIcon size="24" weight="bold" />
                  </Button>
                  <Button size="lg" isIconOnly color="primary">
                    <GooglePlayLogoIcon size="24" weight="bold" />
                  </Button>
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