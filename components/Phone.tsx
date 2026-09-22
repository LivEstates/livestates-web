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
      whileHover={{ x: -4, y: -4 }}
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
      <div className="px-5 pt-3 flex items-center justify-between border-b-[3px] border-ink bg-lime text-ink">
        <span className="font-display text-lg leading-none tracking-wide">{title}</span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-ink bg-tomato"></span>
          <span className="w-4 h-4 rounded-full border-2 border-ink bg-cream"></span>
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
                <div className="w-9 h-9 rounded-full border-2 border-ink bg-tomato flex items-center justify-center text-[10px] font-extrabold text-ink shrink-0">
                  Agent
                </div>
              )}
              <div
                className={clsx(
                  "p-3 rounded-2xl border-2 border-ink text-sm font-medium max-w-[75%] leading-snug shadow-[3px_3px_0_0_#0A0A0A]",
                  msg.role === "user"
                    ? "bg-lime text-ink rounded-tr-sm"
                    : "bg-cream text-ink rounded-tl-sm"
                )}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-9 h-9 rounded-full border-2 border-ink bg-lime flex items-center justify-center text-xs font-extrabold text-ink shrink-0">
                  Me
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="px-4 flex items-center gap-2 border-t-[3px] border-ink bg-cream">
        <div className="flex-1 my-3 h-10 rounded-full border-2 border-ink bg-white flex items-center px-3 text-xs font-medium text-ink/50">
          Message...
        </div>
        <div className="w-10 h-10 shrink-0 rounded-full border-2 border-ink bg-tomato flex items-center justify-center">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-ink"
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
    <div className="relative h-full overflow-hidden bg-navy text-white">
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
        <div className="flex items-center justify-between pt-5">
          <div>
            <div className="text-xs font-extrabold tracking-[0.14em] text-lime">
              LivE Showing
            </div>
            <div className="mt-1 font-display text-2xl leading-none tracking-wide">Modern townhome tour</div>
          </div>
          <div className="-rotate-6 rounded-full border-2 border-ink bg-tomato px-3 py-1 text-xs font-extrabold text-ink shadow-hard-sm">
            LIVE
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border-[3px] border-ink bg-cream p-4 text-ink shadow-hard-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="font-extrabold">Agent camera</span>
              <span className="text-ink/60">1.2k watching</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div className="rounded-xl border-2 border-ink bg-lime py-2.5">Kitchen</div>
              <div className="rounded-xl border-2 border-ink bg-white py-2.5">Light</div>
              <div className="rounded-xl border-2 border-ink bg-white py-2.5">Storage</div>
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
    <div className="flex h-full flex-col bg-cream text-ink">
      <div className="relative h-[58%] overflow-hidden border-b-[3px] border-ink bg-navy text-white">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
        <div className="absolute left-4 top-10 -rotate-3 rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-extrabold text-ink shadow-hard-sm">
          Saved Tour
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-display text-3xl leading-[0.95] tracking-wide">
            Waterfront showing replay
          </div>
          <div className="mt-2 text-sm font-semibold text-white/80">12 rooms · 34 clips</div>
        </div>
      </div>

      <div className="flex-1 space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold tracking-[0.14em] text-tomato">
              LivE Library
            </div>
            <div className="mt-1 font-display text-xl leading-none tracking-wide">Highlights</div>
          </div>
          <button className="rounded-full border-2 border-ink bg-tomato px-4 py-2 text-xs font-extrabold text-ink shadow-hard-sm">
            Share
          </button>
        </div>

        {["Kitchen natural light", "Primary suite", "Street view"].map(
          (item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border-2 border-ink bg-white p-2.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-lime font-display text-base">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-bold">{item}</div>
                <div className="mt-0.5 text-xs text-ink/55">Tap to replay</div>
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
      ? "bg-lime text-ink"
      : tone === "red"
      ? "bg-tomato text-ink"
      : "bg-cream text-ink";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink shadow-hard-sm`}
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
