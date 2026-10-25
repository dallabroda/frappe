// Pulse telemetry types. Cred Hub never loads the pulse client (see loadPulseClient),
// so telemetry is always off.

import { call } from "frappe-ui";

export interface PulseContext {
  user?: string;
  team?: string;
}

// "cookieless" (default): host derives the anon id at ingest. "client": mints a
// persistent localStorage anon id.
export type PulseAnonymousMode = "cookieless" | "client";

export interface PulseClientOptions {
  host?: string;
  apiKey?: string;
  site?: string;
  enabled?: boolean;
  getContext?: () => PulseContext;
  anonymousMode?: PulseAnonymousMode;
  flushInterval?: number;
  maxQueueSize?: number;
  now?: () => string;
  clientUrl?: string;
}

export interface PulseClient {
  init(): Promise<boolean>;
  setEnabled(enabled: boolean): void;
  capture(event_name: string, app: string, props?: Record<string, any>): void;
  // Distinct id on events (known identity, else anon id); used to alias() pre-signup
  // activity. Optional: an older CDN build may not expose it.
  getDistinctId?(): string;
  flush(): Promise<void> | undefined;
  stop(): void;
}

// Shape returned by the framework's whitelisted boot_config method.
export interface BootConfig {
  enabled?: boolean;
  host?: string;
  key?: string;
  site?: string;
  user?: string;
  team?: string;
  client_url?: string;
  site_age?: number;
}

export const BOOT_CONFIG_METHOD =
  "frappe.utils.telemetry.pulse.client.boot_config";

// Direct-mode config from the app's own backend (frappe-ui SPAs lack desk's
// window.frappe.boot). Degrades to {} on any error, including old backends (404).
export async function fetchBootConfig(): Promise<BootConfig> {
  try {
    return (await call(BOOT_CONFIG_METHOD)) || {};
  } catch (error) {
    return {};
  }
}

export async function loadPulseClient(
  _options: PulseClientOptions = {},
): Promise<PulseClient | null> {
  // Cred Hub: the pulse client used to be imported at runtime from Frappe's CDN
  // (pulse.m.frappe.cloud) even with telemetry off. No code is loaded from outside
  // the server, so telemetry stays off.
  return null;
}
