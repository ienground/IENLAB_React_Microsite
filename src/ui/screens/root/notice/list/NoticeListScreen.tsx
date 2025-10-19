import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {BellRingingIcon, PushPinIcon} from "@phosphor-icons/react";
import styled from "styled-components";
import {Button, Card, Chip, Image, Skeleton} from "@heroui/react";
import {useElementRefs, useVisibleAnimation} from "../../../../utils/utils.ts";
import {useEffect, useRef} from "react";
import type {Notice} from "../../../../../data/notice/Notice.tsx";
import {useNoticeListViewModel} from "./NoticeListViewModel.ts";
import {useDateTimeFormat} from "../../../../utils/utils/DateTimeFormat.ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {NoticeDestination} from "../NoticeDestination.ts";
import {CSSTransition} from "react-transition-group";

export default function NoticeListScreen() {
  const { infoStateList, startListening, stopListening } = useNoticeListViewModel();
  const navigate = useNavigate();

  useEffect(() => {
    startListening();

    return () => stopListening();
  }, [startListening, stopListening]);

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  const placeholderRef = useRef(null);
  const listRef = useRef(null);

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <BellRingingIcon size={48} weight="bold" />
          <div>공지사항</div>
        </div>
        <ContentWrapper
          // className="visible-animation"
          // ref={addToVisibleAnimationRefs}
        >
          <CSSTransition
            in={!infoStateList.isInitialized}
            timeout={300}
            classNames="fade"
            nodeRef={placeholderRef}
          >
            <div ref={placeholderRef} className="flexbox">
              {
                Array(2).fill(null).map((_, index) => (
                  <NoticeCellShimmer index={index} />
                ))
              }
            </div>
          </CSSTransition>
          <CSSTransition
            in={infoStateList.isInitialized}
            timeout={300}
            classNames="fade"
            nodeRef={listRef}
          >
            <div ref={listRef} className="flexbox">
              {
                infoStateList.itemList.map((item) => (
                  <NoticeCell key={item.id} item={item} onClick={() => navigate(`${NoticeDestination.route}?${item?.id}`)} />
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
  
  .fade-enter {
    opacity: 0;
  }
  /* 요소가 나타나는 동안의 상태 (애니메이션 적용) */
  .fade-enter-active {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
  /* 요소가 사라질 때의 최종 상태 */
  .fade-exit-active {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  
  .fade-exit-done {
    opacity: 0;
  }
  
  .flexbox {
    position: absolute;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

const NoticeCellWrapper = styled(Card)`
  width: 100%;
  max-width: 720px;
  padding: 1rem;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  
  overflow: initial;
  cursor: pointer;
  transition: scale 0.3s ease-in-out, transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  
  & > .content {
    flex-grow: 1;
    
    display: flex;
    flex-direction: column;
    
    & > .category {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    }
    
    & > .title {
      margin-top: 0.5rem;
      
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      
      font-size: x-large;
      font-weight: bold;
    }
    
    & > .date {
      margin-top: 0.5rem;
      text-align: start;
      font-size: small;
    }
  }
  
  & > .end-content {
    width: 96px;
    height: 100%;
    overflow: hidden;

    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    margin-left: 1rem;
  }

  &:hover {
    transform: translateY(-4px);
  }

  //&[data-pressed="true"] {
  //  scale: 0.98;
  //}
`;

const NoticeCell = ({ item, onClick }: { item: Notice, onClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <NoticeCellWrapper
      isPressable
      disableRipple
      disableAnimation
      onPress={onClick}
    >
      <div className="content">
        <div className="category">
          {
            item.fixed ?
              <Chip radius="sm" color="danger" startContent={<PushPinIcon size={18} weight="fill" />} variant="flat">
                {t("strings:fixed")}
              </Chip>
              : <></>
          }
          <Chip radius="sm">{item.category?.label}</Chip>
        </div>
        <h3 className="title">{item.title}</h3>
        <div className="date">{useDateTimeFormat(item.createAt?.toDate())}</div>
      </div>
      <div className="end-content">
        {
          item.imageUrls?.length > 0 ?
            <Image
              src={item.imageUrls[0]}
              radius="sm"
              style={{
                height: "100%",
                aspectRatio: 1
              }}
              classNames={{ img: "object-cover w-full h-full" }}
            /> : <></>
        }
      </div>
    </NoticeCellWrapper>
  )
}

const NoticeCellShimmer = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  return (
    <NoticeCellWrapper>
      <div className="content">
        <div className="category">
          {
            index % 2 === 0 ?
              <Skeleton
                // isLoaded
                className="rounded-lg"
              >
                <Chip radius="sm" color="danger" startContent={<PushPinIcon size={18} weight="fill" />} variant="flat">
                  {t("strings:fixed")}
                </Chip>
              </Skeleton>
              : <></>
          }
          <Skeleton className="rounded-lg"><Chip radius="sm">카테고리</Chip></Skeleton>
        </div>
        <Skeleton className="title rounded-lg"><h3 className="title">제목</h3></Skeleton>
        <Skeleton className="date rounded-lg"><div className="date">시간</div></Skeleton>
      </div>
      {
        index % 2 === 0 ?
          <div className="end-content">
            <Skeleton
              className="rounded-lg"
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: 1
              }}
            />
          </div>: <></>
        }
    </NoticeCellWrapper>
  )
}