import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent, NavbarItem,
} from "@heroui/react";
import styled from "styled-components";
import imgLogoTypo from "../../../assets/brand/img_logo_typo.png";
import imgLogoTypoWhite from "../../../assets/brand/img_logo_typo_white.png";
import {RootDestination} from "../../screens/root/RootDestination.ts";
import {useRef, useState} from "react";
import {
  BellSimpleRingingIcon,
  CaretDownIcon,
  GithubLogoIcon,
  InstagramLogoIcon, LockLaminatedIcon, MoonIcon,
  PaperPlaneTiltIcon, SunIcon,
  UserSquareIcon
} from "@phosphor-icons/react";
import TistoryIcon from "../../../assets/icon/ic_tistory.svg?react";
import IenlabSolidIcon from "../../../assets/icon/ic_ienlab_solid.svg?react";
import {IntroDestination} from "../../screens/root/intro/IntroDestination.ts";
import {NoticeDestination} from "../../screens/root/notice/NoticeDestination.ts";
import {EstimateDestination} from "../../screens/root/estimate/EstimateDestination.ts";
import {PrivacyDestination} from "../../screens/root/privacy/PrivacyDestination.ts";
import {DevDestination} from "../../screens/root/dev/DevDestination.ts";
import {useTranslation} from "react-i18next";
import {useTheme} from "@heroui/use-theme";
import {CSSTransition} from "react-transition-group";

interface HeaderProps {
  visible?: boolean;
  overlap?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);
  const delay = 300;
  const { theme, setTheme } = useTheme();
  const logoLight = useRef(null);
  const logoDark = useRef(null);

  return (
    <HeaderWrapper
      className={((props.visible ?? true) ? "visible " : "") + (props.overlap ? "overlap " : "")}
      maxWidth="full"
      style={{
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: 999,
      }}
    >
      <NavbarContent justify="start" className="content start-items">
        <NavbarItem>
          <Dropdown
            placement="bottom"
            triggerType="menu"
            isOpen={isOpen}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
          >
            <DropdownTrigger aschild>
              <Button
                isIconOnly
                aria-label="Like"
                variant="light"
                size="lg"
                as={Link}
                endContent={<CaretDownIcon weight="bold" size="18px" /> }
                onMouseEnter={() => {
                  clearTimeout(timeoutId);
                  setIsOpen(true);
                }}
                onMouseLeave={() => {
                  const id = setTimeout(() => setIsOpen(false), delay);
                  setTimeoutId(id);
                }}
              >
                <IenlabSolidIcon
                  style={{
                    width: "24px",
                    height: "24px",
                    fill: "currentColor"
                  }}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with description" variant="light"
              onMouseEnter={() => {
                clearTimeout(timeoutId);
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                const id = setTimeout(() => setIsOpen(false), delay);
                setTimeoutId(id);
              }}
            >
              <DropdownItem
                key="intro"
                description={t("strings:header.what_do_i_do")}
                href={IntroDestination.route}
                startContent={<UserSquareIcon weight="bold" size="24px" /> }
              >{t("strings:at_ienground")}</DropdownItem>
              <DropdownItem
                key="notice"
                description={t("strings:header.check_news")}
                href={NoticeDestination.route}
                startContent={<BellSimpleRingingIcon weight="bold" size="24px" /> }
              >{t("strings:noticeboard")}</DropdownItem>
              <DropdownItem
                key="privacy"
                description={t("strings:header.service_app")}
                href={PrivacyDestination.route}
                startContent={<LockLaminatedIcon weight="bold" size="24px" /> }
                color="warning"
              >{t("strings:privacy_policy")}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={DevDestination.route} >
            {t("strings:project.title")}
          </Link>
        </NavbarItem>
        {/*<NavbarItem>*/}
        {/*  <Link color="foreground" href={BrandDestination.route} >*/}
        {/*    {t("strings:design.title")}*/}
        {/*  </Link>*/}
        {/*</NavbarItem>*/}
        <NavbarItem>
          <Link color="foreground" href={EstimateDestination.route} >
            {t("strings:quote_inquiry")}
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarBrand className="brand">
        <Link href={RootDestination.route}>
          <CSSTransition
            in={theme === "dark"}
            timeout={300}
            classNames="fade"
            nodeRef={logoDark}
            unmountOnExit
            appear
          >
            <img src={imgLogoTypoWhite} alt="Logo" ref={logoDark}/>
          </CSSTransition>
          <CSSTransition
            in={theme === "light"}
            timeout={300}
            classNames="fade"
            nodeRef={logoLight}
            mountOnEnter
            appear
          >
            <img src={imgLogoTypo} alt="Logo" ref={logoLight}/>
          </CSSTransition>

        </Link>

      </NavbarBrand>

      <NavbarContent justify="end" className="content end-items">
        {/* 오른쪽에 들어갈 메뉴 아이템 */}
        <NavbarItem>
          <Button
            isIconOnly
            aria-label="instagram"
            as={Link}
            variant="light"
            radius="full"
            href="https://blog.ien.zone"
          >
            <TistoryIcon
              style={{
                width: "24px",
                height: "24px",
                fill: "currentColor"
              }}
            />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            aria-label="instagram"
            as={Link}
            variant="light"
            radius="full"
            href="https://www.instagram.com/ienlab"
          >
            <InstagramLogoIcon size={24} weight="fill" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            aria-label="instagram"
            as={Link}
            variant="light"
            radius="full"
            href="https://github.com/ienground"
          >
            <GithubLogoIcon size={24} weight="fill" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            aria-label="dark-mode"
            variant="light"
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}
            radius="full"
          >
            {
              theme === "light" ?
                <SunIcon size={24} weight="fill" />
                : <MoonIcon size={24} weight="fill" />
            }
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            showAnchorIcon
            anchorIcon={<PaperPlaneTiltIcon />}
            as={Link}
            color="primary"
            href="/#inquiry"
            variant="solid"
            radius="sm"
          >
            {t("strings:ask_outsource")}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled(Navbar)`
  transform: translateY(-4rem);
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  
  & > header {
    max-width: calc(1440px + 2rem);
    padding-inline: 1rem;
    
    & > .content {
      //width: 40%;
      //background-color: green;
      
      ${({ theme }) => theme.breakpoints.up("mobile")} {
        //background-color: blue;
      };
      
      ${({ theme }) => theme.breakpoints.up("netbook")} {
        //background-color: red;
      };
      
      ${({ theme }) => theme.breakpoints.up("laptop")} {
        //background-color: hotpink;
      };
      
    }

    & > .start-items {
      & > li > a {
        transition: color 0.3s ease-in-out;
      }
    }

    & > .end-items {

    }

    & > .brand {
      display: flex;
      flex-direction: row;
      justify-content: center;
      
      & > a {
        position: relative;
        
        & > img {
          max-width: fit-content;
          height: 2rem;
          
          position: absolute;
          transform: translateX(-50%);
        }
      }
    }
  }

  &.visible {
    transform: translateY(0);
  }

  &.overlap {
    margin-top: -4rem;
  }
  
`;