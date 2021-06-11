import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props: any) => {
    
    useEffect(() => {
        localStorage.clear();
    }, []);
    
    return (
        <>
            <Redirect to="/" />
        </>
    )
}

export default Logout
