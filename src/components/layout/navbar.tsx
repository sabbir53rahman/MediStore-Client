import { userService } from "@/services/user.service";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const { data: session } = await userService.getSession();

  return <NavbarClient user={session?.user ?? null} />;
}
