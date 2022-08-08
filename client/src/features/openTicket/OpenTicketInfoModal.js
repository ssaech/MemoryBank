import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'


export default function OpenTicketInfoModal(props) {
    const [open, setOpen] = useState(true)
    const [isTokenReady, setIsTokenReady] = useState(true);
    const [ticket, setTicket] = useState([]);

    const getTicket = async () => {
        const id = props.id
        const ticketData = await fetch(`https://basedserverbysarn.herokuapp.com/post/${id}`).then(res => res.json())
        ticketData.createdAt = new Date(ticketData.createdAt).toLocaleString();
        ticketData.updatedAt = new Date(ticketData.updatedAt).toLocaleString();
        setTicket(ticketData);
        setIsTokenReady(true);

    }

    useEffect(() => {
        getTicket().catch(console.error);
    }, [])

    return (
        <>
            {isTokenReady && (
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                        <div
                            className="mt-4 sm:mt-0 items-end justify-center min-h-screen px-4 pt-5 pb-20 text-center block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                            </Transition.Child>

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div
                                    className="relative inline-block align-bottom bg-white rounded-lg px-4 pb-4
                                        text-left overflow-hidden shadow-xl transform transition-all sm:my-8
                                        align-middle sm:max-w-sm w-full sm:p-6">
                                    <div>
                                        <Dialog.Title as="h3"
                                                      className="text-lg leading-6 font-medium text-gray-900">
                                            Memory: {ticket._id}
                                            {console.log(ticket._id)}
                                        </Dialog.Title>
                                        <div className="isolate -space-y-px rounded-md shadow-sm">
                                                 <div
                                                    className="relative border border-gray-300 rounded-md rounded-b-none
                                                            px-3 py-2 mt-4"
                                                >
                                                    <label htmlFor="title"
                                                           className="block text-xs font-medium text-gray-900">
                                                        Date Created
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="createdAt"
                                                        disabled
                                                        className="block w-full border-0 p-0 text-gray-900 bg-white
                                                                placeholder-gray-500 sm:text-sm"
                                                        placeholder={ticket.createdAt}
                                                    />
                                                </div>
                                                <div
                                                    className="relative border border-gray-300 rounded-md rounded-b-none
                                                            px-3 py-2 mt-4"
                                                >
                                                    <label htmlFor="title"
                                                           className="block text-xs font-medium text-gray-900">
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        disabled
                                                        className="block w-full border-0 p-0 text-gray-900 bg-white
                                                                placeholder-gray-500 sm:text-sm"
                                                        placeholder={ticket.title}
                                                    />
                                                </div>

                                                <div
                                                    className="relative border border-gray-300 rounded-none px-3 py-2">
                                                    <label htmlFor="severity"
                                                           className="block text-xs font-medium text-gray-900">
                                                        Timeframe
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="severity"
                                                        disabled
                                                        className="block w-full border-0 p-0 text-gray-900 bg-white
                                                                placeholder-gray-500 sm:text-sm"
                                                        placeholder={ticket.severity}
                                                    />
                                                </div>
                                               
                                                <div
                                                    className="relative border border-gray-300 rounded-none px-3 py-2">
                                                    <label htmlFor="type"
                                                           className="block text-xs font-medium text-gray-900">
                                                        Type
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="type"
                                                        disabled
                                                        className="block w-full border-0 p-0 text-gray-900 bg-white
                                                                placeholder-gray-500 sm:text-sm"
                                                        placeholder={ticket.type}
                                                    />
                                                </div>
                                                <div
                                                    className="relative border border-gray-300
                                                            rounded-none px-3 py-2">
                                                    <label htmlFor="summary"
                                                           className="block text-xs font-medium text-gray-900">
                                                        Summary
                                                    </label>
                                                    <textarea
                                                        name="summary"
                                                        rows={6}
                                                        disabled
                                                        className="block w-full border-0 p-0 text-gray-900 bg-white
                                                                placeholder-gray-500 sm:text-sm"
                                                        placeholder={ticket.summary}
                                                    />
                                                </div>


                                            </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md 
                                                shadow-sm px-4 py-2 bg-sky-500 text-base
                                                font-medium text-white hover:bg-gradient-to-r from-sky-500 to-pink-200 duration-300"
                                            onClick={() => setOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            )}
        </>
    );
}