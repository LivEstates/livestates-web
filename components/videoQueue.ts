// Orders background-video downloads so the first hero clip gets the whole
// connection. Queued clips wait until that clip is fully buffered, the visitor
// starts interacting, or a short fallback expires; then they load one at a
// time in priority order.
//
// Their posters don't wait that long. They all load as soon as the first clip
// is playing: they are small, and a visitor who scrolls ahead of the queue
// sees the slide's first frame instead of an empty slide.
//
// The posters further down also load all at once, as soon as the visitor
// heads down the page, before the videos down there start splitting the link.

type Job = { priority: number; run: () => Promise<void> };

const FALLBACK_MS = 4000;
// Visitor intent only: plain `scroll` also fires for programmatic scrolling.
const INTENT_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

const jobs: Job[] = [];
let released = false;
let running = false;
let armed = false;

/** Turns on once. `when(show)` calls `show` then, or at once if it already
 *  has, and returns a function that cancels it. */
function latch() {
  let on = false;
  const waiters = new Set<() => void>();
  return {
    release() {
      if (on) return;
      on = true;
      waiters.forEach((show) => show());
      waiters.clear();
    },
    when(show: () => void) {
      if (on) {
        show();
        return () => {};
      }
      waiters.add(show);
      return () => {
        waiters.delete(show);
      };
    },
  };
}

const queuedPosters = latch();
const nearPosters = latch();

export function releaseVideoQueue() {
  if (released) return;
  released = true;
  releasePosters();
  void pump();
}

/** Lets queued clips show their posters. The first hero clip calls this once
 *  it is playing; releasing the queue does too. */
export function releasePosters() {
  queuedPosters.release();
}

/** Calls `show` once posters are released. Returns a function that cancels it. */
export function whenPostersReleased(show: () => void) {
  return queuedPosters.when(show);
}

/** Lets every `near` clip show its poster. The first of them to start loading
 *  calls this. */
export function releaseNearPosters() {
  nearPosters.release();
}

/** Calls `show` once `near` posters are released. Returns a function that
 *  cancels it. */
export function whenNearPostersReleased(show: () => void) {
  return nearPosters.when(show);
}

/** True once the first hero clip no longer needs the whole connection. */
export function isVideoQueueReleased() {
  return released;
}

/** Queues `run`. Returns a function that drops the job if it hasn't started. */
export function enqueueVideo(priority: number, run: () => Promise<void>) {
  arm();
  const job = { priority, run };
  jobs.push(job);
  jobs.sort((a, b) => a.priority - b.priority);
  void pump();
  return () => {
    const i = jobs.indexOf(job);
    if (i >= 0) jobs.splice(i, 1);
  };
}

function arm() {
  if (armed || typeof window === "undefined") return;
  armed = true;
  window.setTimeout(releaseVideoQueue, FALLBACK_MS);
  for (const ev of INTENT_EVENTS) {
    window.addEventListener(ev, releaseVideoQueue, { once: true, passive: true });
  }
}

async function pump() {
  if (!released || running) return;
  running = true;
  while (jobs.length) {
    try {
      await jobs.shift()!.run();
    } catch {
      // A clip that fails must not hold up the ones behind it.
    }
  }
  running = false;
}
