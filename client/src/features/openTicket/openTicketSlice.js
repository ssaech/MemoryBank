import { createSlice } from "@reduxjs/toolkit";



const openTicketSlice = createSlice({
    name: 'openTicket',
    initialState: {
    tickets: [],
    option: '',
    createdby:'',
    mode: '',
    isSortAscending: true,
    isShowing: '',
    value: '',
    sevFilter: 'All',
    typeFilter: 'All',
    loaded: 'No',
    refreshall: 'No'
    },
    reducers: {
        sortBy(state, action) {
            const { titleName, sortTyped, currentTickets } = action.payload

            let sorted = []
            let isReversed =  []

            switch (titleName) {
                case('Title'):
                    sorted = currentTickets.sort((a,b) => {
                    isReversed = (sortTyped === 1) ? -1 : 1;
                    return isReversed * a.title.localeCompare(b.title)})
                    break;
                case('Type'):
                    sorted = currentTickets.sort((a,b) => {
                    isReversed = (sortTyped === 1) ? -1 : 1;
                    return isReversed * a.type.localeCompare(b.type)})
                    break;
                case('Timeframe'):
                    sorted = currentTickets.sort((a,b) => {
                    isReversed = (sortTyped === 1) ? -1 : 1;
                    return isReversed * a.severity.localeCompare(b.severity)})
                    break;
                case('Date'):
                    sorted = currentTickets.sort((a,b) => {
                    isReversed = (sortTyped === 1) ? -1 : 1;
                    return isReversed * a.createdAt.localeCompare(b.createdAt)})
                    break;
                default:
                    sorted = currentTickets
            }

            state.tickets=sorted
        },
        filterBy(state, action) {
            const { currentTickets } = action.payload

            let filteredlist = []

            if (state.sevFilter === 'All' && state.typeFilter === 'All') {
                filteredlist = currentTickets
            }
            if (state.sevFilter !== 'All' && state.typeFilter !== 'All') {
                filteredlist = currentTickets.filter((searched) => searched.type === state.typeFilter && searched.severity === state.sevFilter)
            }
            if (state.sevFilter === 'All' && state.typeFilter !== 'All') {
                filteredlist = currentTickets.filter((searched) => searched.type === state.typeFilter)
            }
            if (state.sevFilter !== 'All' && state.typeFilter === 'All') {
                filteredlist = currentTickets.filter((searched) => searched.severity === state.sevFilter)
            }

            state.tickets = filteredlist
           
        },
        removeItem(state, action) {
            let replace = []
            const { originallist, removal }= action.payload
            replace = originallist.filter((searched) => searched._id !== removal)
            console.log(replace)
            state.tickets = replace
        },

        setOption: (state, action) => {
            state.option = action.payload
        },
        setSortMode: (state, action) => {
            state.mode = action.payload
        }, 
        setisSortAscending: (state, action) => {
            state.isSortAscending = action.payload
        }, 
        setTicketInfoModalIsShowing: (state, action) => {
            state.isShowing = action.payload
        },
        setvalue: (state, action) => {
            state.value = action.payload
        },
        setTickets: (state, action) => {
            state.tickets = action.payload
        },
        setLoaded: (state, action) => {
            state.loaded = action.payload
        },
        sortTicketsTitle: (state, action) => {
            state.tickets = action.payload
        },
        sortTicketsTimeframe: (state, action) => {
            state.tickets = action.payload
        },
        sortTicketsType: (state, action) => {
            state.tickets = action.payload
        },
        sortTicketsDate: (state, action) => {
            state.tickets = action.payload
        },
        setSevFilter: (state, action) => {
            state.sevFilter = action.payload
        },
        setTypeFilter: (state, action) => {
            state.typeFilter = action.payload
        },
        setRefreshall: (state, action) => {
            state.refreshall = action.payload
        }
    }
})



export const { setOption, setSortMode, setTicketInfoModalIsShowing, setvalue, setTickets, setisSortAscending, sortTicketsTitle,
                sortTicketsTimeframe, sortTicketsType, sortTicketsDate, sortBy, setSevFilter, setTypeFilter, filterBy, setLoaded, setRefreshall , removeItem} = openTicketSlice.actions;

export default openTicketSlice.reducer