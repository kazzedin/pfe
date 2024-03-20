import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import DetailsMessages from '../Admin/DetailsMessages';
import MessageContext from '../Admin/MessageProvider';

export default function InboxEtu() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const messageFilter = searchParams.get("type");
    const [show, setShow] = useState(false);
    const [clickedMessage, setClickedMessage] = useState({});
    const { setUnreadMessages } = useContext(MessageContext);

    useEffect(() => {
        axios.get('http://localhost:3001/admin/inbox')
            .then(res => {
                // Ajouter un identifiant unique à chaque message
                const messagesWithId = res.data.messages.map((message, index) => ({
                    ...message,
                    id: index + 1 // Utiliser l'index comme identifiant temporaire (vous pouvez utiliser un identifiant unique provenant de l'API)
                }));
                setMessages(messagesWithId);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const navigate = useNavigate();

    const returnAdmin = (e) => {
        e.preventDefault();
        navigate('/Admin/Setting');
    }

    const VerificationEtat = (email, type, message) => {
        const etat = messages.some(item => item.etat === true && item.sender === email && item.type === type && item.message === message);
        return etat;
    }

    const AfficherDetails = (e, sender, type, message, nomPrenom, matricule, section, filier) => {
        e.preventDefault();
        let infoData = {};
        if (type === 'login-info-etu') {
            infoData = {
                nomPrenom: nomPrenom,
                matricule: matricule,
                section: section,
                filier: filier
            };
        } else if (type === 'login-info-prf') {
            infoData = {
                nomPrenom: nomPrenom,
                section: section,
                filier: filier
            };
        }
        setClickedMessage({
            sender: sender,
            type: type,
            message: message,
            info: infoData // Transmettre uniquement si le type de message est "login-info"
        });

        setShow(true);
    }

    const handleDelete = (e, email, message,id) => {
        e.preventDefault();
        axios.delete('http://localhost:3001/admin/deletemessage', { data: { message: message, email: email } })
            .then(res => {
                alert('Message deleted successfully');
                // Mettre à jour l'état messages en filtrant les messages qui ne sont pas du type actuel OU qui n'ont pas été répondus
                setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id))
            })
            .catch(err => console.error(err));
    };

    const Filtered_Message = messageFilter ? messages.filter(item => item.type === messageFilter) : messages;

    const Affichage_Message = Filtered_Message.length > 0 ? (
        Filtered_Message.map((message, index) => (
            <tr className="bg-white border-b " key={index}>
                <td scope="row" className="px-6 py-4 font-medium  bg-white text-black ">
                    {message.sender}
                </td>
                <td className="px-6 py-4 text-black bg-white">
                    {message.type}
                </td>
                <td className="px-6 py-4 text-black bg-white">
                    {message.message.split(' ').slice(0, 5).join(' ')}{message.message.split(' ').length > 5 ? '...' : ''}
                </td>
                <td className="px-6 py-4 text-black bg-white">
                    {message.type === 'login-info-etu' || message.type === 'login-info-prf' && message.info ? (
                        <>
                            <p>{message.info.nomPrenom}</p>
                            <p>
                                {message.type === "login-info-etu" ? message.info.matricule : message.info.section || message.info.filier}...
                            </p>
                        </>
                    ) : (
                            <p>Non-exister</p>
                        )}
                </td>
                <td className="px-6 py-4 flex flex-row items-center mt-1 gap-2 text-black bg-white">
                    <button className="font-medium text-blue-500 dark:text-blue-500 hover:underline" onClick={(e) => AfficherDetails(e, message.sender, message.type, message.message, message.info ? message.info.nomPrenom : "", message.info ? message.info.matricule : "", message.info ? message.info.section : "", message.info ? message.info.filier : "")}>Voir</button>
                    <button className="font-medium text-red-500 dark:text-red-500 hover:underline" onClick={(e) => handleDelete(e, message.sender, message.message,message.id, message.type,message.info ? message.info.nomPrenom : "", message.info ? message.info.matricule : "")}>Delete</button>
                </td>
                <td className='text-black bg-white'>
                    {VerificationEtat(message.sender, message.type, message.message) ? <div className='flex flex-row items-center gap-1'>Repondu <FaCheckCircle color="green" /></div> : <div className='flex flex-row items-center gap-1'>Non repondu<FaTimesCircle color="red" /></div>}
                </td>
            </tr>)
        )) : (
            <tr> 
                <td colSpan="6" className="px-6 py-4 text-center  bg-transparent">
                   {messages.length===0 ? <h4 className="text-black font-bold ">No messages ?{setUnreadMessages(false)}</h4>:'' } 
                </td>
            </tr>
        );


       

    return (
        <div className="date-container bg-gray-500 bg-opacity-5 flex flex-col items-center relative">
            <div className='absolute left-0 top-0 flex items-center'>
                <div className='flex items-center '>
                    <Link onClick={returnAdmin} className='hover:text-red-500 text-black rounded return-admin flex items-center'>
                        <IoIosArrowBack className="mr-2" />
                        Retourner à la page d'etudiant
                    </Link>
                </div>
            </div>
            <h1 className="text-2xl font-bold mt-8 mb-4 text-black " style={{textDecoration:'underline'}}>Messages</h1>
            <div className='filter absolute left-0 top-20 flex flex-row items-center justify-center gap-2 text-black mb-1 ml-2'>
                <h4 className='font-bold text-black'>Filtre:</h4>
                <Link to='?type=contact' className='border border-black bg-transparent rounded-2xl p-1 hover:border-blue-700 hover:text-blue-700'>Contact</Link>
                <Link to='?type=login-info-etu' className='border border-black bg-transparent rounded-2xl p-1 hover:border-blue-700 hover:text-blue-700'>Login-Info-etudiant</Link>
                <Link to='?type=login-info-prf' className='border border-black bg-transparent rounded-2xl p-1 hover:border-blue-700 hover:text-blue-700'>Login-Info-prof</Link>
                {messageFilter ? <Link to='' className='bg-transparent rounded-2xl p-1 hover:border-blue-700 hover:text-blue-700'>Clear-Filter ?</Link> : ''}
            </div>
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
                        {show ? <DetailsMessages showFunc={setShow} show={show} msg={clickedMessage} updateMessageState={setMessages}  /> :
                            <div className=" relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-black  dark:text-gray-400 table-message">
                                    <thead className="text-xs text-black uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 bg-gray-300 text-black ">Emmeteur:</th>
                                            <th scope="col" className="px-6 py-3 bg-gray-300 text-black">Type:</th>
                                            <th scope="col" className="px-6 py-3 bg-gray-300 text-black">Message:</th>
                                            <th scope="col" className="px-6 py-3 bg-gray-300 text-black">Info:</th>
                                            <th scope="col" className="px-6 py-3 bg-gray-300 text-black">Action:</th>
                                            <th scope="col" className="px-6 py-3 bg-gray-300 text-black">Etat:</th>
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
