import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IAuthSuccessResponse,
  IAuthState,
  ILoginError,
  ILoginPayload,
  IUser,
  IAuthFailureResponse,
} from "../../types/auth";
import { AsyncTaskStatusEnum } from "../../constants/asyncTask";

export const login = createAsyncThunk<
  IAuthSuccessResponse,
  ILoginPayload,
  { rejectValue: ILoginError }
>("auth/login", async (userData: ILoginPayload, { rejectWithValue }) => {
  try {
    const response = await axios.post<IAuthSuccessResponse>(
      "http://localhost:5001/login",
      userData
    );
    // localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue({
      errorMessage:
        (error as IAuthFailureResponse).response?.data.message ||
        "Unknown error",
      errorCode: (error as IAuthFailureResponse).response.status,
    });
  }
});

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: { message: string } }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem("token");
    // Optionally return something or just return void
  } catch (error: unknown) {
    // Handling possible errors during the logout process, such as issues with local storage
    return rejectWithValue({ message: "Failed to logout." });
  }
});

const initialState: IAuthState = {
  user: null,
  //   token: localStorage.getItem("token") || null,
  status: AsyncTaskStatusEnum.Idle, // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    clearAuthState(state) {
      state.user = null;
      //   state.token = null;
      state.status = AsyncTaskStatusEnum.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = AsyncTaskStatusEnum.Loading;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<IAuthSuccessResponse>) => {
          state.status = AsyncTaskStatusEnum.Succeeded;
          state.user = action.payload.user;
          //   state.token = action.payload.token;
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<ILoginError | undefined>) => {
          state.status = AsyncTaskStatusEnum.Failed;
          state.error = action.payload?.errorMessage || "Unknown Error";
          state.user = null;
          //   state.token = null;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        // state.token = null;
        state.status = AsyncTaskStatusEnum.Idle;
      });
  },
});

export const { setUser, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
