import type { RootState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
};

type UserState = User | null;

const initialState = null as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
