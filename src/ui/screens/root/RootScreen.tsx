import styled from "styled-components";
import useRootViewModel from "./RootViewModel.ts";
import DefaultLayout from "../../utils/layout/DefaultLayout.tsx";
import { FullpageContainer, FullpageSection } from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';
import ImgIengroundProfile from "../../../assets/image/img_ienground_profile.png";
import ImgIenlabPattern from "../../../assets/image/img_ienlab_pattern_resize.png";
import ImgHistoryAndroid from "../../../assets/image/img_history_android.png";
import ImgHistoryDesign from "../../../assets/image/img_history_design.png";
import ImgHistoryNew from "../../../assets/image/img_history_new.png";


import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import 'swiper/css/navigation';
// import required modules
import { Mousewheel, Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import {Button, Card, CardBody, CardFooter, CardHeader, type CardProps, Image, Link} from "@heroui/react";
import {ArrowLeftIcon, ArrowRightIcon, PaperPlaneTiltIcon, SuitcaseSimpleIcon, SunIcon} from "@phosphor-icons/react";
import {useEffect, useState} from "react";
import {useTheme} from "@heroui/use-theme";
import {useDarkmode} from "../../utils/utils.ts";
import LiquidGlass from "@nkzw/liquid-glass";

export default function RootScreen() {
  const viewModel = useRootViewModel();
  const pageCount = 3;
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = useDarkmode();

  // const swiper = useSwiper();

  // const swiper = new Swiper('.swiper-container', {
  //   direction: 'vertical', // 스와이퍼 슬라이드 방향을 수직으로 설정합니다.
  //   loop: true,
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //     type: 'custom',
  //
  //   // 필요한 경우 네비게이션 버튼을 추가하세요.
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // });

  // 관찰할 요소들을 모두 선택합니다.
  const visibleAnimations = document.querySelectorAll('.visible-animation');

  console.log(visibleAnimations);

// Intersection Observer 객체를 생성합니다.
  const observer = new IntersectionObserver((entries, observer) => {
    // 관찰 대상(entries)을 순회합니다.
    entries.forEach(entry => {
      // entry가 화면에 보일 때 (isIntersecting: true)
      if (entry.isIntersecting) {
        // 해당 요소에 'show' 클래스를 추가합니다.
        entry.target.classList.add('start');
        // 애니메이션이 한 번만 실행되도록 관찰을 중단합니다.
        observer.unobserve(entry.target);
      }
    });
  });
//
// 각 박스 요소를 관찰 대상에 등록합니다.
  visibleAnimations.forEach(item => {
    observer.observe(item);
  });


  return (
    <DefaultLayout isFullscreen={true}>
      <Wrapper>
        <Image
          id="background-pattern"
          className={activeIndex === 0 ? "" : "blur"}
          alt="ienlab_pattern"
          src={ImgIenlabPattern}
          radius="none"
          width="100%"
          height="100vh"
        />
        <div id="dark-filter" className={isDark ? "show" : ""} />
        <FullpageContainer
          activeIndex={activeIndex} setActiveIndex={setActiveIndex}
        >
          <FullpageSection>
            <SectionWrapper>
              <div className="content-wrapper">
                <div className="content">
                  <div className="message">
                    <div className="title">
                      안녕하세요, <br />
                      <span className="font-bold">모바일 개발자 & 디자이너</span> <br />
                      아이엔입니다
                    </div>
                    <div className="description">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi corporis est ipsum labore natus omnis provident qui. Accusamus accusantium autem consequuntur cum, deleniti dolorum laborum nostrum optio saepe sed?
                    </div>
                    <div className="buttons">
                      <Button
                        color="primary"
                        onPress={() => setActiveIndex(3)}
                        variant="solid"
                      >
                        외주 문의
                      </Button>
                      <Button
                        as={Link}
                        color="primary"
                        href="https://github.com/heroui-inc/heroui"
                        variant="faded"
                      >
                        포트폴리오 보기
                      </Button>
                    </div>
                  </div>
                  <Card
                    id="profile"
                    shadow="none"
                    isBlurred
                    style={{
                      backgroundColor: `hsla(var(--heroui-background) / 50%)`,
                      transition: "background-color 0.5s ease-in-out"
                    }}
                  >
                    <Image
                      removeWrapper
                      alt="Card background"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      src={ImgIengroundProfile}
                    />
                  </Card>
                </div>
              </div>
            </SectionWrapper>
          </FullpageSection>
          <FullpageSection>
            <SectionWrapper>
              <div className="content-wrapper">
                <div className="content">
                  <div className="message width-max">
                    <div className="title font-bold">당신의 성공에 제 기술력을 더합니다.</div>
                    <div
                      className="description history"
                    >
                      <div className="card-wrapper visible-animation">
                        <HistoryCard
                          radius="lg"
                          style={{ aspectRatio: "1" }}
                        >
                          <Image
                            className="background"
                            src={ImgHistoryAndroid}
                          />
                        </HistoryCard>
                        <div className="description">
                          9년 차 안드로이드 개발자.<br />
                          간단한 유틸리티부터 커뮤니티, 복잡한 네이티브 기능까지.
                        </div>
                      </div>
                      <div
                        className="card-wrapper visible-animation"
                      >
                        <HistoryCard
                          radius="lg"
                          style={{ aspectRatio: "1" }}
                        >
                          <Image
                            className="background"
                            src={ImgHistoryDesign}
                          />
                        </HistoryCard>
                        <div className="description">
                          UI·UX 디자인이 없어도 가능한<br />
                          서비스 의뢰.
                        </div>
                      </div>
                      <div className="card-wrapper visible-animation">
                        <HistoryCard
                          radius="lg"
                          style={{ aspectRatio: "1" }}
                        >
                          <Image
                            className="background"
                            src={ImgHistoryNew}
                          />
                        </HistoryCard>
                        <div className="description">
                          끊임 없는 새로운 기술 도입.<br />
                          뒤쳐지지 않는 당신의 서비스.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </FullpageSection>
          <FullpageSection>
            <SectionWrapper>
              <div className="content-wrapper">tech</div>
            </SectionWrapper>
          </FullpageSection>
          <FullpageSection>
            <SectionWrapper>
              <div className="content-wrapper">contact</div>
            </SectionWrapper>
          </FullpageSection>
          <FullpageSection isAutoHeight>
            <footer>Footer</footer>
          </FullpageSection>
        </FullpageContainer>

        <PageIndicator>

        </PageIndicator>

        {/*<Swiper*/}
        {/*  modules={[Mousewheel, EffectFade, Pagination]}*/}
        {/*  effect="fade"*/}
        {/*  mousewheel={true}*/}
        {/*  direction="vertical"*/}
        {/*  pagination={{*/}
        {/*    // type: "custom",*/}
        {/*    type: "bullets",*/}
        {/*    clickable: true,*/}
        {/*    /**/}
        {/*    renderCustom: function (_swiper, current, total) {*/}
        {/*      let paginationHtml = ""*/}

        {/*      // return (*/}
        {/*      //   `<div class="hi">dd</div>`*/}
        {/*      // );*/}

        {/*      // 현재 페이지 번호를 중심으로 앞뒤 2개씩 표시*/}
        {/*      const start = Math.max(1, current - 2);*/}
        {/*      const end = Math.min(total, current + 2);*/}

        {/*      // 현재 페이지 이전 번호들 추가*/}
        {/*      for (let i = start; i < current; i++) {*/}
        {/*        paginationHtml += `<span class="swiper-pagination-bullet">${i < 10 ? '0' + i : i}</span>`;*/}
        {/*      }*/}

        {/*      // 현재 페이지 앞에 라인 추가 (첫 페이지가 아닐 경우)*/}
        {/*      if (current > 1) {*/}
        {/*        paginationHtml += `<span class="pagination-line"></span>`;*/}
        {/*      }*/}

        {/*      // 현재 페이지 번호 추가 (활성화 상태)*/}
        {/*      paginationHtml += `<span class="swiper-pagination-bullet swiper-pagination-bullet-active">${current < 10 ? '0' + current : current}</span>`;*/}

        {/*      // 현재 페이지 뒤에 라인 추가 (마지막 페이지가 아닐 경우)*/}
        {/*      if (current < total) {*/}
        {/*        paginationHtml += `<span class="pagination-line"></span>`;*/}
        {/*      }*/}

        {/*      // 현재 페이지 이후 번호들 추가*/}
        {/*      for (let i = current + 1; i <= end; i++) {*/}
        {/*        paginationHtml += `<span class="swiper-pagination-bullet">${i < 10 ? '0' + i : i}</span>`;*/}
        {/*      }*/}

        {/*      return paginationHtml;*/}
        {/*    },*/}

        {/*  }}*/}
        {/*  // navigation={{*/}
        {/*  //   enabled: true,*/}
        {/*  //   nextEl: '.my-swiper-button-next',*/}
        {/*  //   prevEl: '.my-swiper-button-prev',*/}
        {/*  // }}*/}
        {/*  className="slideshow"*/}
        {/*>*/}
        {/*  <SwiperSlide>*/}
        {/*    <Image*/}
        {/*      alt="ienlab_pattern"*/}
        {/*      src={IenlabPattern}*/}
        {/*      radius="none"*/}
        {/*    />*/}
        {/*  </SwiperSlide>*/}
        {/*  <SwiperSlide>*/}
        {/*    <div style={{backgroundColor: "#FF4081", width: "100%", aspectRatio: "16 / 9"}} />*/}
        {/*  </SwiperSlide>*/}
        {/*  <SwiperSlide>*/}
        {/*    <div style={{backgroundColor: "#7C4DFF", width: "100%", aspectRatio: "16 / 9"}} />*/}
        {/*  </SwiperSlide>*/}
        {/*  /!*<SwiperButtonContainer>*!/*/}
        {/*  /!*  <SwiperButton*!/*/}
        {/*  /!*    className="my-swiper-button-prev"*!/*/}
        {/*  /!*    isIconOnly*!/*/}
        {/*  /!*    variant="flat"*!/*/}
        {/*  /!*    radius="none"*!/*/}
        {/*  /!*  >*!/*/}
        {/*  /!*    <ArrowLeftIcon size={24} weight="bold" />*!/*/}
        {/*  /!*  </SwiperButton>*!/*/}
        {/*  /!*  <SwiperButton*!/*/}
        {/*  /!*    className="my-swiper-button-next"*!/*/}
        {/*  /!*    isIconOnly*!/*/}
        {/*  /!*    variant="flat"*!/*/}
        {/*  /!*    radius="none"*!/*/}
        {/*  /!*  >*!/*/}
        {/*  /!*    <ArrowRightIcon size={24} weight="bold" />*!/*/}
        {/*  /!*  </SwiperButton>*!/*/}
        {/*  /!*</SwiperButtonContainer>*!/*/}
        {/*</Swiper>*/}
        {/*<div className="info">*/}
        {/*  <div className="intro">*/}
        {/*    내가 누구게*/}
        {/*  </div>*/}
        {/*  <div className="brand">*/}
        {/*    hi*/}
        {/*  </div>*/}
        {/*  <div className="banner1">*/}
        {/*    mediaoffice*/}
        {/*  </div>*/}
        {/*  <div className="banner2">*/}
        {/*    mediaoffice*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Wrapper>
    </DefaultLayout>
  );
}

const Wrapper = styled.div`
  position: relative;

  #background-pattern {
    position: absolute;
    z-index: 100;
    transform: scale(1.2);
    
    transition: filter 0.5s ease-in-out;
    
    &.blur {
      filter: blur(50px);
    }
  }
  
  & > .slideshow {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    
    //.swiper-pagination {
    //  //position: relative;
    //  //bottom: 6rem;
    //
    //  position: absolute;
    //  top: 50%; /* 수직 중앙 정렬 */
    //  left: 20px; /* 왼쪽에서 20px 위치 */
    //  transform: translateY(-50%) rotate(90deg); /* 90도 회전 및 수직 중앙 정렬 */
    //  display: flex; /* 자식 요소들을 가로로 정렬 */
    //  align-items: center; /* 수직 중앙 정렬 */
    //  z-index: 10;
    //  width: auto;
    //}
  }
  
  & > .react-fullpage__wrapper {
    position: absolute;
    
    width: 100%;
    height: 100vh;
    z-index: 102;
  }
  
  & > #dark-filter {
    position: absolute;

    width: 100%;
    height: 100vh;
    z-index: 101;
    
    transition: background-color 0.3s ease-in-out;
    mix-blend-mode: overlay;
    
    &.show {
       background-color: ${`hsla(var(--heroui-background) / 75%)`};
    }
  }
  
`;

const PageIndicator = styled.div`
`;

const SectionWrapper = styled.div`
  position: relative;
  
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  object-fit: cover;
  object-position: center center;
  
  & > .content-wrapper {
    width: 100%;
    z-index: 101;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    
    & > .content {
      width: calc(100% - 4rem);
      max-width: 1440px;
      
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      
      //background-color: hotpink;
      
      & > .message {
        max-width: 50%;
        height: calc(100vh - 14rem);
        z-index: 101;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        
        transition: color 0.3s ease-in-out;
        
        //background-color: pink;
        
        &.width-max {
          max-width: 100%;
          width: 100%;
        }
        
        & > .title {
          font-size: xxx-large;
          
          & > span {
            background-color: ${`hsl(var(--heroui-foreground))`}; /* 원하는 배경색으로 변경 가능 */
            color: ${`hsl(var(--heroui-background))`}; /* 글자색 흰색 */
            padding: 5px 10px; /* 글자와 배경 사이의 여백 */
            border-radius: 5px; /* 모서리를 둥글게 */

            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
          }
        }
        
        & > .description {
          font-size: initial;
          
          &.history {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 1rem;
            
            margin-top: auto;
            
            & > .card-wrapper {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              opacity: 0;
              
              & > .description {
                margin: 0 1rem;
                font-weight: bold;
              }

              &.start {
                animation-name: fadeSlideIn;
                animation-duration: 0.8s;
                animation-timing-function: ease-out;
                animation-fill-mode: forwards; /* 애니메이션 종료 후 최종 상태 유지 */
              }

              &:nth-child(1) {
                animation-delay: 0s;
              }

              &:nth-child(2) {
                animation-delay: 0.5s;
              }

              &:nth-child(3) {
                animation-delay: 1s;
              }
            }
          }
        }
        
        & > .buttons {
          display: flex;
          flex-direction: row;
          gap: 1rem;
        }
      }
      
      & > #profile {
        width: 30%;
        
        position: relative;

        border-radius: 2rem;
        overflow: hidden;
        
        animation-name: float-shadow;
        animation-duration: 3s; /* 애니메이션 한 번 실행 시간 */
        animation-timing-function: ease-in-out; /* 부드러운 시작과 끝 */
        animation-iteration-count: infinite; /* 무한 반복 */
      }
    }
  }
`;

const HistoryCard = styled(Card)`
  img.background {
    width: 100%;
    object-fit: cover;
    z-index: 100;
    transform: scale(1.2);
    transition: filter 0.5s ease-in-out;    
    
    //&:hover {
    //  filter: blur(10px);
    //}
  }
  
  & > .header {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    
    display: flex;
    flex-direction: column;
    text-align: center;
    
    & > h1 {
      font-size: xx-large;
    }
  }
  
  & > .body {
    background-color: green;
    position: absolute;
  }
  
  & > .footer {
    position: absolute;
    bottom: 0;
    z-index: 101;
    
    display: flex;
    flex-direction: column;
    align-items: start;
    
    background-color: ${'hsl(var(--heroui-background) / 50%)'};

    & > h1 {
      font-size: xx-large;
      font-weight: bold;
    }
    
    & > div {
      word-break: keep-all;
      overflow-wrap: break-word;
    }
  }
`;