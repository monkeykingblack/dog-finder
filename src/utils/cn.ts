import type { ClassValue } from "clsx";

import { clsx } from "clsx";

import { tv } from "./tv";

const base = tv({});

export function cn(...inputs: ClassValue[]) {
  return base({
    className: clsx(inputs),
  });
}
