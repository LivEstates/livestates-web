import Hero from "@/components/Hero";
import StickyFeatureGallery from "@/components/StickyFeatureGallery";
import HighlightSection from "@/components/HighlightSection";
import FeatureGrid from "@/components/FeatureGrid";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import BuiltForEveryone from "@/components/BuiltForEveryone";
import ProsDiscovered from "@/components/ProsDiscovered";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import { MockChat } from "@/components/Phone";
import AnimatedTitle from "@/components/AnimatedTitle";
import { getAssetPath } from "@/utils/path";
import {
  HEADLINE_BOX,
  HERO_HEADLINE,
  INTRO_HEADLINE_FIT,
} from "@/components/headlineType";

export default function Page() {
  return (
    // overflow-x-clip is only a backstop: every section already fits the
    // viewport on its own, this just stops a future slip from making the
    // whole page swipe sideways on phones.
    <main className="overflow-x-clip">
      <Hero
        variant="intro"
        items={[
          {
            // Agent broadcasting -> the tile carries the feed she is sending.
            src: getAssetPath("/videos/01.mp4"),
            text: "See\nFeel\nConnect\nLivE Your Way Home",
            previewSrc: getAssetPath("/videos/first-female-agent.mp4"),
          },
          {
            // "Every corner" -> the tile carries a second angle on the property
            // rather than a person, so the pair reads as two viewpoints at once.
            // Reversed so it pushes in where slide one's tile pulls back, which
            // keeps the two tiles distinct without needing another shoot.
            src: getAssetPath("/videos/02.mp4"),
            text: (
              // Mobile only: each phrase on one line (font scales with width) and a
              // blank line between lines (Ivy); desktop matches slide 1.
              <h2 className={`${HEADLINE_BOX} ${INTRO_HEADLINE_FIT}`}>
                <span className="block whitespace-nowrap text-[1.45em] lg:text-[1em] lg:whitespace-normal">LivE</span>
                <span aria-hidden className="block lg:hidden">&nbsp;</span>
                <span className="block whitespace-nowrap lg:whitespace-normal">Explore Every Corner</span>
                <span aria-hidden className="block lg:hidden">&nbsp;</span>
                <span className="block whitespace-nowrap lg:whitespace-normal">Detailed and Interactive</span>
              </h2>
            ),
            previewSrc: getAssetPath("/videos/first-female-agent-reverse.mp4"),
          },
          {
            // Someone watching -> the tile carries what is on her phone.
            src: getAssetPath("/videos/03.mp4"),
            text: (
              // Mobile only: each phrase on one line (font scales with width) and a
              // blank line between lines (Ivy); desktop matches slide 1.
              <h2 className={`${HEADLINE_BOX} ${INTRO_HEADLINE_FIT}`}>
                <span className="block whitespace-nowrap text-[1.45em] lg:text-[1em] lg:whitespace-normal">LivE</span>
                <span aria-hidden className="block lg:hidden">&nbsp;</span>
                <span className="block whitespace-nowrap text-[1.2em] lg:text-[1em] lg:whitespace-normal">Anytime You Want</span>
                <span aria-hidden className="block lg:hidden">&nbsp;</span>
                <span className="block whitespace-nowrap text-[1.2em] lg:text-[1em] lg:whitespace-normal">Anywhere You Are</span>
              </h2>
            ),
            portraitSrc: getAssetPath("/videos/user-watch.mp4"),
            previewSrc: getAssetPath("/videos/user-watch.mp4"),
          },
        ]}
      />

      <AnimatedTitle>Meet LivEstates</AnimatedTitle>
      <StickyFeatureGallery
        id="features"
        description={"Meet LivE, Your\nVirtual Home Agent"}
        measureClassName="max-w-full"
      >
        {/* Ivy (10/15): real app live-showing screen recording (7.13s), used as-is. */}
        <video
          src={getAssetPath("/videos/live-showing-app-v2.mp4")}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full bg-black object-cover object-top"
        />
      </StickyFeatureGallery>

      {/* Page 5: new download pitch (Ivy batch 3); the closing Download
          page below is unchanged. */}
      <GetStarted />
      <BuiltForEveryone />
      <ProsDiscovered />

      <AnimatedTitle>LivEstates AI, Coming Soon</AnimatedTitle>
      <StickyFeatureGallery
        textSizeClassName="text-[clamp(2.25rem,5.6vw,5.25rem)]"
        measureClassName="max-w-full"
        description={
          <>
            <span className="block whitespace-nowrap lg:whitespace-normal">AI-Powered</span>
            <span className="block whitespace-nowrap lg:whitespace-normal">Chat Instantly</span>
            {/* Desktop: "Real Estate, Made Simple" on one line. Mobile (Ivy): blank
                line above, no comma, "Made Simple" on its own line. */}
            <span aria-hidden className="block lg:hidden">&nbsp;</span>
            <span className="block lg:whitespace-normal">
              <span className="block whitespace-nowrap lg:inline">Real Estate<span className="hidden lg:inline">,</span></span>
              <span className="hidden lg:inline"> </span>
              <span className="block whitespace-nowrap lg:inline">Made Simple</span>
            </span>
          </>
        }
      >
        <MockChat
          title="LivEstates AI"
          theme="violet-light"
          messages={[
            {
              id: "1",
              role: "assistant",
              text: "Hi there! I'm LivEstates AI. I can help you find properties, answer questions, or connect you with an agent. What can I help you with today?",
              quickReplies: [
                "Find a property",
                "Ask about a listing",
                "Connect with agent",
                "Schedule a tour",
              ],
            },
            {
              id: "2",
              role: "user",
              text: "Find a property",
            },
            {
              id: "3",
              role: "assistant",
              text: "Sure thing, let's get started! What kind of property are you looking for, and what's your budget?",
            },
            {
              id: "4",
              role: "user",
              text: "3-bed under 1.5M, good school district, within 20 miles of downtown",
            },
          ]}
        />
      </StickyFeatureGallery>
      <StickyFeatureGallery
        textSizeClassName="text-[min(10vw,2.5rem)] lg:text-[clamp(2.75rem,5.3vw,5.25rem)]"
        measureClassName="max-w-full"
        description={
          <>
            {/* Ivy (10/6): desktop one size smaller with the second line on one line;
                mobile larger with the second line split in two. */}
            <span className="block">More Than Live:</span>
            <span className="block [text-wrap:balance] lg:whitespace-nowrap">Explore Endless Home Videos</span>
          </>
        }
      >
        {/* Ivy (10/13): real app screenshot (City List feed), used as-is. */}
        <img
          src={getAssetPath("/images/app-city-list-v1.jpg")}
          alt="LivEstates app City List feed"
          loading="lazy"
          decoding="async"
          className="h-full w-full bg-white object-cover object-top"
        />
      </StickyFeatureGallery>
      <Hero
        items={[
          {
            src: getAssetPath("/videos/commercial.mp4"),
            // Shifted down one headline line on desktop (Ivy) and on mobile
            // (Ivy 10/15).
            text: (
              <h2
                className={`${HEADLINE_BOX} ${HERO_HEADLINE} whitespace-pre-wrap translate-y-[1.08em]`}
              >
                {"More Ways to See\n\nMore Than Ever"}
              </h2>
            ),
          },
        ]}
      />
      <HighlightSection
        title={"Request a showing-\nSimplified."}
        description="Know your agent before the showing, connect with a single tap."
      />
      {/* Ivy (10/13): new page, same design as Request a showing with the
          sides swapped (phones left, text right). Screenshots used as-is. */}
      <HighlightSection
        reverse
        title={"Totally Transparent\nNetworking"}
        description="See, share, and connect with everyone instantly in a single, completely open ecosystem."
        backImage={{ src: "/images/app-followings-v1.jpg", alt: "LivEstates app followings list" }}
        frontImage={{ src: "/images/app-inbox-v1.jpg", alt: "LivEstates app inbox" }}
      />

      <FeatureGrid />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
