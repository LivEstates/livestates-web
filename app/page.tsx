import Hero from "@/components/Hero";
import StickyFeatureGallery from "@/components/StickyFeatureGallery";
import HighlightSection from "@/components/HighlightSection";
import FeatureGrid from "@/components/FeatureGrid";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { LiveShowingScreen, MockChat, VideoTourScreen } from "@/components/Phone";
import AnimatedTitle from "@/components/AnimatedTitle";
import { getAssetPath } from "@/utils/path";

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
            text: "LivE\nExplore Every Corner\nDetailed And Interactive",
            previewSrc: getAssetPath("/videos/first-female-agent-reverse.mp4"),
          },
          {
            // Someone watching -> the tile carries what is on her phone.
            src: getAssetPath("/videos/03.mp4"),
            text: "LivE\nAnytime You Want\nAnywhere You Are",
            portraitSrc: getAssetPath("/videos/user-watch.mp4"),
            previewSrc: getAssetPath("/videos/user-watch.mp4"),
          },
        ]}
      />

      <AnimatedTitle>Meet LivEstates</AnimatedTitle>
      <StickyFeatureGallery
        id="features"
        description={"Meet LivE, Your\nVirtual Home Agent"}
      >
        <LiveShowingScreen videoSrc={getAssetPath("/videos/02.mp4")} />
      </StickyFeatureGallery>

      <StickyFeatureGallery
        tone="sage"
        textSizeClassName="text-[clamp(2.25rem,5.6vw,5.25rem)]"
        measureClassName="max-w-full"
        description={
          <>
            <span className="block">AI-Powered</span>
            <span className="block">Chat Instantly</span>
            {/* Kept on one line wherever it fits; on narrow screens the only
                allowed break is after "Real Estate,". */}
            <span className="block">
              <span className="whitespace-nowrap">Real Estate,</span>{" "}
              <span className="whitespace-nowrap">Made Simple</span>
            </span>
          </>
        }
      >
        <MockChat
          title="LivE AI Assistant"
          theme="violet-light"
          assistantLabel="AI"
          messages={[
            {
              id: "1",
              role: "user",
              text: "Any 3-bed homes near good schools?",
            },
            {
              id: "2",
              role: "assistant",
              text: "Found 6 nearby. Two have live showings this Saturday.",
            },
            {
              id: "3",
              role: "user",
              text: "Nice. Is the first one pet friendly?",
            },
            {
              id: "4",
              role: "assistant",
              text: "Yes, with a fenced yard. Want me to book a spot?",
            },
          ]}
        />
      </StickyFeatureGallery>
      <StickyFeatureGallery
        tone="clay"
        description={"From LivE To Library\nContent That Lasts"}
      >
        <VideoTourScreen videoSrc={getAssetPath("/videos/03.mp4")} />
      </StickyFeatureGallery>
      <Hero
        items={[
          {
            src: getAssetPath("/videos/commercial.mp4"),
            text: "More ways to see\n\nMore than ever",
          },
        ]}
      />
      <HighlightSection
        title={"Request a showing-\nSimplified."}
        description="Know your agent before the showing, connect with a single tap."
      />

      <FeatureGrid />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
