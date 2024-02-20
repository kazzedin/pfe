import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';

export default function Inbox() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/admin/inbox')
            .then(res => {
                if (res.data.messages) {
                    setMessages(res.data.messages);
                } else {
                    console.log("No messages");
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
 const navigate=useNavigate();
    const returnAdmin=(e)=>{
       e.preventDefault();
       navigate('/Admin');
    }

    const HandelDelete = (e, email) => {
        e.preventDefault();
        axios.delete('http://localhost:3001/admin/deletemessage', { data: { sender: email } })
        .then(res => {
            console.log(res.data.message);
            alert('You deleted the Message');
        })
        .catch(err => console.log(err));
     }    
     

    return (
        <div className="container mx-auto px-4 bg-gray-800 bg-opacity-40 flex flex-col items-center">
            <div className='flex items-center justify-start flex-row w-full'>
                <div className='flex items-center '>
                    <Link onClick={returnAdmin} className='hover:text-red-700 text-white rounded return-admin flex items-center'>
                        <IoIosArrowBack className="mr-2" />
                        Return Admin Page
                    </Link>
                </div>
                </div>
                <h1 className="text-3xl font-bold mt-8 mb-4 text-white ">Messages</h1>
                
            
            {loading ? (
                <div role="status" className="max-w-lg p-3 space-y-5 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 skelaton">
                    {/* Skeleton loading */}
                    {[...Array(5)].map((_, index) => (
                        <div className="flex items-center justify-between" key={index}>
                            <div>
                                <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-52 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5 mt-2"></div>
                            </div>
                            <div className="flex flex-col gap-2 justify-center">
                                <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div>
                                <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg message-container2">
                    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-message">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sender:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Message:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action:
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages ? messages.map((message, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {message.sender}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message.message}
                                    </td>
                                    <td className="px-6 py-4 flex flex-row items-center gap-2">
                                        <Link to="/Admin/Inbox/Messages" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Voir</Link>
                                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={(e)=>HandelDelete(e,message.sender)}>Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4">
                                        <h3>Loading.....</h3>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
    
}
