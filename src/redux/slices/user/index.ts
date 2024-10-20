import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../services";

export const registerAsync = createAsyncThunk(
  "user/register",
  async (payload: { email: string; password: string }) => {
    try {
      const notes = await register(payload);
      return notes;
    } catch (error) {
      console.error("error", error);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }) => {
    try {
      const note = await login(payload);
      return note;
    } catch (error) {
      console.error("error", error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(registerAsync.fulfilled, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload.data;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
