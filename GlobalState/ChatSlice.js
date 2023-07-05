import { createSlice } from "@reduxjs/toolkit";

export const ChatSlice = createSlice({
  name: "Chat",
  initialState: {
    ChatActive: false,
  },
  reducers: {
    SetChatActive: (state, action) => {
      state.ChatActive = action.payload;
    },
  },
});

export const { SetChatActive } = ChatSlice.actions;
export default ChatSlice.reducer;
