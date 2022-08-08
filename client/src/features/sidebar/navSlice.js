import { createSlice } from "@reduxjs/toolkit";


const navSlice = createSlice({
    name: 'nav',
    initialState: {
        currentLocation: 'openTickets'
    },
    reducers: {
        setNewLocation: (state, action) => {
            state.currentLocation = action.payload
        }
    }
})


export const { setNewLocation } = navSlice.actions;

export default navSlice.reducer