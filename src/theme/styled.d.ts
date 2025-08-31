import 'styled-components';
import { theme } from './index';

type ThemeConfig = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfig {}
}