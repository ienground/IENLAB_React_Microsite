import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {Link} from "@heroui/react";
import {PrivacyDestination} from "../../screens/root/privacy/PrivacyDestination.ts";
import {NoticeDestination} from "../../screens/root/notice/NoticeDestination.ts";
import {CSSTransition} from "react-transition-group";
import imgLogoTypoWhite from "../../../assets/brand/img_logo_full_white.png";
import imgLogoTypo from "../../../assets/brand/img_logo_full.png";
import {useRef} from "react";
import {useDarkmode} from "../utils.ts";

interface FooterProps {
  visible?: boolean;
}

export const Footer = (props: FooterProps) => {
  const { t, i18n } = useTranslation();

  const isDark = useDarkmode();
  const logoLight = useRef(null);
  const logoDark = useRef(null);
  const date = new Date();
  return (
    (props.visible ?? true) ?
      <FooterWrapper>
        <div className="container">
          <div className="info">
            <div className="copyright">{t("strings:copyright", { year: date.getFullYear() })}</div>
            <div className="link">
              <Link
                href={NoticeDestination.route}
                underline="hover"
                size="sm"
                style={{ color: "hsl(var(--heroui-secondary-500))" }}
              >{t("strings:noticeboard")}</Link>
              <Link
                href={PrivacyDestination.route}
                underline="hover"
                size="sm"
                style={{ color: "hsl(var(--heroui-secondary-500))" }}
              >{t("strings:privacy_policy")}</Link>
              |
              <Link
                underline="hover"
                size="sm"
                style={{ color: "hsl(var(--heroui-default-500))" }}
                onPress={() =>i18n.changeLanguage("ko")}
              >{t("strings:korean_no_trans")}</Link>
              <Link
                underline="hover"
                size="sm"
                style={{ color: "hsl(var(--heroui-default-500))" }}
                onPress={() => i18n.changeLanguage("en")}
              >{t("strings:english_no_trans")}</Link>
            </div>
          </div>
          <div style={{ flexGrow: 1 }} />
          <div className="logo">
            <CSSTransition
              in={isDark}
              timeout={300}
              classNames="fade"
              nodeRef={logoDark}
              unmountOnExit
              appear
            >
              <img src={imgLogoTypoWhite} alt="Logo" ref={logoDark}/>
            </CSSTransition>
            <CSSTransition
              in={!isDark}
              timeout={300}
              classNames="fade"
              nodeRef={logoLight}
              mountOnEnter
              appear
            >
              <img src={imgLogoTypo} alt="Logo" ref={logoLight}/>
            </CSSTransition>
          </div>
        </div>
      </FooterWrapper> : <></>
  );
}

const FooterWrapper = styled.footer`
  margin-top: 1rem;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${`hsl(var(--heroui-content3))`};
  
  & > .container {
    margin: 1rem;
    max-width: calc(1440px);

    display: flex;
    flex-direction: row;
    align-items: center;
    
    & > .info {
      
      & > .copyright {
        
      }
      
      & > .link {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: baseline;
      }
    }

    & > .logo {
      position: relative;
      
      & > img {
        max-width: fit-content;
        height: 2rem;

        position: absolute;
        transform: translate(-100%, -50%);
      }
    }
  }
`;