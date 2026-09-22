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
      <div className="px-5 pt-6 flex items-center justify-between bg-[#f1e6d5]">
        <span className="font-display text-base font-semibold text-[#3b2a20]">{title}</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#a9b69a]"></span>
          <span className="w-3.5 h-3.5 rounded-full bg-[#d9a55b]"></span>
        </div>
      </div>
      <div className="px-4 py-4 space-y-4 overflow-hidden overflow-y-auto">
        {!messages ? (
          <>
            <div className="flex gap-2 items-start">
              <div className="w-8 h-8 rounded-full bg-[#dde3d0]"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 w-4/5 rounded-full bg-[#e8d5be]"></div>
                <div className="h-3 w-2/5 rounded-full bg-[#f1e6d5]"></div>
              </div>
            </div>
            <div className="flex gap-2 items-start justify-end">
              <div className="space-y-2 flex-1 max-w-[70%]">
                <div className="h-3 w-full rounded-full bg-[#c4673f]/40"></div>
                <div className="h-3 w-3/5 rounded-full bg-[#e8d5be]"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#dde3d0]"></div>
            </div>
            <div className="flex gap-2 items-start">
              <div className="w-8 h-8 rounded-full bg-[#dde3d0]"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 w-2/3 rounded-full bg-[#e8d5be]"></div>
                <div className="h-3 w-1/3 rounded-full bg-[#f1e6d5]"></div>
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
                <div className="w-8 h-8 rounded-full bg-[#a9b69a] flex items-center justify-center text-[9px] font-bold text-[#2f3a29] shrink-0">
                  Agent
                </div>
              )}
              <div
                className={clsx(
                  "px-3.5 py-3 rounded-[20px] text-sm max-w-[75%] leading-relaxed",
                  msg.role === "user"
                    ? "bg-[#c4673f] text-[#fff6ea] rounded-tr-md shadow-[0_6px_14px_-8px_rgba(158,74,42,0.8)]"
                    : "bg-white text-[#3b2a20] rounded-tl-md shadow-[0_6px_14px_-10px_rgba(91,58,36,0.5)] ring-1 ring-[#e8d5be]"
                )}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#e8d5be] flex items-center justify-center text-[10px] font-bold text-[#9e4a2a] shrink-0">
                  Me
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="px-4 flex items-center gap-2 bg-[#fffaf2]">
        <div className="flex-1 my-3 h-10 rounded-full bg-[#f1e6d5] flex items-center px-4 text-xs text-[#8a6f5c]">
          Message...
        </div>
        <div className="w-10 h-10 rounded-full bg-[#c4673f] flex items-center justify-center">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-[#fff6ea]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
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
    <div className="relative h-full overflow-hidden bg-[#6b4a34] text-[#fff6ea]">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#3b2a20]/60 via-transparent to-[#3b2a20]/75" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5 pt-12">
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
              LivE Showing
            </div>
            <div className="font-display mt-1 text-lg font-semibold leading-tight">Modern townhome tour</div>
          </div>
          <div className="rounded-full bg-[#c4673f] px-3 py-1 text-xs font-bold shadow-[0_0_0_4px_rgba(196,103,63,0.3)]">
            LIVE
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[26px] bg-[#fbf5eb]/20 p-4 ring-1 ring-[#fbf5eb]/25 backdrop-blur-md">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Agent camera</span>
              <span className="text-white/65">1.2k watching</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-full bg-[#fbf5eb]/90 py-2.5 font-semibold text-[#3b2a20]">Kitchen</div>
              <div className="rounded-full bg-[#fbf5eb]/90 py-2.5 font-semibold text-[#3b2a20]">Light</div>
              <div className="rounded-full bg-[#fbf5eb]/90 py-2.5 font-semibold text-[#3b2a20]">Storage</div>
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
    <div className="flex h-full flex-col bg-[#fffaf2] text-[#3b2a20]">
      <div className="relative h-[54%] overflow-hidden rounded-b-[32px] bg-[#6b4a34] text-[#fff6ea]">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3b2a20]/40 via-transparent to-[#3b2a20]/75" />
        <div className="absolute left-4 top-12 rounded-full bg-[#fbf5eb]/90 px-3 py-1 text-xs font-bold text-[#9e4a2a]">
          Saved Tour
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-display text-2xl font-semibold leading-tight">
            Waterfront showing replay
          </div>
          <div className="mt-2 text-sm text-[#fff6ea]/80">12 rooms · 34 clips</div>
        </div>
      </div>

      <div className="flex-1 space-y-3 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#56654d]">
              LivE Library
            </div>
            <div className="font-display mt-0.5 text-lg font-semibold">Highlights</div>
          </div>
          <button className="rounded-full bg-[#c4673f] px-4 py-2 text-xs font-bold text-[#fff6ea]">
            Share
          </button>
        </div>

        {["Kitchen natural light", "Primary suite", "Street view"].map(
          (item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-[20px] bg-[#f1e6d5] p-2.5"
            >
              <div className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dde3d0] text-sm font-semibold text-[#56654d]">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-semibold">{item}</div>
                <div className="mt-0.5 text-xs text-[#8a6f5c]">Tap to replay</div>
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
      ? "bg-[#56654d]"
      : tone === "red"
      ? "bg-[#c4673f]"
      : "bg-[#3b2a20]/55";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-12 w-12 items-center justify-center rounded-full shadow-lg backdrop-blur`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        {children}
      </svg>
    </span>
  );
}
