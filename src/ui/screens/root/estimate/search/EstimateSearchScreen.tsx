import DefaultLayout from "../../../../utils/layout/DefaultLayout.tsx";
import {CommonWrapper} from "../../../../utils/layout/CommonWrapper.tsx";
import {Button, Card, CardBody, CardHeader, Input} from "@heroui/react";
import styled from "styled-components";
import {MagnifyingGlassIcon, PasswordIcon, ReceiptIcon} from "@phosphor-icons/react";

export default function EstimateSearchScreen() {
  return (
    <DefaultLayout>
      <CommonWrapper>
        <div className="header">
          <ReceiptIcon size={48} weight="bold" />
          <div>견적 조회</div>
        </div>
        <ContentWrapper>
          <Card className="input-card">
            <CardHeader className="header">
              <PasswordIcon size={32} weight="fill" />
              <div>견적 번호 입력</div>
            </CardHeader>
            <CardBody className="body">
              <Input
                radius="sm"
                label="견적 번호"
                placeholder="예: IL2024-001"
                endContent={
                  <Button isIconOnly variant="light">
                    <MagnifyingGlassIcon size="24" weight="bold" />
                  </Button>
                }
              />
              <ul className="description">
                <li>견적 번호는 이메일로 전달받으신 문서에서 확인하실 수 있습니다.</li>
                <li>견적 번호는 대소문자를 구분하지 않습니다.</li>
                <li>문의사항이 있으시면 연락처로 문의해주세요.</li>
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