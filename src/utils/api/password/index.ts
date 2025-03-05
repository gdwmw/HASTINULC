import { getAllSession } from "@/src/hooks";
import { IAuthSchema, IPasswordPayload } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const POSTChangePassword = async (payload: IPasswordPayload): Promise<IAuthSchema> => {
  try {
    const session = await getAllSession();

    const res = await fetch(`${API_URL}/api/auth/change-password?populate=*`, {
      body: JSON.stringify({ ...payload }),
      headers: {
        Authorization: `Bearer ${session?.user?.token ?? ""}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to post: Change Password with status ${res.status} || ${response.error.message}`);
    }

    return response;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
