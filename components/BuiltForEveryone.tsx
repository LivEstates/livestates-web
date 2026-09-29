"use client";
import Hero, { HERO_HEADLINE } from "./Hero";
import { getAssetPath } from "@/utils/path";

/**
 * Background clip for the "Built for everyone" slide.
 * Still waiting on Ivy's footage — while this is "" the slide shows a neutral
 * dark placeholder under the same scrim as "More ways to see".
 * To swap it in: drop the file in public/videos/ and set, e.g.
 *   const BUILT_FOR_EVERYONE_VIDEO = "/videos/built-for-everyone.mp4";
 */
const BUILT_FOR_EVERYONE_VIDEO = "";

/** Same full-bleed structure as the "More ways to see" slide: sticky
 *  background clip, dark scrim, overlay copy in the same headline type. */
export default function BuiltForEveryone() {
  return (
    <Hero
      items={[
        {
          src: BUILT_FOR_EVERYONE_VIDEO
            ? getAssetPath(BUILT_FOR_EVERYONE_VIDEO)
            : "",
          text: (
            <div className="max-w-[min(94vw,1440px)] px-4 text-center">
              <h2 className={`${HERO_HEADLINE} lg:text-[clamp(3rem,6.8vw,7.25rem)]`}>
                Built for everyone in the real estate journey.
              </h2>
              {/* One blank line under the headline and between the two
                  paragraphs, per Ivy's layout. */}
              <div className="mx-auto mt-[1.5em] lg:mt-[3em] max-w-[52rem] lg:max-w-[64rem] text-[clamp(1.0625rem,1.8vw,1.625rem)] lg:text-[clamp(1.5rem,2.5vw,2.375rem)] font-normal leading-[1.5] text-white drop-shadow-md">
                <p>
                  <strong className="font-bold">Buyers and renters</strong> can
                  see homes from anywhere, no appointments, no wasted trips.
                </p>
                <p className="mt-[1.5em] lg:mt-[3em]">
                  <strong className="font-bold">Sellers</strong> get more eyes
                  on their home and see how the market really responds,
                  directly and transparently.
                </p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
