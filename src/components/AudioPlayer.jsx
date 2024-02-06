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
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes || "00"}:${formattedSeconds || "00"}`;
};

export default function AudioPlayerMob({ tracks, trackIndex, setTrackIndex }) {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(typeof Audio !== "undefined" ? new Audio() : null);
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
    setIsLoading(true)
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
    setIsLoading(false)
  }, [isPlaying]);

  useEffect(() => {
    const loadAudio = async () => {
      setIsLoading(true);
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
      await audioRef.current.load(); // This line ensures that the audio is loaded
      setTrackProgress(audioRef.current.currentTime);

      if (isReady.current) {
        await audioRef.current.play();
        setIsPlaying(true);
        startTimer();
      } else {
        isReady.current = true;
      }
      setIsLoading(false);
    };

    loadAudio();
  }, [trackIndex, audioSrc]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 32) {
        event.preventDefault();
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      }else if (event.keyCode === 179) {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      }else if(event.keyCode === 176){
        toNextTrack();
      }else if(event.keyCode === 177){
        toPrevTrack();
      }else if(event.keyCode === 77){
        setIsMuted((prevIsMuted) => !prevIsMuted);
      }else if(event.keyCode === 37){
        onScrub(audioRef.current.currentTime - 10)
        startTimer();
      }else if(event.keyCode === 39){
        onScrub(audioRef.current.currentTime + 10)
        startTimer();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying]);

  return (
    <div className="lg:flex items-center justify-between hidden">
      <TrackInfo cover={cover} title={title} />
      <div className="w-1/2">
        {isLoading ? (
          <div role="status" className="flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        ) : (
          <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
        )}

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
