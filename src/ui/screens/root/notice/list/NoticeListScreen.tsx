import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {BellRingingIcon, PushPinIcon} from "@phosphor-icons/react";
import styled from "styled-components";
import {Button, Card, Chip, Image} from "@heroui/react";
import {useElementRefs, useVisibleAnimation} from "../../../../utils/utils.ts";
import {useEffect} from "react";
import type {Notice} from "../../../../../data/notice/Notice.tsx";
import {useNoticeListViewModel} from "./NoticeListViewModel.ts";
import {useDateTimeFormat} from "../../../../utils/utils/DateTimeFormat.ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {NoticeDestination} from "../NoticeDestination.ts";

export default function NoticeListScreen() {
  const { infoStateList, startListening, stopListening } = useNoticeListViewModel();
  const navigate = useNavigate();

  useEffect(() => {
    startListening();

    return () => stopListening();
  }, [startListening, stopListening]);

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

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
          {
            infoStateList.isInitialized ? (
              infoStateList.itemList.map((item) => (
                <NoticeCell item={item} onClick={() => navigate(`${NoticeDestination.route}?${item?.id}`)} />
              ))
            ) : (
              <div>placeholder</div>
            )
          }


        </ContentWrapper>
      </CommonWrapper>
    </DefaultLayout>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
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
      key={item.id}
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