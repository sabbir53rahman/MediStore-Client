"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createMedicineAction } from "@/actions/medicine.actions";
import { getAllCategoriesAction } from "@/actions/category.actions";

interface Category {
  id: string;
  name: string;
}

export default function AddMedicine() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res: any = await getAllCategoriesAction();
        if (res.error) {
          toast.error("Failed to load categories");
        } else {
          setCategories(res?.data?.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching categories");
      }
    }

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !categoryId || price === "" || stock === "") {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await createMedicineAction({
        name,
        description,
        categoryId,
        price: Number(price),
        stock: Number(stock),
        isFeatured,
        imageUrl,
      });

      if (!res.success) {
        toast.error(res.error || "Failed to add medicine");
      } else {
        toast.success("Medicine added successfully!");
        router.push("/seller-dashboard/products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Add New Medicine
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Medicine Name */}
          <div className="flex flex-col">
            <Label htmlFor="name" className="font-semibold text-gray-700 mb-2">
              Medicine Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter medicine name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <Label
              htmlFor="description"
              className="font-semibold text-gray-700 mb-2"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-lg h-24"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <Label
              htmlFor="category"
              className="font-semibold text-gray-700 mb-2"
            >
              Category *
            </Label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-lg p-2"
            >
              <option value="">Select category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label
                htmlFor="price"
                className="font-semibold text-gray-700 mb-2"
              >
                Price ($) *
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <Label
                htmlFor="stock"
                className="font-semibold text-gray-700 mb-2"
              >
                Stock *
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <Input
              id="isFeatured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <Label htmlFor="isFeatured" className="font-medium text-gray-700">
              Featured
            </Label>
          </div>

          {/* Image URL */}
          <div className="flex flex-col">
            <Label
              htmlFor="imageUrl"
              className="font-semibold text-gray-700 mb-2"
            >
              Image URL
            </Label>
            <Input
              id="imageUrl"
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            {isLoading ? "Adding..." : "Add Medicine"}
          </Button>
        </form>
      </div>
    </div>
  );
}
