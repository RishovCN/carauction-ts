import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

import axios from "axios";



type InitialState = {
    loading: boolean,
    carDetail:any[],
    error: string

}
const initialState: InitialState  = {
    loading: false,
    carDetail: [],
    error: '',
}


//generate pending, fulfilled and rejected action types

export const fetchCarDetail = createAsyncThunk('carDetail/fetchCarDetail', () => {
return axios
        .get(`${process.env.REACT_APP_JSON_API}cardetails`)
        .then( res => res.data)
})


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
