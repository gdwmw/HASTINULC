import { IAuthResponse, IAuthSchema, IDatasResponse, ILoginPayload } from "@/src/types/api";

import { GETDatasByDocumentId } from "../../datas";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface IMapDataToResponse extends IAuthSchema, IDatasResponse {}

const mapDataToResponse = (dt: IMapDataToResponse): IAuthResponse => ({
  datasDocumentId: dt.user.datasDocumentId,
  email: dt.user.email,
  id: dt.user.id,
  image: dt.image,
  name: dt.name,
  phoneNumber: dt.phoneNumber,
  role: dt.role,
  status: "authenticated",
  token: dt.jwt,
  username: dt.user.username,
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

    const datasResponse = await GETDatasByDocumentId(response.user.datasDocumentId);

    const result: IMapDataToResponse = {
      ...response,
      ...datasResponse,
    };

    return mapDataToResponse(result);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
