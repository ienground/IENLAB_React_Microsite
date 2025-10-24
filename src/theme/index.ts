import { createStyledBreakpointsTheme } from 'styled-breakpoints';

export const breakpoints = {
  mobile: 500,
  tablet: 768,
  netbook: 1024,
  laptop: 1280,
  pc: 1440
};

export const screen = createStyledBreakpointsTheme({
  breakpoints: {
    mobile: `${breakpoints.mobile}px`,
    tablet: `${breakpoints.tablet}px`,
    netbook: `${breakpoints.netbook}px`,
    laptop: `${breakpoints.laptop}px`,
    pc: `${breakpoints.pc}px`
  }
});