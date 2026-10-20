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
  theme = "dark",
}: {
  title?: string;
  accent?: "emerald" | "sky" | "violet" | "amber";
  messages?: ChatMessage[];
  /** "violet-light" is the white-and-purple AI assistant skin. */
  theme?: "dark" | "violet-light";
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

/** White-and-violet skin mirroring the LivEstates AI chat screen in the app.
 *  Scoped to its own component so the dark agent chats elsewhere keep their
 *  look. Sized for the 272x592 screen; below lg the whole phone is scaled. */
function VioletChat({
  title,
  messages,
}: {
  title: string;
  messages: ChatMessage[];
}) {
  return (
    <div className="flex h-full flex-col bg-white font-app text-[#111827]">
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
        <div className="text-[12.5px] font-bold tracking-[-0.01em] text-[#5B21D6]">
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
                        className="whitespace-nowrap rounded-full border-[1.25px] border-[#5B21D6] bg-white px-[8px] py-[5.5px] text-[9.5px] font-medium leading-none text-[#5B21D6]"
                      >
                        {reply}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end pr-[1px]">
                <div className="max-w-[74%] rounded-[15px] rounded-br-[5px] bg-[#5B21D6] px-[10px] py-[7px] text-[10.5px] leading-[1.45] text-white">
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
            className="h-[14px] w-[14px] stroke-[#5B21D6]"
            fill="none"
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
    <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#5B21D6]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="#fff">
        <path d="M10 3.5Q10.6 12.4 18.5 13Q10.6 13.6 10 22.5Q9.4 13.6 1.5 13Q9.4 12.4 10 3.5Z" />
        <path d="M18.5 1.5Q18.8 5.2 22.5 5.5Q18.8 5.8 18.5 9.5Q18.2 5.8 14.5 5.5Q18.2 5.2 18.5 1.5Z" />
      </svg>
    </div>
  );
}
