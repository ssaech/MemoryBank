
import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import PrimarySideBarMenu from "./PrimarySideBarMenu";
import * as navigationRoutes from "../../store/data/navigationRoutes";
import LogoutMenuButton from "./LogoutMenuButton";


const SideBarMenu = () => {
    const location = useSelector(state => state.nav.currentLocation);
    let primaryRoutes = [];
    primaryRoutes = navigationRoutes.primaryNavigations;
    const [primaryNavRoutes] = useState(primaryRoutes);
    const [isReady, setIsReady] = useState(false);
    
    useEffect(() => {

        setIsReady(true);
    }, [location])
    return (
        <>
        {isReady && (
             <div className="hidden z-4 lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
                <div className="flex flex-col flex-grow bg-sky-500 pt-6 overflow-y-auto">

                    <div className="flex items-center ">     
                    <img src={"../../bren.jpeg"} className="max-h-24 max-w-min" alt="brein"/>
                     <span className="mb-2 text-2xl text-white">MemoryBank</span>  
                    </div>

                    <nav className="flex-1 flex flex-col divide-y-2 divide-sky-600 overflow-y-auto" aria-label="Sidebar">
                        <PrimarySideBarMenu navigations={primaryNavRoutes}/>
                        <div className="mt-2 pt-2 flex flex-col ">
                            <LogoutMenuButton/>
                        </div>
                    </nav>
                </div>
            </div>

        )}
        </>
    )
}
export default SideBarMenu