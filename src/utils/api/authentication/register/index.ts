import { IAuthResponse, IAuthSchema, IDataPayload, IDataResponse, IRegisterPayload } from "@/src/types";

import { POSTData } from "../../data";
import { PUTUser } from "../../user";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface IRearrange extends IAuthSchema, IDataResponse {}
interface IPayload extends IDataPayload, IRegisterPayload {}

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

    const dataResponse = await POSTData({
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      role: "user",
    });

    await PUTUser({ id: response.user.id, relation_data: dataResponse.id });

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
