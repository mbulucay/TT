import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    active: "",
}

const ihsActiveSlice = createSlice({
    name: "ihs_active",
    initialState,
    reducers: {
        ihsSetActive: (state, action) => {
            state.active = action.payload;
        }
    }
})

export const { ihsSetActive } = ihsActiveSlice.actions;

export default ihsActiveSlice.reducer;