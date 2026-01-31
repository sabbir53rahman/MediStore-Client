import { BlogCard } from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { cache } from "react";

export default async function Home() {
  const { data } = await blogService.getBlogPosts(
    {
      isFeatured: false,
      search: "",
    },
    {
      // cache: "no-store",
      revalidate: 10,
    },
  );

  // console.log(data);
  return (
    <div className="container mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data?.map((post: BlogPost) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
