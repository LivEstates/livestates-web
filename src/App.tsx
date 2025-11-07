import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { FeatureHighlights } from './sections/FeatureHighlights';
import { StoryFeatures } from './sections/StoryFeatures';
import { Testimonial } from './sections/Testimonial';
import { ActionChips } from './sections/ActionChips';
import { DeepFeatures } from './sections/DeepFeatures';
import { FAQs } from './sections/FAQs';
import { DownloadCTA } from './sections/DownloadCTA';
import { Footer } from './components/Footer';

import './styles/app.css';

export default function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <FeatureHighlights />
        <StoryFeatures />
        <Testimonial />
        <ActionChips />
        <DeepFeatures />
        <FAQs />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
}
