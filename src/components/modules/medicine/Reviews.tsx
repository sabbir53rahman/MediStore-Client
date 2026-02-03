type ReviewsProps = {
  reviews: any[];
  onDelete: (reviewId: string) => void;
  onEdit: (review: any) => void;
};

const Reviews = ({ reviews, onDelete, onEdit }: ReviewsProps) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="border-b py-6 px-4 mb-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  {review.user?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>

            <p className="text-gray-700 mt-3">{review.comment}</p>

            <div className="flex gap-4 mt-4 justify-end">
              <button
                className="text-blue-600 hover:text-blue-800 focus:outline-none transition duration-200"
                onClick={() => onEdit(review)}
              >
                <span className="font-semibold">Edit</span>
              </button>
              <button
                className="text-red-600 hover:text-red-800 focus:outline-none transition duration-200"
                onClick={() => onDelete(review.id)}
              >
                <span className="font-semibold">Delete</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
