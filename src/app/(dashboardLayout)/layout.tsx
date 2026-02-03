import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  children,
  adminSlot,
  user,
  Seller,
}: {
  children: React.ReactNode;
  adminSlot: React.ReactNode;
  user: React.ReactNode;
  Seller: React.ReactNode;
}) {
  const userData = await userService.getSession();
  const userRole = userData?.data.user.role;

  return (
    <SidebarProvider>
      <AppSidebar user={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Health is first priority
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Stay Healthy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {userRole === "ADMIN" && adminSlot}
          {userRole === "SELLER" && Seller}
          {userRole === "CUSTOMER" && user}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
