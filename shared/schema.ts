import { z } from "zod";

export const subscriptionFormatSchema = z.enum(["base64", "clash", "singbox"]);
export type SubscriptionFormat = z.infer<typeof subscriptionFormatSchema>;

export interface SubscriptionInfo {
  format: SubscriptionFormat;
  replitUrl: string;
  originalUrl: string;
}
