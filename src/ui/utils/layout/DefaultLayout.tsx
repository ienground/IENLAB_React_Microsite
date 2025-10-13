import * as React from "react";
import {Header} from "../components/Header.tsx";
import styled from "styled-components";

interface DefaultLayoutProps {
  toolbarVisible?: boolean;
  toolbarOverlap?: boolean;
  children: React.ReactNode
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <Wrapper>
      <Header visible={props.toolbarVisible} overlap={props.toolbarOverlap}/>
      <main className="content">
        {props.children}
      </main>
      {/*<footer className="w-full flex items-center justify-center py-3">*/}
      {/*  <Link*/}
      {/*    isExternal*/}
      {/*    className="flex items-center gap-1 text-current"*/}
      {/*    href="https://heroui.com"*/}
      {/*    title="heroui.com homepage"*/}
      {/*  >*/}
      {/*    <span className="text-default-600">Powered by</span>*/}
      {/*    <p className="text-primary">HeroUI</p>*/}
      {/*  </Link>*/}
      {/*</footer>*/}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  
  position: relative;
  display: flex;
  flex-direction: column;
  
  & > main {
    flex-grow: 1;
  }
  
  & > .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  //& > .content {
  //  width: 100%;
  //  
  //  margin-left: auto;
  //  margin-right: auto;
  //  //padding-top: rem;
  //
  //  flex-grow: 1;      
  //}
`;

