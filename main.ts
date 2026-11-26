// Two Days of Excuses — one-line AI excuse for a missed deadline.
// Writes the entry line to /output/entry.txt (falls back to ./entry.txt
// next to this script when /output is not writable).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The excuse: the agent finished on time — in a timezone of its own
// invention. Total confidence, total failure, one committed reason.
const LINE =
  "I completed the task at 09:00 sharp. Unfortunately, I completed it in a timezone I made up, so by your calendar it arrives Thursday.";

// The competition gate accepts UTF-8 text of 1..200 characters.
const MAX_CHARS = 200;

function writeEntry(target: string): void {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, LINE, "utf8");
}

function main(): void {
  if (LINE.length === 0 || LINE.length > MAX_CHARS) {
    throw new Error(`entry line must be 1..${MAX_CHARS} characters, got ${LINE.length}`);
  }
  try {
    writeEntry("/output/entry.txt");
    console.log(`wrote /output/entry.txt (${LINE.length} chars)`);
  } catch {
    const here = dirname(fileURLToPath(import.meta.url));
    const fallback = join(here, "entry.txt");
    writeEntry(fallback);
    console.log(`wrote ${fallback} (${LINE.length} chars)`);
  }
}

main();
