"use server";

import { userService, GetUsersParams } from "@/services/user.service";

export async function getSessionAction() {
  const { data, error } = await userService.getSession();

  if (error) return { data: null, error };
  return { data, error: null };
}

export async function getAllUsersAction(params?: GetUsersParams) {
  const { data, error } = await userService.getAllUsers(params);

  if (error) return { data: null, error: error.message || error };
  return { data, error: null };
}

export async function getUserByIdAction(userId: string) {
  const { data, error } = await userService.getUserById(userId);

  if (error) return { data: null, error: error.message || error };
  return { data, error: null };
}

export async function updateMyProfileAction(
  userId: string,
  payload: { name?: string; image?: string },
  token: string,
) {
  const { data, error } = await userService.updateMyProfile(
    userId,
    payload,
    token,
  );

  if (error) return { success: false, error: error.message || error };
  return { success: true, data };
}

export async function adminUpdateUserStatusAction(
  userId: string,
  payload: { status: string },
  token: string,
) {
  const { data, error } = await userService.adminUpdateUserStatus(
    userId,
    payload,
    token,
  );

  if (error) return { success: false, error: error.message || error };
  return { success: true, data };
}

export async function deleteUserAction(userId: string, token: string) {
  const { data, error } = await userService.deleteUser(userId, token);

  if (error) return { success: false, error: error.message || error };
  return { success: true, data };
}
