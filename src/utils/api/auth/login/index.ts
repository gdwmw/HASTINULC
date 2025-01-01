import { IAuthResponse, IAuthSchema, IDatasResponse, ILoginPayload } from "@/src/types/api";

import { GETDatasByDocumentId } from "../../datas";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface IMapDataToResponse extends IAuthSchema, IDatasResponse {}

const mapDataToResponse = (data: IMapDataToResponse): IAuthResponse => ({
  datasDocumentId: data.user.datasDocumentId,
  email: data.user.email,
  id: data.user.id,
  image: data.image,
  name: data.name,
  phoneNumber: data.phoneNumber,
  role: data.role,
  status: "authenticated",
  token: data.jwt,
  username: data.user.username,
});

export const POSTLogin = async (data: ILoginPayload): Promise<IAuthResponse> => {
  try {
    const loginRes = await fetch(`${API_URL}/api/auth/local?populate=*`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!loginRes.ok) {
      const loginResError = await loginRes.json();
      throw new Error(`Failed to post: Login with status ${loginRes.status} || ${loginResError.error.message}`);
    }

    const loginResData: IAuthSchema = await loginRes.json();

    const datasResData = await GETDatasByDocumentId(loginResData.user.datasDocumentId);

    const mergedData: IMapDataToResponse = {
      ...loginResData,
      ...datasResData,
    };

    return mapDataToResponse(mergedData);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
