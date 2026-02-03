export const ORDER_STATUSES = [
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

export type ValidOrderStatus = (typeof ORDER_STATUSES)[number];
