import {
  Accordion, AccordionItem,
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarItem, NavbarMenu, NavbarMenuToggle,
} from "@heroui/react";
import styled from "styled-components";
import imgLogoTypo from "../../../assets/brand/img_logo_typo.png";
import imgLogoTypoWhite from "../../../assets/brand/img_logo_typo_white.png";
import {RootDestination} from "../../screens/root/RootDestination.ts";
import {useRef, useState} from "react";
import {
  BellSimpleRingingIcon,
  CaretDownIcon, CaretLeftIcon, GithubLogoIcon,
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
import {AnimatePresence, motion} from "framer-motion";
import {breakpoints} from "../../../theme";
import {useScreenMeasure} from "../utils/ScreenMeasure.ts";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDownNetbook = useScreenMeasure("<=", breakpoints.netbook);

  return (
    <HeaderWrapper
      isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}
      className={((props.visible ?? true) ? "visible " : "") + (props.overlap ? "overlap " : "")}
      maxWidth="full"
      classNames={{
        content: "gap-0",
        wrapper: "gap-0"
      }}
      style={{
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: 980,
      }}
    >
      <ul className="content start-items">
        <AnimatePresence>
          {
            isDownNetbook &&
            <motion.div
              key="left-small-items"
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0, transition: { type: "spring", duration: 0.8 } }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <NavbarMenuToggle
                icon={<CaretDownIcon
                  size="24" weight="bold"
                  style={{ rotate: isMenuOpen ? "180deg" : "0deg", transition: "rotate 0.3s ease-in-out" }}
                />}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              />
            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {
            !isDownNetbook &&
            <motion.div
              key="left-big-items"
              animate={{ opacity: 1, width: "auto", transition: { type: "spring", duration: 0.8 } }}
              exit={{ opacity: 0, width: 0, transition: { type: "spring", duration: 0.8 } }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
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
                      startContent={<UserSquareIcon weight="bold" size="24" /> }
                    >{t("strings:at_ienground")}</DropdownItem>
                    <DropdownItem
                      key="notice"
                      description={t("strings:header.check_news")}
                      href={NoticeDestination.route}
                      startContent={<BellSimpleRingingIcon weight="bold" size="24" /> }
                    >{t("strings:noticeboard")}</DropdownItem>
                    <DropdownItem
                      key="privacy"
                      description={t("strings:header.service_app")}
                      href={PrivacyDestination.route}
                      startContent={<LockLaminatedIcon weight="bold" size="24" /> }
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
            </motion.div>
          }
        </AnimatePresence>
      </ul>

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

      <ul className="content end-items">
        <AnimatePresence>
          {
            !isDownNetbook &&
            <motion.div
              key="right-big-items"
              animate={{ opacity: 1, width: "auto", transition: { type: "spring", duration: 0.8 } }}
              exit={{ opacity: 0, width: 0, transition: { type: "spring", duration: 0.8 } }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', gap: "0.5rem" }}
            >
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
            </motion.div>
          }
        </AnimatePresence>
        <NavbarItem>
          <Button
            isIconOnly
            aria-label="dark-mode"
            variant="light"
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}
            radius="full"
            style={{ marginLeft: "0.5rem" }}
          >
            {
              theme === "light" ?
                <SunIcon size={24} weight="fill" />
                : <MoonIcon size={24} weight="fill" />
            }
          </Button>
        </NavbarItem>
        <AnimatePresence>
          {
            !isDownNetbook &&
            <motion.div
              key="right-big-items2"
              animate={{ opacity: 1, width: "auto", transition: { type: "spring", duration: 0.8 } }}
              exit={{ opacity: 0, width: 0, transition: { type: "spring", duration: 0.8 } }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <NavbarItem style={{ marginLeft: "0.5rem" }}>
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
            </motion.div>
          }
        </AnimatePresence>
      </ul>

      <NavbarMenu
        motionProps={{
          initial: { opacity: 0, y: "-100%" },
          animate: { opacity: 1, y: "0%", transition: { type: "tween", ease: "easeOut", duration: 0.5 } },
          exit: { opacity: 0, y: "-100%", transition: { type: "tween", ease: "easeIn", duration: 0.5 } }
        }}
        style={{ zIndex: 900, transition: "background 0.3s ease-in-out" }}
      >
        <Accordion
          motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              height: "auto",
              overflowY: "unset",
              transition: {
                height: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 1,
                },
                opacity: {
                  type: "tween",
                  ease: "easeInOut",
                  duration: 1,
                },
              },
            },
            exit: {
              y: -10,
              opacity: 0,
              height: 0,
              overflowY: "hidden",
              transition: {
                height: {
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.25,
                },
                opacity: {
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.3,
                },
              },
            },
          },
        }}
          defaultSelectedKeys={["item-overview", "item-link"]}
          selectionMode="multiple"
          keepContentMounted
        >
          <AccordionItem
            key="item-overview"
            title={t("strings:overview")}
            subtitle={t("strings:overview_desc")}
            indicator={<CaretLeftIcon size="18" weight="bold" /> }
            classNames={{ content: "flex flex-col gap-2"  }}
          >
            <NavbarMenuItemWrapper
              key="item-menu-intro"
              color="foreground"
              href={IntroDestination.route}
            >
              <UserSquareIcon weight="bold" size="24" />
              <div className="content">
                <div className="title">{t("strings:at_ienground")}</div>
                <div className="description">{t("strings:header.what_do_i_do")}</div>
              </div>
            </NavbarMenuItemWrapper>
            <NavbarMenuItemWrapper
              key="item-menu-notice"
              color="foreground"
              href={NoticeDestination.route}
            >
              <BellSimpleRingingIcon weight="bold" size="24" />
              <div className="content">
                <div className="title">{t("strings:noticeboard")}</div>
                <div className="description">{t("strings:header.check_news")}</div>
              </div>
            </NavbarMenuItemWrapper>
            <NavbarMenuItemWrapper
              key="item-menu-privacy"
              color="foreground"
              href={PrivacyDestination.route}
            >
              <LockLaminatedIcon weight="bold" size="24" />
              <div className="content">
                <div className="title">{t("strings:privacy_policy")}</div>
                <div className="description">{t("strings:header.service_app")}</div>
              </div>
            </NavbarMenuItemWrapper>
          </AccordionItem>
          <AccordionItem
            key="item-dev"
            title={t("strings:project.title")}
            subtitle={t("strings:project_desc")}
            indicator={<></>}
            as={Link}
            href={DevDestination.route}
            className="w-full"
          />
          <AccordionItem
            key="item-inquiry"
            title={t("strings:quote_inquiry")}
            subtitle={t("strings:quote_inquiry_desc")}
            indicator={<></>}
            as={Link}
            href={EstimateDestination.route}
            className="w-full"
          />
          <AccordionItem
            key="item-link"
            title={t("strings:social_connect")}
            subtitle={t("strings:social_connect_desc")}
            indicator={<CaretLeftIcon size="18" weight="bold" /> }
            classNames={{ content: "flex flex-col gap-2"  }}
          >
            <NavbarMenuItemWrapper
              key="item-menu-tistory"
              color="foreground"
              href="https://blog.ien.zone"
            >
              <TistoryIcon
                style={{
                  width: "24px",
                  height: "24px",
                  fill: "currentColor"
                }}
              />
              <div className="content">
                <div className="title">{t("strings:tistory")}</div>
                <div className="description">blog.ien.zone</div>
              </div>
            </NavbarMenuItemWrapper>
            <NavbarMenuItemWrapper
              key="item-menu-instagram"
              color="foreground"
              href="https://www.instagram.com/ienlab"
            >
              <InstagramLogoIcon size={24} weight="fill" />
              <div className="content">
                <div className="title">{t("strings:instagram")}</div>
                <div className="description">instagram.com/ienlab</div>
              </div>
            </NavbarMenuItemWrapper>
            <NavbarMenuItemWrapper
              key="item-menu-github"
              color="foreground"
              href="https://github.com/ienground"
            >
              <GithubLogoIcon size={24} weight="fill" />
              <div className="content">
                <div className="title">{t("strings:github")}</div>
                <div className="description">github.com/ienground</div>
              </div>
            </NavbarMenuItemWrapper>
          </AccordionItem>
          <AccordionItem
            key="item-inquiry-submit"
            title={t("strings:ask_outsource")}
            subtitle={t("strings:ask_outsource_desc")}
            as={Link}
            href="/#inquiry"
            onPress={() => setIsMenuOpen(false)}
            startContent={<PaperPlaneTiltIcon size="18" weight="bold" /> }
            indicator={<></>}
            disableIndicatorAnimation
            classNames={{
              title: "w-full"
            }}
            style={{
              width: "100%",
              backgroundColor: "#FF000033",
              borderRadius: "1rem",
              margin: "1rem 0",
              padding: "0 1rem"
            }}
          />
        </Accordion>
        {/*<NavbarMenuItem*/}
        {/*  key="menu-privacy"*/}
        {/*  isActive*/}
        {/*  as={Link}*/}
        {/*  size="lg"*/}
        {/*  href={PrivacyDestination.route}*/}
        {/*>*/}
        {/*  <NavbarMenuItemWrapper>*/}
        {/*    <LockLaminatedIcon weight="bold" size="32" />*/}
        {/*    <div className="content">*/}
        {/*      <div className="title">{t("strings:privacy_policy")}</div>*/}
        {/*      <div className="description">{t("strings:header.service_app")}</div>*/}
        {/*    </div>*/}
        {/*  </NavbarMenuItemWrapper>*/}
        {/*</NavbarMenuItem>*/}
      </NavbarMenu>
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
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      gap: 0;

      height: 100%;
      flex-grow: 1;
      flex-basis: 0;
      
      & > li > a {
        transition: color 0.3s ease-in-out;
      }
      
      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }
    }

    & > .end-items {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-end;
      gap: 0;

      height: 100%;
      flex-grow: 1;
      flex-basis: 0;

      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
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

const NavbarMenuItemWrapper = styled(Link)`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  
  & > .content {
    display: flex;
    flex-direction: column;
    
    & > .description {
      font-size: small;
      font-weight: initial;
    }
  }
`;