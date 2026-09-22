"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export default function Phone({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={clsx("phone", className)}
      whileHover={{ translateY: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="screen">{children}</div>
    </motion.div>
  );
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export function MockChat({
  title = "Chats",
  accent = "emerald",
  messages,
}: {
  title?: string;
  accent?: "emerald" | "sky" | "violet" | "amber";
  messages?: ChatMessage[];
}) {
  return (
    <div className="screen-grid">
      <div className="px-5 pt-7 flex items-center justify-between border-b border-[#efe8da]/10">
        <span className="font-display text-lg italic text-[#efe8da]">{title}</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a676]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#efe8da]/30"></span>
        </div>
      </div>
      <div className="px-4 py-3 space-y-4 overflow-hidden overflow-y-auto">
        {!messages ? (
          <>
            <div className="flex gap-2 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 w-4/5 rounded bg-white/20"></div>
                <div className="h-3 w-2/5 rounded bg-white/10"></div>
              </div>
            </div>
            <div className="flex gap-2 items-start justify-end">
              <div className="space-y-2 flex-1 max-w-[70%]">
                <div className="h-3 w-full rounded bg-white/30"></div>
                <div className="h-3 w-3/5 rounded bg-white/20"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10"></div>
            </div>
            <div className="flex gap-2 items-start">
              <div className="w-8 h-8 rounded-full bg-white/10"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 w-2/3 rounded bg-white/20"></div>
                <div className="h-3 w-1/3 rounded bg-white/10"></div>
              </div>
            </div>
          </>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                "flex gap-2 items-start",
                msg.role === "user" ? "justify-end" : ""
              )}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full border border-[#c9a676]/50 flex items-center justify-center font-mono text-[8px] uppercase tracking-wider text-[#c9a676] shrink-0">
                  Agent
                </div>
              )}
              <div
                className={clsx(
                  "px-3.5 py-3 rounded-[18px] text-[13px] font-light max-w-[75%] leading-relaxed",
                  msg.role === "user"
                    ? "bg-[#efe8da] text-[#17140f] rounded-tr-[4px]"
                    : "border border-[#efe8da]/15 bg-[#efe8da]/[0.06] text-[#efe8da]/90 rounded-tl-[4px]"
                )}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full border border-[#efe8da]/30 flex items-center justify-center font-mono text-[8px] uppercase tracking-wider text-[#efe8da]/70 shrink-0">
                  Me
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="px-5 flex items-center gap-2 border-t border-[#efe8da]/10">
        <div className="flex-1 my-3 h-9 rounded-full border border-[#efe8da]/15 flex items-center px-4 text-xs font-light text-[#efe8da]/40">
          Message...
        </div>
        <div className="w-9 h-9 rounded-full bg-[#c9a676] flex items-center justify-center">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-[#17140f]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function LiveShowingScreen({ videoSrc }: { videoSrc: string }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#16130f] text-[#f7f2e8]">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#17120c]/65 via-[#17120c]/5 to-[#17120c]/80" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between pt-9">
          <div>
            <div className="font-mono text-[9px] font-medium tracking-[0.22em] text-[#f7f2e8]/70">
              LivE Showing
            </div>
            <div className="mt-1.5 font-display text-[1.45rem] italic leading-none">Modern townhome tour</div>
          </div>
          <div className="flex items-center gap-1.5 border border-[#f7f2e8]/60 px-2 py-1 font-mono text-[9px] tracking-[0.2em]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" />
            LIVE
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[18px] border border-[#f7f2e8]/20 bg-[#17120c]/40 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between text-sm">
              <span className="font-display text-base italic">Agent camera</span>
              <span className="font-mono text-[10px] tracking-wider text-[#f7f2e8]/65">1.2k watching</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-light">
              <div className="rounded-full border border-[#f7f2e8]/25 py-2">Kitchen</div>
              <div className="rounded-full border border-[#f7f2e8]/25 py-2">Light</div>
              <div className="rounded-full border border-[#f7f2e8]/25 py-2">Storage</div>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <RoundIcon label="Mic">
              <path d="M12 4a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z" />
              <path d="M19 11a7 7 0 0 1-14 0" />
              <path d="M12 18v3" />
              <path d="M8 21h8" />
            </RoundIcon>
            <RoundIcon label="Chat" tone="blue">
              <path d="M5 6h14v10H8l-3 3V6Z" />
              <path d="M9 10h6" />
              <path d="M9 13h4" />
            </RoundIcon>
            <RoundIcon label="End" tone="red">
              <path d="M8 8l8 8" />
              <path d="M16 8l-8 8" />
            </RoundIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoTourScreen({ videoSrc }: { videoSrc: string }) {
  return (
    <div className="flex h-full flex-col bg-[#16130f] text-[#f7f2e8]">
      <div className="relative h-[58%] overflow-hidden">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#17120c]/40 via-transparent to-[#17120c]/80" />
        <div className="absolute left-4 top-12 border border-[#f7f2e8]/60 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] backdrop-blur">
          Saved Tour
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-display text-[1.75rem] italic leading-[1]">
            Waterfront showing replay
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-wider text-[#f7f2e8]/65">12 rooms · 34 clips</div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] text-[#c9a676]">
              LivE Library
            </div>
            <div className="mt-1 font-display text-xl italic">Highlights</div>
          </div>
          <button className="rounded-full border border-[#f7f2e8]/70 px-4 py-1.5 text-xs font-normal tracking-wide text-[#f7f2e8]">
            Share
          </button>
        </div>

        {["Kitchen natural light", "Primary suite", "Street view"].map(
          (item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 border-t border-[#f7f2e8]/12 pt-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c9a676]/60 font-display text-base italic text-[#c9a676]">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-normal">{item}</div>
                <div className="mt-0.5 text-xs font-light text-[#f7f2e8]/45">Tap to replay</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function RoundIcon({
  children,
  label,
  tone = "dark",
}: {
  children: ReactNode;
  label: string;
  tone?: "dark" | "blue" | "red";
}) {
  const toneClass =
    tone === "blue"
      ? "bg-[#f3ede2] text-[#17140f] border-[#f3ede2]"
      : tone === "red"
      ? "bg-clay border-clay"
      : "bg-black/20 border-[#f7f2e8]/55";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      >
        {children}
      </svg>
    </span>
  );
}
