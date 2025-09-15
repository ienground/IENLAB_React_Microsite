import DefaultLayout from "../../../utils/layout/DefaultLayout.tsx";
import styled from "styled-components";
import {useElementRefs, useVisibleAnimation} from "../../../utils/utils.ts";
import {CommonWrapper} from "../../../utils/layout/CommonWrapper.tsx";
import {
  Card,
  CardBody,
  CardHeader, Chip,
  Image,
  Spacer, Tab,
  Table,
  TableBody, TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@heroui/react";
import ImgIengroundProfileBg from "../../../../assets/image/img_ienground_sihyunhada.jpg";
import IcSogangUniv from "../../../../assets/icon/ic_sogang_univ.svg";
import LogoColorTransparent from "../../../../assets/image/logo_color_transparent.png";
import {BooksIcon, GraduationCapIcon, ReceiptIcon, ScrollIcon} from "@phosphor-icons/react";
import {useEffect, useRef} from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function IntroScreen() {
  gsap.registerPlugin(ScrollTrigger)

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  const historyData = [
    {
      type: "team",
      date: "2016 - 2017",
      title: "개발팀 Qwerty",
      content: "UX, UI 디자이너"
    },
    {
      type: "my_app",
      date: "2019",
      title: "감성에디터",
      content: "10K+ 다운로드 돌파"
    },
    {
      type: "my_app",
      date: "2019",
      title: "블로그 플래너",
      content: "5K+ 다운로드 돌파"
    },
    {
      type: "team",
      date: "2020",
      title: "아트&테크놀로지 컨퍼런스 2020",
      content: "브랜딩팀 팀원"
    },
    {
      type: "my_app",
      date: "2021",
      title: "알바트로스 리마인더",
      content: "교내 언론 인터뷰"
    },
    {
      type: "my_app",
      date: "2024",
      title: "아트&테크놀로지 컨퍼런스 2024",
      content: "디자인팀 팀장"
    },
    {
      type: "team",
      date: "2024 - 2025",
      title: "@OMO_unofficial",
      content: "학과 미디어오피스 시스템 개발"
    },
  ];
  const univData = [
    {
      type: "comm",
      date: "2020",
      title: "제1대 지식융합미디어학부 학생회 「Zoom-人」",
      content: "디자인팀 팀원"
    },
    {
      type: "comm",
      date: "2020-2021",
      title: "2021학년도 지식융합미디어학부 새내기맞이사업단",
      content: "C섹션 단원"
    },
    {
      type: "comm",
      date: "2021",
      title: "제2대 아트&테크놀로지 전공학생회 「마젠타」",
      content: "학생회장"
    },
    {
      type: "class",
      date: "2021",
      title: "Intro to Creative Computing",
      content: "Final Best Work 선정"
    },
    {
      type: "class",
      date: "2021",
      title: "Creative Algorithm",
      content: "Final Best Work 선정",
    },
    {
      type: "compet",
      date: "2024",
      title: "Small Creators Group 「@OMO_unofficial」",
      content: "우수 팀 선정",
    },
    {
      type: "class",
      date: "2024",
      title: "Creative Capstone Project II",
      content: "Best Work 선정",
    },
    {
      type: "compet",
      date: "2024",
      title: "2024-2학기 서강 융합기술 경진대회 「@OMO_unofficial」",
      content: "최우수상"
    },
    {
      type: "grad",
      date: "2025",
      title: "예술공학사",
      content: "우등 (Cum Laude) 졸업"
    }
  ];

  const historyTypeColorMap: Record<string, "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined> = {
    team: "primary",
    my_app: "secondary",
  };
  const historyTypeLabelMap: Record<string, string> = {
    team: "팀 활동",
    my_app: "개인 앱"
  };
  const schoolTypeColorMap: Record<string, "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined> = {
    comm: "primary",
    class: "warning",
    compet: "secondary",
    grad: "success",
  };
  const schoolTypeLabelMap: Record<string, string> = {
    comm: "학생사회",
    class: "학과수업",
    compet: "대회",
    grad: "학위"
  };

  return (
    <DefaultLayout>
      <Wrapper className="content-wrapper">
        <div className="introduce visible-animation" ref={addToVisibleAnimationRefs}>
          <div className="left-side">
            <Image
              src={ImgIengroundProfileBg}
              isBlurred
              style={{
                marginTop: "1rem",
              }}
            />
          </div>
          <div className="right-side">
            <div className="name">
              <div id="name">이현우</div>
              <div id="nickname">아이엔 IENGROUND</div>
            </div>
            <Spacer
              style={{
                height: "4rem"
              }}
            />
            <div className="summary">
              개발과<br/>디자인을 하는<br/>모바일 크리에이터.
            </div>
            <Spacer
              style={{
                height: "2rem"
              }}
            />
            <Image
              src={LogoColorTransparent}
              className="logo"
              style={{
                width: "2rem",
                height: "2rem"
              }}
            />
          </div>
        </div>
        <div className="history detail-wrapper visible-animation" ref={addToVisibleAnimationRefs}>
          <div className="header">
            <ScrollIcon size={48} weight="fill" />
            주요 경력
          </div>
          <Table>
            <TableHeader>
              <TableColumn>분류</TableColumn>
              <TableColumn>기간</TableColumn>
              <TableColumn>항목</TableColumn>
              <TableColumn>설명</TableColumn>
            </TableHeader>
            <TableBody>
              {
                historyData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Chip
                        radius="sm"
                        size="sm"
                        color={historyTypeColorMap[item.type]}
                        variant="flat"
                      >{historyTypeLabelMap[item.type]}</Chip>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.content}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
        <div className="project detail-wrapper visible-animation" ref={addToVisibleAnimationRefs}>
          <div className="header">
            <BooksIcon size={48} weight="fill" />
            주요 프로젝트
          </div>
        </div>
        <div className="school detail-wrapper visible-animation" ref={addToVisibleAnimationRefs}>
          <div className="header">
            <GraduationCapIcon size={48} weight="fill" />
            학력
          </div>
          <div className="content">
            <div className="title">
              <Image
                src={IcSogangUniv}
                style={{
                  width: "3rem",
                  height: "3rem"
                }}
              />
              <div>
                서강대학교
                <div className="chips">
                  <Chip
                    radius="sm"
                    size="sm"
                    color="primary"
                    variant="flat"
                  >
                    아트&테크놀로지학과
                  </Chip>
                  <Chip
                    radius="sm"
                    size="sm"
                    variant="flat"
                  >
                    2020.3 - 2025.2 (7학기)
                  </Chip>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableColumn>분류</TableColumn>
                <TableColumn>기간</TableColumn>
                <TableColumn>항목</TableColumn>
                <TableColumn>설명</TableColumn>
              </TableHeader>
              <TableBody>
                {
                  univData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Chip
                          radius="sm"
                          size="sm"
                          color={schoolTypeColorMap[item.type]}
                          variant="flat"
                        >{schoolTypeLabelMap[item.type]}</Chip>
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.content}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </Wrapper>
    </DefaultLayout>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  & > .introduce {
    display: grid;
    grid-template-columns: 60% 1fr;
    gap: 2rem;
    
    & > .left-side {
      
    }
    
    & > .right-side {
      height: fit-content;
      
      position: sticky;
      top: 4rem;
      
      display: flex;
      flex-direction: column;
      
      & > .name {
        & > #name {
          font-size: xxx-large;
          font-weight: bold;
        }

        & > #nickname {
          font-size: x-large;
          font-weight: bold;
        }
      }

      & > .summary {
        font-size: xx-large;
        font-weight: bold;
      }
    }
  }
  
  & > .detail-wrapper {
    display: grid;
    grid-template-columns: 20% 1fr;
    gap: 1rem;

    & > .header {
      font-size: xx-large;
      font-weight: bold;
      
      height: fit-content;
      
      position: sticky;
      top: 4rem;
    }
  }
  
  & > .history {
  }
  
  & > .school {
    & > .content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      
      & > .title {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
        
        & > div {
          font-size: x-large;
          font-weight: bold;
          
          display: flex;
          flex-direction: column;
          
          & > .chips {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
          }
        }
      }
    }
  }
  
  & > .project {
    
  }
`;