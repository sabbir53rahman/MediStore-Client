export interface Category {
  id: string;
  name: string;
  createdAt: string; // ISO string from API
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  isFeatured?: boolean;

  categoryId: string;
  category: Category;

  sellerId: string;

  createdAt: string;
  updatedAt: string;
}
