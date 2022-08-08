import { setNewLocation } from "../sidebar/navSlice"
import { useDispatch } from "react-redux";

function ClosedTicketInfoTableHeader() {
    const dispatch = useDispatch();
    return (
        <div className="sm:flex sm:items-center ">
            <div className="sm:flex-auto">
                {(
                    <h1 className="text-2xl font-medium text-gray-900 " >Completed Notes</h1>)}

            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
                {  (
                <button
                    type="button"
                    onClick={() => dispatch(setNewLocation("newTicket"))}
                    className="inline-flex items-center justify-center rounded-md 
                            bg-sky-500 px-4 py-2 text-med font-medium text-white shadow-sm
                            hover:bg-gradient-to-r from-sky-500 to-pink-200 duration-300"
                >
                    New Note
                </button>)}
            </div> 
        </div>
    )
}
export default ClosedTicketInfoTableHeader;