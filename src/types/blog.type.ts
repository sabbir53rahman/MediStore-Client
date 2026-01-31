export interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  tags: string[];
  views: number;
  _count?: {
    comments: number;
  };
  isFeatured?: boolean;
  createdAt: Date;
}
