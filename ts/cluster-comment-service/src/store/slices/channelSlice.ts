import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Channel } from "@models/TodoChannel";

type ChannelState = {
  channels: Channel[];
  activeChannelId: string | null;
};
const initialState: ChannelState = {
  channels: [
    { id: "work", name: "Work", serverId: "", isPrivate: false, order: 1 },
    { id: "daily", name: "Daily", serverId: "", isPrivate: false, order: 2 },
    {
      id: "private",
      name: "Private",
      serverId: "",
      isPrivate: false,
      order: 3,
    },
  ],
  activeChannelId: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setActiveChannel(state, action: PayloadAction<string>) {
      state.activeChannelId = action.payload;
    },
    setChannels(state, action: PayloadAction<Channel[]>) {
      state.channels = action.payload;
    },
  },
});

export const { setActiveChannel, setChannels } = channelSlice.actions;
export default channelSlice.reducer;
