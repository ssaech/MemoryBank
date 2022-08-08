import {ChevronDownIcon} from "@heroicons/react/solid";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortBy } from "./openTicketSlice";
import { useState } from "react";




function OpenTicketSortButton(props) {
    const dispatch = useDispatch()
    const all_state =  useSelector(state => state.openTicket.tickets)
    const [sortType, setSortType] = useState(1)

    const handleClick = (i) => {
        const arrayForSort = [...all_state]
        dispatch(sortBy({ titleName: i, sortTyped: sortType, currentTickets: arrayForSort }))
        setSortType(sortType*-1)
    }


    return (
        <label className="group inline-flex"
            onClick={() =>  handleClick(props.name)}
        >
            {props.name}

            <span className="flex-none rounded text-gray-400
                    group-hover:visible group-focus:visible">
                     <ChevronDownIcon className="h-5 w-5 mt-0.5 hover:cursor-pointer" aria-hidden="true"/>
            </span>
        </label>
    );
}

export default OpenTicketSortButton;