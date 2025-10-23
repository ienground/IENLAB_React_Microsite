import * as React from "react";
import {Header} from "../components/Header.tsx";
import styled from "styled-components";
import {Footer} from "../components/Footer.tsx";

interface DefaultLayoutProps {
  toolbarVisible?: boolean;
  toolbarOverlap?: boolean;
  footerVisible?: boolean;
  children: React.ReactNode
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <Wrapper>
      <Header visible={props.toolbarVisible} overlap={props.toolbarOverlap}/>
      <main className="content">
        {props.children}
      </main>
      <Footer visible={props.footerVisible}/>
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

