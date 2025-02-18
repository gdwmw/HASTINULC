export interface IAuthSchema {
  jwt: string;
  user: IUsersResponse;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  username: string;
}

export interface ILoginPayload {
  identifier: string;
  password: string;
}

export interface IAuthResponse {
  datasDocumentId: string;
  datasId: string;
  email: string;
  id: number;
  image?: null | string;
  name: string;
  phoneNumber: string;
  role: string;
  status: string;
  token: string;
  username: string;
}

export interface INextAuthResponse {
  datasDocumentId: string;
  datasId: string;
  email?: null | string;
  id: string;
  image?: null | string;
  name?: null | string;
  phoneNumber: string;
  role: string;
  status: string;
  token: string;
  username: string;
}

// ----------------------------

export interface IUsersPayload {
  datasDocumentId?: string;
  email?: string;
  id?: number;
  username?: string;
}

export interface IUsersResponse {
  datasDocumentId: string;
  email: string;
  id: number;
  username: string;
}

// ----------------------------

export interface IUploadPayload {
  field?: string;
  files: FileList;
  ref?: string;
  refId?: string;
}

export interface IUploadResponse {
  documentId: string;
  id: number;
  name: string;
  thumbnail: { name: string; url: string }[] | null;
  url: string;
}

// ----------------------------

export interface IDatasPayload {
  bookings?: string;
  documentId?: string;
  id?: number;
  image?: FileList | number;
  name: string;
  phoneNumber: string;
  questionnaires?: string;
  reviews?: string;
  role?: string;
}

export interface IDatasResponse {
  bookings: IBookingsResponse[];
  documentId: string;
  id: number;
  image: {
    id: number;
    url: string;
  };
  name: string;
  phoneNumber: string;
  questionnaires: IQuestionnairesResponse[];
  reviews: IReviewsResponse[];
  role: string;
}

// ----------------------------

export interface IBookingsPayload {
  current: Date;
  data: string;
  date: string;
  documentId?: string;
  email: string;
  event: string;
  googleMapsLink: string;
  indicator: string;
  name: string;
  phoneNumber: string;
  review?: string;
  subTotal: string;
  tax: string;
  time: string[];
  total: string;
  username: string;
}

export interface IBookingsResponse {
  current: Date;
  data: string;
  date: string;
  documentId: string;
  email: string;
  event: string;
  googleMapsLink: string;
  indicator: string;
  name: string;
  phoneNumber: string;
  review?: IReviewsResponse;
  subTotal: string;
  tax: string;
  time: string[];
  total: string;
  username: string;
}

// ----------------------------

export interface IReviewsPayload {
  booking?: string;
  current: Date;
  data?: string;
  description: string;
  documentId?: string;
  images?: FileList | number;
  name: string;
  rating: number;
  username: string;
}

export interface IReviewsResponse {
  booking?: IBookingsResponse;
  current: Date;
  data?: IDatasResponse;
  description: string;
  documentId: string;
  id: number;
  images: string[];
  name: string;
  rating: number;
  username: string;
}

// ----------------------------

export interface IQuestionnairesPayload {
  current: Date;
  data: string;
  documentId?: string;
  name: string;
  responses: object[];
  username: string;
}

export interface IQuestionnairesResponse {
  current: Date;
  data: string;
  documentId: string;
  name: string;
  responses: object[];
  username: string;
}
