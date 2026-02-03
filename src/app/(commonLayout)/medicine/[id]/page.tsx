"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { getMedicineByIdAction } from "@/actions/medicine.actions";
import {
  createReviewAction,
  deleteReviewAction,
  getReviewsByMedicineAction,
  updateReviewAction, // Import the updateReviewAction
} from "@/actions/review.actions";
import LoadingSpinner from "@/components/modules/medicine/LoadingSpinner";
import ErrorMessage from "@/components/modules/medicine/ErrorMessage";
import MedicineInfo from "@/components/modules/medicine/MedicineInfo";
import Reviews from "@/components/modules/medicine/Reviews";
import ReviewForm from "@/components/modules/medicine/ReviewForm";

export default function MedicineDetailsPage() {
  const params = useParams();
  const medicineId = params.id as string;

  const [medicine, setMedicine] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [editingReview, setEditingReview] = useState<any | null>(null); // Add state for editing review

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicine = async () => {
    try {
      const res: any = await getMedicineByIdAction(medicineId);
      if (!res?.data || !res.data.data) {
        setError("Medicine data is not in the expected format");
        return;
      }
      setMedicine(res.data.data);
    } catch (error) {
      console.error("Error fetching medicine:", error);
      setError("Failed to load medicine details");
    }
  };

  const fetchReviews = async () => {
    try {
      const res: any = await getReviewsByMedicineAction(medicineId);
      if (!res || !res.data || !res.data.data) {
        setError("Failed to load reviews");
        return;
      }
      setReviews(res.data.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews");
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await fetchMedicine();
        await fetchReviews();
      } catch (err) {
        setError("Failed to load medicine details");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [medicineId]);

  const handleDelete = async (reviewId: string) => {
    const res = await deleteReviewAction(reviewId);
    if (!res.success) {
      toast.error(res.error);
      return;
    }
    toast.success("Review deleted");
    await fetchReviews();
  };

  const handleEdit = (review: any) => {
    // Set the review data for editing
    setEditingReview(review);
    setRating(review.rating); // Set current rating to the review's rating
    setComment(review.comment || ""); // Set the comment for editing
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;

    const res = await updateReviewAction(editingReview.id, {
      rating,
      comment,
    });

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    toast.success("Review updated successfully");
    setEditingReview(null); // Reset after update
    setRating(0); // Reset rating
    setComment(""); // Reset comment
    await fetchReviews(); // Fetch the updated reviews
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <MedicineInfo medicine={medicine} />
      <Reviews reviews={reviews} onDelete={handleDelete} onEdit={handleEdit} />
      <ReviewForm
        rating={rating}
        comment={comment}
        setRating={setRating}
        setComment={setComment}
        onSubmit={async (rating, comment) => {
          if (editingReview) {
            // If we are editing a review, call the update function
            await handleUpdateReview();
          } else {
            // Create new review
            const res = await createReviewAction(medicineId, {
              rating,
              comment,
            });
            if (!res.success) {
              toast.error(res.error);
              return;
            }
            toast.success("Review added");
            setRating(0);
            setComment("");
            await fetchReviews();
          }
        }}
      />
    </div>
  );
}
