"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Phone, { MockChat } from "./Phone";

export default function Hero({ items }: { items: [string, string][] }) {
  return (
    <section className="w-full px-4">
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
    offset: ["start end", "end start"],
  });

  // 容器的对称缩放与圆角（靠近边缘缩小，中心放大）
  const containerScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [0.84, 0.96, 1.0, 0.96, 0.84]
  );
  const containerRadius = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [32, 16, 32]
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
    const scale = useTransform(
      scrollYProgress,
      [b0, b1, b2, b3],
      [i === 0 ? 1 : 0.98, 1, 1, i === n - 1 ? 1 : 0.98]
    );

    // 文字位移：每段都在该段内从中心(0%)向上滚动(-50%)
    const textY = useTransform(scrollYProgress, [start, end], ["30%", "-50%"]);

    return { src, text, opacity, scale, textY };
  });

  // 每段约 180vh 的滚动空间（至少 160vh）
  const containerHeightVh = Math.max(180 * (items.length || 1), 160);

  return (
    <div
      ref={containerRef}
      className="relative mt-1"
      style={{ height: `${containerHeightVh}vh` }}
    >
      <motion.div
        className="sticky top-20 md:top-24 h-[420px] md:h-[720px] w-full overflow-hidden rounded-2xl shadow-2xl z-10"
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
