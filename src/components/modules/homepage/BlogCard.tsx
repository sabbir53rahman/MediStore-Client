import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types";
import Link from "next/link";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.id}`}>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-xl",
          "bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60",
        )}
      >
        {/* Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              No Image
            </div>
          )}

          {post.isFeatured && (
            <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>

        {/* Content */}
        <CardContent className="space-y-4 p-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full px-3 py-0.5 text-xs"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.content}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between px-5 pb-5 pt-0 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {post.views}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
