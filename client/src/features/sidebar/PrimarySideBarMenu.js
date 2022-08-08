import { setNewLocation } from "./navSlice"
import { useSelector, useDispatch } from "react-redux";
import classNameJoiner from "../../utils/ClassNameJoiner"
import { setSideBarOpen } from  "./sidebarSlice";


const PrimarySideBarMenu = (props) => {

    const dispatch = useDispatch();
    const location = useSelector(state => state.nav.currentLocation)
    
    const handleClick = (item) => {
        dispatch(setNewLocation(item))
        dispatch(setSideBarOpen(false))
    }
    
    
    return (
        <div className="px-2 space-y-2">
            {props.navigations.map((item) => (
                <a key={item.name}
                   onClick={() => handleClick(item.location)}
                   className={classNameJoiner(
                    item.current ? 'bg-sky-400 text-white'
                        : 'text-sky-100 hover:text-white hover:bg-gradient-to-r from-sky-400 to-sky-500 ',
                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md select-none'
                )}
                >
                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true"/>
                    {item.name}
                </a>
            ))}
        </div>
    )
}
export default PrimarySideBarMenu