"use client";
import AudioPlayerMob from "@/components/AudioPlayerMob";
import AudioPlayer from "@/components/AudioPlayer";
import TrackCard from "@/components/TrackCard";
import { tracks } from "@/data/songs";
import React, { Suspense } from "react";
import Loading from "./Loading";
import Image from "next/image";

export default function Home() {
  const [trackIndex, setTrackIndex] = React.useState(0);
  
  return (
    <main className=" bg-[#151515] text-white min-h-screen pb-40 p-10">
      <header className="">
        <h1 className="md:text-[8vw] text-[5rem]">AK_47</h1>
      </header>
      <section>
        <h3 className="text-2xl flex items-center justify-start gap-2">
          <div className="text-base bg-neutral-800 px-3 rounded-2xl">20</div>
          My Tracks{" "}
          <a href="https://www.instagram.com/_.axxhu47?igsh=MThwb2t4ZWJvZG9kOA==" className="cursor-pointer hover:scale-110 duration-300 ml-8" target="_blank">
            <Image
              src={"/instalogo.webp"}
              height={25}
              width={25}
              alt="not found"
            />
          </a>
        </h3>
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
        <Suspense fallback={<Loading />}>
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
    </main>
  );
}
