"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  updateMedicineAction,
  getMedicineByIdAction,
} from "@/actions/medicine.actions";
import { getAllCategoriesAction } from "@/actions/category.actions";

interface Category {
  id: string;
  name: string;
}

export default function UpdateMedicine() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategoriesAction();
        if (res.error) {
          toast.error("Failed to load categories");
        } else {
          setCategories(res?.data?.data || []);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching categories");
      }
    }
    fetchCategories();
  }, []);

  // Fetch medicine by ID
  useEffect(() => {
    if (!id) return;

    async function fetchMedicine() {
      setIsFetching(true);
      try {
        const res = await getMedicineByIdAction(id);
        if (res.error) {
          toast.error("Failed to load medicine data");
        } else if (res.data?.data) {
          const med = res.data.data;
          setName(med.name || "");
          setDescription(med.description || "");
          setCategoryId(med.category?.id || "");
          setPrice(med.price ?? 0);
          setStock(med.stock ?? 0);
          setIsFeatured(med.isFeatured ?? false);
          setImageUrl(med.imageUrl || "");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching medicine");
      } finally {
        setIsFetching(false);
      }
    }

    fetchMedicine();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await updateMedicineAction(id, {
        name,
        description,
        categoryId,
        price,
        stock,
        isFeatured,
        imageUrl,
      });
      console.log(id);

      if (!res.success) {
        toast.error(res.error || "Failed to update medicine");
      } else {
        toast.success("Medicine updated successfully!");
        router.push("/seller-dashboard/products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-gray-600">
        Loading medicine data...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 border">
        <h1 className="text-3xl font-bold mb-8 text-center">Update Medicine</h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <Label>Medicine Name *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Category *</Label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price *</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Stock *</Label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              className="size-5"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <Label>Featured</Label>
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Medicine"}
          </Button>
        </form>
      </div>
    </div>
  );
}
