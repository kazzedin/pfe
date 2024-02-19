import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    return (
        <div className="container mx-auto px-4 bg-gray-800 bg-opacity-40 flex flex-col items-center ">
            <h1 className="text-3xl font-bold mt-8 mb-4 text-white">Messages</h1>
            {loading ? (
                <div className="flex flex-wrap -mx-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4">
                            <div className="border rounded bg-white p-4 shadow">
                                <div className="animate-pulse h-6 bg-gray-200 rounded mb-2"></div>
                                <div className="animate-pulse h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="animate-pulse h-4 bg-gray-200 rounded mb-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="message-container">
                    {messages.map((item, id) => (
                        <Link to='/Admin/Inbox/Messages' key={id}>
                            <div className="border rounded bg-white p-4 shadow transition duration-300 ease-in-out transform hover:scale-105 flex flex-row items-center gap-1">
                                <p className="text-lg font-semibold">Type:{item.type}</p>
                                <p className="text-gray-600">Sender:{item.sender}</p>
                                <p>Message:{item.message}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
