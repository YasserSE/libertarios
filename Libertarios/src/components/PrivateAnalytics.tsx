"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { stripPrivateUrl } from "@/lib/analytics-url";

/** Vercel Web Analytics sin datos privados en la URL (ver `analytics-url.ts`). */
function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = stripPrivateUrl(event.url);
  return url ? { ...event, url } : null;
}

export function PrivateAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
