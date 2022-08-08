import { createSlice } from "@reduxjs/toolkit";


const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isSidebarOpen: false
    },
    reducers: {
        setSideBarOpen: (state, action) => {
            state.isSidebarOpen = action.payload
        }

    }

    })

export const { setSideBarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer
