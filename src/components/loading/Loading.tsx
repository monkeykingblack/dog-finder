import type { VariantProps } from "tailwind-variants";

import { useEffect, useRef } from "react";

import { Player } from "@lordicon/react";

import { tv } from "../../utils/tv";
import Spin from "./spin.json";

const loadingVariant = tv({
  base: "",
  variants: {
    size: {
      sm: "",
      base: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type LoadingProps = VariantProps<typeof loadingVariant>;

const Loading = ({ size }: LoadingProps) => {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return (
    <div className={loadingVariant({ size })}>
      <Player
        ref={playerRef}
        icon={Spin}
        onComplete={() => playerRef.current?.playFromBeginning()}
      />
    </div>
  );
};

export default Loading;
