import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Manage Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Manage Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Manage Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
];
