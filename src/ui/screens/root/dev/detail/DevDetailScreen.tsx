import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Button, Image} from "@heroui/react";
import {ArrowUUpLeftIcon} from "@phosphor-icons/react";
import {useEffect, useState} from "react";

export default function DevDetailScreen() {
  const { t } = useTranslation();


  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="toolbar">
          <Button
            variant="flat"
            startContent={<ArrowUUpLeftIcon size={16} weight="bold" /> }
          >
            {t("return_to_list")}
          </Button>
        </div>
        <ContentWrapper>
          <SummaryCard>
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
        </ContentWrapper>
      </CommonWrapper>
    </DefaultLayout>
  )
}

const ContentWrapper = styled.div`
`;

const SummaryCard = styled.div`
`;