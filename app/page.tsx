import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StickyFeatureGallery from "@/components/StickyFeatureGallery";
import HighlightSection from "@/components/HighlightSection";
import FeatureGrid from "@/components/FeatureGrid";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { MockChat } from "@/components/Phone";
import AnimatedTitle from "@/components/AnimatedTitle";

export default function Page() {
  // print pwd
  console.log(process.cwd());
  return (
    <main>
      <Header />
      <Hero
        items={[
          [
            "/videos/istockphoto-1500066456-640_adpp_is.mp4",
            "See. Feel. Connect. \n LivE your way home.",
          ],
          [
            "/videos/istockphoto-2181426678-640_adpp_is.mp4",
            "Explore every corner. \n Live, detailed, and interactive.",
          ],
          [
            "/videos/istockphoto-2188682308-640_adpp_is.mp4",
            "Join the open house\nLive, anytime you want, anywhere you are.",
          ],
        ]}
      />

      <AnimatedTitle>Meet LivE</AnimatedTitle>
      <StickyFeatureGallery
        description="LivE transforms property showings into interactive, social, real-time experences."
        description2="Meet LivE, your virtual home agent."
      >
        <video
          src="/videos/istockphoto-2181426678-640_adpp_is.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </StickyFeatureGallery>

      <StickyFeatureGallery
        description="No more waiting. Real homes, real agents, real conversations."
        description2="Chat live with Verified Agents.
"
      >
        <MockChat
          title="LivE"
          accent={"violet" as any}
          messages={[
            {
              id: "1",
              role: "user",
              text: "Is this apartment still available?",
            },
            {
              id: "2",
              role: "assistant",
              text: "Yes, it is! Would you like a virtual tour?",
            },
            { id: "3", role: "user", text: "That would be great, thanks." },
          ]}
        />
      </StickyFeatureGallery>
      <StickyFeatureGallery
        description="With LivE, you can join it live. See every details, ask questions, and feel like you're there. "
        description2="Can't make it to the open house?"
      >
        <p>直播间截图来一个</p>
      </StickyFeatureGallery>

      <StickyFeatureGallery
        description="From Live to library. Content that lasts.
"
        description2="More ways to see more than ever"
      >
        <video
          src="videos/istockphoto-2162287699-640_adpp_is.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </StickyFeatureGallery>
      <Hero
        items={[
          [
            "videos/istockphoto-2238470429-640_adpp_is.mp4",
            "And so much more.",
          ],
          [
            "videos/istockphoto-2167574847-640_adpp_is.mp4",
            "More than Agents.",
          ],
          ["videos/istockphoto-2183311834-640_adpp_is.mp4", "One platform."],
          [
            "/videos/istockphoto-2188682308-640_adpp_is.mp4",
            "Every Real Estate Professional.",
          ],
        ]}
      />
      <HighlightSection
        title="Request a showing. Seamless Agent Response."
        description="Turning interest into action in just one click."
      />

      <FeatureGrid />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
