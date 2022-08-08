import { useSelector, useDispatch } from "react-redux";
import { removeScreenshot } from "./newTicketSlice"

function ScreenshotBadge() {
    const activeScreenshot = useSelector(state => state.newTicket.screenshot)


    const dispatch = useDispatch()

    function handleRemoveScreenshot() {
        dispatch(removeScreenshot());
    }

    return (
        <>
            <span
                className="inline-flex items-center py-0.5 pl-2 mb-1 mr-2 pr-0.5 rounded-full
                    text-xs font-medium bg-sky-100 text-sky-700">
                {activeScreenshot.name}
              <button
                  type="button"
                  onClick={() => handleRemoveScreenshot()}
                  className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center
                      justify-center text-sky-400 hover:bg-sky-200 hover:text-sky-500 focus:outline-none
                      focus:bg-sky-500 focus:text-white"
              >
              <span className="sr-only">remove {activeScreenshot.name}</span>
              <span className="sr-only">remove </span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7"/>
              </svg>
              </button>
            </span>
        </>
    );
}

export default ScreenshotBadge;