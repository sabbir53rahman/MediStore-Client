"use client";

import { Menu, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cartService } from "@/services/cart.service";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarClientProps {
  user: any | null;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
  ];

  const menuWithDashboard = user
    ? [
        ...menu,
        {
          title: "Dashboard",
          url: user.role === "SELLER" ? "/seller-dashboard" : "/dashboard",
        },
      ]
    : menu;

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      const { data, error }: any = await cartService.getMyCart();
      console.log("show cart  data from nav", data);

      if (!error && data?.data?.items) {
        setCartCount(data.data.items.length);
      } else {
        setCartCount(0);
      }
    };

    fetchCart();
  }, [user]);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/login");
          },
        },
      });
    } catch (err) {
      console.error("Sign out failed:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <section className={cn("py-4")}>
      <div className="container mx-auto p-4">
        {/* Desktop */}
        <nav className="hidden items-center justify-between lg:flex">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
              M
            </div>{" "}
            <span className="text-lg font-semibold">MediStore</span>
          </Link>

          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {menuWithDashboard.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* <ModeToggle /> */}

            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/cart")}
                  className="relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Button>

                <Avatar>
                  <AvatarImage src={user.image || undefined} />
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="lg:hidden flex justify-between">
          <Link href="/">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
              M
            </div>{" "}
            MediStore
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>MediStore</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-6">
                {menuWithDashboard.map((item) => (
                  <Link key={item.title} href={item.url}>
                    {item.title}
                  </Link>
                ))}

                {user ? (
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push("/cart")}
                      className="relative"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </Button>
                    <Button onClick={handleLogout}>Logout</Button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login">Login</Link>
                    <Link href="/auth/register">Register</Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
