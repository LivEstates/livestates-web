"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Phone, { MockChat } from "./Phone";
import clsx from "clsx";

type Feature = {
  id: string;
  title: string;
  description: string;
  accent?: "emerald" | "sky" | "violet" | "amber";
};

const FEATURES: Feature[] = [
  {
    id: "privacy",
    title: "Privacy",
    description: "端到端加密，聊天更安心。",
    accent: "emerald",
  },
  {
    id: "channels",
    title: "Channels",
    description: "关注频道，获取最新动态。",
    accent: "sky",
  },
  {
    id: "stories",
    title: "Stories",
    description: "发布故事，记录生活瞬间。",
    accent: "violet",
  },
  {
    id: "assistant",
    title: "AI Assistant",
    description: "AI 助手，让沟通更高效。",
    accent: "amber",
  },
  {
    id: "payments",
    title: "Payments",
    description: "在聊天里直接完成付款。",
    accent: "emerald",
  },
];

export default function StickyFeatureGallery() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number(visible.target.getAttribute("data-index"));
          setActive(idx);
        }
      },
      { root: null, threshold: [0.3, 0.6, 0.9] }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const stickers = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240&auto=format&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=240&auto=format&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop&crop=faces",
  ];
  const Sticker = ({ src, badge }: { src: string; badge?: string }) => (
    <span className="relative inline-flex shrink-0 items-center justify-center w-14 h-10 md:w-20 md:h-14 rounded-2xl overflow-hidden ring-1 ring-white/40 shadow-lg bg-white/5">
      <img src={src} alt="" className="h-full w-full object-cover" />
      {badge && (
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] md:text-xs rounded-full bg-green-500 text-white shadow">
          {badge}
        </span>
      )}
    </span>
  );

  // 进度锚定在 sticky 容器（避免一进来就>0）
  const effectRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // 用于滚动进度的外层容器引用（比直接绑 sticky 更早开始）
  // 滚动进度绑定到“效果区”容器
  const progressRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: progressRef,
    offset: ["start start", "end start"],
  });

  // 文字行对称缩放 + 模糊（进入效果区后才开始）
  const rowScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 0.97, 0.94, 0.9, 0.86]
  );
  const rowBlur = useTransform(
    scrollYProgress,
    [0, 0.12, 0.5, 1],
    ["blur(0px)", "blur(0px)", "blur(6px)", "blur(14px)"]
  );

  // 手机：把出现区间拉长（更慢淡入、更长距离上滑）
  const phoneY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.75, 1],
    ["40%", "16%", "0%", "-6%"]
  );
  const phoneOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.5, 0.9],
    [0, 0.7, 1]
  );
  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0.95, 1, 1.05]
  );

  return (
    <section id="features" className="section py-24 md:py-32">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl text-slate-400"
        >
          Meet Sticky
        </motion.h2>
      </div>

      <div ref={progressRef} className="relative mt-8 h-[220vh]">
        <div
          ref={stickyRef}
          className="sticky top-20 md:top-24 h-[70vh] flex items-center justify-center"
        >
          <div className="relative w-full">
            <motion.div
              style={{ scale: rowScale, filter: rowBlur }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-8 text-[clamp(2.4rem,7vw,5.6rem)] font-semibold leading-tight text-slate-100 text-center"
            >
              <span>Privacy</span>
              <Sticker src={stickers[0]} badge="🔒" />
              <span>Channels</span>
              <Sticker src={stickers[1]} badge="📣" />
              <span>Stories</span>
              <Sticker src={stickers[2]} badge="🎞️" />
              <span>AI Assistant</span>
              <Sticker src={stickers[3]} badge="🤖" />
              <span>Payments</span>
            </motion.div>

            <motion.div
              style={{ y: phoneY, opacity: phoneOpacity, scale: phoneScale }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <Phone>
                <MockChat title="Sticky" accent={"violet" as any} />
              </Phone>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-slate-300">
          “The best way to build an App Showcase.”
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Yegor Trukhin — Template Creator
        </p>
        <div className="mt-3 flex items-center justify-center text-amber-400">
          <span className="text-xl">★ ★ ★ ★ ★</span>
          <a href="#" className="ml-2 text-sm text-slate-400 underline">
            22 Reviews
          </a>
        </div>
      </div>
    </section>
  );
}
