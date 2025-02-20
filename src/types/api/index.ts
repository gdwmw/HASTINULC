export interface IAuthSchema {
  jwt: string;
  user: IUsersResponse;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  identifier: string;
  password: string;
}

export interface IAuthResponse {
  id: number;
  datasId: string;
  datasDocumentId: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  image?: null | string;
  role: string;
  status: string;
  token: string;
}

export interface INextAuthResponse {
  id: string;
  datasId: string;
  datasDocumentId: string;
  username: string;
  name?: null | string;
  email?: null | string;
  phoneNumber: string;
  image?: null | string;
  role: string;
  status: string;
  token: string;
}

// ----------------------------

export interface IUsersPayload {
  id?: number;
  username?: string;
  email?: string;
  datasDocumentId?: string;
}

export interface IUsersResponse {
  id: number;
  username: string;
  email: string;
  datasDocumentId?: string;
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

export interface IDatasPayload {
  id?: number;
  documentId?: string;
  name: string;
  phoneNumber: string;
  image?: FileList | number;
  role?: string;
  bookings?: string;
  reviews?: string;
  questionnaires?: string;
}

export interface IDatasResponse {
  id: number;
  documentId: string;
  name: string;
  phoneNumber: string;
  image: {
    id: number;
    url: string;
  } | null;
  role: string;
  bookings?: IBookingsResponse[];
  reviews?: IReviewsResponse[];
  questionnaires?: IQuestionnairesResponse[];
}

// ----------------------------

export interface IBookingsPayload {
  documentId?: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  package: string;
  date: string;
  time: string[];
  googleMapsLink: string;
  tax: string;
  subTotal: string;
  total: string;
  indicator: string;
  current: Date;
  data: string;
  review?: string;
}

export interface IBookingsResponse {
  documentId: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  package: string;
  date: string;
  time: string[];
  googleMapsLink: string;
  tax: string;
  subTotal: string;
  total: string;
  indicator: string;
  current: Date;
  data: IDatasResponse;
  review?: IReviewsResponse;
}

// ----------------------------

export interface IReviewsPayload {
  documentId?: string;
  username: string;
  name: string;
  rating: number;
  description: string;
  images?: FileList | number[];
  current: Date;
  data?: string;
  booking?: string;
}

export interface IReviewsResponse {
  id: number;
  documentId: string;
  username: string;
  name: string;
  rating: number;
  description: string;
  images: { url: string }[] | null;
  current: Date;
  data: IDatasResponse;
  booking: IBookingsResponse;
}

// ----------------------------

export interface IQuestionnairesPayload {
  documentId?: string;
  username: string;
  name: string;
  responses: {
    id: number;
    question: string;
    answer: string;
  }[];
  current: Date;
  data?: string;
}

export interface IQuestionnairesResponse {
  documentId: string;
  username: string;
  name: string;
  responses: {
    id: number;
    question: string;
    answer: string;
  }[];
  current: Date;
  data: IDatasResponse;
}
