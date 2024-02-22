import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DetailsMessages(props) {
    const [replying, setReplying] = useState(false);
    const [response, setResponse] = useState('');

    const toggleReplying = () => {
        setReplying(!replying);
    };

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    };

    const Return = (e) => {
        e.preventDefault();
        props.showFunc(!props.show);
    };

    return (
        <div className=" w-8/12 bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col">
            {props.msg.type === 'contact' ? (
                <div className="flex flex-col justify-start items-start gap-3">
                    <h4 className=" font-semibold">Sender: {props.msg.sender}</h4>
                    <p className="text-lg">Message: {props.msg.message}</p>
                    {replying && (
                        <form className="w-full max-w-lg">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="response">
                                        Response
                                    </label>
                                    <textarea
                                        className="appearance-none block w-full bg-gray-700 text-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-900"
                                        id="response"
                                        rows="6"
                                        placeholder="Enter your response here"
                                        value={response}
                                        onChange={handleResponseChange}
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    )}
                    <div className="flex justify-between w-full">
                        <button onClick={toggleReplying} className="border border-white rounded-xl hover:border-red-600 hover:text-red-600 px-4 py-2 mt-4">
                            {replying ? 'Cancel' : 'Reply'}
                        </button>
                        <button onClick={Return} className="border border-white rounded-xl hover:border-red-600 hover:text-red-600 px-4 py-2 mt-4">
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
