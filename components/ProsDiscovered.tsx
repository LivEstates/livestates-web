"use client";
import Hero, { HERO_HEADLINE } from "./Hero";
import { getAssetPath } from "@/utils/path";

/**
 * Background clip for the "Where Real Estate Pros Get Discovered" slide.
 * Waiting on Ivy's footage; while "" it shows the same dark placeholder.
 * To swap in: put the file in public/videos/ and set e.g.
 *   const PROS_DISCOVERED_VIDEO = "/videos/pros-discovered-v2.mp4";
 */
const PROS_DISCOVERED_VIDEO = "/videos/pros-discovered-v2.mp4";

/** Same layout as "Built for everyone" (Ivy batch 4). */
export default function ProsDiscovered() {
  return (
    <Hero
      items={[
        {
          src: PROS_DISCOVERED_VIDEO ? getAssetPath(PROS_DISCOVERED_VIDEO) : "",
          // Bright kitchen footage: a darker scrim keeps the copy readable.
          scrimClassName: "bg-black/[0.68]",
          text: (
            <div className="max-w-[min(94vw,1440px)] px-4 text-center translate-y-[2.5rem] lg:translate-y-[3rem]">
              <h2 className={`${HERO_HEADLINE} lg:text-[clamp(2.5rem,6vw,5.5rem)]`}>
                Where Real Estate Pros Get Discovered
              </h2>
              <div className="mx-auto mt-[1.5em] lg:mt-[2.5em] max-w-[52rem] lg:max-w-[64rem] text-[clamp(1.0625rem,1.8vw,1.625rem)] lg:text-[clamp(1.5rem,2.5vw,2.375rem)] font-normal leading-[1.5] text-white drop-shadow-md">
                <h3 className="text-[1.2em] font-bold leading-[1.3]">For Agents</h3>
                <p className="mt-[0.4em]">
                  Show homes live, anywhere, answer questions in real time.
                  Build a video profile that makes a first impression before
                  you ever meet. Get direct requests, right when it matters.
                  Easier for both sides.
                </p>
                <h3 className="mt-[1.5em] text-[1.2em] font-bold leading-[1.3]">
                  More Pros, Coming Soon
                </h3>
                <p className="mt-[0.4em]">
                  Lenders, builders, contractors, and more are joining
                  LivEstates. From financing to renovation, everything a real
                  estate journey needs, in one place.
                </p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
