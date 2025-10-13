import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {BellRingingIcon, PushPinIcon} from "@phosphor-icons/react";
import styled from "styled-components";
import {Card} from "@heroui/react";
import {useElementRefs, useVisibleAnimation} from "../../../../utils/utils.ts";

export default function NoticeListScreen() {
  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  const data = [
    {
      fixed: true,
      category: "공지",
      title: "서비스 점검 안내",
      date: new Date("2025-09-10"),
    },
    {
      fixed: false,
      category: "이벤트",
      title: "가을 맞이 특별 이벤트",
      date: new Date("2025-09-15"),
    },
    {
      fixed: false,
      category: "업데이트",
      title: "신규 기능 업데이트 안내",
      date: new Date("2025-09-08"),
    },
    {
      fixed: true,
      category: "안내",
      title: "개인정보 처리방침 변경",
      date: new Date("2025-09-05"),
    }
  ];
  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <BellRingingIcon size={48} weight="bold" />
          <div>공지사항</div>
        </div>
        <ContentWrapper
          className="visible-animation"
          ref={addToVisibleAnimationRefs}
        >
          {
            data.sort((a, b) => Number(b.fixed) - Number(a.fixed)).map((item, index) => (
              <CardCell item={item} />
            ))
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

const CardCellWrapper = styled(Card)`
  width: 100%;
  max-width: 720px;
  padding: 1rem;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  
  & > .content {
    flex-grow: 1;
    
    display: flex;
    flex-direction: column;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardCell = ({ item }: { item: { fixed: boolean, category: string, title: string, date: Date } }) => {
  return (
    <CardCellWrapper>
      <div className="content">
        <div className="category">{item.category}</div>
        <h3 className="title">{item.title}</h3>
        <div className="date">{item.date.toLocaleDateString()}</div>
      </div>
      <div className="end-content">
        {
          item.fixed ? <PushPinIcon size={24} weight="bold" /> : <></>
        }
      </div>
    </CardCellWrapper>
  )
}