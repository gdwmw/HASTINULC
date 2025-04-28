export type TRole = "admin" | "demo" | "user";
export type TIndicator = "Canceled" | "On Going" | "Payment" | "Rejected" | "Success" | "Waiting";

// ----------------------------

export interface IDummyAccount {
  email: string;
  password: string;
  response: IAuthResponse;
  username: string;
}

// ----------------------------

interface IExampleCommon {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IExampleSchema {
  data: {
    documentId: string;
  } & IExampleCommon;
}

export interface IExamplePayload extends IExampleCommon {
  documentId?: string;
}

export interface IExampleResponse extends IExampleCommon {}

// ----------------------------

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  identifier: string;
  password: string;
}

export interface IAuthSchema {
  jwt: string;
  user: IUserResponse;
}

interface IAuthCommon {
  id: string;
  dataId: string;
  dataDocumentId: string;
  imageId: null | string;
  username: string;
  phoneNumber: string;
  role: TRole;
  status: string;
  token: string;
  confirmed: boolean;
  blocked: boolean;
}

export interface IAuthResponse extends IAuthCommon {
  name: string;
  email: string;
  image?: null | string;
}

export interface INextAuthResponse extends IAuthCommon {
  name?: null | string;
  email?: null | string;
  image?: null | string;
}

// ----------------------------

export interface IPasswordPayload {
  email?: string;
  code?: string;
  currentPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}

// ----------------------------

export interface IUserPayload {
  id?: number;
  username?: string;
  email?: string;
  relation_data?: number;
}

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  relation_data?: IDataResponse;
  confirmed: boolean;
  blocked: boolean;
}

// ----------------------------

export interface IUploadPayload {
  files: FileList;
  ref?: string;
  refId?: string;
  field?: string;
}

export interface IUploadResponse {
  id: number;
  documentId: string;
  name: string;
  url: string;
  formats: { thumbnail: { url: string } } | null;
}

// ----------------------------

interface IDataCommon {
  name: string;
  phoneNumber: string;
}

export interface IDataPayload extends IDataCommon {
  id?: number;
  documentId?: string;
  image?: FileList | number;
  role?: TRole;
  relation_booking?: string;
  relation_review?: string;
  relation_questionnaire?: string;
}

export interface IDataResponse extends IDataCommon {
  id: number;
  documentId: string;
  image: IUploadResponse | null;
  role: TRole;
  relation_booking?: IBookingResponse[];
  relation_review?: IReviewResponse[];
  relation_questionnaire?: IQuestionnaireResponse[];
}

// ----------------------------

interface IBookingCommon {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  package: string;
  date: string;
  time: string[];
  googleMapsLink: string;
  tax: string;
  subtotal: string;
  total: string;
  indicator: TIndicator;
}

export interface IBookingPayload extends IBookingCommon {
  documentId?: string;
  relation_data: string;
  relation_review?: string;
}

export interface IBookingResponse extends IBookingCommon {
  documentId: string;
  relation_data: IDataResponse;
  relation_review?: IReviewResponse;
  createdAt: Date;
}

// ----------------------------

interface IReviewCommon {
  username: string;
  name: string;
  rating: number;
  description: string;
}

export interface IReviewPayload extends IReviewCommon {
  documentId?: string;
  image?: FileList | number[];
  relation_data?: string;
  relation_booking?: string;
}

export interface IReviewResponse extends IReviewCommon {
  id: number;
  documentId: string;
  image: IUploadResponse[] | null;
  relation_data: IDataResponse;
  relation_booking: IBookingResponse;
  createdAt: Date;
}

// ----------------------------

interface IQuestionnaireCommon {
  username: string;
  name: string;
  feedback: {
    id: number;
    question: string;
    answer: string;
  }[];
}

export interface IQuestionnairePayload extends IQuestionnaireCommon {
  documentId?: string;
  relation_data?: string;
}

export interface IQuestionnaireResponse extends IQuestionnaireCommon {
  documentId: string;
  relation_data: IDataResponse;
  createdAt: Date;
}
