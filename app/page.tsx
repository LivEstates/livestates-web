import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StickyFeatureGallery from "@/components/StickyFeatureGallery";
import HighlightSection from "@/components/HighlightSection";
import FeatureGrid from "@/components/FeatureGrid";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <StickyFeatureGallery />
      <StickyFeatureGallery />
      <StickyFeatureGallery />

      <Hero />
      <HighlightSection />

      <FeatureGrid />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
