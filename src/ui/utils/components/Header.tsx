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
import {useEffect, useState} from "react";
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
import {PrivacyDestination} from "../../screens/root/privacy/PrivacyDestination.ts";
import {DevDestination} from "../../screens/root/dev/DevDestination.ts";

interface HeaderProps {
  visible?: boolean;
  overlap?: boolean;
}

export const Header = (props: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);
  const delay = 300;

  return (
    <FloatingNavbar
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
                href={PrivacyDestination.route}
                startContent={<LockLaminatedIcon weight="bold" size="24px" /> }
                color="warning"
              >개인정보 처리방침</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={DevDestination.route} >
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
            견적 조회
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
};

const FloatingNavbar = styled(Navbar)`
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

  &.visible {
    transform: translateY(0);
  }

  &.overlap {
    margin-top: -4rem;
  }
  
`;