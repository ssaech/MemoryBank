import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from '../features/sidebar/sidebarSlice';
import navReducer from '../features/sidebar/navSlice';
import newTicketReducer from '../features/newTicket/newTicketSlice';
import openTicketReducer  from '../features/openTicket/openTicketSlice';
import { apiSlice } from "../features/api/apiSlice";
import authReducer from '../features/auth/authSlice';


export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        nav: navReducer,
        newTicket: newTicketReducer,
        openTicket: openTicketReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
        
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),

        
    devTools: true
})