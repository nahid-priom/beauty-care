// src/redux/features/auth/AuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '../../../firebase';

// Helper: Extract only the necessary user data
const formatUserData = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
});

// ✅ Register Thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      };

     
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Login Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = formatUserData(user);

     
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ Initial State
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
