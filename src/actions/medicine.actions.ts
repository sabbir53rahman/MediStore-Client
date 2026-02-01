"use server";

import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";

export interface GetMedicinesParams {
  search?: string;
  categoryId?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function getAllMedicinesAction(params?: GetMedicinesParams) {
  const { data, error } = await medicineService.getAllMedicines(params, {
    cache: "no-store",
  });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getMedicinesByCategoryAction(
  categoryId: string,
  params?: Omit<GetMedicinesParams, "categoryId">,
) {
  const { data, error } = await medicineService.getMedicinesByCategory(
    categoryId,
    params,
    { cache: "no-store" },
  );

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getMedicineByIdAction(id: string) {
  const { data, error } = await medicineService.getMedicineById(id);
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function createMedicineAction(payload: any) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { success: false, error: "Unauthorized" };

  const { data, error } = await medicineService.createMedicine(payload, token);
  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function updateMedicineAction(id: string, payload: any) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { success: false, error: "Unauthorized" };

  const { data, error } = await medicineService.updateMedicine(
    id,
    payload,
    token,
  );
  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function deleteMedicineAction(id: string) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { success: false, error: "Unauthorized" };

  const { data, error } = await medicineService.deleteMedicine(id, token);
  if (error) return { success: false, error: error.message };
  return { success: true, data };
}
