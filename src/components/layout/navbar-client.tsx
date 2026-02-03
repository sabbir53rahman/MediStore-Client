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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cartService } from "@/services/cart.service";
import { authClient } from "@/lib/auth-client";

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
  const [isSticky, setIsSticky] = useState(false);
  const [showSticky, setShowSticky] = useState(false); // for animation

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

  const showCart = user?.role === "CUSTOMER";

  // Fetch cart items
  useEffect(() => {
    if (!user || !showCart) return;

    const fetchCart = async () => {
      const { data, error }: any = await cartService.getMyCart();
      if (!error && data?.data?.items) {
        setCartCount(data.data.items.length);
      } else {
        setCartCount(0);
      }
    };

    fetchCart();
  }, [user, showCart]);

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsSticky(scrolled);

      if (scrolled) {
        // trigger slide-down after a tiny delay
        setTimeout(() => setShowSticky(true), 50);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push("/auth/login"),
        },
      });
    } catch (err) {
      console.error("Sign out failed:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <section
      className={cn(
        "z-50 w-full transition-all duration-500 ease-in-out bg-white",
        isSticky ? "fixed top-0 left-0 right-0 shadow-md" : "relative",
      )}
      style={{
        transform: showSticky
          ? "translateY(0)"
          : isSticky
            ? "translateY(-100%)"
            : "translateY(0)",
        transition: "transform 0.5s ease-in-out",
      }}
    >
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
            M
          </div>
          <span className="text-lg font-semibold text-blue-700">MediStore</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {menuWithDashboard.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="text-blue-700 font-semibold hover:text-blue-900"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Cart (CUSTOMER only) */}
          {showCart && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/cart")}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5 text-blue-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
          )}

          {/* User */}
          {user ? (
            <>
              <Avatar>
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
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
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-2">
          {showCart && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/cart")}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5 text-blue-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="w-5 h-5 text-blue-700" />
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
                  <Button onClick={handleLogout}>Logout</Button>
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
