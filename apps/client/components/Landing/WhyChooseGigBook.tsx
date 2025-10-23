"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import Image from "next/image";

export function WhyChooseGigBook() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-primary min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h3 className="text-2xl font-bold text-foreground mb-3 heading">Discover Talent</h3>
          <p className="mt-4 text-left  text-base text-neutral-200">
            Browse through a diverse collection of talented artists, from DJs to live performers.
          </p>
        </div>
        <Image
          src="/images/image9.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute left-0 right-0 bottom-0 lg:inset-x-auto lg:right-0 object-cover w-full h-1/2 lg:w-1/2 lg:h-full"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gray-800">
        <h3 className="text-2xl font-bold text-black mb-3 heading">Easy Booking</h3>
        <p className="mt-4 max-w-[26rem] text-left  text-base text-neutral-200">
          Send booking requests with just a few clicks and manage everything in one place.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 group  lg:col-span-3 bg-black min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h3 className="text-2xl font-bold text-foreground mb-3 heading">Build Connections</h3>
          <p className="mt-4 max-w-[26rem] text-left  text-base text-neutral-200">
            Connect venues with artists to create memorable events and lasting partnerships.
          </p>
        </div>
        <Image
          src="/images/image6.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute left-0 right-0 group bottom-0 lg:inset-x-auto lg:right-0 object-cover  w-full h-1/2 lg:w-1/2 lg:h-full"
        />
      </WobbleCard>
    </div>
  );
}

