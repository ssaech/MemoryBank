import {severityOptions, reportTypes} from "../../store/data/newTicketsData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBy, setSevFilter, setTypeFilter } from "./openTicketSlice";
import  { setTickets, setLoaded } from "./openTicketSlice";

function OpenTicketFilterBar(props) {

    const dispatch = useDispatch();


    let tix = [];
    const location = useSelector(state => state.nav.currentLocation);
    const currentUser = useSelector(state => state.auth.user)

    useEffect(() =>{
        handleClick()
        },[])

    const handleClick = async (i, j) => {
        

        if (location === 'openTickets') {  
            dispatch(setLoaded('No'))
            const ticketData = await fetch("https://basedserverbysarn.herokuapp.com/post").then(res => res.json())
        ticketData.forEach((item) => {
            item.createdAt = new Date(item.createdAt).toLocaleString();
        });
        ticketData.forEach((ticket) => {
            ticket.hasScreenshot = ticket.screenshot !== "None";
        });
        tix = ticketData.filter((searched) => searched.createdby === currentUser)
        dispatch(setTickets(tix))
        dispatch(setLoaded('Yes'))


        }

        if (location === 'closedTickets') {   
            dispatch(setLoaded('No'))
            const ticketData = await fetch("https://basedserverbysarn.herokuapp.com/post/closed/closed").then(res => res.json())
        ticketData.forEach((item) => {
            item.createdAt = new Date(item.createdAt).toLocaleString();
        });
        ticketData.forEach((ticket) => {
            ticket.hasScreenshot = ticket.screenshot !== "None";
        });
        tix = ticketData.filter((searched) => searched.createdby === currentUser)
        dispatch(setTickets(tix));
        dispatch(setLoaded('Yes'))

            }

         if (i ==='severity') {
            dispatch(setSevFilter(j))
            dispatch(filterBy({ titleName: i, titleValue: j,  currentTickets: tix }))
        }

        if (i ==='type') {       
            dispatch(setTypeFilter(j))
            dispatch(filterBy({ titleName: i, titleValue: j,  currentTickets: tix }))
        }
        
    }
    return (
        <div className="flex flex-wrap ">
            <div className="mr-2 mb-2">
                <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
                    Timeframe
                </label>
                <select
                    id="severity"
                    name="severity"
                    value={props.severity}
                    onChange={(e) => handleClick(e.target.name, e.target.value )}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none
                        focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                >
                    <option>All</option>
                    <option>{severityOptions[0].severity}</option>
                    <option>{severityOptions[1].severity}</option>
                    <option>{severityOptions[2].severity}</option>
                    <option>{severityOptions[3].severity}</option>

                </select>
            </div>
            <div className="mr-2 mb-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                </label>
                <select
                    id="type"
                    name="type"
                    value={props.type}
                    onChange={(e) => handleClick(e.target.name, e.target.value )}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none
                        focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                >
                    <option>All</option>
                    <option>{reportTypes[0]}</option>
                    <option>{reportTypes[1]}</option>
                    <option>{reportTypes[2]}</option>
                </select>
            </div>
            

        </div>
    );
}

export default OpenTicketFilterBar;