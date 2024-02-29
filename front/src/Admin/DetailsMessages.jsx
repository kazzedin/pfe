import React, { useState } from 'react';
import axios from 'axios';

export default function DetailsMessages(props) {
    const [replying, setReplying] = useState(false);
    const [reply, setReply] = useState('');

    const handleReply = (e) => {
        e.preventDefault();
        if (reply.trim() === '') {
            alert('Please enter a response');
            return;
        }

        axios.post('http://localhost:3001/admin/response', { message: reply, sender: props.msg.sender })
            .then(res => {
                if (res.data.message === 'success') {
                    alert('Response sent successfully');
                    props.checkFunc(!props.check);
                    setReply('');
                } else {
                    alert('Failed to send response');
                }
            })
            .catch(err => console.log(err));
    };

    const handleTextArea = (e) => {
        setReply(e.target.value);
    };

    const toggleReplying = () => {
        setReplying(!replying);
    };

    const returnToInbox = (e) => {
        e.preventDefault();
        props.showFunc(!props.show);
    };

    return (
        <div className="w-8/12 bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col">
            {props.msg.type === 'contact' ? (
                <div className="flex flex-col justify-start items-start gap-3">
                    <h4 className="font-semibold text-xl">Sender: {props.msg.sender}</h4>
                    <p className="text-lg">Message: {props.msg.message}</p>
                    {replying && (
                        <form className="w-full max-w-lg">
                            <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mt-6" htmlFor="response">
                                Response
                            </label>
                            <textarea
                                className="block w-full bg-gray-700 text-gray-200 rounded-lg py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-gray-900"
                                id="response"
                                rows="6"
                                placeholder="Enter your response here"
                                value={reply}
                                onChange={handleTextArea}
                            ></textarea>
                            <button
                                onClick={handleReply}
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                            >
                                Send
                            </button>
                        </form>
                    )}
                    <div className="flex justify-between w-full">
                        <button
                            onClick={toggleReplying}
                            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                            {replying ? 'Cancel' : 'Reply'}
                        </button>
                        <button
                            onClick={returnToInbox}
                            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                            Go back
                        </button>
                    </div>
                </div>
            ) : (
                <p>No details available for this message type.</p>
            )}
        </div>
    );
}
