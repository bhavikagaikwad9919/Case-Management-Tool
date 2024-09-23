import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from "../features/users/usersSlice";  
import editcaseReducer from '../features/case/editcaseSlice';
import injuredPartySlice from '../features/injuredparty/injuredPartySlice'
export const store = configureStore({
  reducer: {
    users: usersReducer,
    caseedit : editcaseReducer,
    injured : injuredPartySlice
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
