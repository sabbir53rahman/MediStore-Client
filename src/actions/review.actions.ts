"use server";

import { reviewService } from "@/services/review.service";

export async function createReviewAction(
  medicineId: string,
  payload: { rating: number; comment?: string },
) {
  const { data, error } = await reviewService.createReview(medicineId, payload);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function getReviewsByMedicineAction(medicineId: string) {
  const { data, error } = await reviewService.getReviewsByMedicine(medicineId);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function updateReviewAction(
  reviewId: string,
  payload: { rating?: number; comment?: string },
) {
  const { data, error } = await reviewService.updateReview(reviewId, payload);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function deleteReviewAction(reviewId: string) {
  const { data, error } = await reviewService.deleteReview(reviewId);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}
