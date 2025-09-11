import * as React from "react";
import {Header} from "../components/Header.tsx";
import styled from "styled-components";

export default function DefaultLayout({ isfullscreen = false, children } : { isfullscreen?: boolean, children: React.ReactNode }) {
  return (
    <Wrapper $isfullscreen={isfullscreen}>
      <Header isfullscreen={isfullscreen} />
      <main className="content">
        {children}
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

const Wrapper = styled.div<{$isfullscreen: boolean}>`
  min-height: 100vh;
  
  position: relative;
  display: flex;
  flex-direction: column;
  
  & > main {
    flex-grow: 1;
    
    ${props => props.$isfullscreen ? '' +
            'position: absolute; width: 100%; height: 100%;' : ''}
    
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

