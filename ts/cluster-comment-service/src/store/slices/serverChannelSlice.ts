import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelId } from "@models/TodoChannel";
import { ServerId } from "@models/TodoServer";

interface ServerChannelState {
  selectedServerId: ServerId | null;
  selectedChannelId: ChannelId | null;
}

const initialState: ServerChannelState = {
  selectedServerId: null,
  selectedChannelId: null,
};

const serverSlice = createSlice({
  name: "serverChannel",
  initialState,
  reducers: {
    setSelectedServer(state, action: PayloadAction<string>) {
      state.selectedServerId = action.payload;
    },
    setSelectedChannel(state, action: PayloadAction<string>) {
      state.selectedChannelId = action.payload;
    },
  },
});

export const { setSelectedServer, setSelectedChannel } = serverSlice.actions;
export default serverSlice.reducer;
