import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const UserDataContext = React.createContext(null);

export const UserDataContextWrapper = ({ children }) => {
    let [profileInfo, setProfileInfo] = useState({
        name: "",
        email: "",
        profilePic: ""
    })

    useEffect(() => {
        //Call to fetch profile details
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios.get('http://localhost:4000/foodie-planner/Auth/getProfile', { headers })
            .then((response) => {
                console.log(response.data);
                setProfileInfo({
                    name: response.data.name,
                    email: response.data.emailId,
                    profilePic: response.data.profilePic
                })
                console.log(profileInfo)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    return (
        <UserDataContext.Provider value={{ state: profileInfo, setState: setProfileInfo }}>
            {children}
        </UserDataContext.Provider>
    )
}