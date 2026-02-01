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

export default function Profile() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchSession() {
      const { data, error } = await getSessionAction();
      if (error) {
        toast("Failed to load session");
      } else if (data) {
        setSession(data.user);
        setName(data.user.name);
        setImage(data.user.image || "");
      }
      setLoading(false);
    }

    fetchSession();
  }, []);

  const handleUpdate = async () => {
    if (!session) return;
    setUpdating(true);

    try {
      const result = await updateMyProfileAction(session.id, { name, image });
      console.log("Update result:", result);

      if (result.success) {
        setSession({ ...session, name, image });
        toast("Profile updated successfully!");
      } else {
        toast(`Failed to update profile: ${result.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      toast("Failed to update profile");
    }

    setUpdating(false);
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card className="border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>
            Update your profile information below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              {image ? (
                <AvatarImage src={image} alt="Profile" />
              ) : (
                <AvatarFallback>{name[0]}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={session.email}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Update Button */}
          <Button onClick={handleUpdate} disabled={updating} className="w-full">
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
