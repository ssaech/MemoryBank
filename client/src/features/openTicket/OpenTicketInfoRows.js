import classNameJoiner from "../ClassNameJoiner";
import {useState, useEffect } from "react";
import OpenTicketInfoModal from "./OpenTicketInfoModal";
import OpenTicketImageModal from "./OpenTicketImageModal";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import  { removeItem } from "./openTicketSlice";

function OpenTicketInfoRows(props) {
    const location = useSelector(state => state.nav.currentLocation);
    const [isInfoModalShowing, setIsInfoModalShowing] = useState(false);
    const [isImageModalShowing, setIsImageModalShowing] = useState(false);
    const [isAssignModalShowing, setIsAssignModalShowing] = useState(false);
    const [modalId, setModalId] = useState(3);
    const [imageData, setImageData] = useState("None");
    const [imageType, setImageType] = useState("None"); 
    const dispatch = useDispatch();
    const refresh = useSelector(state => state.openTicket.refreshall);
    const sortedTickets = useSelector(state => state.openTicket.tickets);

    const closeTicket = async (ticket_id) => {
        const id = ticket_id;
        const resp = await axios.put(`https://basedserverbysarn.herokuapp.com/post/${id}`, {lifecycle: "complete"});
        dispatch(removeItem({originallist: sortedTickets, removal:id}))
        console.log(sortedTickets)


    }

    useEffect(() => {

    }, [props, sortedTickets]);

    const handleCloseTicket = async (id) => {

        const resp = await axios.put(`https://basedserverbysarn.herokuapp.com/post/${id}`, {
            lifecycle: "complete"
        });
        props.onTicketStatusChange(true);
    }

    const handleOpenTicket = async (id) => {
        const resp = await axios.fetch(`https://basedserverbysarn.herokuapp.com/post/${id}`)
        props.onTicketStatusChange(true);
    }

    return (
        <>
            <tbody className="bg-white">
            {props.tickets.map((ticket, index) => (
                <tr
                    key={ticket.id}
                    className={index % 2 === 0 ? '' : 'bg-gray-50'}
                >
                    <td
                        className={classNameJoiner(
                            index !== props.tickets.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                        )}
                    >
                        {ticket.title}
                    </td>
                    <td
                        className={classNameJoiner(
                            index !== props.tickets.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                        )}
                    >
                        {ticket.severity}
                    </td>
                    <td
                        className={classNameJoiner(
                            index !== props.tickets.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                        )}
                    >
                        {ticket.type}
                    </td>

                    <td
                        className={classNameJoiner(
                            index !== props.tickets.length - 1 ? 'border-b border-gray-200' : '',
                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-sm font-medium sm:pr-6 lg:pr-8'
                        )}
                    >
                        <button
                          onClick={() => { setIsInfoModalShowing(!isInfoModalShowing); console.log(ticket._id); setModalId(ticket._id) }}
                            className="text-sky-600 hover:text-sky-900">
                            View<span className="sr-only">, {ticket.id}</span>
                        </button>
                    </td>

                    <td
                        className={classNameJoiner(
                            index !== props.tickets.length - 1 ? 'border-b border-gray-200' : '',
                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-sm font-medium sm:pr-6 lg:pr-8'
                        )}
                    >
                        {ticket.hasScreenshot && (
                        <button
                            onClick={() => { setIsImageModalShowing(!isImageModalShowing);
                                setImageData(ticket.screenshot); setImageType(ticket.screenshotType); }}
                            className="text-sky-600 hover:text-sky-900">
                            View<span className="sr-only">, {ticket.id}</span>
                        </button>)}
                       
                    </td>


                   
                    <td
                        className={classNameJoiner(
                            index !== props.tickets.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell'
                        )}
                    >
                        {ticket.createdAt}
                    </td>
                    {location === 'openTickets' && (
                        <td
                            className={classNameJoiner(
                                index !== props.tickets.length - 1 ? 'border-b border-gray-200' : '',
                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-sm font-medium sm:pr-6 lg:pr-8'
                            )}
                        >
                            <button
                                onClick={() => { closeTicket(ticket._id).catch(console.error) }}
                                className="text-sky-600 hover:text-sky-900">
                                Success<span className="sr-only">, {ticket.id}</span>
                            </button>
                        </td>
                    )}

                </tr>))}
            </tbody>
            <>
                {isInfoModalShowing && (<OpenTicketInfoModal id={modalId}/>)}
                {isImageModalShowing && (<OpenTicketImageModal imageData={imageData} imageType={imageType}/>)}

            </>
        </>
    );
}
export default OpenTicketInfoRows;