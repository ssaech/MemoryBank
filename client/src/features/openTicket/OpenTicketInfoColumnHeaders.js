﻿import OpenTicketSortButton from "./OpenTicketSortButton";
import { useSelector } from  "react-redux";

function OpenTicketInfoColumnHeaders() {
    const location = useSelector(state => state.nav.currentLocation);


    return (
        <thead className="bg-gray-50">
        <tr>
            <th
                scope="col"
                className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75
                    py-3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900
                    backdrop-blur backdrop-filter sm:pl-6 lg:pl-8 select-none"
            >
                <OpenTicketSortButton name="Title"/>
            </th>
            <th
                scope="col"
                className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75
                    px-3 py-3.5 text-left text-md font-semibold text-gray-900
                    backdrop-blur backdrop-filter hidden sm:table-cell select-none"
            >
                <OpenTicketSortButton name="Timeframe"/>
            </th>
            <th
                scope="col"
                className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75
                    px-3 py-3.5 text-left text-md font-semibold text-gray-900
                    backdrop-blur backdrop-filter hidden sm:table-cell select-none"
            >
                <OpenTicketSortButton name="Type"/>
            </th>
            <th
                scope="col"
                className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75
                    px-3 py-3.5 text-left text-md font-semibold text-gray-900
                    backdrop-blur backdrop-filter select-none"
            >
                Info
                <span className="sr-only">Info</span>
            </th>

            <th
                scope="col"
                className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75
                    px-3 py-3.5 text-left text-md font-semibold text-gray-900
                    backdrop-blur backdrop-filter select-none"
            >
                Screenshot
                <span className="sr-only">View</span>
            </th>
                <th
                scope="col"
                className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75
                    px-3 py-3.5 text-left text-md font-semibold text-gray-900
                    backdrop-blur backdrop-filter hidden sm:table-cell select-none"
            >
                 <OpenTicketSortButton name="Date"/>
                <span className="sr-only">Date</span>
            </th>
            {location === 'openTickets' && (
                <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-gray-50 bg-opacity-75
                    px-3 py-3.5 text-left text-md font-semibold text-gray-900
                    backdrop-blur backdrop-filter select-none"
                >
                    Set Status
                    <span className="sr-only">Finish</span>
                </th>
            )}

        </tr>
        </thead>
    );
}

export default OpenTicketInfoColumnHeaders;