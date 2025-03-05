import { IAuthResponse, IAuthSchema, IDataResponse, ILoginPayload } from "@/src/types";

import { GETDataByDocumentId } from "../../data";
import { GETUserByDocumentId } from "../../user";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface IRearrange extends IAuthSchema, IDataResponse {}

const rearrange = (response: IRearrange): IAuthResponse => ({
  dataDocumentId: response.documentId ?? "",
  dataId: response.id.toString(),
  email: response.user.email,
  id: response.user.id.toString(),
  image: response.image ? API_URL + response.image.url : null,
  imageId: response.image?.id.toString() ?? null,
  name: response.name,
  phoneNumber: response.phoneNumber,
  role: response.role,
  status: "authenticated",
  token: response.jwt,
  username: response.user.username,
});

export const POSTLogin = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/local?populate=*`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to post: Login with status ${res.status} || ${response.error.message}`);
    }

    const userResponse = await GETUserByDocumentId(response.user.id);
    const dataResponse = await GETDataByDocumentId(userResponse.relation_data?.documentId ?? "");

    const result: IRearrange = {
      ...response,
      ...dataResponse,
    };

    return rearrange(result);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
