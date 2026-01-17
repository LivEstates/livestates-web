"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Phone, { MockChat } from "./Phone";

export default function Hero({ items }: { items: [string, string][] }) {
  return (
    <section className="w-full">
      <VideoScrollGallery items={items} />
    </section>
  );
}

// 新增：滚动切换视频组件
// 新增：支持传入视频数组和提示文字
function VideoScrollGallery({ items }: { items: [string, string][] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const containerScale = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 1, 0.9]
  );
  const containerRadius = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [0, 0, 24]
  );

  // 为每个视频生成对应的透明度与缩放映射（均匀分段）
  const galleryItems = items.map(([src, text], i) => {
    const n = items.length || 1;
    const start = i / n;
    const end = (i + 1) / n;
    const w = end - start;
    const b0 = start;
    const b1 = start + w * 0.25;
    const b2 = start + w * 0.75;
    const b3 = end;

    // 首段一开始就可见；末段结束仍保持可见；中间段淡入→停留→淡出
    const opacity = useTransform(
      scrollYProgress,
      [b0, b1, b2, b3],
      [i === 0 ? 1 : 0, 1, 1, i === n - 1 ? 1 : 0]
    );
    const scale = useTransform(scrollYProgress, [b0, b1, b2, b3], [1, 1, 1, 1]);

    const textY = useTransform(
      scrollYProgress,
      [start, end],
      [i === 0 ? "0%" : "30%", i === 0 ? "-50%" : "-50%"]
    );

    return { src, text, opacity, scale, textY };
  });

  // 每段约 180vh 的滚动空间（至少 160vh）
  const containerHeightVh = Math.max(180 * (items.length || 1), 160);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${containerHeightVh}vh` }}
    >
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden shadow-2xl z-10"
        style={{ scale: containerScale, borderRadius: containerRadius }}
      >
        {/* 视频层 */}
        {galleryItems.map(({ src, opacity, scale }, idx) => (
          <motion.div
            key={idx}
            style={{ opacity, scale }}
            className="absolute inset-0 h-full w-full"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              playsInline
              muted
              autoPlay
              loop
              preload="metadata"
            />
          </motion.div>
        ))}

        {/* 滚动文字层 - 位于视频上方，在容器内部滚动 */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {galleryItems.map(({ text, opacity, scale, textY }, idx) => (
            <motion.div
              key={idx}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity,
                scale,
                y: textY,
              }}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md text-center px-4 whitespace-pre-line">
                {text}
              </h2>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
