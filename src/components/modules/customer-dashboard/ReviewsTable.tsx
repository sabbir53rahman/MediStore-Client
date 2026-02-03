"use client";

interface Props {
  reviews: any[];
}

export default function ReviewsTable({ reviews }: Props) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">My Reviews</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Medicine</th>
            <th className="text-left p-2">Rating</th>
            <th className="text-left p-2">Comment</th>
            <th className="text-left p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} className="border-b">
              <td className="p-2">{review.medicine?.name ?? "N/A"}</td>
              <td className="p-2">{review.rating}</td>
              <td className="p-2">{review.comment ?? "-"}</td>
              <td className="p-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
