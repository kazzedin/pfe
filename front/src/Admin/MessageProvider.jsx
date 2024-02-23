// MessageContext.js
import React, { createContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [unreadMessages, setUnreadMessages] = useState(false);

    return (
        <MessageContext.Provider value={{ unreadMessages, setUnreadMessages }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContext;
