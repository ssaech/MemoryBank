import React from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { reset } from "./newTicketSlice";


function SubmitButton() {
    const st8 = useSelector(state => state)
    const dispatch = useDispatch()
    // const createdBy = st8.auth.user;

    const submit = async (screenshotBase64,imageType) => {
        // const actualResult = props.values.actualResult;
        // const assignedTo = "none";
        // const browser = props.values.browser;
        const createdAt = Date.now().toString();
        const createdby = st8.auth.user;
        // const expectedResult = props.values.expectedResult;
        const product = st8.newTicket.product;
        const screenshot = screenshotBase64;
        const screenshotType = imageType;
        const severity = st8.newTicket.severity;
        const lifecycle = "active";
        const summary = st8.newTicket.summary;
        const title = st8.newTicket.title;
        const type = st8.newTicket.type;

        const resp = await axios.post("https://basedserverbysarn.herokuapp.com/post", {
            type:type,
            createdby: createdby,
            screenshot: screenshot,
            screenshotType: screenshotType,
            createdAt: createdAt,
            // status: status,
            lifecycle: lifecycle,
            severity:severity,
            title:title,
            summary: summary,
            product: product,

        })

        dispatch(reset())

    }
    
    const handleSubmit = async () => {
        if (st8.newTicket.screenshot <= 0) {
            submit('None', 'None').catch(console.error);
        } else {
            const reader = new FileReader();

            reader.onload = () => {
                submit(reader.result.replace("data:", "")
                    .replace(/^.+,/, ""), st8.newTicket.screenshot.type);
            }
            reader.readAsDataURL(st8.newTicket.screenshot);
        }
        
    }

    return (
        <button
            type="submit"
            onClick={() => handleSubmit()}

            className="inline-flex items-center justify-center rounded-md 
            bg-sky-500 px-4 py-2 text-med font-medium text-white shadow-sm
            hover:bg-gradient-to-r from-sky-500 to-pink-200 duration-300"
        >
            Submit
        </button>
    );
}

export default SubmitButton;