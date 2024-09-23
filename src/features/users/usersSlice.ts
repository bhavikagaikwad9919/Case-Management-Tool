import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
const API_URL = process.env.REACT_APP_API_URL;

interface InitialState {
  token: string | null;
  userType: string;
  user: any;
  sidenav: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  token: null,
  userType: '',
  sidenav: true,
  user: {},
  status: "idle",
  error: null,
};

// export const fetchPosts: any = createAsyncThunk(
//   "posts/fetchPosts",
//   async () => {
//       const response = await axios.get(API_URL+"/posts");
//       return response.data;
//   }
// );

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSidenav(state, action) {
      state.sidenav = action.payload
    },
    setUserType(state, action) {
      state.userType = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    }
  },
  // extraReducers(builder) {
  // @ts-ignore
  // builder
  // .addCase(fetchPosts.pending, (state, action) => {
  //     state.status = "loading";
  // })
  // .addCase(fetchPosts.fulfilled, (state, action) => {
  //     state.status = "succeeded";
  //     // Add any fetched posts to the array
  //     state.posts = state.posts.concat(action.payload);
  // })
  // .addCase(fetchPosts.rejected, (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  // });
  // },
});

export const { setSidenav, setUserType,setToken } = userSlice.actions;
export default userSlice.reducer;

export const getSideNav = (state: RootState) => state.users.token;


