import { AsyncTaskStatusEnum } from "../constants/asyncTask";

// Types for User and Auth state
export interface IUser {
  id: number;
  username: string;
  email: string;
}

// type for initial state for auth slice in reducer
export interface IAuthState {
  user: IUser | null;
  // token: string | null;
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

export interface ILoginError {
  errorMessage: string;
  errorCode: number;
}
