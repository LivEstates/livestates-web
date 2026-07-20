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
          [
            getAssetPath("/videos/01.mp4"),
            "SEE. FEEL. CONNECT.\nLivE YOUR WAY HOME.",
          ],
          [
            getAssetPath("/videos/02.mp4"),
            "EXPLORE  EVERY CORNER.\nLivE, DETAILED, AND INTERACTIVE.",
          ],
          [
            getAssetPath("/videos/03.mp4"),
            "LivE, ANYTIME YOU WANT, ANYWHERE YOU ARE.",
          ],
        ]}
      />

      <AnimatedTitle>Meet LivEstates</AnimatedTitle>
      <StickyFeatureGallery
        id="features"
        description="MEET LivE, YOUR VIRTUAL HOME AGENT"
      >
        <LiveShowingScreen videoSrc={getAssetPath("/videos/02.mp4")} />
      </StickyFeatureGallery>

      <StickyFeatureGallery
        description="Chat LivE, with Verified Real Estate Agents"
      >
        <MockChat
          title="Verified Agent"
          accent={"violet" as any}
          messages={[
            {
              id: "1",
              role: "user",
              text: "Can you show me the kitchen storage?",
            },
            {
              id: "2",
              role: "assistant",
              text: "Absolutely. I’ll walk closer and open the pantry.",
            },
            {
              id: "3",
              role: "user",
              text: "Great. Is there natural light in the afternoon?",
            },
          ]}
        />
      </StickyFeatureGallery>
      <StickyFeatureGallery
        description={"From LivE to library.\nContent that lasts."}
      >
        <VideoTourScreen videoSrc={getAssetPath("/videos/03.mp4")} />
      </StickyFeatureGallery>
      <Hero
        items={[
          [getAssetPath("/videos/commercial.mp4"), "More Than Residential"],
          [getAssetPath("/videos/05.mp4"), "More than Agents."],
        ]}
      />
      <HighlightSection
        title="Request a showing. Get an agent response."
        description="Turn interest into action with a single tap, then continue the conversation in the same place."
      />

      <FeatureGrid />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
