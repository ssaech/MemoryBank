import OpenTicketInfoTableHeader from "./OpenTicketInfoTableHeader";
import OpenTicketInfoColumnHeaders from "./OpenTicketInfoColumnHeaders";
import OpenTicketInfoRows from "./OpenTicketInfoRows";
import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import openTicketsTableSorter from "../../utils/OpenTicketsTableSorter";
import  { setTickets } from "./openTicketSlice";
import OpenTicketFilterBar from "./OpenTicketFilterBar";

function OpenTicketInfo() {

    const dispatch = useDispatch();

    const sortedTickets = useSelector(state => state.openTicket.tickets);

    const sortMode = useSelector(state => state.openTicket.mode);

    const isSortAscending = useSelector(state => state.openTicket.isSortAscending);

    const stat = useSelector(state => state.openTicket.loaded);

    
    useEffect(() => {
        let ticks = [sortedTickets];
        ticks = openTicketsTableSorter(ticks, sortMode, isSortAscending);
        dispatch(setTickets(ticks));
    }, [sortMode, isSortAscending]);



    function Result() {
        if( stat === "Yes"){
          return (
              <OpenTicketInfoRows tickets={sortedTickets}/>
          );
        }
    
        return null;
      }

    
    return (
        
        <div className="px-4 sm:px-6 lg:px-8">
            <OpenTicketInfoTableHeader/>
            <div className="mt-8 flex flex-col">
                <OpenTicketFilterBar/>
                <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                            <table className="min-w-full border-separate" style={{ borderSpacing: 0}}>
                                <OpenTicketInfoColumnHeaders />
                                <Result />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default OpenTicketInfo;