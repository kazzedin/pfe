import React, { useState, useEffect,useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import DetailsMessages from './DetailsMessages';
import { FaCheckCircle } from 'react-icons/fa';
import MessageContext from './MessageProvider';



export default function Inbox() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const messageFilter = searchParams.get("type");
    const [show, setShow] = useState(false);
    const [clickedMessage, setClickedMessage] = useState({ sender: '', type: '', message: '' });
    const [chekedMessage, setChekedMessage] = useState(false);
    const {setUnreadMessages} = useContext(MessageContext);

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

    const navigate = useNavigate();

    const returnAdmin = (e) => {
        e.preventDefault();
        navigate('/Admin');
    }

    const AfficherDetails = (e, sender, type, message) => {
        e.preventDefault();
        setClickedMessage({
            sender: sender,
            type: type,
            message: message
        });
        setShow(true);
    }

    const handleDelete = (email) => {
        axios.delete('http://localhost:3001/admin/deletemessage', { data: { sender: email } })
            .then(res => {
                console.log(res.data.message);
                alert('Message deleted successfully')
                setMessages(prevMessages => prevMessages.filter(message => message.sender !== email));
            })
            .catch(err => console.log(err));
    }

    const Filtered_Message = messageFilter ? messages.filter(item => item.type === messageFilter) : messages;

    const Affichage_Message = Filtered_Message.length > 0 ? (
        Filtered_Message.map((message, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {message.sender}
                </td>
                <td className="px-6 py-4">
                    {message.type}
                </td>
                <td className="px-6 py-4">
                    {message.message.split(' ').slice(0, 5).join(' ')}{message.message.split(' ').length > 5 ? '...' : ''}
                </td>
                <td className="px-6 py-4 flex flex-row items-center gap-2">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={(e) => AfficherDetails(e, message.sender, message.type, message.message)}>Voir</button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDelete(message.sender)}>Delete</button>
                    {chekedMessage && message.sender===clickedMessage.sender ?<FaCheckCircle color="green" size={20} />:""}
                </td>
            </tr>)
    )) : (
        <tr>
            <td colSpan="4" className="px-6 py-4 text-center">
                <h2 className="text-gray-500 font-bold dark:text-gray-400">No messages ?{setUnreadMessages(false)}</h2>
            </td>
        </tr>
    );
  
    
   

    return (
        <div className="container bg-gray-800 bg-opacity-40 flex flex-col items-center relative">
            {/* Navigation et filtres */}
            <div className='absolute left-0 top-0 flex items-center'>
                <div className='flex items-center '>
                    <Link onClick={returnAdmin} className='hover:text-red-700 text-white rounded return-admin flex items-center'>
                        <IoIosArrowBack className="mr-2" />
                        Retourner à la page d'administration
                    </Link>
                </div>
            </div>
            <h1 className="text-3xl font-bold mt-8 mb-4 text-white ">Messages</h1>
            <div className='filter absolute left-0 top-20 flex flex-row items-center justify-center gap-2 text-white mb-1'>
                <h4 className='font-bold text-white'>Filtre:</h4>
                <Link to='?type=contact' className='border border-white bg-transparent rounded-2xl p-1 hover:border-blue-500 hover:text-blue-500'>Contact</Link>
                <Link to='?type=logininfo' className='border border-white bg-transparent rounded-2xl p-1 hover:border-blue-500 hover:text-blue-500'>Login-Info</Link>
         
                {messageFilter ? <Link to='' className='bg-transparent rounded-2xl p-1 hover:border-blue-500 hover:text-blue-500'>Clear-Filter ?</Link> : ''}
            </div>
            {/* Affichage des messages */}
            {loading ? (
                <div role="status" className=" p-3 space-y-5 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 skelaton">
                    {[...Array(5)].map((_, index) => (
                        <div className="flex items-center justify-between" key={index}>
                            <div>
                                <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-96 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
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
                <div className="shadow-md sm:rounded-lg message-container2 flex flex-col justify-center items-center">
                    {show ? <DetailsMessages showFunc={setShow} show={show} msg={clickedMessage} check={chekedMessage} checkFunc={setChekedMessage} /> :
                        <div className=" relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-message">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Emmeteur:</th>
                                        <th scope="col" className="px-6 py-3">Type:</th>
                                        <th scope="col" className="px-6 py-3">Message:</th>
                                        <th scope="col" className="px-6 py-3">Action:</th>
                                    </tr>
                                </thead>
                                <tbody className="max-h-96 overflow-y-auto">
                                    {messages ? Affichage_Message
                                        : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4">
                                                    <h3>Loading.....</h3>
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            )}
            
        </div>
    );
}
