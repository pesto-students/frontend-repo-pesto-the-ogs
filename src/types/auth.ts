import { AsyncTaskStatusEnum } from "../constants/asyncTask";

// Types for User and Auth state
export interface IUser {
  id: number | null;
  username: string;
  email: string;
}

// type for initial state for auth slice in reducer
export interface IAuthState {
  user: IUser | null;
  status: AsyncTaskStatusEnum;
  error: string | null | undefined;
}

// Interface for login payload
export interface ILoginPayload {
  email: string;
  password: string;
}

// Interface for API response
export interface IAuthSuccessResponse {
  user: IUser;
  token: string;
}

export interface IAuthFailureResponse {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
}
