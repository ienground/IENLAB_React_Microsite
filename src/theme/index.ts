import { createStyledBreakpointsTheme } from 'styled-breakpoints';

export const breakpoints = {
  small_mobile: 425,
  mobile: 540,
  tablet: 768,
  netbook: 1024,
  laptop: 1280,
  pc: 1440
};

export const screen = createStyledBreakpointsTheme({
  breakpoints: {
    min: `100px`,
    small_mobile: `${breakpoints.small_mobile}px`,
    mobile: `${breakpoints.mobile}px`,
    tablet: `${breakpoints.tablet}px`,
    netbook: `${breakpoints.netbook}px`,
    laptop: `${breakpoints.laptop}px`,
    pc: `${breakpoints.pc}px`
  }
});