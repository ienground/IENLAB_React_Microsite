import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {BellRingingIcon} from "@phosphor-icons/react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

export default function DevListScreen() {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <BellRingingIcon size={48} weight="bold" />
          <div>{t("project")}</div>
        </div>
        <ContentWrapper>

        </ContentWrapper>
      </CommonWrapper>
    </DefaultLayout>
  );
}

const ContentWrapper = styled.div`
`;