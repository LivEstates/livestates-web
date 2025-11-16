import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion';

import { storyFeatures } from '../data/content';
import { AnimatedInView } from '../components/AnimatedInView';
import { SectionHeading } from '../components/SectionHeading';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type StoryFeatureItemProps = {
  index: number;
  onInView: (index: number) => void;
  onProgress: (index: number, progress: number) => void;
  isActive: boolean;
};

function StoryFeatureItem({ index, onInView, onProgress, isActive }: StoryFeatureItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const isInView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const clamped = Math.min(Math.max(value, 0), 1);
    setProgress(clamped);
    onProgress(index, clamped);
  });

  const feature = storyFeatures[index];

  return (
    <article
      ref={ref}
      className={`story-feature-card${isActive ? ' is-active' : ''}`}
      style={{ '--progress': progress, '--accent-color': feature.accent } as CSSProperties}
    >
      <div className="story-feature-card__marker" aria-hidden="true" />
      <p className="story-feature-card__eyebrow">{feature.eyebrow}</p>
      <h3 className="story-feature-card__title">{feature.title}</h3>
      <p className="story-feature-card__emphasis">{feature.emphasis}</p>
      <p className="story-feature-card__description">{feature.description}</p>
    </article>
  );
}

export function StoryFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressByIndexRef = useRef<Record<number, number>>({});
  const pendingVideoProgressRef = useRef<number | null>(null);

  const handleInView = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? prev : index));
  }, []);

  const handleProgress = useCallback(
    (index: number, progress: number) => {
      progressByIndexRef.current[index] = progress;

      if (index !== activeIndex) {
        return;
      }

      const feature = storyFeatures[index];
      if (feature.media.type !== 'video') {
        return;
      }

      const clamped = Math.min(Math.max(progress, 0), 1);
      const video = videoRef.current;

      if (!video) {
        pendingVideoProgressRef.current = clamped;
        return;
      }

      if (video.readyState >= 1 && video.duration) {
        const targetTime = clamped * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          video.currentTime = targetTime;
        }
      } else {
        pendingVideoProgressRef.current = clamped;
      }
    },
    [activeIndex],
  );

  const activeFeature = storyFeatures[activeIndex];

  useEffect(() => {
    if (activeFeature.media.type !== 'video') {
      pendingVideoProgressRef.current = null;
      return;
    }

    const progress = progressByIndexRef.current[activeIndex] ?? 0;
    const video = videoRef.current;
    if (!video) {
      pendingVideoProgressRef.current = progress;
      return;
    }

    const syncVideo = () => {
      if (!video.duration) {
        return;
      }
      const targetTime = progress * video.duration;
      video.currentTime = targetTime;
    };

    if (video.readyState >= 1 && video.duration) {
      syncVideo();
    } else {
      pendingVideoProgressRef.current = progress;
    }
  }, [activeFeature, activeIndex]);

  const handleVideoReady = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) {
      return;
    }

    const storedProgress =
      pendingVideoProgressRef.current ?? progressByIndexRef.current[activeIndex] ?? 0;
    video.currentTime = storedProgress * video.duration;
    pendingVideoProgressRef.current = null;
  }, [activeIndex]);

  const activeAccentStyle = useMemo(
    () => ({ '--story-accent': activeFeature.accent } as CSSProperties),
    [activeFeature.accent],
  );

  return (
    <section id="stories" className="story-features">
      <div className="section-shell">
        <SectionHeading
          eyebrow="In the spotlight"
          title="Stories that feel alive"
          description="From dual cameras to live reactions, every piece of Sticky is tuned to bring conversations closer."
        />
        <div className="story-features__layout">
          <div className="story-features__visual" style={activeAccentStyle}>
            <span className="story-features__visual-glow" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                className="story-features__visual-frame"
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
              >
                {activeFeature.media.type === 'video' ? (
                  <video
                    key={activeFeature.media.src}
                    ref={videoRef}
                    className="story-features__visual-media"
                    src={activeFeature.media.src}
                    poster={activeFeature.media.poster}
                    muted
                    playsInline
                    preload="auto"
                    onLoadedMetadata={handleVideoReady}
                  />
                ) : (
                  <img
                    key={activeFeature.media.src}
                    className="story-features__visual-media"
                    src={activeFeature.media.src}
                    alt={activeFeature.media.alt ?? ''}
                    loading="lazy"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="story-features__visual-meta">
              <span>{activeFeature.eyebrow}</span>
              <span>
                {activeIndex + 1} / {storyFeatures.length}
              </span>
            </div>
          </div>
          <div className="story-features__list">
            <AnimatedInView delay={0.05}>
              <p className="story-features__lead">
                Scroll through each story to see how Sticky keeps conversations expressive, secure, and in sync.
              </p>
            </AnimatedInView>
            <div className="story-features__timeline" aria-hidden="true" />
            {storyFeatures.map((_, index) => (
              <StoryFeatureItem
                key={storyFeatures[index].id}
                index={index}
                onInView={handleInView}
                onProgress={handleProgress}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
