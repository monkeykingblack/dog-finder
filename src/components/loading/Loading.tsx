import type { VariantProps } from "tailwind-variants";

import { tv } from "../../utils";
import Spin from "./spin.json?url";

const loadingVariant = tv({
  base: "",
  variants: {
    size: {
      sm: "h-4 w-4",
      base: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type LoadingProps = VariantProps<typeof loadingVariant>;

const Loading = ({ size }: LoadingProps) => {
  return (
    <div className={loadingVariant({ size })}>
      <lord-icon
        src={Spin}
        trigger="loop"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Loading;
