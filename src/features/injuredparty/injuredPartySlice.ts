import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { doGet, doPost } from "../../helpers/api";
import locations from "../../helpers/locations";


interface InitialState {
  genderDetails: any,
  partyData : any,
  eidtpartyData : any,
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  genderDetails: null,
  partyData : null,
  eidtpartyData : {},
  status: "idle",
  error: null,
};

const query = {
  "$filter" : "IsActive eq true"
}

export const getGenderDetails: any = createAsyncThunk(
  "get/getGenderDetails",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.GENDER, query, data?.token)
  }
);


export const getpartyStatus: any = createAsyncThunk(
  "get/getpartyStatus",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.PARTYSTATUS, query, data?.token)
  }
);

export const getInjuryPartyData: any = createAsyncThunk(
  "get/getInjuryPartyData",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.INJUREDPARTY, data?.query, data?.token)
  }
);





const injuredPartySlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setlocalStateforEditScreen(state, action) {
      state.genderDetails = action.payload
    }
  },
  extraReducers(builder) {
    //@ts-ignore
    builder
      .addCase(getGenderDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getGenderDetails.fulfilled, (state, action) => {
        state.genderDetails = action?.payload?.data?.value
      })
      .addCase(getpartyStatus.fulfilled, (state, action) => {
        state.partyData = action?.payload?.data?.value
      })
      .addCase(getInjuryPartyData.fulfilled, (state, action) => {
        state.eidtpartyData = action?.payload?.data?.value[0] ?? []
      })
      .addCase(getGenderDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },
});

export const { setlocalStateforEditScreen } = injuredPartySlice.actions;
export default injuredPartySlice.reducer;



