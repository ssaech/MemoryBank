import { useSelector } from "react-redux";
import SideBarMenu from "./SideBarMenu";
import SideBarMobileMenu from "./SideBarMobileMenu";
import SideBarMobileHamburgerButton from "./SideBarMobileHamburgerButton";
import ClosedTickets from "../closedTickets/ClosedTickets";
import NewTicket from "../newTicket/NewTicket";
import OpenTicket from "../openTicket/OpenTicket";

const SideBar = () => {
    const location = useSelector(state => state.nav.currentLocation);


    let content =
    <div className="min-h-full">
                <SideBarMobileMenu/>
                <SideBarMenu/>
                <div className="lg:pl-64 flex flex-col flex-1">
                    <div className="relative z-0 flex-shrink-0 flex h-16>
                        border-b border-gray-200 lg:border-none">
                             <SideBarMobileHamburgerButton/>
                    </div>
                    <main
                        className="pt-12 flex-1 pb-1">
                        {location === 'openTickets' && (<OpenTicket/>)}
                        {location === 'newTicket' && (<NewTicket/>)}
                        {location === 'closedTickets' && (<ClosedTickets/>)}
                    </main>
                </div>
            </div>
    return (
        <section>
            {content}
        </section>
    )
}
export default SideBar