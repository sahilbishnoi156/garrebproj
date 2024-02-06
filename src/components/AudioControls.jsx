import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { TbPlayerTrackNext } from "react-icons/tb";
import { TbPlayerTrackPrev } from "react-icons/tb";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => (
  <div className="flex items-center justify-center gap-8 text-2xl">
    <button
      type="button"
      className=""
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <TbPlayerTrackPrev />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className=""
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <FaCirclePause size={40} />
      </button>
    ) : (
      <button
        type="button"
        className=""
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <FaCirclePlay size={40} />
      </button>
    )}

    <button type="button" className="" aria-label="Next" onClick={onNextClick}>
      <TbPlayerTrackNext />
    </button>
  </div>
);

export default AudioControls;
