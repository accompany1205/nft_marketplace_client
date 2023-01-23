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
    showToast: (state, action: PayloadAction<ToastState>) => ({
      message: action.payload.message,
      type: action.payload.type,
    }),
    hideToast: () => initialState,
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
