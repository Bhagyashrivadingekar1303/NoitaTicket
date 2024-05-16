import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [loggedUserData, setLoggedUserData] = useState({});

    return (
        <UserContext.Provider value={{ loggedUserData, setLoggedUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
