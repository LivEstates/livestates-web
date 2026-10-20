"use client";
import Hero from "./Hero";
import { HEADLINE_BOX, HERO_HEADLINE } from "./headlineType";
import { getAssetPath } from "@/utils/path";

/** Background clip for the "Built for everyone" slide. */
const BUILT_FOR_EVERYONE_VIDEO = "/videos/built-for-everyone.mp4";

/** Same full-bleed structure as the "More ways to see" slide: sticky
 *  background clip, dark scrim, overlay copy in the same headline type.
 *  Desktop type follows the viewport height as well as its width, so the
 *  copy fits the h-screen stage on short laptop screens. */
export default function BuiltForEveryone() {
  return (
    <Hero
      items={[
        {
          src: getAssetPath(BUILT_FOR_EVERYONE_VIDEO),
          // Bright aerial footage: a darker scrim keeps the copy readable.
          scrimClassName: "bg-black/60",
          text: (
            <div className={`${HEADLINE_BOX} lg:translate-y-[3.5rem]`}>
              <h2 className={`${HERO_HEADLINE} lg:text-[clamp(2.5rem,min(6vw,9vh),5.5rem)]`}>
                Built for everyone in the real estate journey.
              </h2>
              {/* One blank line under the headline and between the two
                  paragraphs, per Ivy's layout. */}
              <div className="mx-auto mt-[3em] lg:mt-[3em] max-w-[52rem] lg:max-w-[64rem] text-[1.25rem] lg:text-[clamp(1.125rem,min(2.5vw,3.6vh),2.375rem)] font-normal leading-[1.5] text-white drop-shadow-md">
                <p>
                  <strong className="font-bold">Buyers and renters</strong> can
                  see homes from anywhere, no appointments, no wasted trips.
                </p>
                <p className="mt-[3em] lg:mt-[3em]">
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
