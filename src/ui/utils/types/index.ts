import type {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface TopToolbarProps {
  visible: boolean;
  headerVisible: boolean;
}