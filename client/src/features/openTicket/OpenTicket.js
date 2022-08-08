import React, {useEffect} from "react";
import OpenTicketInfo from "./OpenTicketInfo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function OpenTicket() {
    document.title = "Open Notes";
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user)
    const checklog = () => {
    if (!user || user === null || user === undefined) {
        navigate("/register");
    }}

    useEffect(() => {
        checklog()
      }, []);


    return (

        <div className="flex flex-col justify-center">
            {<OpenTicketInfo />}
        </div>
    );
};