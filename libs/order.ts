export enum ORDER_STATUS {
  PROCESSED = "Diproses",
  RENTED = "Disewa",
  DONE = "Selesai",
  CANCELED = "Dibatalkan",
}

export enum ORDER_STATUS_COLOR {
  PROCESSED = "primary.500",
  RENTED = "teal.500",
  DONE = "tertiary.500",
  CANCELED = "danger.500",
}

export const getOrderStatusColor = (status: string) => {
  if (status === ORDER_STATUS.PROCESSED) return ORDER_STATUS_COLOR.PROCESSED;
  if (status === ORDER_STATUS.RENTED) return ORDER_STATUS_COLOR.RENTED;
  if (status === ORDER_STATUS.DONE) return ORDER_STATUS_COLOR.DONE;
  return ORDER_STATUS_COLOR.CANCELED;
};
