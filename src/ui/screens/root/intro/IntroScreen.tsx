import DefaultLayout from "../../../utils/layout/DefaultLayout.tsx";
import styled from "styled-components";
import {useElementRefs, useVisibleAnimation} from "../../../utils/utils.ts";
import {CommonWrapper} from "../../../utils/layout/CommonWrapper.tsx";
import {Image, Spacer} from "@heroui/react";
import ImgIengroundProfileBg from "../../../../assets/image/img_ienground_sihyunhada.jpg";
import LogoColorTransparent from "../../../../assets/image/logo_color_transparent.png";

export default function IntroScreen() {
  const [visibleAnimationRefs, addToVisibleAnimationRefs, refCount] = useElementRefs<HTMLDivElement>();
  useVisibleAnimation(visibleAnimationRefs, "start", refCount);

  return (
    <DefaultLayout>
      <CommonWrapper>
        <Wrapper className="content-wrapper">
          <div className="introduce visible-animation" ref={addToVisibleAnimationRefs}>
            <div className="left-side">
              <Image
                src={ImgIengroundProfileBg}
                isBlurred
                isZoomed
              />
            </div>
            <div className="right-side">
              <div className="name">
                <div id="name">이현우</div>
                <div id="nickname">아이엔 IENGROUND</div>
              </div>
              <Spacer
                style={{
                  height: "4rem"
                }}
              />
              <div className="summary">
                개발과<br/>디자인을 하는<br/>모바일 크리에이터.
              </div>
              <Spacer
                style={{
                  height: "2rem"
                }}
              />
              <Image
                src={LogoColorTransparent}
                className="logo"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="history visible-animation" ref={addToVisibleAnimationRefs}>
            경력
          </div>
          <div className="school visible-animation" ref={addToVisibleAnimationRefs}>
            학력
          </div>
          <div className="project visible-animation" ref={addToVisibleAnimationRefs}>
            주요 프로젝트`
          </div>
        </Wrapper>
      </CommonWrapper>
    </DefaultLayout>
  );
}

const Wrapper = styled.div`
  & > .introduce {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    
    & > .left-side {
      max-width: 60%;
    }
    
    & > .right-side {
      flex-grow: 1;
      
      display: flex;
      flex-direction: column;
      justify-content: end;
      
      & > .name {
        & > #name {
          font-size: xxx-large;
          font-weight: bold;
        }

        & > #nickname {
          font-size: x-large;
          font-weight: bold;
        }
      }

      & > .summary {
        font-size: xx-large;
        font-weight: bold;
      }
    }
  }
  
  & > .history {
    
  }
  
  & > .school {
    
  }
  
  & > .project {
    
  }
`;