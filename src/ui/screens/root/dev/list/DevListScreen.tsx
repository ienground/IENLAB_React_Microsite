import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {
  AppStoreLogoIcon,
  BellRingingIcon,
  CalendarDotsIcon,
  GithubLogoIcon,
  GooglePlayLogoIcon
} from "@phosphor-icons/react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Spacer} from "@heroui/react";
import {useElementRefs, useVisibleAnimation} from "../../../../utils/utils.ts";
import {
  type DevProject,
  devProjectCategory,
  DevProjectCategoryToString,
  devProjectState
} from "../../../../../data/project/DevProject.ts";
import {Timestamp} from "firebase/firestore";

export default function DevListScreen() {
  const { t } = useTranslation();
  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  const data: DevProject[] = [
    {
      id: "",
      createAt: Timestamp.now(), updateAt: Timestamp.now(),
      isPrimary: true, categories: [devProjectCategory.MOBILE],
      title: "Title", delete: false, developer: "Me", state: devProjectState.DONE,
      startAt: Timestamp.now(), endAt: Timestamp.now(),
      functions: [], github: "", link: "", imageUrls: [], techs: [], platform: [],
      summary: "", thumbnail: "", logo: "", appStore: "", googlePlay: ""
    },
    {
      id: "",
      createAt: Timestamp.now(), updateAt: Timestamp.now(),
      isPrimary: true, categories: [devProjectCategory.MOBILE],
      title: "Title", delete: false, developer: "Me", state: devProjectState.DONE,
      startAt: Timestamp.now(), endAt: Timestamp.now(),
      functions: [], github: "", link: "", imageUrls: [], techs: [], platform: [],
      summary: "", thumbnail: "", logo: "", appStore: "", googlePlay: ""
    },
  ];

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <BellRingingIcon size={48} weight="bold" />
          <div>{t("strings:project.title")}</div>
        </div>
        <ContentWrapper
          // className="visible-animation"
          // ref={addToVisibleAnimationRefs}
        >
          {
            data.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary)).map((item) => (
              <DevProjectCell item={item} />
            ))
          }
        </ContentWrapper>
      </CommonWrapper>
    </DefaultLayout>
  );
}

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
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
    }
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

const DevProjectCell = ({ item }: { item: DevProject }) => {
  return (
    <DevProjectCellWrapper>
      <div className="header">
        <Image
          src="https://picsum.photos/1920/1080"
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0"
          }}
        />
        <div className="content">
          <Chip radius="sm">주요 프로젝트</Chip>
          <Spacer style={{ flexGrow: 1 }} />
          <Chip radius="sm">완료</Chip>
        </div>
      </div>
      <CardBody className="body">
        <div className="header">
          <Image
            src="https://picsum.photos/1000/1000"
            style={{
              width: "6rem",
              height: "6rem",
            }}
          />
          <Spacer style={{ flexGrow: 1 }} />
          <div className="buttons">
            <Button size="sm" isIconOnly color="primary">
              <GooglePlayLogoIcon size="18" weight="bold" />
            </Button>
            <Button size="sm" isIconOnly color="primary">
              <AppStoreLogoIcon size="18" weight="bold" />
            </Button>
            <Button size="sm" isIconOnly color="primary">
              <GithubLogoIcon size="18" weight="bold" />
            </Button>
          </div>
        </div>
        <div className="title">
          <h2>{item.title}</h2>
          <Spacer style={{ flexGrow: 1 }} />
          {
            item.categories.map((category) => (
              <Chip radius="sm">{DevProjectCategoryToString(category)}</Chip>
            ))
          }
        </div>
        <div className="summary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, libero.
        </div>
        <div className="date">
          <CalendarDotsIcon size="18" weight="bold" />
          2025-10-10
        </div>
      </CardBody>
    </DevProjectCellWrapper>
  )
}
