"use client";
import { useEffect } from "react";

type ReviewFormProps = {
  rating: number;
  comment: string;
  setRating: (rating: number) => void;
  setComment: (comment: string) => void;
  onSubmit: (rating: number, comment: string) => void;
  initialReview?: any; // Optional prop for editing
};

const ReviewForm = ({
  rating,
  comment,
  setRating,
  setComment,
  onSubmit,
  initialReview,
}: ReviewFormProps) => {
  useEffect(() => {
    if (initialReview) {
      setRating(initialReview.rating);
      setComment(initialReview.comment || "");
    }
  }, [initialReview, setRating, setComment]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(rating, comment);
      }}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md mx-auto"
    >
      <div className="flex items-center gap-3">
        <label htmlFor="rating" className="text-lg font-semibold text-gray-700">
          Rating:
        </label>
        <input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          className="w-16 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="comment"
          className="text-lg font-semibold text-gray-700"
        >
          Review:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {initialReview ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
