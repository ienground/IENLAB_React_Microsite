import DefaultLayout from "../../../utils/layout/DefaultLayout.tsx";
import styled from "styled-components";
import {useElementRefs, useVisibleAnimation} from "../../../utils/utils.ts";
import {
  Chip,
  Image,
  Spacer, Table,
  TableBody, TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@heroui/react";
import ImgIengroundProfileBg from "../../../../assets/image/img_ienground_sihyunhada.jpg";
import IcSogangUniv from "../../../../assets/icon/ic_sogang_univ.svg";
import LogoColorTransparent from "../../../../assets/image/logo_color_transparent.png";
import {BooksIcon, GraduationCapIcon, ScrollIcon} from "@phosphor-icons/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {useTranslation} from "react-i18next";
import {useIntroViewModel} from "./IntroViewModel.ts";
import {useEffect} from "react";
import {DevProjectCell} from "../dev/list/DevListScreen.tsx";
import {CommonWrapper} from "../../../utils/layout/CommonWrapper.tsx";
import {useNavigate} from "react-router";
import {DevDestination} from "../dev/DevDestination.ts";

export default function IntroScreen() {
  gsap.registerPlugin(ScrollTrigger)

  const { infoStateList, startListening, stopListening } = useIntroViewModel();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, [startListening, stopListening]);

  useEffect(() => {
    document.body.style.overflow = infoStateList.isInitialized ? "unset" : "hidden";
    return () => { document.body.style.overflow = "unset" };
  }, [infoStateList, infoStateList.isInitialized]);

  const historyData = [
    {
      type: "team",
      date: "2016 - 2017",
      titleKor: "개발팀 Qwerty",
      titleEng: "Team Qwerty",
      contentKor: "UI/UX 디자이너",
      contentEng: "UI/UX Designer"
    },
    {
      type: "my_app",
      date: "2019",
      titleKor: "감성에디터",
      titleEng: "Emoditor",
      contentKor: "10K+ 다운로드 돌파",
      contentEng: "Exceeded 10K+ Downloads"
    },
    {
      type: "my_app",
      date: "2019",
      titleKor: "블로그 플래너",
      titleEng: "Blog Planner",
      contentKor: "5K+ 다운로드 돌파",
      contentEng: "Exceeded 5K+ Downloads"
    },
    {
      type: "team",
      date: "2020",
      titleKor: "아트&테크놀로지 컨퍼런스 2020",
      titleEng: "Art&Technology Conference 2020",
      contentKor: "브랜딩팀 팀원",
      contentEng: "Branding Team Member"
    },
    {
      type: "my_app",
      date: "2021",
      titleKor: "알바트로스 리마인더",
      titleEng: "Albatross Reminder",
      contentKor: "교내 언론 인터뷰",
      contentEng: "Interviewed by Campus Press"
    },
    {
      type: "team",
      date: "2024",
      titleKor: "아트&테크놀로지 컨퍼런스 2024",
      titleEng: "Art&Technology Conference 2024",
      contentKor: "디자인팀 팀장",
      contentEng: "Design Team Leader"
    },
    {
      type: "team",
      date: "2024 - 2025",
      titleKor: "@OMO_unofficial",
      titleEng: "@OMO_unofficial",
      contentKor: "학과 미디어오피스 시스템 개발",
      contentEng: "School Media Office System Development"
    },
  ];
  const univData = [
    {
      type: "comm",
      date: "2020",
      titleKor: "제1대 지식융합미디어학부 학생회 「Zoom-人」",
      titleEng: "The 1st Student Council of the School of Media, Arts and Science  「Zoom-人」",
      contentKor: "디자인팀 팀원",
      contentEng: "Design Team Member"
    },
    {
      type: "comm",
      date: "2020-2021",
      titleKor: "2021학년도 지식융합미디어학부 새내기맞이사업단",
      titleEng: "2021 School of Media, Arts and Science Freshman Orientation Committee ",
      contentKor: "C섹션 단원",
      contentEng: "C Section Member"
    },
    {
      type: "comm",
      date: "2021",
      titleKor: "제2대 아트&테크놀로지 전공학생회 「마젠타」",
      titleEng: "The 2nd Student Council of the Art&Technology 「MAGENTA」",
      contentKor: "학생회장",
      contentEng: "Student Council President"
    },
    {
      type: "class",
      date: "2021",
      titleKor: "Intro to Creative Computing",
      titleEng: "Intro to Creative Computing",
      contentKor: "Final Best Work 선정",
      contentEng: "Selected as Final Best Work"
    },
    {
      type: "class",
      date: "2021",
      titleKor: "Creative Algorithm",
      titleEng: "Creative Algorithm",
      contentKor: "Final Best Work 선정",
      contentEng: "Selected as Final Best Work"
    },
    {
      type: "compet",
      date: "2024",
      titleKor: "Small Creators Group 「@OMO_unofficial」",
      titleEng: "Small Creators Group 「@OMO_unofficial」",
      contentKor: "우수 팀 선정",
      contentEng: "Selected as Outstanding Team"
    },
    {
      type: "class",
      date: "2024",
      titleKor: "Creative Capstone Project II",
      titleEng: "Creative Capstone Project II",
      contentKor: "Best Work 선정",
      contentEng: "Selected as Best Work"
    },
    {
      type: "compet",
      date: "2024",
      titleKor: "2024-2학기 서강 융합기술 경진대회 「@OMO_unofficial」",
      titleEng: "2024-2 Sogang Convergence Technology Competition 「@OMO_unofficial」",
      contentKor: "최우수상",
      contentEng: "Grand Prize"
    },
    {
      type: "grad",
      date: "2025",
      titleKor: "예술공학사",
      titleEng: "Bachelor of Arts and Science",
      contentKor: "우등 (Cum Laude) 졸업",
      contentEng: "Graduated with Cum Laude"
    }
  ];

  const historyTypeColorMap: Record<string, string> = {
    team: "chip-ienlab-pink",
    my_app: "chip-ienlab-skyblue",
  };
  const historyTypeLabelMap: Record<string, string> = {
    team: t("strings:history_type_team"),
    my_app: t("strings:history_type_solo")
  };
  const schoolTypeColorMap: Record<string, string> = {
    comm: "chip-ienlab-pink",
    class: "chip-ienlab-purple",
    compet: "chip-ienlab-skyblue",
    grad: "chip-ienlab-blue"
  };
  const schoolTypeLabelMap: Record<string, string> = {
    comm: t("strings:school_type_comm"),
    class: t("strings:school_type_class"),
    compet: t("strings:school_type_compet"),
    grad: t("strings:school_type_grad")
  };

  return (
    <DefaultLayout>
      <CommonWrapper>
        <Wrapper className="content-wrapper">
          <div className="introduce visible-animation" ref={addToVisibleAnimationRefs}>
            <div className="left-side">
              <Image
                src={ImgIengroundProfileBg}
                isBlurred
                style={{
                  marginTop: "2rem",
                }}
              />
            </div>
            <div className="right-side">
              <div className="name">
                <div id="name">{t("strings:my_name")}</div>
                <div id="nickname">아이엔 IENGROUND</div>
              </div>
              <div className="summary">
                {t("strings:intro_mobile_creator")}
              </div>
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
              {t("strings:key_experience")}
            </div>
            <div className="table">
              <Table>
                <TableHeader>
                  <TableColumn>{t("strings:category")}</TableColumn>
                  <TableColumn>{t("strings:period")}</TableColumn>
                  <TableColumn>{t("strings:content")}</TableColumn>
                  <TableColumn>{t("strings:description")}</TableColumn>
                </TableHeader>
                <TableBody>
                  {
                    historyData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip
                            radius="sm"
                            size="sm"
                            classNames={{
                              base: historyTypeColorMap[item.type]
                            }}
                            variant="flat"
                          >{historyTypeLabelMap[item.type]}</Chip>
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{i18n.language === "ko" ? item.titleKor : item.titleEng}</TableCell>
                        <TableCell>{i18n.language === "ko" ? item.contentKor : item.contentEng}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="project detail-wrapper visible-animation" ref={addToVisibleAnimationRefs}>
            <div className="header">
              <BooksIcon size={48} weight="fill" />
              {t("strings:featured_projects")}
            </div>
            <div className="content">
              {
                infoStateList.itemList.map((item) => (
                  <DevProjectCell item={item} onClick={() => navigate(`${DevDestination.route}/${item.id}`)} key={item.id} />
                ))
              }
            </div>
          </div>
          <div className="school detail-wrapper visible-animation" ref={addToVisibleAnimationRefs}>
            <div className="header">
              <GraduationCapIcon size={48} weight="fill" />
              {t("strings:education")}
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
                  {i18n.language === "ko" ? "서강대학교" : "Sogang University"}
                  <div className="chips">
                    <Chip
                      radius="sm"
                      size="sm"
                      classNames={{ base: "chip-ienlab-pink" }}
                      variant="flat"
                    >
                      {i18n.language === "ko" ? "아트&테크놀로지학과" : "Art&Technology"}
                    </Chip>
                    <Chip
                      radius="sm"
                      size="sm"
                      variant="flat"
                    >
                      {i18n.language === "ko" ? "2020.3 - 2025.2 (7학기)" : "Mar 2020 – Feb 2025 (7 Semesters)"}

                    </Chip>
                  </div>
                </div>
              </div>
              <div className="table">
                <Table>
                  <TableHeader>
                    <TableColumn>{t("strings:category")}</TableColumn>
                    <TableColumn>{t("strings:period")}</TableColumn>
                    <TableColumn>{t("strings:content")}</TableColumn>
                    <TableColumn>{t("strings:description")}</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {
                      univData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Chip
                              radius="sm"
                              size="sm"
                              classNames={{ base: schoolTypeColorMap[item.type] }}
                              variant="flat"
                            >{schoolTypeLabelMap[item.type]}</Chip>
                          </TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{i18n.language === "ko" ? item.titleKor : item.titleEng}</TableCell>
                          <TableCell>{i18n.language === "ko" ? item.contentKor : item.contentEng}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </Wrapper>
      </CommonWrapper>
    </DefaultLayout>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  overflow: hidden;
  
  & > .introduce {
    display: grid;
    grid-template-columns: 60% 1fr;
    gap: 2rem;

    & > .left-side {
      
    }
    
    & > .right-side {
      height: fit-content;
      
      position: sticky;
      top: 6rem;
      
      display: grid;
      grid-template-columns: 1fr;
      
      & > .name {
        margin-bottom: 4rem;
        
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
        margin-bottom: 2rem;
        
        font-size: xx-large;
        font-weight: bold;
        white-space: pre-line;
      }
    }
    
    ${({ theme }) => theme.breakpoints.down("tablet")} {
      grid-template-columns: 1fr;
      
      & > .right-side {
        grid-template-columns: repeat(2, 1fr);
        
        & > .name, & > .summary {
          margin-bottom: 0;
        }
      }
    }
    
    ${({ theme }) => theme.breakpoints.down("mobile")} {
      & > .right-side {
        & > .summary {
          font-size: x-large;
          margin-bottom: 2rem;
        }
      }
    }
  }
  
  & > .detail-wrapper {
    display: grid;
    grid-template-columns: 20% 1fr;
    gap: 1rem;
    
    overflow: hidden;

    & > .header {
      font-size: xx-large;
      font-weight: bold;
      
      height: fit-content;
      
      position: sticky;
      top: 4rem;
    }
    
    & > .table {
      overflow-x: auto;
    }
    
    ${({ theme }) => theme.breakpoints.down("laptop")} {
      grid-template-columns: 1fr;
      
      & > .header {
        top: initial;
      }
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
    & > .content {
      width: 100%;
      
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
`;