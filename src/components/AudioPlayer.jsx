/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import { HiSpeakerWave } from "react-icons/hi2";
import { BiSolidVolumeMute } from "react-icons/bi";

const TrackInfo = ({ cover, title }) => (
  <div className="flex gap-4 items-center w-48">
    <img src={cover} alt="Album Cover" className="h-16 w-16 rounded-lg" />
    <div className="text-md">{title}</div>
  </div>
);

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes || "00"}:${formattedSeconds || '00'}`;
};

export default function AudioPlayer({ tracks, trackIndex, setTrackIndex }) {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef( typeof Audio !== "undefined" ? new Audio() : null);
  const intervalRef = useRef();
  const isReady = useRef(false);

  const currentTrack = tracks[trackIndex];
  const { audioSrc, cover, title } = currentTrack;
  const { duration } = audioRef?.current || "";

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    setTrackIndex((prevIndex) =>
      prevIndex - 1 < 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  const toNextTrack = () => {
    setTrackIndex((prevIndex) =>
      prevIndex < tracks.length - 1 ? prevIndex + 1 : 0
    );
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    if (isMuted) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
    }
  }, [isMuted]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current && isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex, audioSrc]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-between">
      <TrackInfo cover={cover} title={title} />
      <div className="w-1/2">
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <div className="flex items-center justify-center gap-2">
          <span>{formatDuration(Math.round(trackProgress))}</span>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration || 0}
            className="w-full cursor-pointer duration-75 h-[3px] bg-green-500 rounded-2xl"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
          <span>{formatDuration(Math.round(duration)) || "00:00"}</span>
        </div>
      </div>
      <div className="w-40 flex items-center justify-end">
        {isMuted ? (
          <BiSolidVolumeMute
            size={20}
            onClick={() => setIsMuted(false)}
            className="cursor-pointer"
          />
        ) : (
          <HiSpeakerWave
            size={20}
            onClick={() => setIsMuted(true)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
