import { z } from 'zod';
import type { Logger } from 'pino';
import type { NormalizedMessage } from './models/NormalizedMessage.js';

/**
 * Schema for webhook configuration.
 */
export const WebhookConfigSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  defaultUsername: z.string().optional(),
  defaultAvatarUrl: z.string().url().optional(),
});

/**
 * Schema for source configuration.
 */
export const SourceConfigSchema = z.object({
  id: z.string(),
  type: z.enum(['reddit', 'rss', 'github', 'discord', 'json']),
  targetWebhookId: z.string(),
  options: z.record(z.unknown()),
  pollInterval: z.string().optional(),
});

/**
 * Schema for the main application configuration.
 */
export const AppConfigSchema = z.object({
  discordToken: z.string().min(1),
  prefix: z.string().default('$'),
  logLevel: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  adminIds: z.array(z.string()).optional().default([]),
});

export type WebhookConfig = z.infer<typeof WebhookConfigSchema>;
export type SourceConfig = z.infer<typeof SourceConfigSchema>;
export type AppConfig = z.infer<typeof AppConfigSchema>;

/**
 * Interface for dependency injection container.
 */
export interface IServiceContainer {
  readonly config: AppConfig;
  getLogger(): Logger;
  getWebhookManager(): IWebhookManager;
  getDedupe(): IDedupe;
}

/**
 * Interface for webhook delivery mechanisms.
 */
export interface IWebhookManager {
  send(webhookId: string, message: NormalizedMessage): Promise<void>;
}

/**
 * Interface for duplicate message detection.
 */
export interface IDedupe {
  isDuplicate(message: NormalizedMessage): boolean;
}

/**
 * Interface for application lifecycle and state control.
 * Used by the command suite to interact with the core application safely.
 */
export interface IApplicationControl {
  reload(): Promise<void>;
  pause(): void;
  resume(): void;
  isPaused(): boolean;
  getSources(): SourceConfig[];
  getWebhooks(): WebhookConfig[];
  addSource(source: SourceConfig): Promise<void>;
  removeSource(id: string): Promise<void>;
}