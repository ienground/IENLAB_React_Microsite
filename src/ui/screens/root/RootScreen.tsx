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

import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  type CardProps, Checkbox, CheckboxGroup, Chip,
  Divider, Form,
  Image, Input,
  Link,
  Progress, Select, SelectItem, Textarea
} from "@heroui/react";
import {
  AndroidLogoIcon, AppleLogoIcon,
  ArrowLeftIcon,
  ArrowRightIcon, BluetoothIcon, BuildingOfficeIcon,
  CompassIcon, EnvelopeIcon, GearFineIcon, GithubLogoIcon, GlobeSimpleIcon, InstagramLogoIcon, MapPinIcon,
  PaperPlaneTiltIcon, PhoneIcon, RobotIcon,
  SuitcaseSimpleIcon,
  SunIcon, ToolboxIcon, UsersFourIcon
} from "@phosphor-icons/react";
import {type ChangeEvent, ChangeEventHandler, type FormEvent, useEffect, useRef, useState} from "react";
import {useTheme} from "@heroui/use-theme";
import {getValueAsString, useVisibleAnimation, useDarkmode, useElementRefs} from "../../utils/utils.ts";
import LiquidGlass from "@nkzw/liquid-glass";
import {
  type Estimate, type EstimateBudget,
  type EstimatePlatform,
  estimateStatus,
  EstimateToHashmap,
  type EstimateType
} from "../../../data/estimate/Estimate.ts";
import {collection, addDoc, serverTimestamp, Timestamp} from "firebase/firestore";
import {FirestorePath} from "../../../constant/FirestorePath.ts";
import {firestore} from "../../../constant/FirebaseConfig.ts";
import {addDays, addYears} from "date-fns";
import {FullPageWrapper} from "fullpage-nestedscroll-react";

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

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  const services = [
    "멀티플랫폼 앱 개발", "안드로이드 앱 개발", "iOS 앱 개발", "UI/UX 구현", "관리자 페이지 개발",
  ];
  const projectTypes = [
    { key: "community", icon: <UsersFourIcon size={32} weight="bold" />, label: "커뮤니티 앱 개발" },
    { key: "utility", icon: <ToolboxIcon size={32} weight="bold" />, label: "유틸리티 개발" },
    { key: "ai", icon: <RobotIcon size={32} weight="bold" />, label: "AI 앱 개발" },
    { key: "service", icon: <CompassIcon size={32} weight="bold" />, label: "서비스 앱 개발" },
    { key: "incompany", icon: <BuildingOfficeIcon size={32} weight="bold" />, label: "사내 서비스 앱 개발" },
    { key: "bluetooth", icon: <BluetoothIcon size={32} weight="bold" />, label: "블루투스 통신 앱 개발" },
  ];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: FormDataEntryValue | FormDataEntryValue[] } = {};

    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        // 이미 같은 key가 존재하면 배열로 만들거나 기존 배열에 추가합니다.
        if (Array.isArray(data[key])) {
          (data[key] as FormDataEntryValue[]).push(value);
        } else {
          data[key] = [data[key] as FormDataEntryValue, value];
        }
      } else {
        // key가 처음 나타나면 값을 할당합니다.
        data[key] = value;
      }
    }

    const item: Estimate = {
      id: "",
      createAt: Timestamp.now(),
      updateAt: Timestamp.now(),
      expireAt: Timestamp.fromDate(addYears(new Date(), 1)),
      name: getValueAsString(data["name"]), 
      company: getValueAsString(data["company"]),
      email: getValueAsString(data["email"]),
      type: getValueAsString(data["type"]) as EstimateType,
      platform: Array.isArray(data["platform"])
        ? data["platform"].map(p => getValueAsString(p) as unknown as EstimatePlatform)
        : [getValueAsString(data["platform"]) as unknown as EstimatePlatform],
      budget: getValueAsString(data["budget"]) as EstimateBudget,
      description: getValueAsString(data["description"]),
      status: estimateStatus.PENDING,
      summary: "",
      sigNote: "",
      plans: [],
      conditions: []
    };

    await viewModel.uploadEstimate(item);

    addToast({
      title: "문의 전송 완료",
      description: "프로젝트 문의가 전송되었습니다!",
      color: "success"
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    viewModel.updateUiState({ formData: {...viewModel.uiState.item.formData, [name]: value} });

    console.log(name, value);
  };

  return (
    <DefaultLayout isfullscreen>
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
                        두루뭉술한 아이디어를 현실로 만들어드립니다.<br />
                        UI/UX부터 개발, 어플리케이션 퍼블리싱까지 맡겨주세요!
                      </div>
                      <div className="buttons">
                        <Button
                          color="primary"
                          onPress={() => setActiveIndex(3)}
                          variant="solid"
                        >
                          프로젝트 문의
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
                    <div className="title">당신의 성공에 제 기술력을 더합니다.</div>
                    <div
                      className="description history"
                    >
                      <div className="card-wrapper visible-animation d1" ref={addToVisibleAnimationRefs}>
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
                          9년 차 안드로이드 개발자<br />
                          간단한 유틸리티부터 커뮤니티, 복잡한 네이티브 기능까지
                        </div>
                      </div>
                      <div className="card-wrapper visible-animation d2" ref={addToVisibleAnimationRefs}>
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
                          UI·UX 디자인이 없어도 가능한 서비스 의뢰<br />
                          당신과 함께 만들어가는 어플리케이션 디자인
                        </div>
                      </div>
                      <div className="card-wrapper visible-animation d3" ref={addToVisibleAnimationRefs}>
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
                          끊임 없는 새로운 기술 도입으로<br />
                          뒤쳐지지 않는 당신의 서비스
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
              <div className="content-wrapper">
                <div className="content">
                  <div className="message width-max">
                    <div className="title">기술 스택 및 서비스</div>
                    <div className="description tech">
                      <div className="tech-stack">
                        <div className="card-wrapper visible-animation d1" ref={addToVisibleAnimationRefs}>
                          <div className="logo-wrapper">
                            <AndroidLogoIcon size={48} weight="fill" />
                            <AppleLogoIcon size={48} weight="fill" />
                          </div>
                          <TechCard>
                            <CardHeader className="header">
                              <h1>모바일</h1>
                            </CardHeader>
                            <CardBody className="body">
                              <Progress
                                label="Kotlin"
                                value={90}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="Jetpack Compose"
                                value={95}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="Compose Multiplatform"
                                value={85}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="Swift"
                                value={50}
                                maxValue={100}
                                showValueLabel={true}
                              />
                            </CardBody>
                          </TechCard>
                        </div>
                        <div className="card-wrapper visible-animation d2" ref={addToVisibleAnimationRefs}>
                          <div className="logo-wrapper">
                            <GlobeSimpleIcon size={48} weight="fill" />
                          </div>
                          <TechCard>
                            <CardHeader className="header">
                              <h1>웹</h1>
                            </CardHeader>
                            <CardBody className="body">
                              <Progress
                                label="Typescript"
                                value={80}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="React"
                                value={85}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="HTML"
                                value={85}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="CSS"
                                value={85}
                                maxValue={100}
                                showValueLabel={true}
                              />
                            </CardBody>
                          </TechCard>
                        </div>
                        <div className="card-wrapper visible-animation d3" ref={addToVisibleAnimationRefs}>
                          <div className="logo-wrapper">
                            <GearFineIcon size={48} weight="fill" />
                          </div>
                          <TechCard>
                            <CardHeader className="header">
                              <h1>백엔드 및 기타</h1>
                            </CardHeader>
                            <CardBody className="body">
                              <Progress
                                label="Firebase"
                                value={95}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="Google Cloud"
                                value={90}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="Processing"
                                value={80}
                                maxValue={100}
                                showValueLabel={true}
                              />
                              <Progress
                                label="p5.js"
                                value={80}
                                maxValue={100}
                                showValueLabel={true}
                              />
                            </CardBody>
                          </TechCard>
                        </div>
                      </div>
                      <div className="service">
                        <div className="body">
                          {
                            services.map((service, index) => (
                              <Chip variant="flat" key={index}>{service}</Chip>
                            ))
                          }
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
              <div className="content-wrapper">
                <div className="content">
                  <div className="message width-max">
                    <div className="title">프로젝트 문의</div>
                    <div className="description contact">
                      <div className="left-side">
                        <Card
                          className="card contact visible-animation d1"
                          ref={addToVisibleAnimationRefs}
                        >
                          <div className="header">
                            <h2>연락처 정보</h2>
                          </div>
                          <div className="body info">
                            <Button
                              as={Link}
                              size="lg"
                              radius="sm"
                              variant="faded"
                              className="contact-detail"
                              startContent={<EnvelopeIcon size={24} weight="fill" />}
                              href="mailto:my@ien.zone"
                            >
                              <div className="info">
                                <div className="title">이메일</div>
                                <div className="description">my@ien.zone</div>
                              </div>
                            </Button>
                            <Button
                              as={Link}
                              size="lg"
                              radius="sm"
                              variant="faded"
                              className="contact-detail"
                              startContent={<PhoneIcon size={24} weight="fill" />}
                              href="tel:+8210-4815-7296"
                            >
                              <div className="info">
                                <div className="title">전화번호</div>
                                <div className="description">+82 10-4815-7296</div>
                              </div>
                            </Button>
                            <Button
                              as={Link}
                              size="lg"
                              radius="sm"
                              variant="faded"
                              className="contact-detail"
                              startContent={<GithubLogoIcon size={24} weight="fill" />}
                              href="https://github.com/ienground"
                            >
                              <div className="info">
                                <div className="title">GitHub</div>
                                <div className="description">@ienground</div>
                              </div>
                            </Button>
                            <Button
                              as={Link}
                              size="lg"
                              radius="sm"
                              variant="faded"
                              className="contact-detail"
                              startContent={<InstagramLogoIcon size={24} weight="fill" />}
                              href="https://instagram.com/ienlab"
                            >
                              <div className="info">
                                <div className="title">Instragram</div>
                                <div className="description">@ienlab</div>
                              </div>
                            </Button>
                          </div>
                        </Card>
                        <Card
                          className="card project-type visible-animation d2"
                          ref={addToVisibleAnimationRefs}
                        >
                          <div className="header">
                            <h2>프로젝트 유형</h2>
                          </div>
                          <div className="body project">
                            {
                              projectTypes.map((item) => (
                                <Button
                                  size="lg"
                                  radius="sm"
                                  variant="faded"
                                  className="project-detail"
                                  key={item.key}
                                >
                                  {item.icon}
                                  <div className="label">{item.label}</div>
                                </Button>
                              ))
                            }
                          </div>
                        </Card>
                      </div>
                      <Card
                        className="card form visible-animation d3"
                        ref={addToVisibleAnimationRefs}
                      >
                        <div className="header">
                          <h2>프로젝트 문의하기</h2>
                        </div>
                        <Form
                          className="body contact"
                          onSubmit={onSubmit}
                        >
                          <div className="two-line">
                            <Input
                              isRequired
                              isClearable
                              radius="sm"
                              label="이름"
                              type="text"
                              name="name"
                              placeholder="이름 입력"
                              value={viewModel.uiState.item.formData.name}
                              onChange={handleChange}
                            />
                            <Input
                              isClearable
                              radius="sm"
                              label="회사명"
                              type="text"
                              name="company"
                              placeholder="소속 회사 (선택사항)"
                              value={viewModel.uiState.item.formData.company}
                              onChange={handleChange}
                            />
                          </div>
                          <Input
                            isRequired
                            isClearable
                            radius="sm"
                            label="이메일"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={viewModel.uiState.item.formData.email}
                            onChange={handleChange}
                          />
                          <div className="two-line">
                            <Select
                              isRequired
                              radius="sm"
                              label="프로젝트 유형"
                              name="type"
                              placeholder="유형을 선택하세요"
                              value={viewModel.uiState.item.formData.type}
                              onChange={handleChange}
                            >
                              <>
                                {projectTypes.map((item) => (
                                  <SelectItem key={item.key}>{item.label}</SelectItem>
                                ))}
                              </>
                              <SelectItem key={"etc"}>기타</SelectItem>
                            </Select>
                            <Select
                              isRequired
                              radius="sm"
                              label="플랫폼"
                              placeholder="플랫폼을 선택하세요"
                              selectionMode="multiple"
                              defaultSelectedKeys={["android", "ios"]}
                              name="platform"
                              value={viewModel.uiState.item.formData.platform}
                              onChange={handleChange}
                            >
                              <SelectItem key={"android"}>Android</SelectItem>
                              <SelectItem key={"ios"}>iOS</SelectItem>
                              <SelectItem key={"web"}>웹</SelectItem>
                            </Select>
                          </div>
                          <Select
                            isRequired
                            radius="sm"
                            label="예산 범위"
                            placeholder="예산 범위를 설정하세요"
                            defaultSelectedKeys={["300_500"]}
                            name="budget"
                            value={viewModel.uiState.item.formData.budget}
                            onChange={handleChange}
                          >
                            <SelectItem key={"less_100"}>100만원 미만</SelectItem>
                            <SelectItem key={"100_300"}>100-300만원</SelectItem>
                            <SelectItem key={"300_500"}>300-500만원</SelectItem>
                            <SelectItem key={"more_500"}>500만원 이상</SelectItem>
                            <SelectItem key={"etc"}>논의 후 결정</SelectItem>
                          </Select>
                          <Textarea
                            isRequired
                            radius="sm"
                            label="프로젝트 설명"
                            isClearable
                            placeholder="프로젝트에 대해 자세히 설명해 주세요."
                            maxRows={6}
                            className="grow"
                            name="description"
                            value={viewModel.uiState.item.formData.description}
                            onChange={handleChange}
                          />
                          <Button
                            isLoading={viewModel.uiState.item.isEstimateUploading}
                            endContent={<PaperPlaneTiltIcon />}
                            color="primary"
                            variant="solid"
                            fullWidth
                            type="submit"
                            radius="sm"
                          >
                            문의 보내기
                          </Button>
                        </Form>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
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
  width: 100vw;

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
    
    width: 100vw;
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
  
  & > .section-container {
    height: 100vh;
    overflow: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
  
`;

const PageIndicator = styled.div`
`;

const SectionWrapper = styled.div`
  scroll-snap-align: start;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  object-fit: cover;
  object-position: center center;

  position: relative;
  
  & > .content-wrapper {
    width: 100%;
    z-index: 101;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: calc(50% + 3rem);
    transform: translate(0, -50%);
    
    & > .content {
      width: calc(100% - 4rem);
      max-width: 1440px;
      
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      
      & > .message {
        max-width: 50%;
        height: calc(100vh - 6rem);
        z-index: 101;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4rem;
        
        transition: color 0.3s ease-in-out;
        
        &.width-max {
          max-width: 100%;
          width: 100%;
        }
        
        & > .title {
          font-size: xxx-large;
          font-weight: bold;
          
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

            & > .card-wrapper {
              display: flex;
              flex-direction: column;
              gap: 2rem;

              & > .description {
                margin: 0 1rem;
                font-weight: bold;
              }
            }
          }
          
          &.tech {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            & > .tech-stack {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              column-gap: 1rem;

              & > .card-wrapper {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                opacity: 0;

                & > .logo-wrapper {
                  display: flex;
                  flex-direction: row;
                  gap: 1rem;

                  align-items: center;
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
                  animation-delay: 250ms;
                }

                &:nth-child(3) {
                  animation-delay: 500ms;
                }
              }
            }

            & > .service {
              & > .body {
                padding: 1rem;
                
                display: flex;
                flex-direction: row;
                gap: 1rem;
                justify-content: center;
                
                & > div {
                  background-color: ${`hsl(var(--heroui-background) / 80%)`};
                  & > span {
                    color: ${'hsl(var(--heroui-foreground))'};
                  }
                }
                
              }
            }
          }
          
          &.contact {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 1rem;
            
            & > .left-side {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
            
            .card {
              opacity: 0;
              
              & > .header {
                margin: 1rem;
                
                & > h2 {
                  font-size: x-large;
                }
              }
              
              & > .body {
                margin: 1rem;
                
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                row-gap: 1rem;
                column-gap: 1rem;
                
                &.info {
                  grid-template-columns: repeat(2, 1fr);
                }
                
                &.project {
                  grid-template-columns: repeat(3, 1fr);
                }
                
                & > .contact-detail {
                  height: fit-content;
                  
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: start;
                  gap: 1rem;
                  
                  & > .info {
                    margin: 1rem 0;
                    
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    
                    & > .title {
                    }

                    & > .description {
                      color: ${'hsl(var(--heroui-foreground-500))'};
                    }
                  }
                }
                
                & > .project-detail {
                  height: fit-content;
                  padding: 1rem 0;
                  
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
                
                &.contact {
                  height: 100%;
                  
                  display: flex;
                  flex-direction: column;
                  
                  & > .two-line {
                    width: 100%;
                    
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    column-gap: 1rem;
                  }
                }
              }
              
              &.project-type {
                flex-grow: 1;
                
                display: flex;
                //justify-content: space-between;
              }

              &.start {
                animation-name: fadeSlideIn;
                animation-duration: 0.8s;
                animation-timing-function: ease-out;
                animation-fill-mode: forwards; /* 애니메이션 종료 후 최종 상태 유지 */
              }

              &.contact {
                animation-delay: 0s;
              }

              &.project-type {
                animation-delay: 250ms;
              }

              &.form {
                animation-delay: 500ms;
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
const TechCard = styled(Card)`
  img.background {
    width: 100%;
    object-fit: cover;
    z-index: 100;
    transform: scale(1.2);
    transition: filter 0.5s ease-in-out;    
  }
  
  & > .header {
    padding: 1rem;
    
    & > h1 {
      font-size: xx-large;
      font-weight: bold;
    }
  }
  
  & > .body {
    padding: 1rem;
    
    display: flex;
    flex-direction:  column;
    gap: 1rem;
    
    //& > div {
    //  background-color: red;
    //}
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