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
  Divider,
  Listbox,
  ListboxItem, Spacer
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

export default function EstimateDetailScreen() {
  const data = {
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

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="toolbar">
          <Button
            variant="flat"
            startContent={<ArrowUUpLeftIcon size={16} weight="bold" /> }
          >
            견적 조회로 돌아가기
          </Button>
        </div>
        <ContentWrapper>
          <SummaryCard>
            <CardHeader className="header">
              <ReceiptIcon size={24} weight="fill" />
              <div className="title">제목</div>
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
                  <div className="title">고객명</div>
                  <div className="content">아이엔</div>
                </div>
              </div>
              <div className="item price">
                <CurrencyKrwIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">금액</div>
                  <div className="content">5억원</div>
                </div>
              </div>
              <div className="item date">
                <CalendarDotsIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">견적일</div>
                  <div className="content">2025년 5월 1일</div>
                </div>
              </div>
              <div className="item duration">
                <ClockIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">기간</div>
                  <div className="content">60일</div>
                </div>
              </div>
            </CardFooter>
          </SummaryCard>
          <div id="summary" className="data">
            <div className="content">
              <Divider />
              <Card className="content-card">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>프로젝트 개요</div>
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
              <Card className="content-card">
                <CardHeader className="header">
                  <ListDashesIcon size={24} weight="bold" />
                  <div>프로젝트 범위</div>
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
                      />
                    ))
                  }
                </CardFooter>
              </Card>
              <Card className="content-card">
                <CardHeader className="header">
                  <ClockIcon size={24} weight="bold" />
                  <div>개발 일정</div>
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
              <Card className="content-card">
                <CardHeader className="header">
                  <CreditCardIcon size={24} weight="bold" />
                  <div>상세 비용</div>
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
              <Card className="content-card">
                <CardHeader className="header">
                  <ArticleIcon size={24} weight="bold" />
                  <div>계약 조건</div>
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
              <Spacer />
            </div>
          </div>
        </ContentWrapper>
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