import { IAuthResponse, IAuthSchema, IDatasPayload, IDatasResponse, IRegisterPayload } from "@/src/types/api";

import { POSTDatas } from "../../datas";
import { PUTUsers } from "../../users";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface IMapDataToResponse extends IAuthSchema, IDatasResponse {}
interface IPayload extends IDatasPayload, IRegisterPayload {}

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

export const POSTRegister = async (data: IPayload): Promise<IAuthResponse> => {
  try {
    const registerPayload: IRegisterPayload = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    const registerRes = await fetch(`${API_URL}/api/auth/local/register?populate=*`, {
      body: JSON.stringify(registerPayload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!registerRes.ok) {
      const registerResError = await registerRes.json();
      throw new Error(`Failed to post: Register with status ${registerRes.status} || ${registerResError.error.message}`);
    }

    const registerResData: IAuthSchema = await registerRes.json();

    const datasPayload: IDatasPayload = {
      image: 1,
      name: data.name,
      phoneNumber: data.phoneNumber,
      role: "user",
    };

    const datasResData: IDatasResponse = await POSTDatas(datasPayload);

    const resUsers = await PUTUsers({ datasDocumentId: datasResData.documentId, id: registerResData.user.id });

    const mergeData: IMapDataToResponse = {
      ...registerResData,
      ...datasResData,
      user: {
        ...registerResData.user,
        datasDocumentId: resUsers.datasDocumentId,
      },
    };

    return mapDataToResponse(mergeData);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
