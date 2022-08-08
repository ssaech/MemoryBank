import {
    DocumentAddIcon,
    LockClosedIcon,

    TicketIcon
} from "@heroicons/react/solid";

export const primaryNavigations = [
    {name: 'Create Note', location: 'newTicket', icon: DocumentAddIcon},
    {name: 'Active Notes', location: 'openTickets', icon: TicketIcon},
    {name: 'Completed Notes', location: 'closedTickets', icon: LockClosedIcon},


];
