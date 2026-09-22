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
      <div className="px-5 flex items-center justify-between border-b border-white/10 bg-white/[0.03]">
        <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-slate-200"><span aria-hidden className="live-dot is-signal !h-1.5 !w-1.5" />{title}</span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-white/10 ring-1 ring-white/15"></span>
          <span className="w-4 h-4 rounded-full bg-white/10 ring-1 ring-white/15"></span>
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
                <div className="w-8 h-8 rounded-full bg-signal/15 ring-1 ring-signal/40 flex items-center justify-center text-[0.55rem] font-mono text-signal shrink-0">
                  Agent
                </div>
              )}
              <div
                className={clsx(
                  "p-3 rounded-2xl text-sm max-w-[75%] leading-relaxed",
                  msg.role === "user"
                    ? "bg-gradient-to-br from-signal/25 to-signal/10 text-[#e6fff8] ring-1 ring-signal/30 rounded-tr-sm"
                    : "bg-white/[0.07] text-slate-100 ring-1 ring-white/10 rounded-tl-sm"
                )}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center text-[0.6rem] font-mono text-white/80 shrink-0">
                  Me
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="px-5 flex items-center gap-2 border-t border-white/10 bg-white/[0.03]">
        <div className="flex-1 my-3 h-9 rounded-full bg-white/[0.06] ring-1 ring-white/10 flex items-center px-3 text-xs text-slate-400">
          Message...
        </div>
        <div className="w-10 h-10 rounded-full bg-signal flex items-center justify-center shadow-[0_0_16px_rgba(61,245,200,0.55)]">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-[#03140f]"
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
    <div className="relative h-full overflow-hidden bg-slate-950 text-white">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/70" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between pt-7">
          <div>
            <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-signal">
              LivE Showing
            </div>
            <div className="mt-1 font-display text-base font-medium leading-tight tracking-[-0.02em]">Modern townhome tour</div>
          </div>
          <div className="live-badge !bg-onair/80 !px-2.5 !py-1">
            <span aria-hidden className="live-dot !bg-white ![box-shadow:0_0_8px_#fff] after:!bg-white" />
            LIVE
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-3xl border border-white/15 bg-[#03090c]/45 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Agent camera</span>
              <span className="font-mono text-xs text-signal">1.2k watching</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-2xl bg-white/10 py-3 ring-1 ring-white/15">Kitchen</div>
              <div className="rounded-2xl bg-white/10 py-3 ring-1 ring-white/15">Light</div>
              <div className="rounded-2xl bg-white/10 py-3 ring-1 ring-white/15">Storage</div>
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
    <div className="flex h-full flex-col bg-[#060c10] text-white">
      <div className="relative h-[58%] overflow-hidden">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
        <div className="absolute left-4 top-12 rounded-full border border-signal/50 bg-[#03090c]/50 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-signal backdrop-blur">
          Saved Tour
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-display text-xl font-medium leading-tight tracking-[-0.02em]">
            Waterfront showing replay
          </div>
          <div className="mt-2 font-mono text-xs text-white/70">12 rooms · 34 clips</div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-signal/90">
              LivE Library
            </div>
            <div className="mt-1 font-display text-base font-medium">Highlights</div>
          </div>
          <button className="rounded-full bg-signal px-4 py-2 text-xs font-bold text-[#03140f] shadow-[0_0_16px_rgba(61,245,200,0.5)]">
            Share
          </button>
        </div>

        {["Kitchen natural light", "Primary suite", "Street view"].map(
          (item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal/10 font-mono text-sm font-bold text-signal ring-1 ring-signal/30">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-semibold">{item}</div>
                <div className="mt-1 text-xs text-white/55">Tap to replay</div>
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
      ? "bg-signal text-[#03140f] shadow-[0_0_18px_rgba(61,245,200,0.55)]"
      : tone === "red"
      ? "bg-onair shadow-[0_0_18px_rgba(255,59,78,0.5)]"
      : "bg-black/45 ring-1 ring-white/20";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur`}
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
