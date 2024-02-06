/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa";

export default function TrackCard({ track, setTrackIndex, index }) {
  return (
    <div className="bg-neutral-800 text-white rounded-md p-4 max-w-60 cursor-pointer hover:bg-neutral-600 duration-150 group" onClick={()=>setTrackIndex(index)}>
      <div className="relative w-52 h-52">
        <Image
          src={track.cover}
          blurDataURL={track.cover}
          alt="not found"
          fill
          placeholder="blur"
          className="rounded-md object-cover w-full h-full group-hover:brightness-50 duration-75"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 items-center justify-center rounded-full p-3 hidden group-hover:flex">
          <FaPlay size={25} className="relative left-[1.5px]"/>
        </div>
      </div>
      <h4 className="font-semibold text-center mt-2">{track?.title}</h4>
    </div>
  );
}
