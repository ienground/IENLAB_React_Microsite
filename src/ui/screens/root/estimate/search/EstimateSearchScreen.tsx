import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {Alert, Button, Card, CardBody, CardHeader, Form, Input} from "@heroui/react";
import styled from "styled-components";
import {MagnifyingGlassIcon, PasswordIcon, ReceiptIcon, WarningIcon} from "@phosphor-icons/react";
import {useElementRefs, useVisibleAnimation} from "../../../../utils/utils.ts";
import {useTranslation} from "react-i18next";
import '../../../../../locales/i18n';
import {useEstimateSearchViewModel} from "./EstimateSearchViewModel.tsx";
import {useNavigate} from "react-router";
import {EstimateDestination} from "../EstimateDestination.ts";
import {type FormEvent, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function EstimateSearchScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uiState, onItemValueChanged, searchQuote, onDispose } = useEstimateSearchViewModel();

  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchQuote(
      (id) => { navigate(`${EstimateDestination.route}/${id}`) },
      (err) => { onItemValueChanged({ errorCode: err }) }
    )
  };

  useEffect(() => {
    return () => onDispose();
  }, []);

  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <ReceiptIcon size={48} weight="bold" />
          <div>{t('strings:quote_inquiry')}</div>
        </div>
        <ContentWrapper>
          <Card
            className="input-card visible-animation"
            ref={addToVisibleAnimationRefs}
          >
            <CardHeader className="header">
              <PasswordIcon size={32} weight="fill" />
              <div>{t("strings:inquiry.input")}</div>
            </CardHeader>
            <CardBody className="body">
              <Form
                onSubmit={onSubmit}
              >
                <Input
                  isRequired
                  isClearable
                  radius="sm"
                  label={t("strings:inquiry.number")}
                  placeholder={`${t("strings:example_colon")}IL2024-001`}
                  value={uiState.item.query}
                  onClear={() => onItemValueChanged({ query: "" })}
                  onChange={(e) => onItemValueChanged({ query: e.target.value })}
                />
                <Input
                  isRequired
                  isClearable
                  radius="sm"
                  label={t("strings:name")}
                  placeholder={`${t("strings:input_name")}`}
                  value={uiState.item.name}
                  onClear={() => onItemValueChanged({ name: "" })}
                  onChange={(e) => onItemValueChanged({ name: e.target.value })}
                />
                <AnimatePresence>
                  {uiState.item.errorCode && (
                    <motion.div
                      key="error-alert"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                      className="w-full"
                    >
                      <Alert
                        color="danger"
                        className="alert"
                        hideIconWrapper
                        icon={<WarningIcon weight="fill" />}
                      >
                        {t("strings:cannot_find_inquiry")}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Button
                  isLoading={uiState.item?.isSearching}
                  endContent={<MagnifyingGlassIcon weight="bold" />}
                  color="primary"
                  variant="solid"
                  fullWidth
                  type="submit"
                  radius="sm"
                >
                  {t("strings:search_inquiry")}
                </Button>
              </Form>

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
      
      .alert {
        width: 100%;
        margin-top: 1rem;
      }
    }
      
  }
`;