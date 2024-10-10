import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
  name: "reminderSlice",
  initialState: {
    items: [],
  },
  reducers: {
    addReminder: (state, action) => {
      state.items.push(action.payload);
    },

    setReminder: (state, action) => {
      state.items = action.payload;
    },

    toggleReminder: (state, action) => {
      
      const tId = action.payload;
      console.log(tId);
      const trans = state.items.find((transaction) => transaction._id === tId);
      console.log(trans)
      if (trans) {
        trans.isActive = !trans.isActive; // Toggle isActive
      }
      // console.log(state.items);
    }
  },
});

export const { addReminder, setReminder, toggleReminder } = reminderSlice.actions;
export default reminderSlice.reducer;
