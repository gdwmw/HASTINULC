import { IAuthResponse, IAuthSchema, IDatasPayload, IDatasResponse, IRegisterPayload } from "@/src/types/api";

import { POSTDatas } from "../../datas";
import { PUTUsers } from "../../users";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface IMapDataToResponse extends IAuthSchema, IDatasResponse {}
interface IPayload extends IDatasPayload, IRegisterPayload {}

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

export const POSTRegister = async (payload: IPayload): Promise<IAuthResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/local/register?populate=*`, {
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        username: payload.username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to post: Register with status ${res.status} || ${response.error.message}`);
    }

    const datasResponse = await POSTDatas({
      image: 1,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      role: "user",
    });

    const usersResponse = await PUTUsers({ datasDocumentId: datasResponse.documentId, id: response.user.id });

    const result: IMapDataToResponse = {
      ...response,
      ...datasResponse,
      user: {
        ...response.user,
        datasDocumentId: usersResponse.datasDocumentId,
      },
    };

    return mapDataToResponse(result);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
