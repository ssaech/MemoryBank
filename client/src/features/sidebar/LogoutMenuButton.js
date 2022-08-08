import {LogoutIcon} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { logOut } from  "../../features/auth/authSlice"
import { useDispatch } from 'react-redux'
import Cookies  from 'js-cookie';



export default function LogoutMenuButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleLoggout = () => {


        dispatch(logOut());
        Cookies.remove('jwt');
        navigate("/login");
    }

    return (
        <div className="px-2 space-y-1">
            <a
               onClick={() => handleLoggout()}
               className="text-sky-100 hover:text-white hover:bg-gradient-to-r from-sky-500 to-pink-200 group flex select-none
                   items-center px-2 py-2 text-sm leading-6 font-medium rounded-md">
                <LogoutIcon className="mr-4 h-6 w-6" aria-hidden="true"/>
                Logout
            </a>
        </div>
    );
}