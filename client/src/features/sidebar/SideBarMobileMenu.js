import { useSelector , useDispatch} from "react-redux";
import {Dialog, Transition} from "@headlessui/react";
import { useEffect, useState} from "react";
import PrimarySideBarMenu from "./PrimarySideBarMenu";
import LogoutMenuButton from "./LogoutMenuButton";
import * as navigationRoutes from "../../store/data/navigationRoutes";
import { setSideBarOpen } from  "./sidebarSlice";
import {XIcon} from "@heroicons/react/outline";

function SideBarMobileMenu() {
    
    const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);
    const location = useSelector(state => state.nav.currentLocation);
    let primaryRoutes = [];
    primaryRoutes = navigationRoutes.primaryNavigations;
    const [primaryNavRoutes] = useState(primaryRoutes);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setSideBarOpen(false))
    }


    useEffect(() => {

    }, [location])

    return (
        <> 
            <Transition
                show={isSidebarOpen}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
             >
            
                <Dialog
                    as="div"
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 flex z-40 lg:hidden"
                    onClose={() => handleClick()}>
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-6 pb-4 bg-sky-500">
                            <div className="flex items-center ">
                            <img src={"../../bren.jpeg"} className="max-h-24 max-w-min" alt="brein"/>
                                <span className="mb-2 text-2xl text-white">MemoryBank</span>  
                            </div>
                                <nav className="mt-5 flex-shrink-0 h-full divide-y divide-sky-800 overflow-y-auto" aria-label="Sidebar">
                                    <PrimarySideBarMenu navigations={primaryNavRoutes}/>
                                    <div className="mt-2 pt-2 flex flex-col ">
                                        <LogoutMenuButton/>
                                    </div>
                                </nav>
                        </div>
                        <div className="relative px-6 pt-4">
                            <button
                                type="button"
                                onClick={() => handleClick()}
                                className=" border-r border-gray-200 text-gray-400 rounded-full focus:ring-2
                                focus:ring-inset focus:ring-sky-500 lg:hidden"
                            > 
                                <XIcon className="h-8 w-8 text-white" aria-hidden="true"/>
                            </button>
                        </div>
                </Dialog>
            </Transition>
        </>

    );
}

export default SideBarMobileMenu;