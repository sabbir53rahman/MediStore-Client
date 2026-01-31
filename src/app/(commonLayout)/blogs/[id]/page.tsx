import { blogService } from "@/services/blog.service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, MessageSquare } from "lucide-react";
import Image from "next/image";
import { BlogPost } from "@/types";

export const dynamicParams = true; // only for showing static blogdata use false

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();

  return data?.data?.map((blog: BlogPost) => ({ id: blog.id })).splice(0, 3);
}

export default async function DynamicBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: post } = await blogService.getBlogById(id);

  // console.log(post);

  if (!post) {
    return <div className="text-center py-20">Post not found</div>;
  }

  return (
    <article className="container max-w-3xl mx-auto py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight leading-tight">
        {post.title}
      </h1>

      {/* Meta info */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>

        <Separator orientation="vertical" className="h-4" />

        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {post.views} views
        </div>

        <Separator orientation="vertical" className="h-4" />

        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          {post._count?.comments ?? 0} comments
        </div>
      </div>

      {/* Featured image */}
      {post.thumbnail && (
        <div className="mt-8 overflow-hidden rounded-xl border">
          <Image
            src={post.thumbnail}
            alt={post.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <Card className="mt-10">
        <CardContent className="prose prose-neutral max-w-none py-8">
          {post.content}
        </CardContent>
      </Card>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
