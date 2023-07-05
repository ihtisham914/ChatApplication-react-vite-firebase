"use client";
import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    ActiveUser: {},
    RecieverUser: {},
  },
  reducers: {
    SignInSuccess: (state, action) => {
      state.ActiveUser = action.payload;

      localStorage.setItem(
        "ActiveUser",
        JSON.stringify({ ...action?.payload.data })
      );
    },
    SetReciever: (state, action) => {
      state.RecieverUser = action.payload;
      localStorage.setItem(
        "RecieverUser",
        JSON.stringify({ ...action?.payload })
      );
    },
  },
});

export const { SignInSuccess, SetReciever } = UserSlice.actions;
export default UserSlice.reducer;
