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
      <div className="px-5 flex items-center justify-between border-b border-white/10 bg-white/5">
        <span className="text-sm text-slate-300">{title}</span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-white/20"></span>
          <span className="w-4 h-4 rounded-full bg-white/20"></span>
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
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-300 shrink-0">
                  Agent
                </div>
              )}
              <div
                className={clsx(
                  "p-3 rounded-2xl text-sm max-w-[75%] leading-relaxed",
                  msg.role === "user"
                    ? "bg-blue-500/20 text-blue-100 rounded-tr-sm"
                    : "bg-white/10 text-slate-200 rounded-tl-sm"
                )}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-300 shrink-0">
                  Me
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="px-5 flex items-center gap-2 border-t border-white/10 bg-white/5">
        <div className="flex-1 my-3 h-9 rounded-full bg-white/10 flex items-center px-3 text-xs text-slate-500">
          Message...
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-white/50"
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
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
              LivE Showing
            </div>
            <div className="mt-1 text-lg font-bold">Modern townhome tour</div>
          </div>
          <div className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold">
            LIVE
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-3xl bg-white/14 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Agent camera</span>
              <span className="text-white/65">1.2k watching</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-2xl bg-white/15 py-3">Kitchen</div>
              <div className="rounded-2xl bg-white/15 py-3">Light</div>
              <div className="rounded-2xl bg-white/15 py-3">Storage</div>
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
    <div className="flex h-full flex-col bg-[#0b1018] text-white">
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
        <div className="absolute left-4 top-5 rounded-full bg-white/16 px-3 py-1 text-xs font-bold backdrop-blur">
          Saved Tour
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-2xl font-bold leading-tight">
            Waterfront showing replay
          </div>
          <div className="mt-2 text-sm text-white/70">12 rooms · 34 clips</div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              LivE Library
            </div>
            <div className="mt-1 text-lg font-bold">Highlights</div>
          </div>
          <button className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">
            Share
          </button>
        </div>

        {["Kitchen natural light", "Primary suite", "Street view"].map(
          (item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-semibold">{item}</div>
                <div className="mt-1 text-xs text-white/45">Tap to replay</div>
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
      ? "bg-blue-600"
      : tone === "red"
      ? "bg-red-500"
      : "bg-black/55";

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
