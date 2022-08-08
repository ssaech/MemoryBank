import { setTitle } from "./newTicketSlice"
import { useSelector, useDispatch } from "react-redux";

function IssueTitle() {
    const dispatch = useDispatch();
    
    const title = useSelector(state => state.newTicket.title);

    return (
        <>
         <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Note Title
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    id="title"
                    value={title}
                    placeholder="Enter a title for your note"
                    onChange={(e) => {dispatch(setTitle(e.target.value))}}
                    className="pl-2 block text-md  border-gray-200 focus:border-sky-500 focus:ring-sky-500 w-full text-md 
                         shadow-sm rounded-md caret-sky-500"
                />
            </div>
        </>
    );
}

export default IssueTitle;