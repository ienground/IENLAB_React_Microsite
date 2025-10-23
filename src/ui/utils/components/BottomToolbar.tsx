import styled from "styled-components";
import {Tab, Tabs} from "@heroui/react";
import {type ComponentProps, type FC, useCallback, useEffect, useRef} from "react";
import type {Icon} from "@phosphor-icons/react";
import {HashLink} from "react-router-hash-link";

interface BottomToolbarProps {
  visible: boolean;
  selectedKey: string;
  onSelectionChange: ((key: string) => void),
  tabItems: BottomToolbarItem[];
}

export interface BottomToolbarItem {
  key: string;
  icon: Icon;
  label: string;
}

const HashLinkTab = Tab as FC<
  ComponentProps<typeof Tab> & ComponentProps<typeof HashLink>
>;

export default function BottomToolbar(props: BottomToolbarProps) {
  const isClickingRef = useRef(false);
  const customScroll = useCallback((el: HTMLElement) => {
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => isClickingRef.current = false, 500);
  }, []);

  // Anchor 추적
  useEffect(() => {
    const anchors = document.querySelectorAll(".anchor");
    anchors.forEach((item) => {
      console.log(item.id)
    })
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (isClickingRef.current) {
            return;
          }
          if (entry.isIntersecting) {
            props.onSelectionChange(entry.target.id);
          }
        })
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: [0.5]
      }
    );

    anchors.forEach((anchor) => observer.observe(anchor));

    return () => {
      anchors.forEach(anchor => observer.unobserve(anchor));
    }
  }, [props.visible]);

  return (
    <BottomToolbarWrapper
      className={props.visible ? "visible" : ""}
      radius="full"
      classNames={{
        tabList: "!bg-default-100"
      }}
      selectedKey={props.selectedKey}
      onSelectionChange={(key) => props.onSelectionChange(key.toString())}
      variant="bordered"
    >
      {
        props.tabItems.map((item) => (
          <HashLinkTab
            key={item.key}
            as={HashLink}
            to={`#${item.key}`}
            title={
              <div className="flex items-center space-x-2">
                <item.icon size={18} weight={props.selectedKey === item.key ? "fill" : "light"} />
                <span>{item.label}</span>
              </div> as never
            }
            scroll={customScroll}
            onClick={() => isClickingRef.current = true}
          />
        ))
      }
    </BottomToolbarWrapper>
  )
}

const BottomToolbarWrapper = styled(Tabs)`
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 990;
  transform: translate(-50%, 100%);
  
  transition: bottom 0.5s ease-in-out, transform 0.5s ease-in-out;
  
  &.visible {
    top: initial;
    bottom: 1rem;
    transform: translate(-50%, 0);
  }
  
`;

