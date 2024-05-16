import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalComponent from "./ModalComponent";
import axios from "axios";
import { useUser } from "./UserContext";

const TicketList = () => {
    const { loggedUserData, setLoggedUserData } = useUser();

    const [ticketList, setTicketList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const [ticketObj, setTicketObj] = useState({
        "id": 0,
        "createdBy": "0",
        "title": "",
        "description": "",
        "status": "",
        "assignedTo": 0,
        "file": ""
    });

    const [assignObj, setAssignObj] = useState({ "userName": "" })

    const [filteredTickets, setFilteredTickets] = useState([]);
    // const [loggedUserData, setLoggedUserData] = useState({});
    const [userlist, setUserlist] = useState([])

    useEffect(() => {
        // debugger;
        const readData = sessionStorage.getItem("ticketUserData");
        let localdata = {};
        if (readData !== null) {
            setLoggedUserData(JSON.parse(readData));
            localdata = JSON.parse(readData);
        }
        setTimeout(() => {
            loadTicketList(localdata);
        }, 3000);


    }, []);

    const loadTicketList = (localdata) => {
        axios.get("http://localhost:3001/tickets")
            .then(response => {
                // setTicketList(response.data);
                filterTicketsByRole(response.data, localdata);
            })
            .catch(error => {
                console.error('Error fetching tickets:', error);
            });
    };

    const filterTicketsByRole = (tickets, localdata) => {
        // debugger
        if (localdata.role === 'admin') {
            setFilteredTickets(tickets);
            setTicketList(tickets)
        } else if (localdata.role === 'techSupport') {
            const filtered = tickets.filter(ticket => ticket.assignedTo === localdata.userid);
            setFilteredTickets(filtered);
            setTicketList(filtered)
        } else if (localdata.role === 'user') {
            const filtered = tickets.filter(ticket => ticket.createdBy === localdata.userid);
            setFilteredTickets(filtered);
            setTicketList(filtered)
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const handleChnage = (e) => {
        const { name, value } = e.target;
        setTicketObj((prevObj) => ({ ...prevObj, [name]: value }));
    };

    const saveTickets = async () => {
        try {
            await axios.post("http://localhost:3001/tickets", ticketObj);
            toast.success("Data Submitted Successfully");
            setShowModal(false);
            loadTicketList();
        } catch (error) {
            console.error('Error saving ticket:', error);
            toast.error("Failed to submit data. Please try again.");
        }
    };

    const getOpenTicket = () => {
        const result = ticketList.filter(m => m.status === "open");
        setFilteredTickets(result);
    };

    const inProgressTickets = () => {
        const result = ticketList.filter(m => m.status === "In progress");
        setFilteredTickets(result);
    };

    const closeTicket = () => {
        const result = ticketList.filter(m => m.status === "close");
        setFilteredTickets(result);
    };
    const allTickt = () => {
        setFilteredTickets(ticketList);
    };

    const assignTicketModel = async () => {
        // debugger
        setShowModal2(true);
        const userData = await axios.get("http://localhost:3001/user")
        setUserlist(userData.data)

    }
    const saveAssignTickets = async () => {
        try {
            await axios.post("http://localhost:3001/tickets", assignObj);
            toast.success("Data Submitted Successfully");
            setShowModal2(false);
            loadTicketList();
        } catch (error) {
            console.error('Error saving ticket:', error);
            toast.error("Failed to submit data. Please try again.");
        }
    }

    const editTicket = () => {
        setFilteredTickets(filteredTickets)
        toast.success("Data Edited Successfully");

    }
    const deleteTicket = async (Id) => {
        try {
            await axios.post("http://localhost:3001/tickets", Id);
            toast.success("Data Deleted Successfully");
            setShowModal2(false);
            loadTicketList();
        } catch (error) {
            console.error('Error delete ticket:', error);
            toast.error("Failed to submit data. Please try again.");
        }

    }
    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white shadow-md rounded my-6">
                <div className="px-6 py-4 flex gap-5 items-center border-b">
                    {loggedUserData.role === "admin" &&
                        <>
                            <button onClick={getOpenTicket} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Open</button>
                            <button onClick={inProgressTickets} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">In-Progress</button>
                            <button onClick={closeTicket} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
                            <button onClick={allTickt} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">All Data</button>
                        </>
                    }
                    {loggedUserData.role === "user" &&
                        <button onClick={handleShow} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add (+)</button>
                    }
                </div>
                <div>
                    <ModalComponent show={showModal} handleClose={handleClose} title="Add Issue">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 p-2">
                                <label className="block mb-2">Title</label>
                                <input type="text" name="title" value={ticketObj.title} onChange={handleChnage} placeholder="Enter Title" className="w-full py-2 px-3 border rounded-lg" />
                            </div>
                            <div className="w-full md:w-1/2 p-2">
                                <label className="block mb-2">Description</label>
                                <input type="text" name="description" value={ticketObj.description} onChange={handleChnage} placeholder="Enter Description" className="w-full py-2 px-3 border rounded-lg" />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 p-2">
                                <label className="block mb-2">Status</label>
                                <input type="text" name="status" value={ticketObj.status} onChange={handleChnage} placeholder="Enter Status" className="w-full py-2 px-3 border rounded-lg" />
                            </div>
                            <div className="w-full md:w-1/2 p-2">
                                <label className="block mb-2">Assign To</label>
                                <input type="text" name="assignedTo" value={ticketObj.assignedTo} onChange={handleChnage} placeholder="Enter Assign to" className="w-full py-2 px-3 border rounded-lg" />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 p-2">
                                <label className="block mb-2">Attach File</label>
                                <input type="file" name="file" value={ticketObj.file} onChange={handleChnage} placeholder="Enter Assign to" className="w-full py-2 px-3 border rounded-lg" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={saveTickets}>Save</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Close</button>
                        </div>
                    </ModalComponent>

                </div>
                <div>
                    <ModalComponent show={showModal2} handleClose={() => setShowModal2(false)} title="Add Issue">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 p-2">
                                <label className="block mb-2">Assign To</label>
                                <select className="w-full py-2 px-3 border rounded-lg" name="" id="">
                                    <option value="">Select User</option>
                                    {userlist.map((user) => (
                                        <option key={user.userid}>{user.userName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={saveAssignTickets}>Save</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal2(false)}>Close</button>
                        </div>
                    </ModalComponent>
                </div>
                <div className="px-6 py-4">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="py-2">Title</th>
                                <th className="py-2">Description</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {filteredTickets.filter(item => item.title || item.description || item.status).map(item => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-2">{item.title}</td>
                                    <td className="py-2">{item.description}</td>
                                    <td className="py-2">{item.status}</td>
                                    {loggedUserData.role === 'user' ? (
                                        <td className="py-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={editTicket}>Edit</button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTicket(item.id)}>Remove</button>
                                        </td>
                                    ) : (
                                        <td className="py-2">
                                            {loggedUserData.role === 'admin' && (item.status === "In progress" || item.status === "close") ? (
                                                <button disabled className="bg-blue-500 opacity-50 cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Assign</button>
                                            ) : (
                                                <button onClick={assignTicketModel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Assign</button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TicketList;
