"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import Image from "next/image";

export function WhyChooseGigBook() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-2 lg:grid-cols-3">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-primary min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h3 className="text-foreground heading mb-3 text-2xl font-bold">Discover Talent</h3>
          <p className="mt-4 text-left text-base text-neutral-200">
            Browse through a diverse collection of talented artists, from DJs to live performers.
          </p>
        </div>
        <Image
          src="/images/image9.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute right-0 bottom-0 left-0 h-1/2 w-full object-cover lg:inset-x-auto lg:right-0 lg:h-full lg:w-1/2"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gray-800">
        <h3 className="heading mb-3 text-2xl font-bold text-black">Easy Booking</h3>
        <p className="mt-4 max-w-[26rem] text-left text-base text-neutral-200">
          Send booking requests with just a few clicks and manage everything in one place.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 group  lg:col-span-3 bg-black min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h3 className="text-foreground heading mb-3 text-2xl font-bold">Build Connections</h3>
          <p className="mt-4 max-w-[26rem] text-left text-base text-neutral-200">
            Connect venues with artists to create memorable events and lasting partnerships.
          </p>
        </div>
        <Image
          src="/images/image6.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="group absolute right-0 bottom-0 left-0 h-1/2 w-full object-cover lg:inset-x-auto lg:right-0 lg:h-full lg:w-1/2"
        />
      </WobbleCard>
    </div>
  );
}
