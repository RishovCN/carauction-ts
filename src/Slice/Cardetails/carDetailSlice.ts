//RTK imports
import { createSlice } from "@reduxjs/toolkit";
//In app imports
import { fetchCarDetail } from './carDetailApi'

//type imports
import { InitialState } from "./carDetailTypes";

    const initialState: InitialState  = {
    loading: false,
    carDetail:[] ,
    error: '',
  } 
  
const carDetailSlice = createSlice({
    name: 'carDetail',
    initialState,
    reducers:{},
    //need to use extraReducer for accesing promise returned by asyncThunk
    extraReducers: builder => {
        builder.addCase(fetchCarDetail.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCarDetail.fulfilled, (state, action) =>{   // give action type if needed explicitly
            state.loading = false   
            state.carDetail = action.payload
        })
        builder.addCase(fetchCarDetail.rejected, (state, action) => { 
            state.loading = false
            state.error = action.error.message || 'something went wrong'
    })
    }
})

export default carDetailSlice.reducer;
