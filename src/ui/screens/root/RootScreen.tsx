import styled from "styled-components";
import DefaultLayout from "../../utils/layout/DefaultLayout.tsx";
import { FullpageContainer, FullpageSection } from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';
import ImgIengroundProfile from "../../../assets/image/img_ienground_profile.png";
import ImgIenlabPattern from "../../../assets/image/img_ienlab_pattern_resize.png";
import ImgHistoryAndroid from "../../../assets/image/img_history_android.png";
import ImgHistoryDesign from "../../../assets/image/img_history_design.png";
import ImgHistoryNew from "../../../assets/image/img_history_new.png";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip, Form,
  Image, Input,
  Link,
  Progress, Select, SelectItem, Textarea
} from "@heroui/react";
import {
  AndroidLogoIcon, AppleLogoIcon,
  BluetoothIcon, BuildingOfficeIcon,
  CompassIcon, EnvelopeIcon, GearFineIcon, GithubLogoIcon, GlobeSimpleIcon, InstagramLogoIcon, PaperPlaneTiltIcon, PhoneIcon, RobotIcon,
  ToolboxIcon, UsersFourIcon
} from "@phosphor-icons/react";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {
  useVisibleAnimation,
  useDarkmode,
  useElementRefs,
  arrayToSelectValue
} from "../../utils/utils.ts";
import {estimateBudget, EstimateBudgetToString, estimateDefault,} from "../../../data/estimate/Estimate.ts";
import {platformType, PlatformTypeToString} from "../../../data/common/PlatformType.ts";
import {useTranslation} from "react-i18next";
import {useRootViewModel} from "./RootViewModel.ts";
import {DevDestination} from "./dev/DevDestination.ts";

export default function RootScreen() {
  const { uiState, onItemValueChanged, uploadEstimate } = useRootViewModel();
  const { t, i18n } = useTranslation();
  const hash = location.hash;
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = useDarkmode();

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  const services = [
    t("strings:project.type_multiplatform"), t("strings:project.type_android"), t("strings:project.type_ios"), t("strings:project.type_uiux"), t("strings:project.type_admin")
  ];
  const projectTypes = [
    { key: "community", icon: <UsersFourIcon size={32} weight="bold" />, label: t("strings:project.type_community") },
    { key: "utility", icon: <ToolboxIcon size={32} weight="bold" />, label: t("strings:project.type_utility") },
    { key: "ai", icon: <RobotIcon size={32} weight="bold" />, label: t("strings:project.type_ai") },
    { key: "service", icon: <CompassIcon size={32} weight="bold" />, label: t("strings:project.type_service") },
    { key: "incompany", icon: <BuildingOfficeIcon size={32} weight="bold" />, label: t("strings:project.type_inhouse") },
    { key: "bluetooth", icon: <BluetoothIcon size={32} weight="bold" />, label: t("strings:project.type_bt") }
  ];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadEstimate(
      () => {
        addToast({
          title: t("strings:root.inquiry_submitted"),
          description: t("strings:root.inquiry_submitted_desc"),
          color: "success"
        });

        onItemValueChanged({ formData: estimateDefault })
      },
      () => {
        addToast({
          title: t("strings:root.inquiry_submitted_fail"),
          description: t("strings:root.inquiry_submitted_fail_desc"),
          color: "danger"
        });
      }
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onItemValueChanged({ formData: {...uiState.item?.formData, [name]: value} });
  };

  useEffect(() => {
    if (hash.substring(1) === "inquiry") {
      setActiveIndex(3);
    }
  }, [hash]);

  return (
    <DefaultLayout toolbarOverlap footerVisible={false}>
      <Wrapper>
        <Image
          id="background-pattern"
          className={activeIndex === 0 ? "" : "blur"}
          alt="ienlab_pattern"
          src={ImgIenlabPattern}
          radius="none"
          width="100%"
          height="100vh"
          classNames={{ img: "object-cover" }}
        />
        <div id="dark-filter" className={isDark ? "show" : ""} />

        <FullpageContainer
          activeIndex={activeIndex} setActiveIndex={setActiveIndex}
        >
          <FullpageSection>
            <SectionWrapper>
              <div className="content-wrapper intro">
                <div className="content">
                  <div className="message">
                    <div className="title">
                      {t("strings:root_hello")} <br />
                      {
                        i18n.language !== "ko" ? t("strings:root_im_ienground") : ""
                      }
                      <span className="font-bold">{t("strings:root_mobile_creator")}<br /></span>
                      {
                        i18n.language === "ko" ? t("strings:root_im_ienground") : ""
                      }
                    </div>
                    <div className="description">
                      {t("strings:root.intro_desc1")}<br />
                      {t("strings:root.intro_desc2")}
                    </div>
                    <div className="buttons">
                      <Button
                        color="primary"
                        onPress={() => setActiveIndex(3)}
                        variant="solid"
                      >
                        {t("strings:root.ask_project")}
                      </Button>
                      <Button
                        as={Link}
                        color="secondary"
                        href={DevDestination.route}
                        variant="solid"
                      >
                        {t("strings:root.check_portfolio")}
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
                    <div className="title">{t("strings:root.page1_title")}</div>
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
                          {t("strings:root.page1_desc1")}
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
                          {t("strings:root.page1_desc2")}
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
                          {t("strings:root.page1_desc3")}
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
                    <div className="title">{t("strings:root.page2_title")}</div>
                    <div className="description tech">
                      <div className="tech-stack">
                        <div className="card-wrapper visible-animation d1" ref={addToVisibleAnimationRefs}>
                          <div className="logo-wrapper">
                            <AndroidLogoIcon size={48} weight="fill" />
                            <AppleLogoIcon size={48} weight="fill" />
                          </div>
                          <TechCard>
                            <CardHeader className="header">
                              <h1>{t("strings:mobile")}</h1>
                            </CardHeader>
                            <CardBody className="body">
                              <Progress
                                label={t("strings:kotlin")}
                                value={90}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-pink" }}
                              />
                              <Progress
                                label={t("strings:jetpack_compose")}
                                value={95}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-purple" }}
                              />
                              <Progress
                                label={t("strings:cmp")}
                                value={85}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-skyblue" }}
                              />
                              <Progress
                                label={t("strings:swift")}
                                value={50}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-blue" }}
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
                              <h1>{t("strings:web")}</h1>
                            </CardHeader>
                            <CardBody className="body">
                              <Progress
                                label={t("strings:typescript")}
                                value={80}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-pink" }}
                              />
                              <Progress
                                label={t("strings:typescript")}
                                value={85}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-purple" }}
                              />
                              <Progress
                                label={t("strings:html")}
                                value={85}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-skyblue" }}
                              />
                              <Progress
                                label={t("strings:css")}
                                value={85}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-blue" }}
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
                              <h1>{t("strings:backend_etc")}</h1>
                            </CardHeader>
                            <CardBody className="body">
                              <Progress
                                label={t("strings:firebase")}
                                value={95}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-pink" }}
                              />
                              <Progress
                                label={t("strings:google_cloud")}
                                value={90}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-purple" }}
                              />
                              <Progress
                                label={t("strings:processing")}
                                value={80}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-skyblue" }}
                              />
                              <Progress
                                label={t("strings:p5_js")}
                                value={80}
                                maxValue={100}
                                showValueLabel={true}
                                classNames={{ indicator: "bg-ienlab-blue" }}
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
            <SectionWrapper id="inquiry">
              <div className="content-wrapper">
                <div className="content">
                  <div className="message width-max">
                    <div className="title">{t("strings:root.ask_project")}</div>
                    <div className="description contact">
                      <div className="left-side">
                        <Card
                          className="card contact visible-animation d1"
                          ref={addToVisibleAnimationRefs}
                        >
                          <div className="header">
                            <h2>{t("strings:contact_info")}</h2>
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
                                <div className="title">{t("strings:email")}</div>
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
                                <div className="title">{t("strings:phone_number")}</div>
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
                                <div className="title">{t("strings:github")}</div>
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
                                <div className="title">{t("strings:instagram")}</div>
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
                            <h2>{t("strings:root.project_type")}</h2>
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
                          <h2>{t("strings:contact_project_inq")}</h2>
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
                              label={t("strings:name")}
                              type="text"
                              name="name"
                              placeholder={t("strings:input_name")}
                              value={uiState.item.formData.name}
                              onChange={handleChange}
                              onClear={() => onItemValueChanged({ formData: {...uiState.item?.formData, name: ""} })}
                            />
                            <Input
                              isClearable
                              radius="sm"
                              label={t("strings:company_name")}
                              type="text"
                              name="company"
                              placeholder={t("strings:company_optional_input")}
                              value={uiState.item.formData.company}
                              onChange={handleChange}
                              onClear={() => onItemValueChanged({ formData: {...uiState.item?.formData, company: ""} })}
                            />
                          </div>
                          <Input
                            isRequired
                            isClearable
                            radius="sm"
                            label={t("strings:email")}
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={uiState.item.formData.email}
                            onChange={handleChange}
                            onClear={() => onItemValueChanged({ formData: {...uiState.item?.formData, email: ""} })}
                          />
                          <div className="two-line">
                            <Select
                              isRequired
                              radius="sm"
                              label={t("strings:root.project_type")}
                              name="type"
                              placeholder={t("strings:select_type")}
                              value={uiState.item.formData.type}
                              onChange={handleChange}
                            >
                              <>
                                {projectTypes.map((item) => (
                                  <SelectItem key={item.key}>{item.label}</SelectItem>
                                ))}
                              </>
                              <SelectItem key={"etc"}>{t("strings:etc")}</SelectItem>
                            </Select>
                            <Select
                              isRequired
                              radius="sm"
                              label={t("strings:platforms")}
                              placeholder={t("strings:select_platforms")}
                              selectionMode="multiple"
                              defaultSelectedKeys={[platformType.ANDROID.toString(), platformType.IOS.toString()]}
                              name="platform"
                              value={arrayToSelectValue(uiState.item.formData.platform)}
                              onChange={handleChange}
                            >
                              {
                                Object.values(platformType).map((item) => (
                                  <SelectItem key={item}>{PlatformTypeToString(t, item)}</SelectItem>
                                ))
                              }
                            </Select>
                          </div>
                          <Select
                            isRequired
                            radius="sm"
                            label={t("strings:budget_range")}
                            placeholder={t("strings:set_budget_range")}
                            defaultSelectedKeys={[estimateBudget.BET_300_500]}
                            name="budget"
                            value={uiState.item.formData.budget}
                            onChange={handleChange}
                          >
                            {
                              Object.values(estimateBudget).map((item) => (
                                <SelectItem key={item}>{EstimateBudgetToString(t, item)}</SelectItem>
                              ))
                            }
                          </Select>
                          <Textarea
                            isRequired
                            radius="sm"
                            label={t("strings:project_description")}
                            isClearable
                            placeholder={t("strings:project_description_desc")}
                            maxRows={6}
                            className="grow"
                            name="description"
                            value={uiState.item.formData.description}
                            onChange={handleChange}
                            onClear={() => onItemValueChanged({ formData: {...uiState.item?.formData, description: ""} })}
                          />
                          <Button
                            isLoading={uiState.item?.isEstimateUploading}
                            endContent={<PaperPlaneTiltIcon />}
                            color="primary"
                            variant="solid"
                            fullWidth
                            type="submit"
                            radius="sm"
                          >
                            {t("strings:submit_inquiry")}
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

const SectionWrapper = styled.div`
  scroll-snap-align: start;
  width: 100vw;
  height: 100vh;
  //overflow: hidden;
  object-fit: cover;
  object-position: center center;

  position: relative;
  
  & > .content-wrapper {
    width: 100%;
    height: calc(100% - 4rem);
    z-index: 101;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 0;
    
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
          word-break: keep-all;

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
          white-space: pre-line;
          word-break: keep-all;
          
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
        max-height: calc(100vh - 6rem);
        
        position: relative;

        border-radius: 2rem;
        overflow: hidden;
        
        animation-name: float-shadow;
        animation-duration: 3s; /* 애니메이션 한 번 실행 시간 */
        animation-timing-function: ease-in-out; /* 부드러운 시작과 끝 */
        animation-iteration-count: infinite; /* 무한 반복 */
      }
  }
    
    ${({ theme }) => theme.breakpoints.down("laptop")} {
       &.intro {
         & > .content {
           & > .message {
             gap: 2rem;
           }
         }
       }
    }
    
    @media (orientation: portrait) {
      ${({ theme }) => theme.breakpoints.down("laptop")} {
        &.intro {
          & > .content {
            width: 100%;
            flex-direction: column;
            gap: 1rem;
            transform: translateY(10%);
            
            & > .message {
              max-width: initial;
              width: calc(100% - 2rem);
              height: fit-content;
              
              & > .title {
                text-align: center;
                
                & > .job-part {
                  justify-content: center;
                }
              }
              
              & > .description {
                text-align: center;
              }
              
              & > .buttons {
                justify-content: center;
              }
            }
            
            & > #profile {
              width: 16rem;
              position: relative;
            }
          }
        }
      }
      
      ${({ theme }) => theme.breakpoints.down("small")} {
        & > .content > .message > .title {
          font-size: xx-large;
        }
      }
      

    @media (orientation: landscape) {
      ${({ theme }) => theme.breakpoints.down("laptop")} {
        &.intro {
          & > .content {
            & > .message > .title {
              //font-size: xx-large;
            }
            
            & > #profile {
              width: 45%;
            }
          }
        }
      }
      
      ${({ theme }) => theme.breakpoints.down("tablet")} {
        &.intro {
          & > .content > .message > .title {
            //font-size: x-large;
          }
        }
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