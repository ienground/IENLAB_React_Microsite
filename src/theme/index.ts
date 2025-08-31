import { createStyledBreakpointsTheme } from 'styled-breakpoints';

export const theme = createStyledBreakpointsTheme({
  breakpoints: {
    mobile: '500px',
    tablet: '768px',
    netbook: '1024px',
    laptop: '1280px',
    pc: '1440px'
  },
});