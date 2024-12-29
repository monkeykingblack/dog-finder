import { useCallback } from "react";

import { Player } from "@lordicon/react";
import { animated, useSpring } from "@react-spring/web";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/card/Card";
import useSwipe, { SwipeEvent } from "../../hooks/useSwipe";
import { LoveHeart, ThumbDown, ThumbUp } from "./icons";

export const VotingView = () => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const onSwipeLeft = useCallback(() => {
    console.log("left");
  }, []);

  const onSwipeRight = useCallback(() => {
    console.log("right");
  }, []);

  const onDrag = useCallback((e: SwipeEvent) => {
    const {
      movement: [x, y],
      axis,
      active,
    } = e;

    if (!active) {
      api.start({ x: 0, y: 0 });
      return;
    }

    if (axis === "x") {
      api.start({ x });
    } else {
      api.start({ y });
    }
  }, []);

  const bind = useSwipe({
    onLeft: onSwipeLeft,
    onRight: onSwipeRight,
    onDrag,
  });

  return (
    <div className="p-4 sm:p-6 overflow-hidden">
      <div className="max-w-md mx-auto">
        <animated.div {...bind()} style={{ x, y }}>
          <Card className="relative overflow-hidden shadow-xl">
            <CardHeader className="relative w-full h-[300px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://api.thedogapi.com/v1/images/search?size=small&mime_types=jpg&format=src&has_breeds=true&order=RANDOM&page=0&limit=1)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-white/15">
                <div className="text-white">
                  <CardTitle className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                    Bengal
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg opacity-90">
                    Feed
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="bg-white p-4">
              <div className="flex justify-between">
                <button>
                  <Player icon={ThumbDown} size={32} />
                </button>
                <div className="flex space-x-4">
                  <button>
                    <Player icon={LoveHeart} size={32} />
                  </button>
                  <button>
                    <Player icon={ThumbUp} size={32} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </animated.div>
      </div>
    </div>
  );
};
