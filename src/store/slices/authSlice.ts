import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "../../services/firebase";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

interface UserState {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: UserState | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

// Async thunk for login
export const login = createAsyncThunk("auth/login", async () => {
  await setPersistence(auth, browserLocalPersistence);
  const result = await signInWithPopup(auth, provider);

  // 필요한 데이터만 반환
  const { uid, displayName, email, photoURL } = result.user;
  return { uid, displayName, email, photoURL };
});

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

// 비동기 Thunk 정의
export const checkUserState = createAsyncThunk<
  UserState | null, // 성공 시 반환 타입
  void, // 전달받는 인수 타입
  { rejectValue: string } // reject 시 반환 타입
>("auth/checkUserState", async (_, { rejectWithValue }) => {
  return new Promise<UserState | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          resolve({ uid, displayName, email, photoURL });
        } else {
          resolve(null);
        }
        unsubscribe();
      },
      (error) => {
        reject(rejectWithValue(error.message || "Failed to check auth state"));
      }
    );
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(checkUserState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserState.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(checkUserState.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
