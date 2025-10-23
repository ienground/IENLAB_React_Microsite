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
  Divider, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow
} from "@heroui/react";
import {
  ArrowUUpLeftIcon, ArticleIcon, CalendarDotsIcon, CheckCircleIcon, ClockIcon, CreditCardIcon, CurrencyKrwIcon,
  DownloadSimpleIcon,
  FileTextIcon, HashIcon, ListDashesIcon,
  PrinterIcon,
  ReceiptIcon,
  ShareNetworkIcon, UserCircleIcon
} from "@phosphor-icons/react";
import {useTranslation} from "react-i18next";
import "../../../../../locales/i18n.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import BottomToolbar, {type BottomToolbarItem} from "../../../../utils/components/BottomToolbar.tsx";
import {useEstimateDetailViewModel} from "./EstimateDetailViewModel.tsx";
import {EstimateStateToHeroColor, EstimateStateToString} from "../../../../../data/estimate/Estimate.ts";
import {getDday} from "../../../../utils/utils.ts";
import {useDateTimeFormatters} from "../../../../utils/utils/DateTimeFormat.ts"; // HashLink 컴포넌트

export default function EstimateDetailScreen() {
  const { infoState, startListening, stopListening, setItemId } = useEstimateDetailViewModel();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string>("summary");
  const tabItems: BottomToolbarItem[] = [
    { key: "summary", icon: ReceiptIcon, label: t("strings:estimate.summary") },
    { key: "overview", icon: FileTextIcon, label: t("strings:estimate.overview") },
    { key: "range", icon: ListDashesIcon, label: t("strings:estimate.range") },
    { key: "schedule", icon: ClockIcon, label: t("strings:estimate.dev_schedule") },
    { key: "price", icon: CreditCardIcon, label: t("strings:estimate.detailed_cost") },
    { key: "contract", icon: ArticleIcon, label: t("strings:estimate.terms_of_the_contract") },
  ];
  const { dateFormat } = useDateTimeFormatters();

  useEffect(() => {
    if (id) setItemId(id);
    return () => setItemId(null);
  }, [id, setItemId]);

  useEffect(() => {
    startListening();

    return () => stopListening();
  }, [startListening, stopListening]);

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
              <div className={"title" + (!infoState.item?.title || infoState.item?.title === "" ? " empty" : "")}>
                {!infoState.item?.title || infoState.item?.title === "" ? t("strings:unnamed_inquiry") : infoState.item?.title}
              </div>
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
                {infoState.item?.identifier}
              </Chip>
              <Chip
                radius="sm"
                color={EstimateStateToHeroColor(infoState.item?.state)}
              >
                {EstimateStateToString(t, infoState.item?.state)}
              </Chip>
              <Chip
                radius="sm"
                color="danger"
              >
                {getDday(new Date(), infoState.item?.expireAt?.toDate())}
              </Chip>
            </CardBody>
            <CardFooter className="footer">
              <div className="item customer">
                <UserCircleIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">{t("strings:estimate.customer_name")}</div>
                  <div className="content">{infoState.item?.name}</div>
                </div>
              </div>
              <div className="item price">
                <CurrencyKrwIcon size={24} weight="bold" />
                <div className="container">
                  <div className="title">{t("strings:price")}</div>
                  <div className="content">{t("strings:currency",
                    {
                      value: infoState.item?.costs?.reduce((acc, item) => acc + item.amount * item.price, 0),
                      formatParams: {
                        value: { style: 'currency', currency: 'KRW' }
                      }
                    }
                  )}</div>
                </div>
              </div>
              {
                infoState.item?.estimateAt ?
                  <div className="item date">
                    <CalendarDotsIcon size={24} weight="bold" />
                    <div className="container">
                      <div className="title">{t("strings:estimate.date")}</div>
                      <div className="content">{dateFormat(infoState.item?.estimateAt?.toDate())}</div>
                    </div>
                  </div> : <></>
              }
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
                  {infoState.item?.summary}
                </CardBody>
                <CardFooter className="footer">
                  <div className="title">{t("strings:tech_stacks")}</div>
                  <div className="content">
                    {
                      infoState.item?.techStacks?.map((item, index) => (
                        <Chip radius="sm" key={index}>{item}</Chip>
                      ))
                    }
                  </div>
                  <div className="title">{t("strings:remarks")}</div>
                  <div className="content">
                    {infoState.item?.sigNote}
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
                    infoState.item?.range?.map((item, index) => (
                      <Alert
                        hideIconWrapper
                        radius="sm"
                        icon={<CheckCircleIcon size={24} weight="bold" /> }
                        color="success"
                        classNames={{
                          alertIcon: "text-success-500",
                          title: "text-success-500"
                        }}
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
                      infoState.item?.plans?.map((item, index) => (
                        <div className="schedule-item" key={index}>
                          <div className="time">{item.date === 1 ? t("strings:format_a_day") : t("strings:format_days", { day: item.date })}</div>
                          <div className="label">{item.title}</div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="line2 schedule-item">
                    <div className="time">
                      {t(
                        "strings:total_format",
                        {
                          day: t("strings:format_days", { day: infoState.item?.plans?.reduce((acc, item) => acc + item.date, 0)})
                        }
                      )}
                    </div>
                    <div className="label">{t("strings:total_estimated_duration")}</div>
                  </div>
                </CardFooter>
              </Card>
              <div
                className="anchor"
                id="price"
              >
                <Table
                  className="content-card"
                  topContent={
                    <div className="header" style={{ padding: 0 }}>
                      <CreditCardIcon size={24} weight="bold" />
                      <div>{t("strings:estimate.detailed_cost")}</div>
                    </div>
                  }
                  bottomContent={
                    <>
                      <Divider />
                      <Alert
                        hideIcon
                        radius="sm"
                        title={t("strings:total_price")}
                        endContent={
                          <div>
                            {t("strings:currency",
                              {
                                value: infoState.item?.costs?.reduce((acc, item) => acc + item.amount * item.price, 0),
                                formatParams: {
                                  value: { style: 'currency', currency: 'KRW' }
                                }
                              }
                            )}
                          </div>
                        }
                      />
                    </>
                  }
                >
                  <TableHeader>
                    <TableColumn>{t("strings:category")}</TableColumn>
                    <TableColumn>{t("strings:content")}</TableColumn>
                    <TableColumn>{t("strings:unit")}</TableColumn>
                    <TableColumn>{t("strings:amount")}</TableColumn>
                    <TableColumn align="end">{t("strings:unit_price")}</TableColumn>
                    <TableColumn align="end">{t("strings:price")}</TableColumn>
                  </TableHeader>
                  <TableBody
                    emptyContent={t("strings:no_data_to_display")}
                  >
                    {
                      infoState.item?.costs && infoState.item?.costs?.length > 0 ?
                        infoState.item?.costs?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell style={{ fontFamily: "monospace" }}>{
                              t("strings:currency",
                                {
                                  value: item.price,
                                  formatParams: { value: { style: 'currency', currency: 'KRW' } }
                                })
                            }</TableCell>
                            <TableCell style={{ fontFamily: "monospace" }}>{
                              t("strings:currency",
                                {
                                  value: item.price * item.amount,
                                  formatParams: { value: { style: 'currency', currency: 'KRW' } }
                                })
                            }</TableCell>
                          </TableRow>
                        )) : []
                    }
                  </TableBody>
                </Table>
              </div>
              <Card className="content-card anchor" id="contract">
                <CardHeader className="header">
                  <ArticleIcon size={24} weight="bold" />
                  <div>{t("strings:estimate.terms_of_the_contract")}</div>
                </CardHeader>
                <CardFooter className="footer condition">
                  {
                    infoState.item?.conditions?.map((item, index) => (
                      <Alert
                        key={index}
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
          visible={true}
          selectedKey={selected}
          onSelectionChange={setSelected}
          tabItems={tabItems}
        />
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
    
    .header {
      padding: 1rem 1rem 0 1rem;
      
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      
      font-size: x-large;
      font-weight: bold;
    }
    
    .body {
      padding: 0 1rem;
    }
    
    .footer {
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

      &.empty {
        font-style: italic;
      }
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
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
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