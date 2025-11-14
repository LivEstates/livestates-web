"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Phone, { MockChat } from "./Phone";

export default function Hero({
  videos = ["/videos/clip1.mp4", "/videos/clip2.mp4", "/videos/clip3.mp4"],
  hintText = "向下滚动以平滑切换视频",
}: {
  videos?: string[];
  hintText?: string;
}) {
  return (
    <section className="w-full px-4">
      {/* 新增：滚动切换视频区块（使用传入参数） */}
      <VideoScrollGallery videos={videos} hintText={hintText} />
    </section>
  );
}

// 新增：滚动切换视频组件
// 新增：支持传入视频数组和提示文字
function VideoScrollGallery({
  videos,
  hintText = "向下滚动以平滑切换视频",
}: {
  videos: string[];
  hintText?: string;
}) {
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
  const items = videos.map((src, i) => {
    const n = videos.length || 1;
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

    return { src, opacity, scale };
  });

  // 每段约 80vh 的滚动空间（至少 160vh）
  const containerHeightVh = Math.max(80 * (videos.length || 1), 160);

  return (
    <div
      ref={containerRef}
      className="relative mt-1"
      style={{ height: `${containerHeightVh}vh` }}
    >
      <motion.div
        className="sticky top-20 md:top-24 h-[420px] md:h-[720px] w-full overflow-hidden bg-amber-600 rounded-2xl shadow-2xl"
        style={{ scale: containerScale, borderRadius: containerRadius }}
      >
        {items.map(({ src, opacity, scale }, idx) => (
          <motion.video
            key={idx}
            playsInline
            muted
            autoPlay
            loop
            preload="metadata"
            style={{ opacity, scale }}
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none sticky top-6 md:top-10 text-center text-sm text-slate-400">
        {hintText}
      </div>
    </div>
  );
}
