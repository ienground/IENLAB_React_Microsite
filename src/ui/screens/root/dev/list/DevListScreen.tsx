import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {
  AppStoreLogoIcon, ArrowUpRightIcon,
  BellRingingIcon, CalendarCheckIcon,
  CalendarDotsIcon,
  GithubLogoIcon,
  GooglePlayLogoIcon, LinkSimpleIcon
} from "@phosphor-icons/react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Link, Skeleton, Spacer} from "@heroui/react";
import {useElementRefs, useVisibleAnimation} from "../../../../utils/utils.ts";
import {
  type DevProject,
  devProjectCategory,
  DevProjectCategoryToString,
  devProjectState, DevProjectStateToHeroColor, DevProjectStateToString
} from "../../../../../data/project/DevProject.ts";
import {Timestamp} from "firebase/firestore";
import {useDevListViewModel} from "./DevListViewModel.tsx";
import {useEffect, useRef} from "react";
import {CSSTransition} from "react-transition-group";
import {DevDestination} from "../DevDestination.ts";
import {useNavigate} from "react-router";
import {PlaceholderValue} from "../../../../../constant/PlaceholderValue.ts";
import {useDateTimeFormatters} from "../../../../utils/utils/DateTimeFormat.ts";
import {getAppStoreLink, getGooglePlayLink} from "../../../../utils/utils/LinkHelper.ts";

export default function DevListScreen() {
  const { infoStateList, startListening, stopListening } = useDevListViewModel();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, [startListening, stopListening]);

  useEffect(() => {
    document.body.style.overflow = infoStateList.isInitialized ? "unset" : "hidden";
    return () => { document.body.style.overflow = "unset" };
  }, [infoStateList, infoStateList.isInitialized]);

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  const placeholderRef = useRef(null);
  const listRef = useRef(null);

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <BellRingingIcon size={48} weight="bold" />
          <div>{t("strings:project.title")}</div>
        </div>
        <ContentWrapper
          className="visible-animation"
          ref={addToVisibleAnimationRefs}
        >
          <CSSTransition
            in={!infoStateList.isInitialized}
            timeout={300}
            classNames="fade"
            nodeRef={placeholderRef}
            unmountOnExit
            appear
          >
            <div ref={placeholderRef} className="flexbox">
              {
                Array(4).fill(null).map((_, index) => (
                  <DevProjectCellShimmer index={index} />
                ))
              }
            </div>
          </CSSTransition>
          <CSSTransition
            in={infoStateList.isInitialized}
            timeout={300}
            classNames="fade"
            nodeRef={listRef}
            mountOnEnter
            appear
          >
            <div ref={listRef} className="flexbox">
              {
                infoStateList.itemList.map((item) => (
                  <DevProjectCell key={item.id} item={item} onClick={() => navigate(`${DevDestination.route}/${item.id}`)} />
                ))
              }
            </div>
          </CSSTransition>
        </ContentWrapper>
      </CommonWrapper>
    </DefaultLayout>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  
  position: relative;

  .flexbox {
    position: absolute;
    width: 100%;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

const DevProjectCellWrapper = styled(Card)`
  transition: transform 0.2s ease-in-out;
  
  & > .header {
    & > .content {
      width: 100%;
      aspect-ratio: 16 / 9;
      padding: 1rem;
      
      position: absolute;
      top: 0;
      left: 0;
      z-index: 500;
      
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      
    }
  }
  
  & > .body {
    margin-top: -3rem;
    padding: 0 1rem 1rem 1rem;
    
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > .header {
      display: flex;
      flex-direction: row;
      
      z-index: 500;
      
      & > .buttons {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        
        & > button {
        }
      }
    }
    
    & > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      
      & > h2 {
        font-size: x-large;
        font-weight: bold;
      }
    }
    
    & > .summary {
      color: ${'hsl(var(--heroui-default-500))'};
    }

    & > .date {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      
      color: ${'hsl(var(--heroui-default-500))'};
      font-size: small;
      
      & > .start-date, & > .end-date {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }

  &:hover {
    transform: translateY(-4px);
    
    &.shimmer {
      transform: initial;
    }
  }
`;

export const DevProjectCell = ({ item, onClick }: { item: DevProject, onClick: () => void }) => {
  const { t } = useTranslation();
  const { dateFormat } = useDateTimeFormatters();
  return (
    <DevProjectCellWrapper disableRipple>
      <div className="header">
        <Image
          src={item.thumbnail}
          width={"100%"}
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0"
          }}
        />
        <div className="content">
          {
            item.isPrimary ? <Chip radius="sm">{t("strings:primary_project")}</Chip> : <></>
          }
          <Chip radius="sm" color={DevProjectStateToHeroColor(item.state)}>{DevProjectStateToString(t, item.state)}</Chip>
          <Spacer style={{ flexGrow: 1 }} />
          <Button
            variant="flat"
            isIconOnly
            radius="sm"
            size="lg"
            onPress={onClick}
          >
            <ArrowUpRightIcon size={24} weight="bold" />
          </Button>
        </div>
      </div>
      <CardBody className="body">
        <div className="header">
          <Image
            src={item.logo}
            radius="sm"
            style={{
              width: "6rem",
              height: "6rem",
            }}
          />
          <Spacer style={{ flexGrow: 1 }} />
          <div className="buttons">
            {
              item.googlePlay && item.googlePlay !== "" ?
                <Button
                  size="sm"
                  isIconOnly
                  color="primary"
                  as={Link}
                  href={getGooglePlayLink(item.googlePlay)}
                >
                  <GooglePlayLogoIcon size="18" weight="bold" />
                </Button> : <></>
            }
            {
              item.appStore && item.appStore !== "" ?
                <Button
                  size="sm"
                  isIconOnly
                  color="primary"
                  as={Link}
                  href={getAppStoreLink(item.appStore)}
                >
                  <AppStoreLogoIcon size="18" weight="bold" />
                </Button> : <></>
            }
            {
              item.github && item.github !== "" ?
                <Button
                  size="sm"
                  isIconOnly
                  color="primary"
                  as={Link}
                  href={item.github}
                >
                  <GithubLogoIcon size="18" weight="bold" />
                </Button> : <></>
            }
            {
              item.link && item.link !== "" ?
                <Button
                  size="sm"
                  isIconOnly
                  color="primary"
                  as={Link}
                  href={item.link}
                >
                  <LinkSimpleIcon size="18" weight="bold" />
                </Button> : <></>
            }
          </div>
        </div>
        <div className="title">
          <h2>{item.title}</h2>
          <Spacer style={{ flexGrow: 1 }} />
          {
            item.categories.map((category) => (
              <Chip radius="sm">{DevProjectCategoryToString(t, category)} </Chip>
            ))
          }
        </div>
        <div className="summary">{item.summary}</div>
        <div className="date">
          <div className="start-date">
            <CalendarDotsIcon size="18" weight="bold" />
            {dateFormat(item.startAt.toDate())}
          </div>
          {
            item.endAt ?
              <div className="end-date">
                ~
                <CalendarCheckIcon size="18" weight="bold" />
                {dateFormat(item.endAt.toDate())}
              </div> : <></>
          }
        </div>
      </CardBody>
    </DevProjectCellWrapper>
  )
}

export const DevProjectCellShimmer = ({ index }: { index: number }) => {
  return (
    <DevProjectCellWrapper className="shimmer" disableRipple>
      <div className="header">
        <Image
          width={"100%"}
          isLoading
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0"
          }}
        />
        <div className="content">
          <Skeleton className="rounded-lg h-fit"><Chip radius="sm">{PlaceholderValue.chipState}</Chip></Skeleton>
          <Spacer style={{ flexGrow: 1 }} />
          <Button
            variant="flat"
            isIconOnly
            radius="sm"
            size="lg"
            isDisabled
          >
            <ArrowUpRightIcon size={24} weight="bold" />
          </Button>
        </div>
      </div>
      <CardBody className="body">
        <div className="header">
          <Image
            isLoading
            radius="sm"
            style={{
              width: "6rem",
              height: "6rem",
            }}
          />
          <Spacer style={{ flexGrow: 1 }} />
          <div className="buttons">
            <Button size="sm" isIconOnly color="primary" isDisabled>
              <GooglePlayLogoIcon size="18" weight="bold" />
            </Button>
            <Button size="sm" isIconOnly color="primary" isDisabled>
              <GooglePlayLogoIcon size="18" weight="bold" />
            </Button>
          </div>
        </div>
        <div className="title">
          <Skeleton className="rounded-lg" as="h2">{PlaceholderValue.h2Title}</Skeleton>
          <Spacer style={{ flexGrow: 1 }} />
          <Skeleton className="rounded-lg"><Chip radius="sm">{PlaceholderValue.chipCategory}</Chip></Skeleton>
        </div>
        <Skeleton className="rounded-lg"><div className="summary">{PlaceholderValue.divSummary}</div></Skeleton>
        <div className="date">
          <div className="start-date">
            <CalendarDotsIcon size="18" weight="bold" />
            <Skeleton className="rounded-lg">{PlaceholderValue.divDate}</Skeleton>
          </div>
          {
            index % 2 === 0 ?
              <div className="end-date">
                ~
                <CalendarCheckIcon size="18" weight="bold" />
                <Skeleton className="rounded-lg">{PlaceholderValue.divDate}</Skeleton>
              </div>: <></>
          }

        </div>
      </CardBody>
    </DevProjectCellWrapper>
  )
}
