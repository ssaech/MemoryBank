import ClosedTicketList from "./ClosedTicketList";

export default function OpenTicket() {
    document.title = "Closed Notes";

    return (

        <div className="flex flex-col justify-center">
            {<ClosedTicketList />}
        </div>
    );
};