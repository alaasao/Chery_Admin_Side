import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    delete: false,
}
export const deleteSlice = createSlice({
    name: "delete",
    initialState,
    reducers: {
        setDelete: ((state,action) => {
            state.delete= action.payload;
        }),
    
    }
})

export const { setDelete } = deleteSlice.actions;
export default deleteSlice.reducer;