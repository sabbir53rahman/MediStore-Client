"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
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

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarClientProps {
  user: any | null;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
  ];

  const menuWithDashboard = user
    ? [...menu, { title: "Dashboard", url: "/dashboard" }]
    : menu;

  const handleLogout = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <section className={cn("py-4")}>
      <div className="container mx-auto p-4">
        {/* Desktop */}
        <nav className="hidden items-center justify-between lg:flex">
          <Link href="/" className="flex items-center gap-2">
            💊 <span className="text-lg font-semibold">MediStore</span>
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

            <ModeToggle />

            {user ? (
              <div className="flex items-center gap-2">
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
          <Link href="/">💊 MediStore</Link>
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
