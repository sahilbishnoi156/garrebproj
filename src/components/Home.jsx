"use client";
import AudioPlayerMob from "@/components/AudioPlayerMob";
import AudioPlayer from "@/components/AudioPlayer";
import TrackCard from "@/components/TrackCard";
import { tracks } from "@/data/songs";
import React, { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  const [trackIndex, setTrackIndex] = React.useState(0);

  return (
    <div className=" bg-[#151515] text-white min-h-screen pb-40 p-10">
      <h1 className="text-[7vw] md:text-6xl">AK_47</h1>
      <section>
        <h3 className="text-2xl">My Tracks</h3>
        <div className="mt-4 flex gap-8 flex-wrap justify-center sm:justify-start">
          {tracks?.map((track, index) => {
            return (
              <TrackCard
                track={track}
                key={index}
                index={index}
                setTrackIndex={setTrackIndex}
              />
            );
          })}
        </div>
      </section>
      <div></div>
      <footer className="fixed bottom-0 left-0 bg-black w-full p-4 px-6 rounded-t-2xl">
        <Suspense fallback={<Loading/>}>
          <AudioPlayerMob
            tracks={tracks}
            setTrackIndex={setTrackIndex}
            trackIndex={trackIndex}
          />
          <AudioPlayer
            tracks={tracks}
            setTrackIndex={setTrackIndex}
            trackIndex={trackIndex}
          />
        </Suspense>
      </footer>
    </div>
  );
}
