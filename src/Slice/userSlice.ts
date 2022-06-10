import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";


type InitialState = {
        message: string;
        token: string;
        userDetails: {
            email: string;
            fullName: string;
    }
}
const initialState: WritableDraft<InitialState> = {
        message: '',
        token: '',
        userDetails: {
            email:'',
            fullName:''
        }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
                state.message = action.payload.message
                state.token = action.payload.token
                state.userDetails.email = action.payload.userDetails.email
                state.userDetails.fullName = action.payload.userDetails.fullName
           
        }
    }
})

export default userSlice.reducer;
export const { setUser } = userSlice.actions;