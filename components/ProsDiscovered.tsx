"use client";
import Hero from "./Hero";
import { HEADLINE_BOX, HERO_HEADLINE } from "./headlineType";
import { getAssetPath } from "@/utils/path";

/** Background clip for the "Where Real Estate Pros Get Discovered" slide,
 *  and its centre for phones held upright. */
const PROS_DISCOVERED_VIDEO = "/videos/pros-discovered-v2.mp4";
const PROS_DISCOVERED_NARROW = "/videos/pros-discovered-v2-narrow.mp4";

/** Same layout as "Built for everyone" (Ivy batch 4). Desktop type follows
 *  the viewport height as well as its width (min(vw, vh)), so the whole
 *  block fits the h-screen stage on short laptop screens. */
export default function ProsDiscovered() {
  return (
    <Hero
      items={[
        {
          src: getAssetPath(PROS_DISCOVERED_VIDEO),
          narrowSrc: getAssetPath(PROS_DISCOVERED_NARROW),
          // Bright kitchen footage: a darker scrim keeps the copy readable.
          scrimClassName: "bg-black/[0.68]",
          text: (
            <div className={`${HEADLINE_BOX} translate-y-[2.5rem] max-[340px]:translate-y-0 lg:translate-y-[3rem]`}>
              <h2 className={`${HERO_HEADLINE} max-[340px]:text-[2rem] lg:text-[clamp(2.5rem,min(6vw,9vh),5.5rem)]`}>
                Where Real Estate Pros Get Discovered
              </h2>
              <div className="mx-auto mt-[3em] max-[340px]:mt-[1.75em] lg:mt-[2.5em] max-w-[52rem] lg:max-w-[76rem] text-[clamp(1.0625rem,1.8vw,1.625rem)] max-[340px]:text-[0.9375rem] lg:text-[clamp(1.125rem,min(2.5vw,3.6vh),2.375rem)] font-normal leading-[1.5] max-[340px]:leading-[1.4] text-white drop-shadow-md">
                <h3 className="text-[1.2em] font-bold leading-[1.3]">For Agents</h3>
                <p className="mt-[0.4em]">
                  {/* Three lines (Ivy). */}
                  <span className="block">
                    Show homes live and connect in real time, anywhere.
                  </span>
                  <span className="block">
                    Build a video profile, get direct requests, right when it
                    matters.
                  </span>
                  <span className="block">Easier for both sides.</span>
                </p>
                <h3 className="mt-[1.5em] max-[340px]:mt-[1em] text-[1.2em] font-bold leading-[1.3]">
                  More Pros, Coming Soon
                </h3>
                <p className="mt-[0.4em]">
                  {/* Three lines (Ivy). */}
                  <span className="block">
                    Lenders, builders, contractors, and more are on the way.
                  </span>
                  <span className="block">
                    From financing to renovation, everything a real estate
                    journey needs,
                  </span>
                  <span className="block">in one place.</span>
                </p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
