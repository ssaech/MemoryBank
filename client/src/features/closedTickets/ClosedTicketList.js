import {useEffect} from "react";
import ClosedTicketInfo from "./ClosedTicketInfo";
import { useSelector, useDispatch } from "react-redux";
import  { setTickets } from "../openTicket/openTicketSlice";




function ClosedTicketList() {
    const currentUser = useSelector(state => state.auth.user)

    const dispatch = useDispatch();


    let alltix = []

    const handleCompletedMemories = async () => {
    
        const ticketData = await fetch("https://basedserverbysarn.herokuapp.com/post/closed/closed").then(res => res.json())
        
        ticketData.forEach((item) => {
            item.createdAt = new Date(item.createdAt).toLocaleString();
        
        });
        ticketData.forEach((ticket) => {
            ticket.hasScreenshot = ticket.screenshot !== "None";
        });

        alltix = ticketData.filter((searched) => searched.createdby === currentUser)

        dispatch(setTickets(alltix));

   }

    
    const Renderbox = () => {
        if (alltix === undefined ) {
             return ''
             
        } 
        if (alltix !== undefined) {
             return <ClosedTicketInfo />
        }
    
    }

    useEffect(() =>{
    handleCompletedMemories() 
    Renderbox()

    },[alltix])
    
    return (
        <Renderbox />
    );
} 
export default ClosedTicketList;