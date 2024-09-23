import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { doGet } from "../../helpers/api";
import locations from "../../helpers/locations";


interface InitialState {
  caseDetails: any,
  posture: any,
  allegedLiabilityDefect: any,
  causesofActionClaim: any,
  outcomedispositionspecific: any,
  outcomedispositionDetails: any,
  matterStatus: any,
  matterType: any,
  vehiclePurchestype : any,
  vehicleModeltype : any,
  jurisdictionData : any,
  deponentType : any,
  localStateforEditScreen : any,
  localStateGenralCaseInfo : any,
  PlaintiffCounselDetails : any,
  PlaintiffCounselLocation : any,
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  caseDetails: [],
  posture: null,
  allegedLiabilityDefect: null,
  causesofActionClaim: null,
  outcomedispositionspecific: null,
  outcomedispositionDetails: null,
  matterStatus: [],
  matterType: [],
  vehiclePurchestype : null,
  vehicleModeltype: null,
  PlaintiffCounselDetails : null,
  PlaintiffCounselLocation : null,
  jurisdictionData : [],
  deponentType : [],
  localStateforEditScreen : {},
  localStateGenralCaseInfo : {},
  status: "idle",
  error: null,
};

const query = {
  "$filter": "IsActive eq true"
}

export const fetchCaseDetails: any = createAsyncThunk(
  "get/fetchCaseDetails",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.CASEINFO, data.query, data?.token)
  }
);

export const fetchPostureDetails: any = createAsyncThunk(
  "get/fetchPostureDetails",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.POSTURE, query, data?.token)
  }
);

export const fetchPlaintiffCounselDetails: any = createAsyncThunk(
  "get/fetchPlaintiffCounselDetails",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.PlaintiffCounselDetails, {}, data?.token)
  }
);

export const fetchPlaintiffCounselLocation: any = createAsyncThunk(
  "get/fetchPlaintiffCounselLocation",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.PlaintiffCounselLocation, {}, data?.token)
  }
);

export const fetchAllegedliabilityDetails: any = createAsyncThunk(
  "get/fetchAllegedliabilityDetails",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.ALLEGEDLIABILITYDEFECT, query, data?.token)
  }
);

export const fetchCauseofclaimsDetails: any = createAsyncThunk(
  "get/fetchCauseofclaimsDetails",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.CAUSESOFACTIONCLAIM, query, data?.token)
  }
);

export const fetchOutcomedispositionSpecificDetails: any = createAsyncThunk(
  "get/fetchOutcomedispositionSpecificDetails",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.OUTCOMEDISPOSITIONSPECIFICS, query, data?.token)
  }
);

export const fetchOutcomedispositionDetails: any = createAsyncThunk(
  "get/fetchOutcomedispositionDetails",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.OUTCOMEDISPOSITION, query, data?.token)
  }
);

export const fetchMatterStatus: any = createAsyncThunk(
  "get/fetchMatterStatus",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.MATTERSTATUS, query, data?.token)
  }
);

export const fetchMatterType: any = createAsyncThunk(
  "get/fetchMatterType",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.MATTERTYPE, query, data?.token)
  }
);

export const fetchVehiclepurchestype: any = createAsyncThunk(
  "get/fetchVehiclepurchestype",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.VEHICLEPURCHASETYPE, query, data?.token)
  }
);

export const fetchVehicleModeltype: any = createAsyncThunk(
  "get/fetchVehicleModeltype",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.VEHICLEMODEL, query, data?.token)
  }
);

export const fetchjurisdiction: any = createAsyncThunk(
  "get/fetchjurisdiction",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.JURISDICTION, query, data?.token)
  }
);

export const fetchdeponentType: any = createAsyncThunk(
  "get/fetchdeponentType",
  async (data: any, thunkAPI) => {
    return await doGet(thunkAPI, locations.DEPONENTTYPE, query, data?.token)
  }
);

const editcaseSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setlocalStateforEditScreen(state, action) {
      state.localStateforEditScreen = action.payload
    },
    setStateGenralCaseInfo(state, action){
      state.localStateGenralCaseInfo = action.payload
    }
  },
  extraReducers(builder) {
    //@ts-ignore
    builder
      .addCase(fetchCaseDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCaseDetails.fulfilled, (state, action) => {
        state.caseDetails = action?.payload?.data?.value[0] ?? []
      })
      .addCase(fetchPostureDetails.fulfilled, (state, action) => {
        state.posture = action?.payload?.data?.value
      })
      .addCase(fetchAllegedliabilityDetails.fulfilled, (state, action) => {
        state.allegedLiabilityDefect = action?.payload?.data?.value
      })
      .addCase(fetchCauseofclaimsDetails.fulfilled, (state, action) => {
        state.causesofActionClaim = action?.payload?.data?.value
      })
      .addCase(fetchOutcomedispositionSpecificDetails.fulfilled, (state, action) => {
        state.outcomedispositionspecific = action?.payload?.data?.value
      })
      .addCase(fetchOutcomedispositionDetails.fulfilled, (state, action) => {
        state.outcomedispositionDetails = action?.payload?.data?.value
      })
      .addCase(fetchMatterStatus.fulfilled, (state, action) => {
        state.matterStatus = action?.payload?.data?.value
      })
      .addCase(fetchMatterType.fulfilled, (state, action) => {
        state.matterType = action?.payload?.data?.value
      })
      .addCase(fetchVehiclepurchestype.fulfilled, (state, action) => {
        state.vehiclePurchestype = action?.payload?.data?.value
      })
      .addCase(fetchVehicleModeltype.fulfilled, (state, action) => {
        state.vehicleModeltype = action?.payload?.data?.value
      })
      .addCase(fetchjurisdiction.fulfilled, (state, action) => {
        state.jurisdictionData = action?.payload?.data?.value
      })
      .addCase(fetchdeponentType.fulfilled, (state, action) => {
        state.deponentType = action?.payload?.data?.value
      })
      .addCase(fetchPlaintiffCounselDetails.fulfilled, (state, action) => {
        state.PlaintiffCounselDetails = action?.payload?.data?.value
      })
      .addCase(fetchPlaintiffCounselLocation.fulfilled, (state, action) => {
        state.PlaintiffCounselLocation = action?.payload?.data?.value
      })
      .addCase(fetchCaseDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },
});

export const { setlocalStateforEditScreen,setStateGenralCaseInfo} = editcaseSlice.actions;
export default editcaseSlice.reducer;

export const getCasedetailsData = (state: RootState) => state.caseedit.caseDetails;


