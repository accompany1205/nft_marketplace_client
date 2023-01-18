import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  message: string;
  type: string;
}

const initialState: ToastState = {
  message: '',
  type: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideToast: (state) => {
      state.message = '';
      state.type = '';
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
