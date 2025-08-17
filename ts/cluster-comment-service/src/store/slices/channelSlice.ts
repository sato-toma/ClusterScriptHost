import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Channel = {
  id: string;
  title: string;
};
type ChannelState = {
  channels: Channel[];
  activeChannelId: string | null;
};
const initialState: ChannelState = {
  channels: [
    { id: "work", title: "Work" },
    { id: "daily", title: "Daily" },
    { id: "private", title: "Private" },
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
