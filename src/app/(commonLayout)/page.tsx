import { userService } from "@/services/user.service";

export default async function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Welcome </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  );
}
