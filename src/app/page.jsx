'use client'
import AudioPlayer from "@/components/AudioPlayer";
import TrackCard from "@/components/TrackCard";
import { tracks } from "@/data/songs";
import React from "react";

export default function Page() {
  const [trackIndex, setTrackIndex] = React.useState(0);

  return (
    <div className="p-16 bg-[#151515] text-white min-h-screen pb-40">
      <h1 className="text-[7vw]">AK_47</h1>
      <section>
        <h3 className="text-2xl">My Tracks</h3>
        <div className="mt-4 flex gap-8 flex-wrap">
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
        <AudioPlayer tracks={tracks} setTrackIndex={setTrackIndex} trackIndex={trackIndex} />
      </footer>
    </div>
  );
}
