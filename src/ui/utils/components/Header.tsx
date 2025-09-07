import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent, NavbarItem,
} from "@heroui/react";
import styled from "styled-components";
import imgLogoTypo from "../../../assets/brand/img_logo_typo.png";
import {RootDestination} from "../../screens/root/RootDestination.ts";
import {ThemeSwitcher} from "./ThemeSwitcher.tsx";
import {useState} from "react";
import {mapRange} from "../utils.ts";
import {
  BellSimpleRingingIcon,
  CaretDownIcon,
  GithubLogoIcon,
  InstagramLogoIcon, LockLaminatedIcon,
  PaperPlaneTiltIcon,
  UserSquareIcon
} from "@phosphor-icons/react";
import TistoryIcon from "../../../assets/icon/ic_tistory.svg?react";
import IenlabSolidIcon from "../../../assets/icon/ic_ienlab_solid.svg?react";
import {IntroDestination} from "../../screens/root/intro/IntroDestination.ts";
import {NoticeDestination} from "../../screens/root/notice/NoticeDestination.ts";
import {BrandDestination} from "../../screens/root/brand/BrandDestination.ts";
import {EstimateDestination} from "../../screens/root/estimate/EstimateDestination.ts";

export const Header = ({ isFullscreen } : { isFullscreen: boolean} ) => {
  const scrollThreshold = 100;
  const [isScrolled, setIsScrolled] = useState(false);

  // const borderRadius = useTransform(scrollY, [0, scrollThreshold], [0, 1]);
  // const backdropBlur = useTransform(scrollY, [0, scrollThreshold], [8, 24]);

  const maxMarginX = 2;
  const maxMarginY = 1;
  const maxBorderRadius = 1;

  const [marginX, setMarginX] = useState(0);
  const [marginY, setMarginY] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);


  window?.addEventListener("scroll", () => {
    setIsScrolled(window.scrollY > scrollThreshold);
    setMarginX(mapRange(Math.min(scrollY, scrollThreshold), 0, scrollThreshold, 0, maxMarginX));
    setMarginY(mapRange(Math.min(scrollY, scrollThreshold), 0, scrollThreshold, 0, maxMarginY));
    setBorderRadius(mapRange(Math.min(scrollY, scrollThreshold), 0, scrollThreshold, 0, maxBorderRadius));
  });

  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);
  const delay = 300;

  return (
    <FloatingNavbar
      className={isScrolled ? "scrolled" : ""}
      maxWidth="full"
      style={{
        maxWidth: `calc(100% - 2 * ${isFullscreen ? maxMarginX : marginX}rem)`,
        marginLeft: "auto",
        marginRight: "auto",
        top: `${isFullscreen ? maxMarginY : marginY}rem`,
        borderRadius: `${isFullscreen ? maxBorderRadius : borderRadius}rem`,
        zIndex: 999,
      }}
    >
      <NavbarContent justify="start" className="content start-items">
        {/* 왼쪽에 들어갈 메뉴 아이템 */}
        {/*<NavbarItem>*/}
          {/*<Button isIconOnly aria-label="Like" variant="light" radius="full">*/}
          {/*  <CaretDownIcon size={24} weight="bold" />*/}
          {/*</Button>*/}
        {/*</NavbarItem>*/}

        <NavbarItem>
          <Dropdown
            placement="bottom"
            triggerType="menu"
            isOpen={isOpen}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
          >
            <DropdownTrigger asChild>
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
                description="저는 무엇을 하는 사람일까요?"
                href={IntroDestination.route}
                startContent={<UserSquareIcon weight="bold" size="24px" /> }
              >@IENGROUND</DropdownItem>
              <DropdownItem
                key="notice"
                description="새로운 소식을 살펴보세요."
                href={NoticeDestination.route}
                startContent={<BellSimpleRingingIcon weight="bold" size="24px" /> }
              >공지사항</DropdownItem>
              <DropdownItem
                key="privacy"
                description="서비스 및 어플리케이션"
                href="/"
                startContent={<LockLaminatedIcon weight="bold" size="24px" /> }
                color="warning"
              >개인정보 처리방침</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/" >
            프로젝트
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={BrandDestination.route} >
            디자인
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={EstimateDestination.route} >
            견적 확인
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarBrand className="brand">
        {/* 가운데 로고 */}
        <Link href={RootDestination.route}>
          <img src={imgLogoTypo} alt="Logo" />
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
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            showAnchorIcon
            anchorIcon={<PaperPlaneTiltIcon />}
            as={Link}
            color="primary"
            href="https://github.com/heroui-inc/heroui"
            variant="solid"
            radius="sm"
          >
            외주 문의
          </Button>
        </NavbarItem>
      </NavbarContent>
    </FloatingNavbar>
  );
    // return (
  //   <Navbar maxWidth="xl" position="sticky">
  //     <NavbarContent className="basis-1/5 sm:basis-full bg-amber-600" justify="start">
  //       <NavbarBrand className="gap-3 max-w-fit">
  //         <Link
  //           className="flex justify-start items-center gap-1"
  //           color="foreground"
  //           href="/"
  //         >
  //           {/*<Logo />*/}
  //           <p className="font-bold text-inherit">ACME</p>
  //         </Link>
  //       </NavbarBrand>
  //       <div className="hidden lg:flex gap-4 justify-start ml-2">
  //         {siteConfig.navItems.map((item) => (
  //           <NavbarItem key={item.href}>
  //             <Link
  //               // className={clsx(
  //               //   linkStyles({ color: "foreground" }),
  //               //   "data-[active=true]:text-primary data-[active=true]:font-medium",
  //               // )}
  //               color="foreground"
  //               href={item.href}
  //             >
  //               {item.label}
  //             </Link>
  //           </NavbarItem>
  //         ))}
  //       </div>
  //     </NavbarContent>
  //
  //     <NavbarContent
  //       className="hidden sm:flex basis-1/5 sm:basis-full bg-amber-950"
  //       justify="end"
  //     >
  //       <NavbarItem className="hidden sm:flex gap-2">
  //         <Link isExternal href={siteConfig.links.twitter} title="Twitter">
  //           <TwitterIcon className="text-default-500" />
  //         </Link>
  //         <Link isExternal href={siteConfig.links.discord} title="Discord">
  //           <DiscordIcon className="text-default-500" />
  //         </Link>
  //         <Link isExternal href={siteConfig.links.github} title="GitHub">
  //           <GithubIcon className="text-default-500" />
  //         </Link>
  //         {/*<ThemeSwitch />*/}
  //       </NavbarItem>
  //       {/*<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>*/}
  //       <NavbarItem className="hidden md:flex">
  //         <Button
  //           isExternal
  //           as={Link}
  //           className="text-sm font-normal text-default-600 bg-default-100"
  //           href={siteConfig.links.sponsor}
  //           startContent={<HeartFilledIcon className="text-danger" />}
  //           variant="flat"
  //         >
  //           Sponsor
  //         </Button>
  //       </NavbarItem>
  //     </NavbarContent>
  //
  //     <NavbarContent className="sm:hidden basis-1 pl-4 bg-red-300" justify="end">
  //       <Link isExternal href={siteConfig.links.github}>
  //         <GithubIcon className="text-default-500" />
  //       </Link>
  //       {/*<ThemeSwitch />*/}
  //       <NavbarMenuToggle />
  //     </NavbarContent>
  //
  //     <NavbarMenu>
  //       {/*{searchInput}*/}
  //       <div className="mx-4 mt-2 flex flex-col gap-2">
  //         {/*{siteConfig.navMenuItems.map((item, index) => (*/}
  //         {/*  <NavbarMenuItem key={`${item}-${index}`}>*/}
  //         {/*    <Link*/}
  //         {/*      color={*/}
  //         {/*        index === 2*/}
  //         {/*          ? "primary"*/}
  //         {/*          : index === siteConfig.navMenuItems.length - 1*/}
  //         {/*            ? "danger"*/}
  //         {/*            : "foreground"*/}
  //         {/*      }*/}
  //         {/*      href="#"*/}
  //         {/*      size="lg"*/}
  //         {/*    >*/}
  //         {/*      {item.label}*/}
  //         {/*    </Link>*/}
  //         {/*  </NavbarMenuItem>*/}
  //         {/*))}*/}
  //       </div>
  //     </NavbarMenu>
  //   </Navbar>
  // );
};

const FloatingNavbar = styled(Navbar)`
  transition: width 0.3s ease-in-out, margin 0.3s ease-in-out, top 0.3s ease-in-out, border-radius 0.3s ease-in-out, background-color 0.3s ease-in-out;
  
  &.scrolled {
    //background-color: green;

    //width: calc(100% - 4rem); /* 좌우 마진 추가 */
    //margin: 0 2rem; /* 위아래 마진 추가 */
  }
  
  & > header {
    padding-inline: 1rem;
    
    max-width: calc(1440px + 2rem);
    
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

    }

    & > .end-items {

    }

    & > .brand {
      display: flex;
      flex-direction: row;
      justify-content: center;
      
      & > a > img {
        max-width: fit-content;
        height: 2rem;
      }
    }
  }
  
`;