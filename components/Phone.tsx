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
  /** Quick-reply chips shown under an assistant message (violet-light skin). */
  quickReplies?: string[];
}

export function MockChat({
  title = "Chats",
  accent = "emerald",
  messages,
  assistantLabel = "Agent",
  theme = "dark",
  rowInsetClassName = "",
}: {
  title?: string;
  accent?: "emerald" | "sky" | "violet" | "amber";
  messages?: ChatMessage[];
  assistantLabel?: string;
  /** "violet-light" is the white-and-purple AI assistant skin. */
  theme?: "dark" | "violet-light";
  /** Extra classes on each message row (dark skin), e.g. right padding where
   *  another phone overlaps this one's right edge. */
  rowInsetClassName?: string;
}) {
  if (theme === "violet-light" && messages) {
    return (
      <VioletChat title={title} messages={messages} />
    );
  }
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
                rowInsetClassName,
                msg.role === "user" ? "justify-end" : ""
              )}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-300 shrink-0">
                  {assistantLabel}
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

/** White-and-violet skin mirroring the LivEstates AI chat screen in the app.
 *  Scoped to its own component so the dark agent chats elsewhere keep their
 *  look. Sized for the 272x592 screen; below lg the whole phone is scaled. */
const VIOLET = "#5B21D6";

function VioletChat({
  title,
  messages,
}: {
  title: string;
  messages: ChatMessage[];
}) {
  return (
    <div
      className="flex h-full flex-col bg-white text-[#111827]"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Top bar: close / title / more */}
      <div className="mx-[10px] mt-[18px] flex h-[34px] shrink-0 items-center justify-between border-b border-[#E5E7EB] pb-[4px]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="ml-[2px] h-[13px] w-[13px] text-[#111827]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <div
          className="text-[12.5px] font-bold tracking-[-0.01em]"
          style={{ color: VIOLET }}
        >
          {title}
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 8"
          className="mr-[1px] h-[5px] w-[14px] text-[#111827]"
          fill="currentColor"
        >
          <circle cx="3" cy="4" r="3" />
          <circle cx="12" cy="4" r="3" />
          <circle cx="21" cy="4" r="3" />
        </svg>
      </div>

      {/* Conversation */}
      <div className="min-h-0 flex-1 overflow-hidden px-[10px] pt-[11px]">
        <div className="space-y-[9px]">
          {messages.map((msg) =>
            msg.role === "assistant" ? (
              <div key={msg.id}>
                <div className="flex items-end gap-[8px] pl-[3px]">
                  <SparkleAvatar />
                  <div className="max-w-[78%] rounded-[15px] rounded-bl-[5px] bg-[#F3F4F6] px-[9px] py-[7px] text-[10.5px] leading-[1.45] text-[#1F2937]">
                    {msg.text}
                  </div>
                </div>
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="mt-[8px] flex flex-wrap gap-[6px] pl-[31px] pr-[8px]">
                    {msg.quickReplies.map((reply) => (
                      <span
                        key={reply}
                        className="whitespace-nowrap rounded-full border-[1.25px] bg-white px-[8px] py-[5.5px] text-[9.5px] font-medium leading-none"
                        style={{ borderColor: VIOLET, color: VIOLET }}
                      >
                        {reply}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end pr-[1px]">
                <div
                  className="max-w-[74%] rounded-[15px] rounded-br-[5px] px-[10px] py-[7px] text-[10.5px] leading-[1.45] text-white"
                  style={{ backgroundColor: VIOLET }}
                >
                  {msg.text}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Composer: + / input / send */}
      <div className="flex shrink-0 items-center gap-[7px] px-[10px] pb-[22px] pt-[8px]">
        <div className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-[#F3F4F6]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[14px] w-[14px]"
            fill="none"
            stroke={VIOLET}
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
        <div className="flex h-[27px] min-w-0 flex-1 items-center rounded-full border border-[#E5E7EB] bg-white px-[10px] text-[10.5px] text-[#9CA3AF]">
          Ask me anything
        </div>
        <div className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-[#F3F4F6]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[12px] w-[12px] text-[#6B7280]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Violet circle with white four-point sparkles (the app's AI avatar). */
function SparkleAvatar() {
  return (
    <div
      className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: VIOLET }}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="#fff">
        <path d="M10 3.5Q10.6 12.4 18.5 13Q10.6 13.6 10 22.5Q9.4 13.6 1.5 13Q9.4 12.4 10 3.5Z" />
        <path d="M18.5 1.5Q18.8 5.2 22.5 5.5Q18.8 5.8 18.5 9.5Q18.2 5.8 14.5 5.5Q18.2 5.2 18.5 1.5Z" />
      </svg>
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
