import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSummary } from "./newTicketSlice"

function IssueSummary() {
    const dispatch = useDispatch();
    const sum = useSelector(state => state.newTicket.summary);
    return (
        <div className="sm:col-span-6">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                Brief summary
            </label>
            <textarea
                id="summary"
                rows={6}
                value={sum}
                onChange={(e) => {dispatch(setSummary(e.target.value))}}
                className=" pl-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full
                                        sm:text-sm border border-gray-300 rounded-md mt-1 caret-sky-500"
                placeholder={'What do you need to remember to do?'}
            />
        </div>
    );
}

export default IssueSummary;