import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import styled from "styled-components";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider, Link,
  Listbox,
  ListboxItem, Spacer, Tab, Tabs
} from "@heroui/react";
import {
  ArrowLeftIcon,
  ArrowUUpLeftIcon, ArticleIcon, CalendarDotsIcon, CheckCircleIcon, ClockIcon, CreditCardIcon, CurrencyKrwIcon,
  DownloadSimpleIcon,
  FileTextIcon, GithubLogoIcon, HashIcon, ListDashesIcon,
  PrinterIcon,
  ReceiptIcon,
  ShareNetworkIcon, UserCircleIcon
} from "@phosphor-icons/react";
import {useTranslation} from "react-i18next";
import "../../../../../locales/i18n.ts";
import {type ComponentProps, type FC, useCallback, useEffect, useRef, useState} from "react";
import { HashLink } from 'react-router-hash-link';
import {useNavigate} from "react-router"; // HashLink 컴포넌트

const HashLinkTab = Tab as FC<
  ComponentProps<typeof Tab> & ComponentProps<typeof HashLink>
>;

export default function EstimateDetailScreen() {
  const { t } = useTranslation();
  const data = {
    "title": "제목",
    "range": [
      "이것은",
      "범위",
      "입니다"
    ],
    "time": [
      { "label": "기획 설계", "time" : 1 },
      { "label": "개발", "time": 35 },
      { "label": "테스트", "time": 7 },
      { "label": "배포", "time": 3 },
      { "label": "배포", "time": 3 },
      { "label": "배포", "time": 3 },
    ],
    "schedule": [
      {
        "category": "전자기기",
        "title": "노트북",
        "price": 1500000,
        "amount": 10
      },
      {
        "category": "가구",
        "title": "책상",
        "price": 250000,
        "amount": 2
      },
      {
        "category": "의류",
        "title": "티셔츠",
        "price": 30000,
        "amount": 50
      },
      {
        "category": "식료품",
        "title": "바나나",
        "price": 5000,
        "amount": 100
      },
      {
        "category": "도서",
        "title": "해리포터",
        "price": 18000,
        "amount": 7
      }

    ],
    "condition": [
      "hi", "hello"
    ]
  };

  const [selected, setSelected] = useState<string>("summary");
  const isClickingRef = useRef(false);

  // Bottom Toolbar

  // Anchor 추적
  useEffect(() => {
    const anchors = document.querySelectorAll(".anchor");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // console.log(`isClicking ${isClickingRef.current}`);
        if (isClickingRef.current) {
          return;
        }
        if (entry.isIntersecting) {
          console.log(entry.target.id, "is intersecting");
          setSelected(entry.target.id);
        } else {
          console.log(entry.target.id, "is not intersecting");
        }
      })
    },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: [0.5]
      }
    );

    anchors.forEach((anchor) => observer.observe(anchor));

    return () => {
      anchors.forEach(anchor => observer.unobserve(anchor));
    }
  }, []);

  const customScroll = useCallback((el: HTMLElement) => {
    el.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isClickingRef.current = false; // Ref 값 해제
      console.log("앵커 이동 완료: Observer 재개");
    }, 500);
  }, []);

  const tabItems = [
    { key: "summary", icon: ReceiptIcon, label: t("strings:estimate.summary") },
    { key: "overview", icon: FileTextIcon, label: t("strings:estimate.overview") },
    { key: "range", icon: ListDashesIcon, label: t("strings:estimate.range") },
    { key: "schedule", icon: ClockIcon, label: t("strings:estimate.dev_schedule") },
    { key: "price", icon: CreditCardIcon, label: t("strings:price") },
    { key: "contract", icon: ArticleIcon, label: t("strings:estimate.terms_of_the_contract") },

  ];

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="toolbar">
          <Button
            variant="flat"
            startContent={<ArrowUUpLeftIcon size={16} weight="bold" /> }
          >
            {t("strings:return_to_inquiry")}
          </Button>
        </div>
        <ContentWrapper>
          <SummaryCard className="anchor" id="summary">
            <CardHeader className="header">
              <ReceiptIcon size={24} weight="fill" />
              <div className="title">{data.title}</div>
              <div className="button-container">
                <Button
                  isIconOnly
                >
                  <PrinterIcon size={24} weight="fill" />
                </Button>
                <Button
                  isIconOnly
                >
                  <DownloadSimpleIcon size={24} weight="fill" />
                </Button>
                <Button
                  isIconOnly
                >
                  <ShareNetworkIcon size={24} weight="fill" />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="body">
              <Chip
                radius="sm"
                startContent={<HashIcon size={18} weight="bold" /> }
              >
                IL2024-001
              </Chip>
              <Chip
                radius="sm"
              >
                발송됨
              </Chip>
              <Chip
                radius="sm"
                color="danger"
              >
                D-10
              </Chip>
            </CardBody>
            <CardFooter className="footer">
              <div className="item customer">
                <UserCircleIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">{t("strings:estimate.customer_name")}</div>
                  <div className="content">아이엔</div>
                </div>
              </div>
              <div className="item price">
                <CurrencyKrwIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">{t("strings:price")}</div>
                  <div className="content">5억원</div>
                </div>
              </div>
              <div className="item date">
                <CalendarDotsIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">{t("strings:estimate.date")}</div>
                  <div className="content">2025년 5월 1일</div>
                </div>
              </div>
              <div className="item duration">
                <ClockIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">{t("strings:period")}</div>
                  <div className="content">60일</div>
                </div>
              </div>
            </CardFooter>
          </SummaryCard>
          <div className="data">
            <div className="content">
              <Divider />
              <Card className="content-card anchor" id="overview">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:estimate.overview")}</div>
                </CardHeader>
                <CardBody className="body">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aliquid amet architecto asperiores dolores ducimus et eum excepturi exercitationem fuga iusto laborum, libero magnam non numquam quidem quos repellendus sunt ullam. Accusamus deleniti dignissimos dolore ducimus eveniet harum laudantium quisquam repudiandae similique veniam. Asperiores deserunt laudantium molestiae quae ratione.
                </CardBody>
                <CardFooter className="footer">
                  <div className="title">기술 스택</div>
                  <div className="content">
                    <Chip>Compose Multiplatform</Chip>
                    <Chip>Firebase</Chip>
                  </div>
                  <div className="title">특이사항</div>
                  <div className="content">
                    특이사항 같은 건 없는 거야.
                  </div>
                </CardFooter>
              </Card>
              <Card className="content-card anchor" id="range">
                <CardHeader className="header">
                  <ListDashesIcon size={24} weight="bold" />
                  <div>{t("strings:estimate.range")}</div>
                </CardHeader>
                <CardFooter className="footer">
                  {
                    data.range.map((item, index) => (
                      <Alert
                        hideIconWrapper
                        radius="sm"
                        icon={<CheckCircleIcon size={24} weight="bold" /> }
                        color="success"
                        title={item}
                        key={index}
                      />
                    ))
                  }
                </CardFooter>
              </Card>
              <Card className="content-card anchor" id="schedule">
                <CardHeader className="header">
                  <ClockIcon size={24} weight="bold" />
                  <div>{t("strings:estimate.dev_schedule")}</div>
                </CardHeader>
                <CardFooter className="footer schedule">
                  <div className="line1">
                    {
                      data.time.map((item) => (
                        <div className="schedule-item">
                          <div className="time">{item.time}일</div>
                          <div className="label">{item.label}</div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="line2 schedule-item">
                    <div className="time">총 {data.time.reduce((acc, item) => acc + item.time, 0)
                    }일</div>
                    <div className="label">전체 예상 기간</div>
                  </div>
                </CardFooter>
              </Card>
              <Card className="content-card anchor" id="price">
                <CardHeader className="header">
                  <CreditCardIcon size={24} weight="bold" />
                  <div>{t("strings:estimate.detailed_cost")}</div>
                </CardHeader>
                <CardFooter className="footer budget">
                  {
                    data.schedule.map((item) => (
                      <Alert
                        className="item"
                        hideIconWrapper
                        radius="sm"
                        hideIcon
                        title={item.title}
                        description={item.category}
                        endContent={<div>{item.price}</div>}
                      />
                    ))
                  }
                  <Divider />
                  <Alert
                    hideIcon
                    radius="sm"
                    title="총 금액"
                    endContent={
                      <div>
                        {data.schedule.reduce((acc, item) => acc + item.amount * item.price, 0)
                        }
                      </div>
                    }
                  />
                </CardFooter>
              </Card>
              <Card className="content-card anchor" id="contract">
                <CardHeader className="header">
                  <ArticleIcon size={24} weight="bold" />
                  <div>{t("strings:estimate.terms_of_the_contract")}</div>
                </CardHeader>
                <CardFooter className="footer condition">
                  {
                    data.condition.map((item, index) => (
                      <Alert
                        className="item"
                        radius="sm"
                        icon={<div style={{textAlign: "center"}}>{index + 1}</div>}
                        title={item}
                      />
                    ))
                  }
                </CardFooter>
              </Card>
              <Spacer
                style={{ height: "50vh" }}
              />
            </div>
          </div>
        </ContentWrapper>
        <BottomToolbar
          className={"visible"}
          radius="full"
          classNames={{
            tabList: "bg-default-100"
          }}
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key.toString())}
          variant="bordered"
        >
          {
            tabItems.map((item) => (
              <HashLinkTab
                key={item.key}
                as={HashLink}
                to={`#${item.key}`}
                title={
                  <div className="flex items-center space-x-2">
                    <item.icon size={18} weight={selected === item.key ? "fill" : "light"} />
                    <span>{item.label}</span>
                  </div> as never
                }
                scroll={customScroll}
                onClick={() => isClickingRef.current = true}
              />
            ))
          }
        </BottomToolbar>
      </CommonWrapper>
    </DefaultLayout>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .anchor {
    scroll-margin-top: 5rem;
  }
  
  .content-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    & > .header {
      padding: 1rem 1rem 0 1rem;
      
      display: flex;
      flex-direction: row;
      gap: 1rem;
      
      font-size: x-large;
      font-weight: bold;
    }
    
    & > .body {
      padding: 0 1rem;
    }
    
    & > .footer {
      padding: 0 1rem 1rem 1rem;
      
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
      
      color: ${'hsl(var(--heroui-foreground-500))'};
      
      & > .title {
        font-size: large;
        font-weight: bold;
        color: ${'hsl(var(--heroui-foreground))'};
      }
      
      & > .content {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
      }
      
      &.schedule {
        .schedule-item {
          padding: 1rem;

          border-radius: ${'var(--heroui-radius-small)'};

          & > div {
            text-align: center;
          }

          & > .time {
            font-size: large;
            font-weight: bold;
          }

          & > .label {
            font-size: small;
          }
        }
        
        & > .line1 {
          width: 100%;
          
          display: flex;
          flex-direction: row;
          gap: 1rem;
          
          & > div {
            flex-grow: 1;
            
            &:nth-child(5n+1) {
              background-color: ${'hsl(var(--heroui-primary-50))'};
              
              & > .time {
                color: ${'hsl(var(--heroui-primary-600))'};
              }
            }
            
            &:nth-child(5n+2) {
              background-color: ${'hsl(var(--heroui-secondary-50))'};

              & > .time {
                color: ${'hsl(var(--heroui-secondary-600))'};
              }
            }
            
            &:nth-child(5n+3) {
              background-color: ${'hsl(var(--heroui-success-50))'};

              & > .time {
                color: ${'hsl(var(--heroui-success-600))'};
              }
            }
            
            &:nth-child(5n+4) {
              background-color: ${'hsl(var(--heroui-warning-50))'};

              & > .time {
                color: ${'hsl(var(--heroui-warning-600))'};
              }
            }
            
            &:nth-child(5n) {
              background-color: ${'hsl(var(--heroui-danger-50))'};

              & > .time {
                color: ${'hsl(var(--heroui-danger-600))'};
              }
            }
          }
        }
        
        & > .line2 {
          width: 100%;
          
          background-color: ${'hsl(var(--heroui-foreground-100))'};
          
          & > .time {
            color: ${'hsl(var(--heroui-foreground-900))'};
          }
        }
      }
      
      &.budget {
        & > .item {
        }
      }
    }
  }
  
  & > .data {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    & > .header {
      font-size: xx-large;
      font-weight: bold;
    }
    
    & > .content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  
`;

const SummaryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  & > .header {
    padding: 1rem 1rem 0 1rem;
    
    display: flex;
    flex-direction: row;
    gap: 1rem;
    
    & > .title {
      flex-grow: 1;
      font-size: xx-large;
      font-weight: bold;
    }
    
    & > .button-container {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
  }
  
  & > .body {
    padding: 0 1rem;
    
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
  
  & > .footer {
    padding: 0 1rem 1rem 1rem;
    
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    
    & > .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      
      & > .container {
        display: flex;
        flex-direction: column;
        
        & > .title {
          font-size: large;
          font-weight: bold;
        }
        
        & > .content {
          color: ${'hsl(var(--heroui-foreground-500))'};
        }
      }
    }
  }
`;

const BottomToolbar = styled(Tabs)`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 100%);
  
  //background-color: red;
  
  transition: bottom 0.5s ease-in-out, transform 0.5s ease-in-out;
  
  &.visible {
    top: initial;
    bottom: 1rem;
    transform: translate(-50%, 0);
  }
  
`;