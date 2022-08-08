import { MenuAlt1Icon } from "@heroicons/react/outline";
import { setSideBarOpen } from  "./sidebarSlice";
import { useSelector, useDispatch } from "react-redux";


function SideBarMobileHamburgerButton() {
    const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);
    const dispatch = useDispatch();

    const handleClick = () => {

        dispatch(setSideBarOpen(true))

    }

    return (
        <div className="px-2 space-y-2">
            <button
                type="button"
                onClick={() => handleClick()}
                className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2
                        focus:ring-inset focus:ring-sky-500 lg:hidden"
            >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt1Icon className="h-6 w-6" aria-hidden="true"/>
            </button>
       </div>
    );
}

export default SideBarMobileHamburgerButton;