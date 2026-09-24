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
    <main>
      <Hero
        variant="intro"
        items={[
          {
            // Agent broadcasting -> the tile carries the feed she is sending.
            src: getAssetPath("/videos/01.mp4"),
            text: "SEE\nFEEL\nCONNECT\nLivE YOUR WAY HOME",
            previewSrc: getAssetPath("/videos/first-female-agent.mp4"),
          },
          {
            // "Every corner" -> the tile carries a second angle on the property
            // rather than a person, so the pair reads as two viewpoints at once.
            // Reversed so it pushes in where slide one's tile pulls back, which
            // keeps the two tiles distinct without needing another shoot.
            src: getAssetPath("/videos/02.mp4"),
            text: "LivE\nEXPLORE EVERY CORNER\nDETAILED AND INTERACTIVE",
            previewSrc: getAssetPath("/videos/first-female-agent-reverse.mp4"),
          },
          {
            // Someone watching -> the tile carries what is on her phone.
            src: getAssetPath("/videos/03.mp4"),
            text: "LivE\nANYTIME YOU WANT\nANYWHERE YOU ARE",
            portraitSrc: getAssetPath("/videos/user-watch.mp4"),
            previewSrc: getAssetPath("/videos/user-watch.mp4"),
          },
        ]}
      />

      <AnimatedTitle>Meet LivEstates</AnimatedTitle>
      <StickyFeatureGallery
        id="features"
        description={"MEET LivE, YOUR\nVIRTUAL HOME AGENT"}
      >
        <LiveShowingScreen videoSrc={getAssetPath("/videos/02.mp4")} />
      </StickyFeatureGallery>

      <StickyFeatureGallery
        description={"AI-POWERED\n\nCHAT INSTANTLY\n\nREAL ESTATE, MADE SIMPLE"}
      >
        <MockChat
          title="LivE AI Assistant"
          accent={"violet" as any}
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
        description={"FROM LivE TO LIBRARY\nCONTENT THAT LASTS"}
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
