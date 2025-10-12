import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Image} from "@heroui/react";
import {ArrowUUpLeftIcon, FileTextIcon, ReceiptIcon} from "@phosphor-icons/react";
import {useEffect, useState} from "react";
import BottomToolbar, {type BottomToolbarItem} from "../../../../utils/components/BottomToolbar.tsx";

export default function DevDetailScreen() {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<string>("summary");
  const tabItems: BottomToolbarItem[] = [
    { key: "summary", icon: ReceiptIcon, label: t("strings:estimate.summary")}
  ]

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="toolbar">
          <Button
            variant="flat"
            startContent={<ArrowUUpLeftIcon size={16} weight="bold" /> }
          >
            {t("strings:return_to_list")}
          </Button>
        </div>
        <ContentWrapper>
          <SummaryCard className="anchor" id="summary">
            <Image
              src="https://picsum.photos/1920/1080"
            />
            <div className="container">
              <div className="category">

              </div>
              <div className="title"></div>
              <div className="summary">

              </div>
              <div className="property">
                <div className="state">

                </div>
                <div className="start-date"></div>
                <div className="end-date"></div>
                <div className="developer-info"></div>
              </div>
              <div className="link-button"></div>
            </div>
          </SummaryCard>
          <div className="data">
            <div className="content">
              <Divider />
              <Card className="content-card anchor" id="overview">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:estimate.overview")}</div>
                </CardHeader>
                <CardFooter className="footer">

                </CardFooter>
              </Card>
              <Card className="content-card anchor" id="screenshots">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:screenshots")}</div>
                </CardHeader>
              </Card>
              <Card className="content-card anchor" id="functions">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:functions")}</div>
                </CardHeader>
              </Card>
              <Card className="content-card anchor" id="techs">
                <CardHeader className="header">
                  <FileTextIcon size={24} weight="bold" />
                  <div>{t("strings:tech_stacks")}</div>
                </CardHeader>
              </Card>
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

const SummaryCard = styled.div`
`;