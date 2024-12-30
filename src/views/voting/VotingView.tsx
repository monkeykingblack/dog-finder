import type { Element as LordIconElement } from "@lordicon/element";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { animated, useSpring } from "@react-spring/web";

import { getBreedImages } from "../../api/getBreedImages";
import { voteImage } from "../../api/voteImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/card/Card";
import useRequest from "../../hooks/useRequest";
import useSwipe, { SwipeEvent } from "../../hooks/useSwipe";
import { cn } from "../../utils";
import { LoveHeart, ThumbDown, ThumbUp } from "./icons";

export const VotingView = () => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const [behaviorIcon, setBehaviorIcon] = useState<string | null>(null);
  const behaviorIconRef = useRef<LordIconElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    data,
    loading: isFetching,
    refetch,
  } = useRequest(getBreedImages, {
    defaultArgs: [
      {
        limit: 1,
        hasBreeds: true,
        mimeTypes: "jpg",
        order: "RANDOM",
        size: "small",
      },
    ],
  });

  const { run: onVote, loading: isVoting } = useRequest(
    async (vote: number, icon: string) => {
      if (!data) {
        return;
      }
      setBehaviorIcon(icon);
      await voteImage({ imageId: data[0].id, value: vote });
      refetch();
    },
    {
      immediate: false,
    },
  );

  useEffect(() => {
    const behaviorIcon = behaviorIconRef.current!;
    const onReady = () => {
      behaviorIcon.playerInstance?.addEventListener("complete", hideIcon);
      behaviorIcon.playerInstance?.playFromBeginning();
    };

    const hideIcon = () => {
      setBehaviorIcon(null);
      behaviorIcon.playerInstance?.removeEventListener("complete", hideIcon);
    };

    behaviorIcon.addEventListener("ready", onReady);
    return () => {
      behaviorIcon.removeEventListener("ready", onReady);
    };
  }, []);

  const onDislike = useCallback(() => {
    onVote(-1, ThumbDown);
  }, []);

  const onLike = useCallback(() => {
    onVote(1, ThumbUp);
  }, []);

  const onSuperLike = useCallback(() => {
    onVote(2, LoveHeart);
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
    } else if (y < 0) {
      api.start({ y });
    }
  }, []);

  const bind = useSwipe(
    {
      onLeft: onDislike,
      onRight: onLike,
      onUp: onSuperLike,
      onDrag,
    },
    (cardRef.current?.clientWidth || 0) / 3,
  );

  const disabledEvent = useMemo(
    () => isFetching || isVoting,
    [isFetching, isVoting],
  );

  return (
    <div className="flex-1 overflow-hidden p-4 sm:p-6">
      <div className="mx-auto max-w-md">
        <animated.div
          ref={cardRef}
          {...bind()}
          style={{
            x,
            y,
            touchAction: "pan-y",
            pointerEvents: disabledEvent ? "none" : undefined,
          }}
        >
          <Card className="relative overflow-hidden shadow-xl">
            <CardHeader className="relative h-[300px] w-full space-y-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${data?.[0].url})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/15 p-4">
                <div className="text-white">
                  <CardTitle className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
                    {data?.[0].breeds[0].name}
                  </CardTitle>
                  <CardDescription className="text-base opacity-90 sm:text-lg">
                    {data?.[0].breeds[0].for}
                  </CardDescription>
                </div>
              </div>

              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white/55",
                  { hidden: behaviorIcon === null },
                )}
              >
                <div className="inline-flex">
                  <lord-icon
                    ref={behaviorIconRef}
                    src={behaviorIcon}
                    trigger="loop"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="bg-white p-4">
              <div className="flex justify-between">
                <button disabled={disabledEvent} onClick={onDislike}>
                  <lord-icon src={ThumbDown} />
                </button>
                <div className="flex space-x-4">
                  <button disabled={disabledEvent} onClick={onSuperLike}>
                    <lord-icon src={LoveHeart} />
                  </button>
                  <button disabled={disabledEvent} onClick={onLike}>
                    <lord-icon src={ThumbUp} />
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
