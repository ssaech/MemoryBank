import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const newTicketSlice = createSlice({
    name: 'newTicket',
    initialState: {
        severity: 'End of day',
        summary: '',
        type: 'Personal',
        title: '',
        userlist: [],
        screenshot: [],
        error: null
    },
    reducers: {
        setSeverity: (state, action) => {
            state.severity = action.payload
        },
        setSummary: (state, action) => {
            state.summary = action.payload
        }, 
        setType: (state, action) => {
            state.type = action.payload
        },
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setScreenshot: (state, action) => {
            state.screenshot = action.payload
        },
        removeScreenshot: (state) => {
            state.screenshot = []
        },
        reset: (state) => {
            state.severity = 'End of day'
            state.summary = ''
            state.type = 'Personal'
            state.screenshot = []
            state.title = ''
            state.userlist = []
            state.error = null
        }
    }
})

export const selectUserlist = (state) => state.newTicket.userlist;




export const { setSeverity, setSummary, setType, setProduct, setTitle, setScreenshot, removeScreenshot, reset } = newTicketSlice.actions;

export default newTicketSlice.reducer