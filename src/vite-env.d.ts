/// <reference types="vite/client" />

import type { Element as LordIconElement } from "@lordicon/element";

export type LordIconElementProps = Partial<
  Pick<LordIconElement, "colors" | "stroke" | "target" | "state" | "loading">
> & {
  src: string | null;
  trigger?:
    | "in"
    | "click"
    | "hover"
    | "loop"
    | "loop-on-hover"
    | "morph"
    | "boomerang"
    | "sequence";
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<
        LordIconElementProps & React.HTMLAttributes<LordIconElement>,
        LordIconElement
      >;
    }
  }
}
