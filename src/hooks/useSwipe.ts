import type { Handler } from "@use-gesture/react";

import { useDrag } from "@use-gesture/react";

export type SwipeEvent = Parameters<Handler<"drag">>[0];
export type SwipeCallback = (e: SwipeEvent) => void;

export default function useSwipe(
  actions?: {
    onUp?: VoidFunction;
    onDown?: VoidFunction;
    onLeft?: VoidFunction;
    onRight?: VoidFunction;
    onDrag?: SwipeCallback;
  },
  threshold = 0.3,
) {
  const bind = useDrag((event) => {
    const {
      last,
      offset: [vx, vy],
    } = event;
    const { onDrag, onDown, onLeft, onRight, onUp } = actions || {};

    if (onDrag) {
      onDrag(event);
    }

    if (!last) {
      return;
    }

    if (Math.abs(vx) > Math.abs(vy)) {
      if (onLeft && vx < -threshold) {
        onLeft();
      } else if (onRight && vx > threshold) {
        onRight();
      }
    } else {
      if (onUp && vy < -threshold) {
        onUp();
      } else if (onDown && vy > threshold) {
        onDown();
      }
    }
  });

  return bind;
}
