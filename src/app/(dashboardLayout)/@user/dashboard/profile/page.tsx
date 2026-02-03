"use client";

import { useState, useEffect } from "react";
import {
  getSessionAction,
  updateMyProfileAction,
} from "@/actions/user.actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // For a better loading state

export default function Profile() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data, error } = await getSessionAction();
        if (error) {
          toast.error("Failed to load session");
        } else if (data?.user) {
          setSession(data.user);
          setName(data.user.name || "");
          setImage(data.user.image || "");
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  const handleUpdate = async () => {
    if (!session?.id) return;

    // Simple validation
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setUpdating(true);
    try {
      // Calling your server action
      const result = await updateMyProfileAction(session.id, {
        name: name.trim(),
        image: image.trim(),
      });

      if (result.success) {
        // Update local state so the UI reflects changes immediately
        setSession((prev: any) => ({ ...prev, name, image }));
        toast.success("Profile updated successfully!");
      } else {
        toast.error(`Update failed: ${result.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <Card className="border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>
            Update your public profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image & Avatar */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="w-24 h-24 border">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl">
                {name ? name.substring(0, 2).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 w-full">
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field (Disabled) */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-gray-500">
              Email Address (Cannot be changed)
            </Label>
            <Input
              id="email"
              value={session?.email || ""}
              readOnly
              className="bg-gray-50 text-gray-500 cursor-not-allowed border-dashed"
            />
          </div>

          {/* Action Button */}
          <Button
            onClick={handleUpdate}
            disabled={updating}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          >
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving changes...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
