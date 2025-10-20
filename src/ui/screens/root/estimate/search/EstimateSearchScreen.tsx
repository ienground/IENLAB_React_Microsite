import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {Button, Card, CardBody, CardHeader, Input} from "@heroui/react";
import styled from "styled-components";
import {MagnifyingGlassIcon, PasswordIcon, ReceiptIcon} from "@phosphor-icons/react";
import {useElementRefs, useVisibleAnimation} from "../../../../utils/utils.ts";
import {useTranslation} from "react-i18next";
import '../../../../../locales/i18n';
import {useEstimateSearchViewModel} from "./EstimateSearchViewModel.tsx";
import {useNavigate} from "react-router";
import {EstimateDestination} from "../EstimateDestination.ts";

export default function EstimateSearchScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uiState, onItemValueChanged, searchQuote } = useEstimateSearchViewModel();

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <ReceiptIcon size={48} weight="bold" />
          <div>{t('strings:quote_inquiry')}</div>
        </div>
        <ContentWrapper>
          <Card className="input-card visible-animation" ref={addToVisibleAnimationRefs}>
            <CardHeader className="header">
              <PasswordIcon size={32} weight="fill" />
              <div>{t("strings:inquiry.input")}</div>
            </CardHeader>
            <CardBody className="body">
              <Input
                radius="sm"
                label={t("strings:inquiry.number")}
                placeholder={`${t("strings:example_colon")}IL2024-001`}
                value={uiState.item.query}
                onChange={(e) => onItemValueChanged({ query: e.target.value })}
                endContent={
                  <Button
                    isIconOnly
                    isLoading={uiState.item.isSearching}
                    variant="light"
                    onPress={() => {
                      searchQuote(
                        (id) => { navigate(`${EstimateDestination.route}/${id}`) },
                        (err) => { console.error(err); }
                      )
                    }}
                  >
                    <MagnifyingGlassIcon size="24" weight="bold" />
                  </Button>
                }
              />
              <ul className="description">
                <li>{t("strings:inquiry.desc1")}</li>
                <li>{t("strings:inquiry.desc2")}</li>
                <li>{t("strings:inquiry.desc3")}</li>
              </ul>
            </CardBody>
          </Card>
        </ContentWrapper>
      </CommonWrapper>
    </DefaultLayout>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 1rem;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > .input-card {
    width: 100%;
    max-width: 720px;
    
    & > .header {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      padding: 1rem;
      
      & > div {
        font-size: x-large;
      }
    }
    
    & > .body {
      padding: 1rem;
      
      display: flex;
      flex-direction: column;
      gap: 1rem;
      
      & > ul.description {
        margin-top: 1rem;
        list-style-position: inside;
        list-style-type: disc;
      }
      
    }
      
  }
`;