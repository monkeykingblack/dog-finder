import React, { useCallback, useMemo, useRef, useState } from "react";

import { Player } from "@lordicon/react";

import { getBreedImages } from "../../api/getBreedImages";
import { voteImage } from "../../api/voteImage";
import useRequest from "../../hooks/useRequest";
import useSwipe from "../../hooks/useSwipe";
import { cn } from "../../utils/cn";
import Loading from "../loading/Loading";
import { CardInfo } from "./CardInfo";
import LoveHeart from "./love-heart.json";
import ThumbDown from "./thumb-down.json";
import ThumbUp from "./thumb-up.json";

const Card = ({ className }: { className?: string }) => {
  const thumbUpRef = useRef<Player>(null);
  const thumbDownRef = useRef<Player>(null);
  const loveHeartRef = useRef<Player>(null);
  const [isExpand, setExpand] = useState(false);

  const {
    data: res,
    refetch,
    loading,
  } = useRequest(getBreedImages, {
    immediate: true,
    defaultArgs: [
      {
        format: "json",
        hasBreeds: true,
        size: "small",
      },
    ],
  });

  const data = useMemo(() => {
    const imageInfo = res?.data?.[0];
    if (imageInfo) {
      return {
        id: res?.data?.[0].id,
        image: res?.data?.[0].url,
        name: res?.data?.[0].breeds?.[0].name,
        for: res?.data?.[0].breeds?.[0].bredFor,
        weight: res?.data?.[0].breeds?.[0].weight.imperial,
        height: res?.data?.[0].breeds?.[0].height.imperial,
        breedGroup: res?.data?.[0].breeds?.[0].breedGroup,
        temperament: res?.data?.[0].breeds?.[0].temperament,
        lifeSpan: res?.data?.[0].breeds?.[0].lifeSpan,
      };
    }
  }, [res]);

  const onReact = useCallback(
    (value: number, player: Player | null) => {
      if (data?.id) {
        voteImage({
          imageId: data.id,
          value,
        });
        refetch();
        player?.playFromBeginning();
      }
    },
    [data?.id, refetch],
  );

  const onSuperLike = () => onReact(2, loveHeartRef.current);
  const onLike = () => onReact(1, thumbUpRef.current);
  const onDislike = () => onReact(-1, thumbDownRef.current);

  const handleSwipe = useSwipe({
    onRight: onLike,
    onLeft: onDislike,
    onUp: onSuperLike,
  });

  return (
    <div
      data-testid="card-container"
      className={cn("md:rounded-xl md:shadow overflow-hidden", className)}
      {...handleSwipe()}
    >
      <div
        className="relative w-full h-[450px] bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage: `url(${data?.image})`,
        }}
      >
        {loading && (
          <div
            data-testid="loading"
            className="relative w-full h-full bg-white/40"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loading size="sm" />
            </div>
          </div>
        )}
        <div
          className={cn(
            "absolute bottom-0 bg-white/70 w-full text-left px-8 md:px-4 py-4 border",
            {
              "top-0 mb-0": isExpand,
            },
          )}
        >
          {data ? (
            !isExpand ? (
              <React.Fragment>
                <CardInfo label={data.name} description={data.for} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <CardInfo label="Bread Name" description={data.name} />
                <CardInfo label="Bread For" description={data.for} />
                <CardInfo
                  label="Weight & Height"
                  description={`${data.weight} kg - ${data.height} cm`}
                />
                <CardInfo label="Breed Group" description={data.breedGroup} />
                <CardInfo label="Temperament" description={data.temperament} />
                <CardInfo label="Life Span" description={data.lifeSpan} />
              </React.Fragment>
            )
          ) : null}
          <a
            className="text-sm underline cursor-pointer"
            onClick={() => setExpand(!isExpand)}
          >
            {isExpand ? "[Show less]" : "[Show more]"}
          </a>
        </div>
      </div>

      <div className="px-8 py-4 md:px-4 flex flex-row-reverse justify-between">
        <div className="flex gap-x-4">
          <button onClick={() => onSuperLike()}>
            <Player ref={loveHeartRef} icon={LoveHeart} />
          </button>
          <button onClick={() => onLike()}>
            <Player ref={thumbUpRef} icon={ThumbUp} />
          </button>
        </div>
        <button onClick={() => onDislike()}>
          <Player ref={thumbDownRef} icon={ThumbDown} />
        </button>
      </div>
    </div>
  );
};

export default Card;
