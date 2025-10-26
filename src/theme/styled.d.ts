import 'styled-components';
import { screen } from './index';

type ThemeConfig = typeof screen;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfig {}
}